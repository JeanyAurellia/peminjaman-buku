import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaUserCircle } from 'react-icons/fa';

function Navbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative min-h-screen bg-[#DDD3D3]">
      {/* Sidebar tetap */}
      <aside className="fixed top-0 left-0 h-screen w-60 bg-[#F1F7F7] p-6 flex flex-col justify-between">
        <div>
          <h1 className="flex flex-col items-center text-2xl font-bold mb-8 text-black">MyBook</h1>
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-6xl mb-2 text-gray-600" />
            <span className="font-semibold text-lg text-black">
              {user ? user.nama : 'User'}
            </span>
          </div>

          <ul className="space-y-4 text-md text-black">
            <li
              onClick={() => navigate('/dashboard')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/dashboard') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200'}
              `}
            >
              <Icon icon="material-symbols:home" width="20" height="20" />
              Home
            </li>
            <li
              onClick={() => navigate('/allbook')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/allbook') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200'}
              `}
            >
              <Icon icon="mdi:book-outline" width="20" height="20" />
              All Book
            </li>
            <li
              onClick={() => navigate('/library')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/library') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200'}
              `}
            >
              <Icon icon="ion:library-outline" width="20" height="20" />
              Library
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="bg-[#555879] hover:bg-[#444563] text-white font-medium px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Konten dan topbar */}
      <div className="ml-60">
        {/* Topbar */}
        <div className="bg-[#F1F7F7] h-16 flex items-center justify-end px-6">
          <Icon icon="radix-icons:moon" className="text-black w-5 h-5 cursor-pointer" />
        </div>

        {/* Konten scrollable */}
        <main className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Navbar;
