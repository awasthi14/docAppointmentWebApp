import { useState } from 'react';
import DoctorManagement from './DoctorManagement';
import PatientManagement from './PatientManagement';
import Header from '../components/Header';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'patients'>('doctors');

  return (
    <>
  <Header />
    <div className="admin-container">
      <h1 className="admin-title">🛠️ Admin Portal</h1>

      <div className="tab-buttons">
        <button
          className={activeTab === 'doctors' ? 'active' : ''}
          onClick={() => setActiveTab('doctors')}
        >
          Manage Doctors
        </button>
        <button
          className={activeTab === 'patients' ? 'active' : ''}
          onClick={() => setActiveTab('patients')}
        >
          Manage Patients
        </button>
      </div>

      <div className="admin-panel">
        {activeTab === 'doctors' ? <DoctorManagement /> : <PatientManagement />}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
