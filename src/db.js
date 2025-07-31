// src/db.js
import Dexie from 'dexie';

export const db = new Dexie('LibraryDB');

// Definisikan tabel dan relasi
db.version(1).stores({
  users: '++id, nama, password, email',
  buku: '++id, nama, penulis',
  peminjaman: '++id, buku_id, users_id, tanggal_pinjam, tanggal_kembali, status_peminjaman'
});
