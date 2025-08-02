import { useEffect, useState } from "react";
import { db } from "../../data/db";
import Navbar from "../../components/NavbarAdmin";
import Swal from "sweetalert2";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nama: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const allUsers = await db.users.toArray();
    setUsers(allUsers);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.password) {
      return Swal.fire("Lengkapi semua field!", "", "warning");
    }

    if (editId) {
      await db.users.update(editId, form);
      Swal.fire("Diperbarui!", "Data user berhasil diperbarui.", "success");
    } else {
      const existing = await db.users
        .where("email")
        .equals(form.email)
        .or("nama")
        .equals(form.nama)
        .first();

      if (existing) {
        return Swal.fire("Gagal", "User dengan email/nama tersebut sudah ada", "error");
      }

      await db.users.add(form);
      Swal.fire("Berhasil!", "User baru ditambahkan.", "success");
    }

    setForm({ nama: "", email: "", password: "" });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ nama: user.nama, email: user.email, password: user.password });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await db.users.delete(id);
      Swal.fire("Dihapus!", "User berhasil dihapus.", "success");
      fetchUsers();
    }
  };

  return (
    <Navbar>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Kelola Pengguna</h2>

        {/* Form Tambah/Edit */}
        <div className="bg-[#1f2a38] p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">{editId ? "Edit User" : "Tambah User"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            {editId ? "Simpan Perubahan" : "Tambah"}
          </button>
        </div>

        {/* Tabel User */}
        <div className="bg-[#1f2a38] p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Daftar User</h3>
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2">Nama</th>
                <th className="py-2">Email</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Belum ada user.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-700">
                    <td className="py-2">{u.nama}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2 flex gap-3">
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-[#E2CAD8] hover:bg-[#BA82A3] px-3 py-1 rounded text-sm text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
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

export default AdminUsers;
