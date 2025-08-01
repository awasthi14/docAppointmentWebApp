import { useState } from 'react';

const DoctorProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    contact: 'john.doe@example.com',
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Updated profile:', profile);
    setEditing(false);
  };

  return (
    <div>
      <h2>Doctor Profile</h2>
      {editing ? (
        <div>
          <input name="name" value={profile.name} onChange={handleChange} />
          <input name="specialty" value={profile.specialty} onChange={handleChange} />
          <input name="contact" value={profile.contact} onChange={handleChange} />
          <button onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfileScreen;
