import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../data/db";
import Navbar from "../components/Navbar";

function DetailBuku() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const buku = await db.buku.get(Number(id));
      setBook(buku);
    };

    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Navbar>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.gambar}
            alt={book.nama}
            className="w-full md:w-60 h-80 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{book.nama}</h2>
            <p className="text-gray-600 mt-1">Penulis: {book.penulis}</p>
            <p className="text-gray-600 mt-1">Genre: {book.genre}</p>
            <p className="text-gray-700 mt-4">{book.deskripsi}</p>

            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate(`/peminjaman/${book.id}`)}
            >
              Pinjam
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default DetailBuku;
