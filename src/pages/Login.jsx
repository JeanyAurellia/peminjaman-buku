import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../db';
import { Icon } from '@iconify/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Lengkapi data!',
        text: 'Email dan password harus diisi.',
      });
      return;
    }

    const user = await db.users
      .where('email')
      .equals(email)
      .and((u) => u.password === password)
      .first();

    if (user) {
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: `Selamat datang, ${user.nama}`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (user.email === 'admin@example.com') {
          navigate('/dashboardadmin');
        } else {
          navigate('/dashboard');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal!',
        text: 'Email atau password salah.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#263B56] to-[#DCC4D2] flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-sm z-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pr-10 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-black text-sm bg-transparent p-0 m-0 focus:outline-none"
          >
            {showPassword ? (
              <Icon icon="fluent:eye-off-16-regular" width="20" height="20" style={{ color: '#000' }} />
            ) : (
              <Icon icon="iconoir:eye" width="20" height="20" style={{ color: '#000' }} />
            )}
          </button>

        </div>

        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-white" />
            Remember me
          </label>
          <a href="#" className="hover:underline">Forgot password?</a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#0E1F2F] text-white font-bold py-2 rounded-full hover:bg-[#85A5D3] transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account? <a href="/register" className="underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
