import { useState } from 'react';

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
    <div>
      <h2>👤 Patients</h2>
      <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age || ''} onChange={handleChange} type="number" />
      <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
      <button onClick={handleSubmit}>{editingId !== null ? 'Update' : 'Add'} Patient</button>

      <ul>
        {patients.map((pat) => (
          <li key={pat.id}>
            {pat.name} (Age: {pat.age}) – {pat.email}
            <button onClick={() => handleEdit(pat)}>Edit</button>
            <button onClick={() => handleDelete(pat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManagement;
