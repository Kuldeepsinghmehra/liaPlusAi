// NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <div className="bg-white px-2 text-sm text-black rounded rotate-12 absolute mt-[-4rem]">
        Page Not Found
      </div>
      <p className="mt-5 text-2xl">Oops! Looks like you're lost.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-100 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
