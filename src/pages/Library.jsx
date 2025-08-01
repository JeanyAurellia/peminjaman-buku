import { useEffect, useState } from "react";
import { db } from "../data/db";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

function Library() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;

      const pinjamans = await db.peminjaman
        .where("users_id")
        .equals(user.id)
        .and((p) => p.status_peminjaman === "tidak tersedia")
        .toArray();

      const promises = pinjamans.map(async (p) => {
        const buku = await db.buku.get(p.buku_id);
        return {
          ...buku,
          tanggal_kembali: p.tanggal_kembali,
          peminjaman_id: p.id,
        };
      });

      const result = await Promise.all(promises);
      setBooks(result);
    };

    fetchBooks();
  }, [user]);

  const handleReturn = async (peminjaman_id) => {
    // Tutup modal dulu
    setSelectedBook(null);

    // Tampilkan SweetAlert konfirmasi
    const result = await Swal.fire({
        title: "Apakah Anda yakin ingin mengembalikan buku ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Kembalikan",
        cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
        await db.peminjaman.update(peminjaman_id, {
        status_peminjaman: "tersedia",
        });

        Swal.fire("Berhasil!", "Buku berhasil dikembalikan.", "success").then(() =>
        setBooks((prev) => prev.filter((b) => b.peminjaman_id !== peminjaman_id))
        );
    }
};


  return (
    <Navbar>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Library</h2>
        <div className="grid grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.gambar}
                alt={book.nama}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-gray-800">{book.nama}</h3>
              <p className="text-sm text-gray-600">{book.penulis}</p>
              <p className="text-xs text-gray-500 mt-1">
                Dikembalikan: {book.tanggal_kembali}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Buku */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl relative">
            {/* Tombol X */}
            <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-2 right-3 p-1 bg-transparent border-none"
            >
                <Icon
                icon="material-symbols:close"
                width="24"
                height="24"
                style={{ color: "#000" }}
                />
            </button>

            {/* Isi Modal */}
            <img
                src={selectedBook.gambar}
                alt={selectedBook.nama}
                className="w-full h-60 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{selectedBook.nama}</h2>
            <p className="text-sm text-gray-600">Penulis: {selectedBook.penulis}</p>
            <p className="text-sm text-gray-600">Genre: {selectedBook.genre}</p>
            <p className="mt-3 text-gray-700">{selectedBook.deskripsi}</p>
            <p className="mt-3 text-sm text-gray-500">
                Tanggal Kembali: {selectedBook.tanggal_kembali}
            </p>
            <div className="mt-5 flex gap-4">
                <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => alert("Fitur baca belum tersedia.")}
                >
                Baca
                </button>
                <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleReturn(selectedBook.peminjaman_id)}
                >
                Kembalikan
                </button>
            </div>
            </div>
        </div>
        )}
    </Navbar>
  );
}

export default Library;
