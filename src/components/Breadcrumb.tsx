import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="bg-gray-200 p-3 rounded">
      <ol className="list-reset flex text-grey-dark">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={to} className="text-blue-600 hover:underline">
                {value}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
