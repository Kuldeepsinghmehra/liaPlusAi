import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', form);
      toast.success('Signup successful!', {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Signup failed! Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Signup
        </button>
      </form>

      {/* Toast Container to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
