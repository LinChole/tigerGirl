import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  // const { user } = useContext(AuthContext);
  let user = ''

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>歡迎來到預約系統</h1>
        <p className="subtitle">簡單、快速、方便的線上預約服務</p>

        {user ? (
          <div className="user-welcome">
            <h2>您好, {user.name}!</h2>
            <Link to="/booking" className="btn-primary">
              前往預約
            </Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary">
              立即註冊
            </Link>
            <Link to="/login" className="btn-secondary">
              登入
            </Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>系統特色</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔐 安全認證</h3>
            <p>採用 JWT 認證機制,保護您的帳號安全</p>
          </div>
          <div className="feature-card">
            <h3>📅 即時查詢</h3>
            <p>即時查看可用時段,輕鬆選擇適合的時間</p>
          </div>
          <div className="feature-card">
            <h3>📝 預約管理</h3>
            <p>隨時查看和管理您的預約記錄</p>
          </div>
          <div className="feature-card">
            <h3>⚡ 快速便捷</h3>
            <p>簡潔的介面設計,幾步即可完成預約</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
