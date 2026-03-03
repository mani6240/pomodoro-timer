import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    // If already logged in, redirect to dashboard
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="debug">
        DEBUG: Login page rendered. If you see this, routing is working.
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span style={{ color: '#fff' }}>Don't have an account? </span>
        <Link to="/register" style={{ color: '#ff9966', fontWeight: 600, textDecoration: 'underline', marginLeft: 4 }}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
