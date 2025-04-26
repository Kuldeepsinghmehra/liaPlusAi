// src/pages/Signup.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', form);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed!',err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        <select name="role" onChange={handleChange} className="w-full px-3 py-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
