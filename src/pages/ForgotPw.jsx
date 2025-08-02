import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/db';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!username || !email || !newPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Gagal',
        text: 'Semua field harus diisi!',
        customClass: {
          popup: 'dark:bg-[#2A3944] dark:text-white',
        },
      });
      return;
    }

    const user = await db.users
      .where("nama")
      .equals(username)
      .and(u => u.email === email)
      .first();

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Data Tidak Ditemukan',
        text: 'Username atau email salah. Silakan coba lagi.',
        customClass: {
          popup: 'dark:bg-[#2A3944] dark:text-white',
        },
      });
      return;
    }

    await db.users.update(user.id, { password: newPassword });

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Password berhasil diubah.',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'dark:bg-[#2A3944] dark:text-white',
      },
    }).then(() => navigate('/'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#263B56] to-[#DCC4D2] flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-sm z-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
            type={showPassword ? 'text' : 'password'}
            placeholder="Password Baru"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 bg-transparent p-0 m-0 focus:outline-none"
          >
            <Icon
              icon={showPassword ? "fluent:eye-off-16-regular" : "iconoir:eye"}
              width="20"
              height="20"
              style={{ color: '#000' }}
            />
          </button>
        </div>

        <button
          onClick={handleResetPassword}
          className="w-full bg-[#0E1F2F] text-white font-bold py-2 rounded-full hover:bg-[#85A5D3] transition"
        >
          Reset Password
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 bg-transparent border border-white text-white font-semibold py-2 rounded-full hover:bg-white hover:text-[#0E1F2F] transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
