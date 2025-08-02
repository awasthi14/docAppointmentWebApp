import { useState } from 'react';
import './AddAvailabilityScreen.css';

const AddAvailabilityScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<{ date: string; time: string }[]>([]);

  const handleAdd = () => {
    if (!date || !time) return;
    const exists = slots.find(s => s.date === date && s.time === time);
    if (!exists) setSlots([...slots, { date, time }]);
    setDate('');
    setTime('');
  };

  return (
    <div className="availability-container">
      <h2 className="section-title">📅 Add Availability</h2>

      <div className="form-section">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button onClick={handleAdd}>➕ Add</button>
      </div>

      <div className="slot-list">
        <h3>My Time Slots</h3>
        {slots.length === 0 ? (
          <p className="empty-note">No time slots added.</p>
        ) : (
          <ul>
            {slots.map((s, i) => (
              <li key={i}>{s.date} @ {s.time}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddAvailabilityScreen;
