import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null); 

  const fetchBlogs = () => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchBlogs(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editingId) {
        // Update blog
        await axios.put(`/api/blogs/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new blog
        await axios.post('/api/blogs', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error('Failed to submit blog', err);
      alert('Failed to submit blog');
    }
  };

  const deleteBlog = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog', err);
      alert('Failed to delete blog');
    }
  };

  const startEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content });
    setEditingId(blog._id);
  };

  const cancelEdit = () => {
    setForm({ title: '', content: '' });
    setEditingId(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
          className="w-full px-4 py-2 border rounded"
          rows="5"
          required
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            {editingId ? 'Update Blog' : 'Create Blog'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Existing Blogs</h2>
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 shadow rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">{blog.title}</h3>
              <p className="text-sm text-gray-500">by {blog.author?.name || 'Unknown'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(blog)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
