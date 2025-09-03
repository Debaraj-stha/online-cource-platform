import React from 'react';
import { sidebarNavLinks } from '../constants/sidebar-nav-links';
import ThemeToggler from './ThemeToggler';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole = "instructor" }: { userRole?: "admin" | "instructor" }) => {
  return (
    <aside className="bg-gray-900 text-gray-200 h-screen w-64 rounded-tr-lg rounded-br-lg px-4 py-6 flex flex-col justify-between shadow-lg">
      {/* Links */}
      <ul className="space-y-2">
        {sidebarNavLinks
          .filter(link => link.role.includes(userRole))
          .map(link => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <Link
                  state={{ from: link.from }}
                  to={link.path}
                  className="flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-purple-600 hover:text-white"
                >
                  <Icon />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              </li>
            );
          })}
      </ul>


    </aside>
  );
};

export default Sidebar;
