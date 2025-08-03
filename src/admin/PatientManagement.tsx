import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './PatientManagement.css';

type Patient = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState<Partial<Patient>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = localStorage.getItem('token');

  // ✅ Fetch patient list
  const fetchPatients = () => {
    fetch(`${API_BASE_URL}/patients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPatients(data.data))
      .catch((err) => console.error('Failed to fetch patients:', err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update patient
  const handleSubmit = () => {
    if (editingId !== null) {
      fetch(`${API_BASE_URL}/patients/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to update patient');
          return res.json();
        })
        .then(() => {
          setEditingId(null);
          setForm({});
          fetchPatients();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (pat: Patient) => {
    setForm(pat);
    setEditingId(pat.id);
  };

  // ✅ Delete patient
  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;

    fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete patient');
        fetchPatients();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="patient-management">
      <h2>👤 Patients</h2>

      <div className="form-container">
        <input
          name="name"
          placeholder="Name"
          value={form.name || ''}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age || ''}
          onChange={handleChange}
          type="number"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email || ''}
          onChange={handleChange}
        />
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
              <button onClick={() => handleEdit(pat)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(pat.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManagement;
