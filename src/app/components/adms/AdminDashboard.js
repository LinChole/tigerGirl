import '../Admin.css';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const admin = localStorage.getItem('admin') || '{}';

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await adminAPI.getStatistics();
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('載入統計資料失敗:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        history.push('/admin/login');
      }
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    history.push('/admin/login');
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>管理後台</h1>
          <p className="welcome-text">您好, {admin.name}!</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          登出
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>總用戶數</p>
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>總預約數</p>
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingBookings}</h3>
            <p>待確認預約</p>
          </div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-icon">📆</div>
          <div className="stat-info">
            <h3>{stats.todayBookings}</h3>
            <p>今日預約</p>
          </div>
        </div>
      </div>

      <div className="admin-menu">
        <h2>管理功能</h2>
        <div className="menu-grid">
          <Link to="/admin/bookings" className="menu-card">
            <div className="menu-icon">📋</div>
            <h3>預約管理</h3>
            <p>查看和管理所有預約</p>
          </Link>

          <Link to="/admin/users" className="menu-card">
            <div className="menu-icon">👤</div>
            <h3>用戶管理</h3>
            <p>管理註冊用戶資料</p>
          </Link>

          <Link to="/admin/services" className="menu-card">
            <div className="menu-icon">🛠️</div>
            <h3>服務類型</h3>
            <p>維護服務類型設定</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
