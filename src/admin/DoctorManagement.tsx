import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './DoctorManagement.css';

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  email: string;
};

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Partial<Doctor>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ Fetch all doctors
  const fetchDoctors = () => {
    fetch(`${API_BASE_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data.data))
      .catch((err) => console.error('Failed to fetch doctors:', err));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit form for update/save
const handleSubmit = () => {
  const token = localStorage.getItem('token');
  const method = editingId !== null ? 'PUT' : 'POST';
  const url = editingId !== null
    ? `${API_BASE_URL}/doctors/${editingId}`
    : `${API_BASE_URL}/doctors`;

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(form),
  })
    .then((res) => {
      if (!res.ok) throw new Error(editingId ? 'Failed to update doctor' : 'Failed to create doctor');
      return res.json();
    })
    .then(() => {
      setEditingId(null);
      setForm({});
      fetchDoctors();
    })
    .catch((err) => console.error(err));
};



  const handleEdit = (doc: Doctor) => {
    setForm(doc);
    setEditingId(doc.id);
  };

  // ✅ Delete doctor
const handleDelete = (id: number) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('Are you sure you want to delete this doctor?')) return;

  fetch(`${API_BASE_URL}/doctors/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to delete doctor');
      fetchDoctors();
    })
    .catch((err) => console.error(err));
};


  return (
    <div className="doctor-management">
      <h2>🩺 Doctors</h2>

      <div className="form-container">
        <input
          name="name"
          placeholder="Name"
          value={form.name || ''}
          onChange={handleChange}
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization || ''}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email || ''}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update' : 'Add'} Doctor
        </button>
      </div>

      <ul className="doctor-list">
        {doctors.map((doc) => (
          <li key={doc.id} className="doctor-item">
            <div className="doctor-info">
              <span className="name">{doc.name}</span>
              <span className="specialty">{doc.specialization}</span>
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
