import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { FaUserShield } from "react-icons/fa";
import showSwal from "../utils/swal";

function NavbarAdmin({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("user");
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    const result = await showSwal({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari akun admin.",
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

  return (
    <div className="relative min-h-screen bg-[#0D1C2E] text-white">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-60 bg-[#26425D] p-6 flex flex-col justify-between">
        <div>
          <h1 className="flex flex-col items-center text-2xl font-bold mb-8 text-[#E2CAD8]">Admin Panel</h1>
          <div className="flex flex-col items-center mb-6">
            <FaUserShield className="text-6xl mb-2 text-gray-300" />
            <span className="font-semibold text-lg text-[#E2CAD8]">
              {admin ? admin.nama : "Admin"}
            </span>
          </div>

          <ul className="space-y-4 text-md text-[#E2CAD8]">
            <li
              onClick={() => navigate("/admin")}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md ${
                isActive("/admin")
                  ? "bg-[#555879] text-white font-semibold"
                  : "hover:bg-[#2e3b55]"
              }`}
            >
              <Icon icon="material-symbols:dashboard-outline" width="20" height="20" />
              Dashboard
            </li>
            <li
              onClick={() => navigate("/admin/users")}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md ${
                isActive("/admin/users")
                  ? "bg-[#555879] text-white font-semibold"
                  : "hover:bg-[#2e3b55]"
              }`}
            >
              <Icon icon="mdi:account-group-outline" width="20" height="20" />
              Users
            </li>
            <li
              onClick={() => navigate("/admin/books")}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md ${
                isActive("/admin/books")
                  ? "bg-[#555879] text-white font-semibold"
                  : "hover:bg-[#2e3b55]"
              }`}
            >
              <Icon icon="mdi:book-multiple-outline" width="20" height="20" />
              Books
            </li>
            <li
              onClick={() => navigate("/admin/dipinjam")}
              className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md ${
                isActive("/admin/dipinjam")
                  ? "bg-[#555879] text-white font-semibold"
                  : "hover:bg-[#2e3b55]"
              }`}
            >
              <Icon icon="mdi:book-clock-outline" width="20" height="20" />
              Dipinjam
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#555879] hover:bg-[#444563] text-white font-medium px-4 py-2 rounded"
        >
          <Icon icon="ri:logout-box-line" width="24" height="24" />
          Logout
        </button>
      </aside>

      {/* Konten utama */}
      <div className="ml-60">
        <div className="h-16 flex items-center justify-end px-6 bg-[#26425D]">
          <p className="text-sm">Selamat datang, Admin</p>
        </div>
        <main className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default NavbarAdmin;
