import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../data/db";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import dayjs from "dayjs";

function DetailBuku() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [statusPeminjaman, setStatusPeminjaman] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const buku = await db.buku.get(Number(id));
      setBook(buku);

      const peminjamanAktif = await db.peminjaman
        .where("buku_id")
        .equals(Number(id))
        .and((p) => p.status_peminjaman === "tersedia")
        .first();

      setStatusPeminjaman(peminjamanAktif ? "Tersedia" : "Tidak Tersedia");
    };

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    fetchBook();
  }, [id]);

  const handlePinjam = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin meminjam buku ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Pinjam",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed && user) {
        const tanggalPinjam = dayjs().format("YYYY-MM-DD");
        const tanggalKembali = dayjs().add(7, "day").format("YYYY-MM-DD");

        // Cari entri peminjaman yang masih tersedia untuk buku ini
        const peminjamanTersedia = await db.peminjaman
          .where("buku_id")
          .equals(Number(id))
          .and((p) => p.status_peminjaman === "tersedia")
          .first();

        if (peminjamanTersedia) {
          // Update entri peminjaman yang tersedia
          await db.peminjaman.update(peminjamanTersedia.id, {
            users_id: user.id,
            tanggal_pinjam: tanggalPinjam,
            tanggal_kembali: tanggalKembali,
            status_peminjaman: "tidak tersedia",
          });

          setStatusPeminjaman("Tidak Tersedia");

          Swal.fire("Berhasil!", "Buku berhasil dipinjam.", "success");
        } else {
          Swal.fire("Gagal", "Buku ini sudah dipinjam oleh orang lain.", "error");
        }
      }
    });
  };


  if (!book || !user) return <div>Loading...</div>;

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

            <p
              className={`mt-4 font-semibold ${
                statusPeminjaman === "Tersedia" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusPeminjaman}
            </p>

            <button
              className={`mt-4 px-4 py-2 rounded text-white ${
                statusPeminjaman === "Tersedia"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handlePinjam}
              disabled={statusPeminjaman !== "Tersedia"}
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
