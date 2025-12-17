import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceTypeAPI } from '../services/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    is_active: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await serviceTypeAPI.getAll(false);
      setServices(response.data.services);
      setLoading(false);
    } catch (err) {
      console.error('載入服務類型失敗:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingService) {
        await serviceTypeAPI.update(editingService.id, formData);
        setSuccess('服務類型已更新');
      } else {
        await serviceTypeAPI.create(formData);
        setSuccess('服務類型建立成功');
      }

      setShowModal(false);
      setFormData({ name: '', description: '', duration: 60, is_active: true });
      setEditingService(null);
      loadServices();
    } catch (err) {
      setError(err.response?.data?.error || '操作失敗');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      duration: service.duration,
      is_active: service.is_active === 1,
    });
    setShowModal(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('確定要刪除此服務類型嗎?\n注意:已有的預約仍會保留此服務類型名稱')) {
      return;
    }

    try {
      await serviceTypeAPI.delete(id);
      setSuccess('服務類型已刪除');
      loadServices();
    } catch (err) {
      setError('刪除服務類型失敗');
    }
  };

  const handleToggle = async (id) => {
    try {
      await serviceTypeAPI.toggle(id);
      setSuccess('服務類型狀態已更新');
      loadServices();
    } catch (err) {
      setError('更新失敗');
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({ name: '', description: '', duration: 60, is_active: true });
    setShowModal(true);
    setError('');
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>服務類型管理</h1>
        <div className="header-actions">
          <button onClick={handleAdd} className="btn-primary">
            + 新增服務類型
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
              <th>服務名稱</th>
              <th>描述</th>
              <th>時長 (分鐘)</th>
              <th>狀態</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {services?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">沒有服務類型資料</td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td><strong>{service.name}</strong></td>
                  <td>{service.description || '-'}</td>
                  <td>{service.duration}</td>
                  <td>
                    <span className={`status-badge ${service.is_active ? 'status-active' : 'status-inactive'}`}>
                      {service.is_active ? '啟用' : '停用'}
                    </span>
                  </td>
                  <td>{new Date(service.created_at).toLocaleString('zh-TW')}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(service)}
                      className="btn-sm btn-edit"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleToggle(service.id)}
                      className="btn-sm btn-toggle"
                    >
                      {service.is_active ? '停用' : '啟用'}
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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
            <h2>{editingService ? '編輯服務類型' : '新增服務類型'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>服務名稱: *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="例如: 一般諮詢"
                />
              </div>

              <div className="form-group">
                <label>描述:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="服務類型的詳細描述..."
                />
              </div>

              <div className="form-group">
                <label>服務時長 (分鐘): *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="15"
                  step="15"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <span>啟用此服務類型</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  {editingService ? '更新' : '建立'}
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

export default AdminServices;
