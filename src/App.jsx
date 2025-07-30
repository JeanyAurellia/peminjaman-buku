import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard' // kamu bisa buat ini nanti
import DashboardAdmin from './pages/DashboardAdmin'
import Peminjaman from './pages/Peminjaman'
import Library from './pages/Library'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboardadmin" element={<DashboardAdmin />} />
      <Route path="/peminjaman" element={<Peminjaman />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
}

export default App;
