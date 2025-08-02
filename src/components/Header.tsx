import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'Guest';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="left">
        <span className="app-icon">💊</span>
      </div>
      <div className="center">
        <h1 className="app-title">Doctor Appointment System</h1>
      </div>
      <div className="right">
        <span className="user-email">{email}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
