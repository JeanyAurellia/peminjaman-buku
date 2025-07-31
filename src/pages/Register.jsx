import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/db';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !email) {
      Swal.fire({
        icon: 'warning',
        title: 'Pendaftaran Gagal',
        text: 'Semua field harus diisi!',
      });
      return;
    }

    const existing = await db.users
      .where("email")
      .equals(email)
      .or("nama")
      .equals(username)
      .first();

    if (existing) {
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: 'Username atau Email sudah terdaftar!',
      });
      return;
    }

    await db.users.add({
      nama: username,
      password,
      email,
    });

    Swal.fire({
      icon: 'success',
      title: 'Registrasi Berhasil',
      text: 'Akun berhasil dibuat. Silakan login.',
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate('/');
    });
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#263B56] to-[#DCC4D2] flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-sm z-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
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

        <button
          onClick={handleRegister}
          className="w-full bg-[#0E1F2F] text-white font-bold py-2 rounded-full hover:bg-[#85A5D3] transition"
        >
          Register
        </button>

        <button
          onClick={handleBackToLogin}
          className="w-full mt-4 bg-transparent border border-white text-white font-semibold py-2 rounded-full hover:bg-white hover:text-[#0E1F2F] transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
