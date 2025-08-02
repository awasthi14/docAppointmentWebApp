import { useState } from 'react';
import DoctorProfileScreen from './DoctorProfileScreen';
import AddAvailabilityScreen from './AddAvailabilityScreen';
import ViewAppointmentsScreen from './ViewAppointmentsScreen';
import Header from '../components/Header';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [activeScreen, setActiveScreen] = useState<'profile' | 'availability' | 'appointments'>('profile');

  return (
    <>
  <Header />
    <div className="doctor-dashboard">
      <h1 className="dashboard-title">🩺 Doctor Dashboard</h1>

      {/* ==== Navigation Menu ==== */}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveScreen('profile')}
          className={activeScreen === 'profile' ? 'active' : ''}
        >
          👨‍⚕️ Profile
        </button>
        <button
          onClick={() => setActiveScreen('availability')}
          className={activeScreen === 'availability' ? 'active' : ''}
        >
          📅 Add Availability
        </button>
        <button
          onClick={() => setActiveScreen('appointments')}
          className={activeScreen === 'appointments' ? 'active' : ''}
        >
          📋 View Appointments
        </button>
      </div>

      {/* ==== Dynamic Screen ==== */}
      <div className="dashboard-panel">
        {activeScreen === 'profile' && <DoctorProfileScreen />}
        {activeScreen === 'availability' && <AddAvailabilityScreen />}
        {activeScreen === 'appointments' && <ViewAppointmentsScreen />}
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
