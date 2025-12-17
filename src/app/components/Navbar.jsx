import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          預約系統
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            首頁
          </Link>

          {user ? (
            <>
              <Link to="/bookings" className="nav-link">
                我的預約
              </Link>
              <span className="nav-user">您好, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                登出
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                登入
              </Link>
              <Link to="/register" className="nav-link">
                註冊
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
