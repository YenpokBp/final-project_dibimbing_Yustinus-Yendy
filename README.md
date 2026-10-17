# OMNI - Physical Game Store Web

Final Project **Full Stack Web Development Bootcamp Dibimbing**.

OMNI adalah website pemesanan game fisik untuk konsol. Pelanggan memilih platform, melihat katalog game yang tersedia, memasukkan produk ke keranjang, lalu membuat pesanan secara online. Pengambilan barang dan pembayaran dilakukan langsung di toko, sehingga website ini tidak menyediakan pengiriman.

## Tujuan Proyek

- Mengembangkan aplikasi full-stack menggunakan React, Express.js, dan MySQL.
- Menerapkan autentikasi serta otorisasi berbasis role untuk admin dan customer.
- Mengelola data produk, kategori, platform, keranjang, pesanan, dan stok.
- Mengintegrasikan frontend dengan API backend.
- Menyediakan laporan penjualan, produk terlaris, dan stok rendah untuk admin.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Autentikasi | JSON Web Token (JWT), bcryptjs |
| Validasi | express-validator |
| Konfigurasi dan middleware | dotenv, CORS, Express middleware |
| Database diagram | Draw.io |

## Arah Desain UI

UI dirancang dengan gaya **Tactical Sci-Fi UI**, terinspirasi dari atmosfer visual karakter Omen di VALORANT. Arah visualnya memakai latar gelap, hitam arang, navy, ungu tua, violet, aksen cahaya biru-ungu, tipografi tegas, panel geometris, dan sudut komponen yang tajam.

Desain tetap mengutamakan keterbacaan, kemudahan navigasi, konsistensi komponen, dan responsivitas. Inspirasi visual digunakan untuk membangun identitas OMNI sendiri, bukan menyalin logo atau aset VALORANT.

## Alur Utama

### Customer

1. Membuka halaman awal dan memilih kartu platform, misalnya PlayStation, Xbox, atau Nintendo.
2. Melihat katalog game yang sesuai dengan platform terpilih.
3. Memilih game dan memasukkannya ke keranjang.
4. Memeriksa keranjang dan melakukan checkout.
5. Pesanan tercatat dengan status `pending`.
6. Datang ke toko untuk mengambil barang dan melakukan pembayaran langsung.
7. Admin mengonfirmasi pembayaran sehingga status berubah menjadi `paid`.

Customer dapat membatalkan pesanan selama statusnya masih `pending`. Pesanan juga dapat dibatalkan oleh admin sesuai aturan sistem.

### Admin

1. Login menggunakan akun dengan role `admin`.
2. Melihat ringkasan penjualan, produk terlaris, dan stok rendah.
3. Mengelola produk, kategori, dan platform.
4. Melihat pesanan, memfilter status atau periode, membuka detail, lalu mengonfirmasi pembayaran atau membatalkan pesanan.

### Status Pesanan

| Status | Arti |
| --- | --- |
| `pending` | Pesanan sudah dibuat dan menunggu pembayaran di toko. |
| `paid` | Pembayaran telah dikonfirmasi oleh admin. |
| `cancelled` | Pesanan dibatalkan oleh customer atau admin sesuai aturan sistem. |

## Fitur dan Status Pengerjaan

Status di bawah merujuk pada file sumber yang tersedia di repository. Keberadaan kode belum berarti seluruh fitur sudah diuji end-to-end.

### Sudah tersedia di backend

- Registrasi customer dan login dengan JWT.
- Password disimpan dalam bentuk hash.
- Middleware autentikasi dan pembatasan akses berdasarkan role.
- Endpoint baca data produk, kategori, dan platform.
- CRUD produk, kategori, dan platform untuk admin, dilengkapi validasi input.
- API keranjang untuk membaca, menambah, mengubah kuantitas, dan menghapus item.
- API checkout, riwayat pesanan, detail pesanan, dan pembatalan pesanan customer.
- API admin untuk melihat pesanan, mengonfirmasi pembayaran, dan membatalkan pesanan.
- Endpoint laporan ringkasan penjualan, produk terlaris, dan stok rendah.
- Validasi query untuk pagination, filter status, filter periode, dan batas jumlah data pada endpoint terkait.

### Sudah ada di frontend

- Halaman login dan registrasi.
- Halaman pemilihan platform dengan kartu platform.
- Katalog game dengan komponen kartu produk serta filter platform dan kategori.
- Integrasi Axios dengan konfigurasi base URL API dan token autentikasi.
- Route proteksi untuk halaman yang dibatasi berdasarkan role.

### Prioritas pekerjaan frontend berikutnya

- Menyelesaikan integrasi dan navigasi dari pilihan platform ke katalog yang difilter.
- Membuat halaman keranjang: daftar item, ubah kuantitas, hapus item, total, dan tombol checkout.
- Membuat alur checkout beserta konfirmasi dan hasil pesanan.
- Membuat riwayat pesanan dengan filter status dan pagination.
- Membuat detail pesanan/struk dan tombol pembatalan khusus status `pending`.
- Mengembangkan admin dashboard berbasis API laporan.
- Membuat halaman CRUD produk, kategori, platform, dan pengelolaan pesanan untuk admin.
- Menyamakan tampilan loading, error, notifikasi, dan empty state.
- Menyempurnakan responsivitas, khususnya pada navigasi dan panel admin.
- Memeriksa kembali routing aplikasi dan melakukan pengujian alur customer serta admin secara menyeluruh.

## Struktur Repository

```text
.
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   ├── db.js
│       │   └── gamevault_db.sql
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── utils/
├── frontend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── utils/
├── final_project.drawio
├── final_project.jpg
└── README.md
```

## Struktur Database

Database yang digunakan bernama `gamevault_db`. Tabel utamanya:

- `users`: data akun, email, password hash, dan role.
- `platforms`: data platform konsol.
- `categories`: kategori game.
- `products`: katalog game, termasuk kategori, platform, harga, stok, dan gambar.
- `carts`: keranjang milik customer.
- `cart_items`: item produk di dalam keranjang beserta kuantitasnya.
- `orders`: transaksi pesanan, pemilik pesanan, status, total, dan waktu pembayaran.
- `order_items`: detail item pada pesanan, termasuk salinan nama produk, harga, kuantitas, dan subtotal.

Diagram database/ERD tersedia dalam file `final_project.drawio` dan `final_project.jpg`.

## Persyaratan Menjalankan Proyek

- Node.js dan npm.
- MySQL yang berjalan secara lokal, misalnya melalui Laragon.
- Browser modern.
- Git, jika repository akan di-clone.

## Instalasi dan Menjalankan Aplikasi

### 1. Siapkan database

1. Jalankan MySQL melalui Laragon atau layanan MySQL yang digunakan.
2. Buat database dengan nama `gamevault_db`.
3. Import file `backend/src/config/gamevault_db.sql` ke database tersebut melalui phpMyAdmin atau MySQL client.
4. Pastikan nama tabel dan koneksi database sesuai dengan konfigurasi backend.

### 2. Konfigurasi dan jalankan backend

Dari root repository:

```bash
cd backend
npm install
```

Salin `backend/.env.example` menjadi `backend/.env`, kemudian sesuaikan nilai konfigurasinya:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gamevault_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=ganti_dengan_secret_acak_yang_kuat
JWT_EXPIRES_IN=1d
```

Jangan mengunggah file `.env` yang berisi kredensial atau secret ke repository publik.

Jalankan backend dalam mode development:

```bash
npm run dev
```

Backend berjalan pada `http://localhost:3000`.

### 3. Konfigurasi dan jalankan frontend

Buka terminal baru dari root repository:

```bash
cd frontend
npm install
```

Buat atau sesuaikan file `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Jalankan frontend:

```bash
npm run dev
```

Buka URL lokal yang ditampilkan Vite di terminal.

### Script yang tersedia

Backend:

```bash
npm run dev    # Menjalankan backend dengan Node watch mode
npm start      # Menjalankan backend
```

Frontend:

```bash
npm run dev      # Menjalankan Vite development server
npm run build    # Membuat build frontend
npm run preview  # Meninjau hasil build
npm run lint     # Menjalankan ESLint
```

## Ringkasan API

Base URL lokal: `http://localhost:3000/api`

| Method | Endpoint | Akses / Keterangan |
| --- | --- | --- |
| `POST` | `/auth/register` | Registrasi customer |
| `POST` | `/auth/login` | Login dan mendapatkan token |
| `GET` | `/platforms` | Melihat daftar platform |
| `GET` | `/categories` | Melihat daftar kategori |
| `GET` | `/products` | Daftar produk; mendukung parameter `search`, `page`, `limit`, `category_id`, dan `platform_id` |
| `GET` | `/products/:id` | Detail produk |
| `POST` | `/products` | Admin: tambah produk |
| `PUT` | `/products/:id` | Admin: ubah produk |
| `DELETE` | `/products/:id` | Admin: hapus produk |
| `GET` | `/cart` | Customer: melihat keranjang |
| `POST` | `/cart/items` | Customer: menambah item keranjang |
| `PUT` | `/cart/items/:id` | Customer: mengubah kuantitas item |
| `DELETE` | `/cart/items/:id` | Customer: menghapus item |
| `POST` | `/orders/checkout` | Customer: membuat pesanan dari keranjang |
| `GET` | `/orders` | Customer: melihat riwayat pesanan |
| `GET` | `/orders/:id` | Customer: melihat detail pesanan miliknya |
| `PATCH` | `/orders/:id/cancel` | Customer: membatalkan pesanan sesuai aturan status |
| `GET` | `/admin/orders` | Admin: daftar pesanan, filter status/periode, pagination |
| `GET` | `/admin/orders/:id` | Admin: detail pesanan |
| `PATCH` | `/admin/orders/:id/pay` | Admin: mengonfirmasi pembayaran |
| `PATCH` | `/admin/orders/:id/cancel` | Admin: membatalkan pesanan |
| `GET` | `/admin/reports/sales-summary` | Admin: ringkasan penjualan |
| `GET` | `/admin/reports/best-sellers` | Admin: produk terlaris |
| `GET` | `/admin/reports/low-stock` | Admin: stok rendah |

Endpoint untuk mutasi data admin dan fitur customer yang dilindungi memerlukan token JWT pada header:

```http
Authorization: Bearer <token>
```

Endpoint kategori dan platform juga menyediakan operasi `POST`, `PUT`, dan `DELETE` khusus admin. Parameter dan payload detail dapat dilihat pada file route di `backend/src/routes/`.

> Dokumentasi API lengkap berbentuk Postman/Swagger, tautan deployment, dan tautan presentasi perlu ditambahkan setelah tersedia.

## Rencana Pengujian

- Registrasi dengan input valid dan tidak valid.
- Login dengan kredensial benar dan salah.
- Akses endpoint admin menggunakan token customer atau tanpa token.
- Filter katalog menurut platform/kategori serta pagination.
- Validasi stok dan kuantitas ketika menambah atau memperbarui keranjang.
- Checkout dengan keranjang valid dan kondisi stok tidak mencukupi.
- Pembatalan pesanan `pending` serta perubahan stok yang terkait.
- Konfirmasi pembayaran oleh admin dan validasi transisi status pesanan.
- Filter pesanan berdasarkan status dan periode.
- Tampilan aplikasi pada ukuran desktop dan mobile.

