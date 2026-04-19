# ML Pipeline Architecture — GigValue AI

## Alur Data
Raw Data (CSV) → Preprocessing → Feature Extraction
→ Model Training → Serialisasi → FastAPI → Frontend

## Input Model
- overview     : teks deskripsi profil freelancer
- skills       : daftar skill (teks)
- hourly_rate  : target prediksi (nilai kontinu)

## Feature Extraction
- TF-IDF pada kolom teks overview & skills
- StandardScaler pada fitur numerik

## Model yang Akan Dicoba (Minggu 3)
1. Linear Regression     — baseline
2. Random Forest
3. XGBoost
4. Deep Learning (TensorFlow Functional API)

## Format Output Model
- SavedModel atau .keras
- Siap serving via FastAPI

## Tools
- MLflow   : experiment tracking & model registry
- DVC      : dataset & artefak versioning