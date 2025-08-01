import { useState } from 'react';

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
    <div>
      <h2>Add Time Slot</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {slots.map((s, i) => <li key={i}>{s.date} @ {s.time}</li>)}
      </ul>
    </div>
  );
};

export default AddAvailabilityScreen;
