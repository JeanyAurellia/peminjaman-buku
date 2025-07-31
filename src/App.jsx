import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { db } from './data/db'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardAdmin from './pages/DashboardAdmin'
import Peminjaman from './pages/Peminjaman'
import Library from './pages/Library'
import Register from './pages/Register'
import ImageChecker from './pages/ImageChecker'

function App() {
  useEffect(() => {
    const loadBooks = async () => {
      const count = await db.buku.count();
      if (count === 0) {
        try {
          const response = await fetch('/books.json');
          const books = await response.json();
          await db.buku.bulkAdd(books);
          console.log('✅ Buku berhasil dimuat ke IndexedDB');
        } catch (err) {
          console.error('❌ Gagal memuat data buku:', err);
        }
      }
    };

    loadBooks();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboardadmin" element={<DashboardAdmin />} />
      <Route path="/peminjaman" element={<Peminjaman />} />
      <Route path="/library" element={<Library />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ImageChecker" element={<ImageChecker />} />
    </Routes>
  );
}

export default App;
