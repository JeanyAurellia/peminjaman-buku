import { useEffect, useState } from "react";
import { db } from "../data/db";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);
  const [peminjaman, setPeminjaman] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const fetchData = async () => {
      const allBooks = await db.buku.toArray();
      const fetchedBooks = allBooks.filter((b) => b.popular === true);
      const fetchedPeminjaman = await db.peminjaman.toArray();
      setPopularBooks(fetchedBooks);
      setPeminjaman(fetchedPeminjaman);
    };

    fetchData();
  }, []);

  const cekKetersediaan = (bukuId) => {
    const tersedia = peminjaman.find(
      (p) => p.buku_id === bukuId && p.status_peminjaman === "tersedia"
    );
    return tersedia ? "Tersedia" : "Tidak Tersedia";
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Navbar>
      <div className="bg-[#F1F7F7] p-6 rounded-xl mb-6 flex justify-center items-center max-w-3xl mx-auto">
        <span className="text-2xl font-semibold text-gray-700">
          Hai, {user.nama}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Popular</h2>

      <div className="px-8 grid grid-cols-4 gap-6">
        {popularBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/detailbuku/${book.id}`)}
          >
            <img
              src={book.gambar}
              alt={book.nama}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-md font-semibold text-gray-800">{book.nama}</h3>
            <p className="text-sm text-gray-600">{book.penulis}</p>
            <p
              className={`text-xs mt-1 font-medium ${
                cekKetersediaan(book.id) === "Tersedia"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {cekKetersediaan(book.id)}
            </p>
          </div>
        ))}
      </div>
    </Navbar>
  );
}

export default Dashboard;
