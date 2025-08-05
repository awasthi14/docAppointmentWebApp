import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './ViewAppointmentsScreen.css';

type Appointment = {
  patientName: string;
  appointment_date: string; // assumed from backend
  time: string;
};

const ViewAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const token = localStorage.getItem('token') || '';
  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/appointments/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const result: Appointment[] = data.data.map((appt: any) => ({
          patientName: appt.patientName || 'Unknown',
          appointment_date: appt.appointment_date.split('T')[0], // 👈 only date
          time: appt.time || '',
        }));
        setAppointments(result);
      })
      .catch(err => console.error('Failed to fetch appointments:', err));
  }, []);

  return (
    <div className="appointments-container">
      <h2 className="section-title">📋 Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p className="empty-note">No appointments booked.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((a, i) => (
            <li key={i} className="appointment-item">
              <span className="patient">{a.patientName}</span>
              <span className="date">{a.appointment_date}</span>
              <span className="time">{a.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAppointmentsScreen;
