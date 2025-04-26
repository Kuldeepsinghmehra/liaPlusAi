// // src/components/BlogCard.jsx
// const BlogCard = ({ blog, onDelete }) => {
//     return (
//       <div className="bg-white p-4 shadow rounded mb-3 flex justify-between items-start">
//         <div>
//           <h3 className="font-semibold text-lg">{blog.title}</h3>
//           <p className="text-sm text-gray-500 mb-1">by {blog.author?.name || 'Unknown'}</p>
//           <p className="text-gray-700 text-sm">{blog.content.slice(0, 100)}...</p>
//         </div>
//         {onDelete && (
//           <button
//             onClick={() => onDelete(blog._id)}
//             className="bg-red-500 text-white px-2 py-1 text-sm rounded"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     );
//   };
  
//   export default BlogCard;
  