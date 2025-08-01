import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaUserCircle } from 'react-icons/fa';
import showSwal from "../utils/swal";

function Navbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);
  
  const handleLogout = async () => {
    const result = await showSwal({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari akun ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const isActive = (path) => location.pathname === path;

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isNowDark = !darkMode;
    setDarkMode(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");

    if (isNowDark) html.classList.add("dark");
    else html.classList.remove("dark");
  };

  return (
    <div className="relative min-h-screen bg-[#DDD3D3] dark:bg-[#0D1C2E] dark:text-white">
      {/* Sidebar tetap */}
      <aside className="fixed top-0 left-0 h-screen w-60 bg-[#F1F7F7] dark:bg-[#26425D] p-6 flex flex-col justify-between">
        <div>
          <h1 className="flex flex-col items-center text-2xl font-bold mb-8 text-black dark:text-[#E2CAD8]">MyBook</h1>
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-6xl mb-2 text-gray-600 dark:text-gray-300" />
            <span className="font-semibold text-lg text-black dark:text-[#E2CAD8]">
              {user ? user.nama : 'User'}
            </span>
          </div>

          <ul className="space-y-4 text-md text-black dark:text-[#E2CAD8]">
            <li
              onClick={() => navigate('/dashboard')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/dashboard') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200 dark:hover:bg-[#2e3b55]'}
              `}
            >
              <Icon icon="material-symbols:home" width="20" height="20" />
              Home
            </li>
            <li
              onClick={() => navigate('/allbook')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/allbook') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200 dark:hover:bg-[#2e3b55]'}
              `}
            >
              <Icon icon="mdi:book-outline" width="20" height="20" />
              All Book
            </li>
            <li
              onClick={() => navigate('/library')}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md
                ${isActive('/library') ? 'bg-[#555879] text-white font-semibold' : 'hover:bg-gray-200 dark:hover:bg-[#2e3b55]'}
              `}
            >
              <Icon icon="ion:library-outline" width="20" height="20" />
              Library
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#555879] hover:bg-[#444563] text-white font-medium px-4 py-2 rounded"
        >
          <Icon icon="ri:logout-box-line" width="24" height="24"  style={{color: 'fff'}} />
          Logout
        </button>
      </aside>

      {/* Konten dan topbar */}
      <div className="ml-60">
        {/* Topbar */}
        <div className="bg-[#F1F7F7] dark:bg-[#26425D] h-16 flex items-center justify-end px-6">
          <button onClick={toggleDarkMode} className="bg-transparent p-1 rounded focus:outline-none">
            <Icon
              icon={darkMode ? "mdi:white-balance-sunny" : "radix-icons:moon"}
              className="w-5 h-5 cursor-pointer text-black dark:text-white"
            />
          </button>
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
