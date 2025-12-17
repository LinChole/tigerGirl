import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.error('載入用戶失敗:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingUser) {
        await adminAPI.updateUser(editingUser.id, {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
        });
        setSuccess('用戶資料已更新');
      } else {
        await adminAPI.createUser(formData);
        setSuccess('用戶建立成功');
      }

      setShowModal(false);
      setFormData({ username: '', email: '', password: '', phone: '' });
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.error || '操作失敗');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      password: '',
    });
    setShowModal(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('確定要刪除此用戶嗎?')) {
      return;
    }

    try {
      await adminAPI.deleteUser(id);
      setSuccess('用戶已刪除');
      loadUsers();
    } catch (err) {
      setError('刪除用戶失敗');
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ username: '', email: '', password: '', phone: '' });
    setShowModal(true);
    setError('');
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>用戶管理</h1>
        <div className="header-actions">
          <button onClick={handleAdd} className="btn-primary">
            + 新增用戶
          </button>
          <Link to="/admin/dashboard" className="btn-secondary">
            返回後台
          </Link>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>帳號</th>
              <th>姓名</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>註冊時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">沒有用戶資料</td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.phone || '-'}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString('zh-TW')}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn-sm btn-edit"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn-sm btn-delete"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingUser ? '編輯用戶' : '新增用戶'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>帳號:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={!!editingUser}
                />
              </div>

              {!editingUser && (
                <div className="form-group">
                  <label>密碼:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>姓名:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>電話:</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>電子郵件:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  {editingUser ? '更新' : '建立'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
