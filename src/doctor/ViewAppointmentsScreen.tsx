const ViewAppointmentsScreen = () => {
  const appointments = [
    { patientName: 'Alice', date: '2025-08-02', time: '10:00 AM' },
    { patientName: 'Bob', date: '2025-08-03', time: '2:00 PM' },
  ];

  return (
    <div>
      <h2>Booked Appointments</h2>
      <ul>
        {appointments.map((a, i) => (
          <li key={i}>
            {a.patientName} – {a.date} @ {a.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAppointmentsScreen;
