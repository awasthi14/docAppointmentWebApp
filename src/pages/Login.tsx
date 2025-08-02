import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type Role = 'user' | 'doctor' | 'admin';

const mockUsers = [
  { email: 'patient@example.com', password: '1234', role: 'user' },
  { email: 'doctor@example.com', password: '1234', role: 'doctor' },
  { email: 'admin@example.com', password: '1234', role: 'admin' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const found = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (found) {
      localStorage.setItem('role', found.role);
      localStorage.setItem('email', found.email);

      switch (found.role as Role) {
        case 'user':
          navigate('/user/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          setError('Unknown role.');
      }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-text">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
