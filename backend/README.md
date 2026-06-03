# GigValue AI - Backend (Express.js)

Layanan backend utama berbasis Node.js dan Express.js yang bertugas mengelola basis data, menyediakan API untuk frontend, serta berkomunikasi dengan DL Service.

---

## Struktur Proyek
```text
backend/
├── db/
├── migrations/
├── seeds/
├── src/
│   ├── controllers/
│   ├── data/
│   ├── errors/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── server.js
├── .env.example
├── package-lock.json
└── package.json

```

---

## Konfigurasi Environment Variables

Salin berkas `.env.example` menjadi `.env` di dalam folder backend/:

```bash
cp .env.example .env
```

Sesuaikan isi konfigurasi environment variables berikut:

```env
PORT=5000
DLSERVICE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# Konfigurasi nilai tukar USD ke IDR
KURS_USD_TO_IDR=17000

# DATABASE MODE SWITCH ('supabase' untuk Cloud, atau 'local' untuk PostgreSQL Lokal)
DATABASE_MODE=local

# CONFIGURATION A: Supabase Cloud
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_public_key

# CONFIGURATION B: Local PostgreSQL
PGHOST=localhost
PGUSER=postgres
PGDATABASE=gigvalueai_db
PGPASSWORD=your_password
PGPORT=5432
```
---

## Panduan Instalasi & Pengoperasian

Pastikan perangkat Anda sudah terpasang Node.js v24.14.1 dan database PostgreSQL aktif (jika memilih mode lokal).

Masuk ke direktori backend dan pasang seluruh dependensi project:

```bash
cd backend
npm install

# Salin berkas env dan sesuaikan kredensial database Anda
cp .env.example .env

# Jalankan migrasi struktur tabel ke database
npm run migrate

# Masukkan data master/awal ke database
npm run seed

# Jalankan backend dalam mode development
npm run dev
```

