import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();  // get blog id from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 leading-relaxed">
      <div className="max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-4 text-center">{blog.title}</h1>

        <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
          <p>by {blog.author.name} • {formatDate(blog.createdAt)}</p>
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
