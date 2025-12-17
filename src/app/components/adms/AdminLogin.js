import '../Admin.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { adminAPI } from '../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await adminAPI.login(formData);
      const { token, admin } = response.data;

      // 儲存管理員 token 和資料
      localStorage.setItem('adminToken', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('token', token); // 也設定一般 token 以便 API 使用

      history.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || '登入失敗,請檢查您的憑證');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <div className="admin-header">
          <h2>🔐 管理員登入</h2>
          <p className="admin-subtitle">業者後台管理系統</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>管理員帳號:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="請輸入管理員帳號"
              required
            />
          </div>

          <div className="form-group">
            <label>密碼:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="請輸入密碼"
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-block">
            登入後台
          </button>
        </form>

        <div className="admin-info">
          <p>預設帳號: <code>admin</code></p>
          <p>預設密碼: <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
