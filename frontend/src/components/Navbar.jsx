
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold ">RBAC Blog</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
            <span className="text-sm">Hello, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded text-sm">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
