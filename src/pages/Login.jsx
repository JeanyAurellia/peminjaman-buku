import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'admin123') {
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: `Selamat datang, ${email}`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/dashboard');
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
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-indigo-900 flex items-center justify-center bg-cover bg-center relative overflow-hidden">

      {/* Card Login */}
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

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setPassword(e.target.value)}
          />
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
          className="w-full bg-white text-purple-800 font-bold py-2 rounded-full hover:bg-purple-200 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account? <a href="#" className="underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
