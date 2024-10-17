import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, ChevronDown } from 'lucide-react';

const TopNavigationBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold mr-4">PDF Management</Link>
        <div className="relative">
          <button className="flex items-center">
            <User className="mr-2" />
            {user?.role}
            <ChevronDown className="ml-2" />
          </button>
          <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg">
            <Link to="/publisher" className="block px-4 py-2 hover:bg-gray-200">Publisher</Link>
            <Link to="/user" className="block px-4 py-2 hover:bg-gray-200">User</Link>
            <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-l-md border-none focus:outline-none"
        />
        <button className="bg-blue-600 px-4 py-2 rounded-r-md">
          <Search className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TopNavigationBar;
