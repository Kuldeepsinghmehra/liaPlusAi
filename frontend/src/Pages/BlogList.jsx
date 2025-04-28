import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blogs', {
      headers: { 'Cache-Control': 'no-cache' }
    })
    .then(res => setBlogs(res.data))
    .catch(err => console.error(err));
  }, []);

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-8">Our Blog Posts</h1>

      {Array.isArray(blogs) && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => {
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
                    {shouldTruncate
                      ? `${blog.content.slice(0, 120)}...`
                      : blog.content}
                  </p>

                  {shouldTruncate && (
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="mt-4 self-start px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No blogs"
            className="w-32 h-32 mb-6 opacity-75"
          />
          <h2 className="text-2xl font-semibold text-gray-600">No Blog Posts Available</h2>
          <p className="text-gray-500 mt-2">Come back later or add some awesome blogs!</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
