import { useState } from 'react';
import DoctorProfileScreen from './DoctorProfileScreen';
import AddAvailabilityScreen from './AddAvailabilityScreen';
import ViewAppointmentsScreen from './ViewAppointmentsScreen';

const DoctorDashboard = () => {
  const [activeScreen, setActiveScreen] = useState<'profile' | 'availability' | 'appointments'>('profile');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🩺 Doctor Dashboard</h1>

      {/* ==== Navigation Menu ==== */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveScreen('profile')}>👨‍⚕️ Profile</button>
        <button onClick={() => setActiveScreen('availability')}>📅 Add Availability</button>
        <button onClick={() => setActiveScreen('appointments')}>📋 View Appointments</button>
      </div>

      {/* ==== Dynamic Screen ==== */}
      <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
        {activeScreen === 'profile' && <DoctorProfileScreen />}
        {activeScreen === 'availability' && <AddAvailabilityScreen />}
        {activeScreen === 'appointments' && <ViewAppointmentsScreen />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
