import { useState } from 'react';
import './DoctorManagement.css';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
};

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', email: 'john@example.com' },
  ]);
  const [form, setForm] = useState<Partial<Doctor>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setDoctors(doctors.map(d => (d.id === editingId ? { ...(d as Doctor), ...form } : d)));
    } else {
      const newDoctor: Doctor = {
        id: Date.now(),
        name: form.name || '',
        specialty: form.specialty || '',
        email: form.email || '',
      };
      setDoctors([...doctors, newDoctor]);
    }
    setForm({});
    setEditingId(null);
  };

  const handleEdit = (doc: Doctor) => {
    setForm(doc);
    setEditingId(doc.id);
  };

  const handleDelete = (id: number) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  return (
    <div className="doctor-management">
      <h2>🩺 Doctors</h2>

      <div className="form-container">
        <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} />
        <input name="specialty" placeholder="Specialty" value={form.specialty || ''} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update' : 'Add'} Doctor
        </button>
      </div>

      <ul className="doctor-list">
        {doctors.map((doc) => (
          <li key={doc.id} className="doctor-item">
            <div className="doctor-info">
              <span className="name">{doc.name}</span>
              <span className="specialty">{doc.specialty}</span>
              <span className="email">{doc.email}</span>
            </div>
            <div className="doctor-actions">
              <button onClick={() => handleEdit(doc)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(doc.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorManagement;
