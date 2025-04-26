// // src/components/ProtectedRoute.jsx
// import { Navigate } from 'react-router-dom';
// import { getUser } from '../utils/auth';

// const ProtectedRoute = ({ children, role }) => {
//   const user = getUser();

//   if (!user) return <Navigate to="/login" />;
//   if (role && user.role !== role) return <Navigate to="/" />;

//   return children;
// };

// export default ProtectedRoute;
