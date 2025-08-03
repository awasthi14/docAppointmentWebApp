import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './DoctorProfileScreen.css';

const DoctorProfileScreen = () => {
  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    specialty: '',
    contact: '',
  });
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem('token') || '';
  let user: any = null; // ✅ Declare outside

useEffect(() => {
  let user: any = null;

  fetch(`${API_BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log('User API data:', data); // 🔍 Inspect response

      // Handle both possible formats
      user = data.data?.user || data.data;

      if (!user || !user.id) {
        throw new Error('User ID not found in response');
      }

      return fetch(`${API_BASE_URL}/doctors/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(res => res.json())
    .then(data => {
      setProfile({
        id: user.id,
        name: user.name,
        specialty: data.data[0].specialization,
        contact: user.email,
      });
    })
    .catch(err => console.error('Failed to load doctor profile:', err));
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(`${API_BASE_URL}/doctors/user/${profile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: profile.name,
        specialization: profile.specialty,
        email: profile.contact,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => {
        setEditing(false);
      })
      .catch(err => console.error('Update failed:', err));
  };

  return (
    <div className="doctor-profile">
      <h2 className="section-title">👨‍⚕️ Doctor Profile</h2>
      {editing ? (
        <div className="form-section">
          <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
          <input name="specialty" value={profile.specialty} onChange={handleChange} placeholder="Specialty" />
          <input name="contact" value={profile.contact} onChange={handleChange} placeholder="Contact" />
          <button className="primary-btn" onClick={handleSubmit}>💾 Save</button>
        </div>
      ) : (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <button className="primary-btn" onClick={() => setEditing(true)}>✏️ Edit</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfileScreen;
