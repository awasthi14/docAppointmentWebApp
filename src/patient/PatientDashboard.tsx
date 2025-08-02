import { useState } from 'react';
import Header from '../components/Header';
import './PatientDashboard.css';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
};

type Appointment = {
  doctorName: string;
  date: string;
  time: string;
};

const PatientDashboard = () => {
  const patient = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  };

  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Emily Stone', specialty: 'Dermatologist' },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleBook = () => {
    const doctor = doctors.find((d) => d.id === selectedDoctor);
    if (doctor && date && time) {
      setAppointments([
        ...appointments,
        {
          doctorName: doctor.name,
          date,
          time,
        },
      ]);
      setSelectedDoctor(null);
      setDate('');
      setTime('');
    }
  };

  return (
    <>
    <Header />
    
    <div className="dashboard-container">
      <h1 className="dashboard-title">👤 Patient Dashboard</h1>

      <section className="dashboard-section">
        <h2>🪪 My Profile</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </section>

      <section className="dashboard-section">
        <h2>🩺 Book a Doctor</h2>
        <div className="form-group">
          <select
            value={selectedDoctor ?? ''}
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
          >
            <option value="" disabled>Select a doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={handleBook}>Book Appointment</button>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>📅 My Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <ul className="appointment-list">
            {appointments.map((appt, idx) => (
              <li key={idx}>
                {appt.doctorName} – {appt.date} at {appt.time}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
    </>
  );
};

export default PatientDashboard;
