import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('密碼不一致');
      return;
    }

    try {
      // 檢查用戶是否已存在
      const checkResponse = await authAPI.checkUser(formData.username);
      if (checkResponse.data.exists) {
        setError('帳號已存在');
        return;
      }

      // 註冊新用戶
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess('註冊成功!正在跳轉到登入頁面...');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || '註冊失敗,請重試');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>用戶註冊</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>帳號:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
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
              required
            />
          </div>

          <div className="form-group">
            <label>確認密碼:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

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
              type="nubmer"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">註冊</button>
        </form>

        <p className="login-link">
          已有帳號? <Link to="/login">立即登入</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
