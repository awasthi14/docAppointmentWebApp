import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './dashboards/PatientDashboard'
import DoctorDashboard from './doctor/DoctorDashboard';
import type { Role } from './types';

import AdminDashboard from './admin/AdminDashboard';

import DoctorProfileScreen from './doctor/DoctorProfileScreen';
import AddAvailabilityScreen from './doctor/AddAvailabilityScreen';
import ViewAppointmentsScreen from './doctor/ViewAppointmentsScreen';


const DashboardRouter = () => {
  const role = localStorage.getItem('role') as Role | null;

  if (!role) return <Navigate to="/login" />;

  switch (role) {
    case 'user':
      return <PatientDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/dashboard" element={<DashboardRouter />} />
        
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/availability" element={<AddAvailabilityScreen />} />

        
        <Route path="/user/dashboard" element={<PatientDashboard />} />

        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/doctor/profile" element={<DoctorProfileScreen />} />

        <Route path="/doctor/appointments" element={<ViewAppointmentsScreen />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
