// src/pages/BlogList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blogs', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(res => setBlogs(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Blog Posts</h1>
      <div className="space-y-3">
        {Array.isArray(blogs) && blogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold text-lg">{blog.title}</h2>
            <p className="text-sm text-gray-600">by {blog.author.name}</p>
            <p className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
