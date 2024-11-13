import React from 'react';
import { Link } from 'react-router-dom';
import { Film, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Film className="h-6 w-6" />
          <span>MovieBox</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}