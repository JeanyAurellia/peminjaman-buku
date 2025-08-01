import { useEffect, useState } from "react";
import { db } from "../../data/db";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

function AllBook() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Semua");
  const [bookStatusMap, setBookStatusMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await db.buku.toArray();
      setBooks(allBooks);
      setFilteredBooks(allBooks);

      const uniqueGenres = Array.from(new Set(allBooks.map((b) => b.genre)));
      setGenres(uniqueGenres);

      const dipinjam = await db.peminjaman
        .where("status_peminjaman")
        .equals("tidak tersedia")
        .toArray();

      const statusMap = {};
      allBooks.forEach((book) => {
        const isDipinjam = dipinjam.some((p) => p.buku_id === book.id);
        statusMap[book.id] = isDipinjam ? "Tidak Tersedia" : "Tersedia";
      });

      setBookStatusMap(statusMap);
    };

    fetchBooks();
  }, []);

  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === "Semua") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.genre === genre));
    }
  };

  return (
    <Navbar>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">All Book</h2>

        {/* Filter Genre */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => handleFilter("Semua")}
            className={`px-4 py-2 rounded-full border ${
              selectedGenre === "Semua"
                ? "bg-[#555879] text-white"
                : "bg-white dark:bg-[#E2CAD8] text-[#555879] dark:text-[#555879] border-[#555879]"
            }`}
          >
            Semua
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleFilter(genre)}
              className={`px-4 py-2 rounded-full border ${
                selectedGenre === genre
                ? "bg-[#555879] text-white"
                : "bg-white dark:bg-[#E2CAD8] text-[#555879] dark:text-[#555879] border-[#555879]"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Buku */}
        <div className="grid grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-[#2A3944] rounded-lg shadow p-3 cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/detailbuku/${book.id}`)}
            >
              <img
                src={book.gambar}
                alt={book.nama}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-gray-800 dark:text-white">{book.nama}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{book.penulis}</p>
              <p
                className={`text-xs font-medium mt-1 ${
                  bookStatusMap[book.id] === "Tersedia"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {bookStatusMap[book.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
}

export default AllBook;
