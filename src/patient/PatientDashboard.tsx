import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { API_BASE_URL } from '../config';
import './PatientDashboard.css';

type Doctor = {
  id: number;
  name: string;
  specialization: string;
};

type Appointment = {
  doctor_name: string;
  appointment_date: string;
  time_slot: string;
};

const PatientDashboard = () => {
  const [patient, setProfile] = useState<{name: string, email: string}>({name: '', email: ''});
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientId, setPatientId] = useState<string>('');

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email') || '';
  const userId = localStorage.getItem('userId') || '';

  // ✅ Fetch patient profile
const fetchPatientProfile = () => {
  fetch(`${API_BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const profile = data.data;
      setProfile(profile);

      // ✅ Now call second API using the email from profile
      fetch(`${API_BASE_URL}/patients/user/${profile.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((patientData) => {
          // ✅ Store patient ID locally if needed
          setPatientId(patientData.data.id);
        })
        .catch((err) => console.error('Failed to fetch patient ID:', err));
    })
    .catch((err) => console.error('Failed to fetch user profile:', err));
};


  // ✅ Fetch doctors list
  const fetchDoctors = () => {
    fetch(`${API_BASE_URL}/doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data.data))
      .catch((err) => console.error('Failed to fetch doctors:', err));
  };

  // ✅ Fetch appointments
  const fetchAppointments = () => {
    fetch(`${API_BASE_URL}/appointments/patient/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data.data))
      .catch((err) => console.error('Failed to fetch appointments:', err));
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatientProfile();
    fetchAppointments();
  }, []);

  // ✅ Book appointment
  const handleBook = () => {
    if (!selectedDoctor || !date || !time) return;

    fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: selectedDoctor,
        patient_id: patientId,
        appointment_date: date,
        appointment_time: time
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking failed');
        return res.json();
      })
      .then(() => {
        setSelectedDoctor(null);
        setDate('');
        setTime('');
        fetchAppointments(); // ✅ Refresh after booking
      })
      .catch((err) => console.error(err));
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
                  {doc.name} ({doc.specialization})
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
                  {appt.doctor_name} – {new Date(appt.appointment_date).toLocaleDateString()} at {appt.time_slot}
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
