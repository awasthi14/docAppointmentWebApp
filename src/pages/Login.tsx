import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>🔐 Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
