# GigValue AI - DL Service (FastAPI)

Deep Learning Service berbasis `FastAPI` yang berfungsi sebagai penyedia API inferensi model rekomendasi tarif per jam freelancer Upwork.

---

## Struktur Proyek
```text
dlservice/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── services/
│   ├── __init__.py
│   └── main.py
├── Dockerfile
└── requirements.txt

```

---

## Panduan Instalasi & Pengoperasian

Pastikan perangkat Anda sudah terpasang Python 3.12.

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
