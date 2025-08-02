// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../../data/db";
import Navbar from "../../components/NavbarAdmin";

function DashboardAdmin() {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [borrowedCount, setBorrowedCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const users = await db.users.toArray();
      const books = await db.buku.toArray();
      const borrowed = await db.peminjaman
        .where("status_peminjaman")
        .equals("tidak tersedia")
        .toArray();

      setUserCount(users.length);
      setBookCount(books.length);
      setBorrowedCount(borrowed.length);
    };

    fetchCounts();
  }, []);

  return (
    <Navbar>
      <div className="space-y-6 min-h-screen p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#2A3944] p-6 rounded shadow text-center">
            <p className="text-[#A9BDC8]">Total User</p>
            <h2 className="text-xl font-bold text-[#E2CAD8]">{userCount}</h2>
          </div>
          <div className="bg-[#2A3944] p-6 rounded shadow text-center">
            <p className="text-[#A9BDC8]">Total Buku</p>
            <h2 className="text-xl font-bold text-[#E2CAD8]">{bookCount}</h2>
          </div>
          <div className="bg-[#2A3944] p-6 rounded shadow text-center">
            <p className="text-[#A9BDC8]">Buku Dipinjam</p>
            <h2 className="text-xl font-bold text-[#E2CAD8]">{borrowedCount}</h2>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardAdmin;
