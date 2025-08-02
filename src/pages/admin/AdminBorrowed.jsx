// pages/AdminBorrowed.jsx
import { useEffect, useState } from "react";
import { db } from "../../data/db";
import Navbar from "../../components/NavbarAdmin";

function AdminBorrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const pinjamans = await db.peminjaman
        .where("status_peminjaman")
        .equals("tidak tersedia")
        .toArray();

      const enriched = await Promise.all(
        pinjamans.map(async (p) => {
          const buku = await db.buku.get(p.buku_id);
          const user = await db.users.get(p.users_id);
          return {
            ...p,
            bukuNama: buku?.nama || "-",
            userNama: user?.nama || "-",
            tanggal_kembali: p.tanggal_kembali,
          };
        })
      );

      setBorrowedBooks(enriched);
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <Navbar>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Buku yang Dipinjam</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600">
            <thead className="bg-[#1E2B3A] text-white">
              <tr>
                <th className="py-2 px-4 border">Judul Buku</th>
                <th className="py-2 px-4 border">Dipinjam Oleh</th>
                <th className="py-2 px-4 border">Tanggal Kembali</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((item, index) => (
                <tr key={index} className="bg-[#2C3A4A] text-white">
                  <td className="py-2 px-4 border">{item.bukuNama}</td>
                  <td className="py-2 px-4 border">{item.userNama}</td>
                  <td className="py-2 px-4 border">{item.tanggal_kembali}</td>
                </tr>
              ))}
              {borrowedBooks.length === 0 && (
                <tr className="text-white text-center">
                  <td colSpan="3" className="py-4">Tidak ada data peminjaman.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
}

export default AdminBorrowed;
