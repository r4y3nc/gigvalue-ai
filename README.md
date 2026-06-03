# GigValue AI

GigValue AI adalah sistem rekomendasi berbasis Deep Learning yang dirancang untuk membantu para freelancer mengestimasi, menganalisis, dan mengoptimalkan tarif per jam (hourly) mereka berdasarkan visualisasi data pasar nyata dari Upwork. Platform ini menyajikan estimasi harga sekaligus memberikan rekomendasi keahlian yang berpotensi meningkatkan nilai tawar freelancer di pasar global.

---

## Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Frontend** | React + Vite |
| **Backend** | Express.js |
| **DL Service** | FastAPI |
| **Database** | PostgreSQL (Lokal) / Supabase (Cloud) |

---

## Struktur Proyek

Proyek ini menggunakan arsitektur multi-service yang memisahkan lingkungan backend, frontend, dan dl (deep learning) service.

```text
gigvalue-ai/
├── backend/
│   ├── db/
│   ├── migrations/
│   ├── seeds/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.js
│   ├── .env.example
│   ├── package-lock.json
│   └── package.json
├── dlservice/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/
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

### Backend (`backend/.env`)

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

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

## Panduan Instalasi & Pengoperasian

Pastikan perangkat Anda sudah terpasang Node.js v24.14.1, Python 3.12, dan PostgreSQL (jika memilih mode lokal).

### 1. Setup DL Service (FastAPI)

Masuk ke direktori `dlservice`, buat virtual environment, pastikan file model telah tersedia, dan jalankan server AI:

```bash
cd dlservice
python -m venv venv

# Aktifkan venv (Windows)
.\venv\Scripts\activate
# Aktifkan venv (Mac/Linux)
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

*Catatan Model AI:* Berkas model `.keras` dan `.pkl` wajib berada di dalam folder `app/models/`. Jika berkas tersebut belum ada karena ukurannya yang besar, Anda dapat mengunduhnya melalui [tautan Google Drive ini](https://drive.google.com/drive/folders/1IhGScMPfYZah_AyuDGGqy4Mude03cxpi).

### 2. Setup Backend (Express.js)

Buka terminal baru, masuk ke direktori `backend`, lakukan instalasi dependensi, konfigurasi database, dan jalankan perintah migrasi:

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

### 3. Setup Frontend (Vite + React)

Buka terminal baru, masuk ke direktori `frontend`, lalu jalankan server development:

```bash
cd frontend
npm install

# Salin berkas env
cp .env.example .env

# Jalankan aplikasi web
npm run dev
```

---

## Folder Terkait

### `data-science/`
Berisikan berkas Jupyter Notebook (`laporan_analisis_data_freelancer_upwork.ipynb`) yang digunakan untuk proses analisis data eksploratif (EDA) terhadap dataset pasar Upwork.

Folder `dashboard-streamlit/` berisi berkas utama `dashboard.py`, dataset hasil kurasi `freelance_clean.csv`, serta notebook tahap pembersihan data `freelance_clean.ipynb`. Aplikasi ini dapat diakses secara langsung melalui tautan web deployment berikut: https://dashboard-capstone-gigvalue-hpdns9tgyescnifpcqgnbg.streamlit.app/

### `artificial-intelligence/`
Berisikan berkas Jupyter Notebook (`gigvalue_ai.ipynb`) yang digunakan untuk eksperimen awal, arsitektur, dan pelatihan model Deep Learning sebelum diintegrasikan ke FastAPI.


---

## Tautan Terkait

Deployment Web di Vercel (multiservice): https://gigvalue-ai.vercel.app/

`dlservice/` di Huggingface:
- Repositori: https://huggingface.co/spaces/r4y3nc/gigvalue-ai-dlservice/tree/main
- Deployment `dlservice/`: https://r4y3nc-gigvalue-ai-dlservice.hf.space

Dashboard Streamlit Data Science: https://dashboard-capstone-gigvalue-hpdns9tgyescnifpcqgnbg.streamlit.app/

Unduh model Deep Learning: https://drive.google.com/drive/folders/1IhGScMPfYZah_AyuDGGqy4Mude03cxpi

---

## Anggota Capstone Project - CC26-PSU219

CDCC012D6X0148 - Daffa Apsari Aprila Nala M. - Data Scientist
CDCC277D6Y1864 - Sandi Gunawan - Data Scientist
CACC313D6Y0886 - Aditya Ihsan Maulana - AI Engineer
CFCC313D6Y2807 - Icep Septian Fajar - Full-Stack Web Developer
CFCC012D6Y0100 - Muhammad Zevaldo T. - Full-Stack Web Developer
