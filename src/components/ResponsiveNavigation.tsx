import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const ResponsiveNavigation: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold mr-4">PDF Management</Link>
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>
      <div className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:items-center`}>
        <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
        <Link to="/pdfs" className="block px-4 py-2 hover:bg-gray-700">PDFs</Link>
        <Link to="/users" className="block px-4 py-2 hover:bg-gray-700">Users</Link>
        <button onClick={logout} className="block px-4 py-2 hover:bg-gray-700">Logout</button>
      </div>
    </div>
  );
};

export default ResponsiveNavigation;
