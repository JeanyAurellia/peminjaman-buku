import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaUserCircle } from 'react-icons/fa';

function Navbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#F1F7F7] p-6 flex flex-col justify-between">
        <div>
          <h1 className="flex flex-col items-center text-2xl font-bold mb-8 text-black">MyBook</h1>
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-6xl mb-2 text-gray-600" />
            <p className="font-semibold text-lg text-black">User</p>
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
              onClick={() => navigate('/peminjaman')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/peminjaman') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200'}
              `}
            >
              <Icon icon="mdi:book-outline" width="20" height="20" />
              Peminjaman
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

      {/* Konten + Topbar */}
      <div className="flex-1 flex flex-col bg-[#DDD3D3]">
        {/* Topbar */}
        <div className="bg-[#F1F7F7] h-16 flex items-center justify-end px-6">
          <Icon icon="radix-icons:moon" className="text-black w-5 h-5 cursor-pointer" />
        </div>

        {/* Children (isi halaman) */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default Navbar;
