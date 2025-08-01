import { useState } from 'react';
import DoctorManagement from './DoctorManagement';
import PatientManagement from './PatientManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'patients'>('doctors');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛠️ Admin Portal</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('doctors')}>Manage Doctors</button>
        <button onClick={() => setActiveTab('patients')}>Manage Patients</button>
      </div>

      {activeTab === 'doctors' ? <DoctorManagement /> : <PatientManagement />}
    </div>
  );
};

export default AdminDashboard;
