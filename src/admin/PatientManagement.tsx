import { useState } from 'react';
import './PatientManagement.css';

type Patient = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  ]);
  const [form, setForm] = useState<Partial<Patient>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setPatients(patients.map(p => (p.id === editingId ? { ...(p as Patient), ...form } : p)));
    } else {
      const newPatient: Patient = {
        id: Date.now(),
        name: form.name || '',
        age: Number(form.age) || 0,
        email: form.email || '',
      };
      setPatients([...patients, newPatient]);
    }
    setForm({});
    setEditingId(null);
  };

  const handleEdit = (pat: Patient) => {
    setForm(pat);
    setEditingId(pat.id);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="patient-management">
      <h2>👤 Patients</h2>

      <div className="form-container">
        <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age || ''} onChange={handleChange} type="number" />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update' : 'Add'} Patient
        </button>
      </div>

      <ul className="patient-list">
        {patients.map((pat) => (
          <li key={pat.id} className="patient-item">
            <div className="patient-info">
              <span className="name">{pat.name}</span>
              <span className="age">Age: {pat.age}</span>
              <span className="email">{pat.email}</span>
            </div>
            <div className="patient-actions">
              <button onClick={() => handleEdit(pat)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(pat.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManagement;
