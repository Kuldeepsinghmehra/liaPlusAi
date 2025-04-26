import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios.get('/api/blogs', {
      headers: { 'Cache-Control': 'no-cache' }
    })
    .then(res => setBlogs(res.data))
    .catch(err => console.error(err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8">Our Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(blogs) && blogs.map(blog => {
          const isExpanded = expandedId === blog._id;
          const shouldTruncate = blog.content.length > 120;

          return (
            <div key={blog._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-purple-800 mb-2">{blog.title}</h2>

                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <p>by {blog.author.name}</p>
                  <p>{formatDate(blog.createdAt)}</p>
                </div>

                <p className="text-gray-700 flex-grow">
                  {isExpanded || !shouldTruncate
                    ? blog.content
                    : `${blog.content.slice(0, 120)}...`}
                </p>

                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(blog._id)}
                    className="mt-4 self-start px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
