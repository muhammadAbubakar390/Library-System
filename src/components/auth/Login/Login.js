import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Login.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Failed to log in');
      }
    } catch (error) {
      setError('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Log in to your account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <span className="demo-hint">Use any email/password for demo</span>
        </p>
      </div>
    </div>
  );
};

export default Login;