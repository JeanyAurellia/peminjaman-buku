import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../data/db"; // pastikan path ini sesuai dengan lokasi db.js kamu

function Dashboard() {
  const [user, setUser] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const allBooks = await db.buku.toArray();
        const filtered = allBooks.filter(book => book.popular === true).slice(0, 8);
        setPopularBooks(filtered);
      } catch (error) {
        console.error("❌ Gagal mengambil buku populer:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <Navbar>
      {/* Salam */}
      <div className="bg-[#F1F7F7] p-6 rounded-xl mb-6 flex justify-center items-center max-w-3xl mx-auto">
        <span className="text-2xl font-semibold text-gray-700">
          Hai, {user.nama}
        </span>
      </div>

      {/* Judul */}
      <h2 className="flex flex-col items-center text-xl font-semibold text-gray-800 mb-4">Popular</h2>

      {/* Daftar Buku */}
      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={book.gambar}
              alt={book.nama}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-800">{book.nama}</h3>
              <p className="text-sm text-gray-600">by {book.penulis}</p>
            </div>
          </div>
        ))}
      </div>
    </Navbar>
  );
}

export default Dashboard;
