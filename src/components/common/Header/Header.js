import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Login from '../../auth/Login/Login';
import './Header.css';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">LibrarySystem</Link>
          </div>
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              {currentUser && (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/favorites">Favorites</Link></li>
                </>
              )}

            </ul>
          </nav>
          <div className="auth-actions">
            {currentUser ? (
              <div className="user-menu">
                <span className="user-greeting">Hello, {currentUser.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={handleLoginClick}>
                Log in
              </button>
            )}
          </div>
        </div>
      </header>
      {showLogin && <Login onClose={handleCloseLogin} />}
    </>
  );
};

export default Header;