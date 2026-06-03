# GigValue AI - Frontend (Vite + React)

Antarmuka web interaktif berbasis React dan Vite yang digunakan oleh pengguna untuk melakukan estimasi tarif per jam dan melihat visualisasi analisis data pasar.

---

## Struktur Proyek
```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---

## Konfigurasi Environment Variables

Salin berkas `.env.example` menjadi `.env` di dalam folder frontend/:

```bash
cp .env.example .env
```

Sesuaikan isi konfigurasi environment variables berikut:

```env
VITE_API_URL=http://localhost:5000
```

---

## Panduan Instalasi & Pengoperasian

Pastikan perangkat Anda sudah terpasang Node.js v24.14.1.

Masuk ke direktori frontend dan pasang seluruh dependensi project:

```bash
cd frontend
npm install

# Salin berkas env
cp .env.example .env

# Jalankan aplikasi web
npm run dev
```
