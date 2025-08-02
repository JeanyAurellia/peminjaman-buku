import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from './data/db';

import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import Peminjaman from './pages/user/Peminjaman';
import Library from './pages/user/Library';
import Register from './pages/user/Register';
import AllBook from './pages/user/AllBook';
import DetailBuku from './pages/user/DetailBuku';
import ForgotPw from './pages/ForgotPw';
import Users from './pages/admin/AdminUsers';
import AdminBooks from './pages/admin/AdminBooks';
import AdminBorrowed from './pages/admin/AdminBorrowed';

function App() {
  useEffect(() => {
    const loadData = async () => {
      // Load buku
      const bukuCount = await db.buku.count();
      if (bukuCount === 0) {
        try {
          const response = await fetch('/books.json');
          const books = await response.json();
          await db.buku.bulkAdd(books);
          console.log('✅ Buku berhasil dimuat ke IndexedDB');
        } catch (err) {
          console.error('❌ Gagal memuat data buku:', err);
        }
      }

      // Load peminjaman
      const pinjamCount = await db.peminjaman.count();
      if (pinjamCount === 0) {
        try {
          const response = await fetch('/peminjaman.json');
          const pinjamData = await response.json();
          await db.peminjaman.bulkAdd(pinjamData);
          console.log('✅ Peminjaman berhasil dimuat ke IndexedDB');
        } catch (err) {
          console.error('❌ Gagal memuat data peminjaman:', err);
        }
      }
    };

    loadData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path='/admin/users' element={<Users />} />
      <Route path='/admin/books' element={<AdminBooks />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/detailbuku/:id" element={<DetailBuku />} />
      <Route path="/peminjaman/:id" element={<Peminjaman />} />
      <Route path="/library" element={<Library />} />
      <Route path="/register" element={<Register />} />
      <Route path="/allbook" element={<AllBook />} />
      <Route path="/forgot-password" element={<ForgotPw />} />
      <Route path="/admin/dipinjam" element={<AdminBorrowed />} />
    </Routes>
  );
}

window.db = db; 

export default App;
