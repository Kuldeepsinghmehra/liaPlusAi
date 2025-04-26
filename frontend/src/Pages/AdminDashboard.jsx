// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchBlogs = () => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchBlogs(), []);

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/blogs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', content: '' });
      fetchBlogs();
    } catch (err) {
      alert('Failed to create blog',err);
    }
  };

  const deleteBlog = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={createBlog} className="mb-6 bg-white p-4 rounded shadow space-y-2">
        <input name="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full px-3 py-2 border rounded" />
        <textarea name="content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content" className="w-full px-3 py-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Blog</button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Existing Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id} className="bg-white p-4 shadow rounded mb-3 flex justify-between">
          <div>
            <h3 className="font-medium">{blog.title}</h3>
            <p className="text-sm text-gray-600">by {blog.author.name}</p>
          </div>
          <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
