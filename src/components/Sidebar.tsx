import React from 'react';
import { sidebarNavLinks } from '../constants/sidebar-nav-links';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';

const Sidebar = ({ userRole = "instructor" }: { userRole?: "admin" | "instructor" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className='relative'>
      {/* Toggler Button (Visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-16 left-4 z-50 bg-gray-900 text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-8 left-0 h-screen w-64 bg-gray-900 text-gray-200 px-4 py-6 rounded-tr-lg rounded-br-lg shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <ul className="space-y-2 mt-6 py-8">
          {sidebarNavLinks
            .filter(link => link.role.includes(userRole))
            .map(link => {
              const Icon = link.icon;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    state={{ from: link.from }}
                    onClick={() => setIsOpen(false)} // Close sidebar on link click
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

      {/* Backdrop (only visible when sidebar is open on small devices) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
