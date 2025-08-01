import { useNavigate } from 'react-router-dom';
import type { Role } from '../types';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    // Store role in localStorage (for demo purposes)
    localStorage.setItem('role', role);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login As:</h2>
      <button onClick={() => handleLogin('user')}>Patient</button>
      <button onClick={() => handleLogin('doctor')}>Doctor</button>
      <button onClick={() => handleLogin('admin')}>Admin</button>
    </div>
  );
};

export default Login;
