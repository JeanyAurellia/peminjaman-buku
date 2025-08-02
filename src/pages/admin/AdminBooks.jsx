import { useEffect, useState } from "react";
import { db } from "../../data/db";
import Navbar from "../../components/NavbarAdmin";
import Swal from "sweetalert2";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ nama: "", penulis: "", genre: "", deskripsi: "", gambar: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const allBooks = await db.buku.toArray();
    setBooks(allBooks);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nama || !form.penulis || !form.genre || !form.deskripsi) {
      return Swal.fire("Lengkapi semua field!", "", "warning");
    }

    if (editId) {
      await db.buku.update(editId, form);
      Swal.fire("Diperbarui!", "Data buku berhasil diperbarui.", "success");
    } else {
      await db.buku.add(form);
      Swal.fire("Berhasil!", "Buku baru ditambahkan.", "success");
    }

    setForm({ nama: "", penulis: "", genre: "", deskripsi: "", gambar: "" });
    setEditId(null);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus buku?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await db.buku.delete(id);
      Swal.fire("Dihapus!", "Buku berhasil dihapus.", "success");
      fetchBooks();
    }
  };

  return (
    <Navbar>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Kelola Buku</h2>

        {/* Form Tambah/Edit */}
        <div className="bg-[#1f2a38] p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">{editId ? "Edit Buku" : "Tambah Buku"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Judul Buku"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="penulis"
              value={form.penulis}
              onChange={handleChange}
              placeholder="Penulis"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="gambar"
              value={form.gambar}
              onChange={handleChange}
              placeholder="URL Gambar"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsi"
              className="p-2 rounded bg-gray-700 text-white col-span-full"
              rows={3}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            {editId ? "Simpan Perubahan" : "Tambah Buku"}
          </button>
        </div>

        {/* Tabel Buku */}
        <div className="bg-[#1f2a38] p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Daftar Buku</h3>
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2">Judul</th>
                <th className="py-2">Penulis</th>
                <th className="py-2">Genre</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Belum ada buku.
                  </td>
                </tr>
              ) : (
                books.map((buku) => (
                  <tr key={buku.id} className="border-b border-gray-700">
                    <td className="py-2">{buku.nama}</td>
                    <td className="py-2">{buku.penulis}</td>
                    <td className="py-2">{buku.genre}</td>
                    <td className="py-2 flex gap-3">
                      <button
                        onClick={() => handleEdit(buku)}
                        className="bg-[#E2CAD8] hover:bg-[#BA82A3] px-3 py-1 rounded text-sm text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(buku.id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
}

export default AdminBooks;
