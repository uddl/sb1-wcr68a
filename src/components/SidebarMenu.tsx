import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarMenu: React.FC = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPDFManagementOpen, setIsPDFManagementOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const togglePDFManagement = () => setIsPDFManagementOpen(!isPDFManagementOpen);
  const toggleUserManagement = () => setIsUserManagementOpen(!isUserManagementOpen);

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <ul className="list-none p-0">
        <li>
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700"
            onClick={toggleDashboard}
          >
            <span>Dashboard</span>
            {isDashboardOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          {isDashboardOpen && (
            <ul className="list-none p-0 pl-4">
              <li>
                <Link to="/dashboard/overview" className="block p-2 hover:bg-gray-700">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard/stats" className="block p-2 hover:bg-gray-700">
                  Stats
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700"
            onClick={togglePDFManagement}
          >
            <span>PDF Management</span>
            {isPDFManagementOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          {isPDFManagementOpen && (
            <ul className="list-none p-0 pl-4">
              <li>
                <Link to="/pdf/upload" className="block p-2 hover:bg-gray-700">
                  Upload PDF
                </Link>
              </li>
              <li>
                <Link to="/pdf/list" className="block p-2 hover:bg-gray-700">
                  List PDFs
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700"
            onClick={toggleUserManagement}
          >
            <span>User Management</span>
            {isUserManagementOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          {isUserManagementOpen && (
            <ul className="list-none p-0 pl-4">
              <li>
                <Link to="/users/list" className="block p-2 hover:bg-gray-700">
                  List Users
                </Link>
              </li>
              <li>
                <Link to="/users/add" className="block p-2 hover:bg-gray-700">
                  Add User
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
