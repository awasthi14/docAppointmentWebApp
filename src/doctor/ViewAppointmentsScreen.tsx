import './ViewAppointmentsScreen.css';

const ViewAppointmentsScreen = () => {
  const appointments = [
    { patientName: 'Alice', date: '2025-08-02', time: '10:00 AM' },
    { patientName: 'Bob', date: '2025-08-03', time: '2:00 PM' },
  ];

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
              <span className="date">{a.date}</span>
              <span className="time">{a.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAppointmentsScreen;
