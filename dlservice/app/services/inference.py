import re
import numpy as np
import pandas as pd
import tensorflow as tf
from app.core.model_manager import model_manager
from app.services.constants import ROLE_RULES, JOB_SUGGESTIONS, HIGH_VALUE_SKILLS

def encode_cat(value: str, vocab: list) -> np.ndarray:
    lookup = tf.keras.layers.StringLookup(
        vocabulary=vocab,
        output_mode="int",
        num_oov_indices=1,
    )
    return lookup(np.array([str(value)])).numpy()

def clean_text_inference(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s+#.]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def detect_role(category: str, description: str, skills: str) -> str:
    combined = f"{category} {description} {skills}".lower()
    for role, keywords in ROLE_RULES.items():
        if any(k in combined for k in keywords):
            return role
    return "Other"

def get_rating_description(confidence: str, rate_usd: float) -> dict:
    if confidence == "high":
        return {
            "level": "Expert",
            "headline": "Profil kamu sangat kompetitif di pasar global Upwork.",
            "detail": f"Dengan tarif estimasi ${rate_usd:.0f}/jam, profil kamu berada di tier atas freelancer IT di platform ini.",
            "tips": [
                "Pertahankan portofolio yang ter-update secara berkala",
                "Tambahkan case study dengan hasil terukur (%, $, waktu hemat)",
                "Aktifkan fitur 'Available Now' saat sedang mencari proyek baru",
            ],
        }
    elif confidence == "medium":
        return {
            "level": "Intermediate",
            "headline": "Profil kamu cukup kompetitif, masih ada ruang untuk berkembang.",
            "detail": f"Estimasi tarif ${rate_usd:.0f}/jam mencerminkan profil yang solid namun belum mencapai potensi penuh.",
            "tips": [
                "Lengkapi deskripsi profil dengan pencapaian konkret dan angka",
                "Tambahkan sertifikasi atau portofolio proyek terbaru",
                "Minta klien sebelumnya untuk meninggalkan review di profil",
            ],
        }
    else:
        return {
            "level": "Starter",
            "headline": "Profil kamu masih perlu penguatan untuk bersaing di pasar global.",
            "detail": f"Estimasi tarif ${rate_usd:.0f}/jam adalah titik awal. Fokuslah membangun kredibilitas terlebih dahulu.",
            "tips": [
                "Lengkapi semua bagian profil Upwork (foto, bio, skills, portofolio)",
                "Ambil beberapa proyek dengan tarif lebih rendah untuk membangun review",
                "Ikuti Upwork Skill Certification untuk menambah kredibilitas",
                "Spesialisasikan diri pada 1-2 skill utama daripada terlalu luas",
            ],
        }

def get_skill_recommendations(skills: str, description: str, experience: str, top_n: int = 5) -> list:
    user_text = f"{skills} {description}".lower()
    user_tokens = set(re.findall(r'\b\w[\w.#+\-]*\b', user_text))

    exp_lower = str(experience).lower()
    if "entry" in exp_lower:
        priority = ["python", "javascript", "sql", "html", "css", "react", "git", "typescript", "node.js", "postgresql"]
    elif "expert" in exp_lower:
        priority = ["machine learning", "kubernetes", "aws", "azure", "microservices", "system design", "terraform", "kafka", "spark", "llm"]
    else:
        priority = ["docker", "kubernetes", "aws", "fastapi", "next.js", "graphql", "postgresql", "redis", "terraform", "ci/cd"]

    SKILL_REASONS = {
        "python": ("Python adalah bahasa #1 untuk data science, AI, dan backend.", "Sangat Tinggi"),
        "machine learning": ("ML skill paling dicari. Tarif ML freelancer 40-60% lebih tinggi rata-rata.", "Sangat Tinggi"),
        "aws": ("AWS meningkatkan tarif rata-rata $15-25/jam. Sertifikasi AWS sangat dihargai.", "Sangat Tinggi"),
        "docker": ("Containerization adalah standar industri modern.", "Tinggi"),
        "kubernetes": ("K8s skill langka tapi demand tinggi — membuka peluang DevOps senior.", "Tinggi"),
        "react": ("React adalah framework frontend paling populer saat ini.", "Sangat Tinggi"),
        "typescript": ("TypeScript menjadi standar baru JavaScript di industri.", "Tinggi"),
        "next.js": ("Next.js fullstack capability yang sangat dicari klien global.", "Tinggi"),
        "tensorflow": ("TensorFlow/Keras wajib untuk ML Engineer. Demand AI sangat tinggi.", "Sangat Tinggi"),
        "postgresql": ("PostgreSQL adalah database relasional paling populer.", "Tinggi"),
        "llm": ("LLM development skill terpanas 2024-2025 sejak ChatGPT.", "Sangat Tinggi"),
        "flutter": ("Flutter cross-platform mobile terpopuler. iOS dan Android sekaligus.", "Tinggi"),
    }

    pool = list(dict.fromkeys(priority + HIGH_VALUE_SKILLS))
    recs = []
    for skill in pool:
        if len(recs) >= top_n: break
        if set(skill.lower().split()) & user_tokens: continue
        reason, demand = SKILL_REASONS.get(skill, (
            f"{skill} adalah skill yang dibutuhkan di pasar freelance global.", "Sedang"
        ))
        recs.append({"skill": skill, "reason": reason, "market_demand": demand})
    return recs

def get_job_suggestions(detected_role: str, top_n: int = 6) -> list:
    return JOB_SUGGESTIONS.get(detected_role, JOB_SUGGESTIONS["Other"])[:top_n]

def predict_hourly_rate(
    description: str,
    skills: str = "",
    category: str = "unknown",
    country: str = "unknown",
    experience: str = "unknown",
    client_rating: float = 0.0,
    client_review_count: int = 0,
) -> dict:
    if model_manager.model is None or model_manager.config is None:
        return {"status": "error", "message": "Sistem belum siap. Model gagal dimuat ke memori."}

    if not str(description).strip():
        return {"status": "error", "message": "Deskripsi tidak boleh kosong."}

    scaler = model_manager.config["scaler"]
    lv = model_manager.config["lookup_vocabs"]
    metrics = model_manager.config["metrics"]

    text_clean = clean_text_inference(f"{description} {skills}")

    log_review = float(np.log1p(max(client_review_count, 0)))
    has_review = 1.0 if client_review_count > 0 else 0.0
    raw_num = np.array([[float(client_rating), log_review, has_review]])
    scaled_num = scaler.transform(raw_num).astype(np.float32)

    inputs = {
        "text_input":             tf.constant([text_clean], dtype=tf.string),
        "numeric_input":          tf.constant(scaled_num, dtype=tf.float32),
        "category_input":         tf.constant(encode_cat(category, lv["category"]), dtype=tf.int64),
        "country_input":          tf.constant(encode_cat(country, lv["country"]), dtype=tf.int64),
        "experience_level_input": tf.constant(encode_cat(experience, lv["experience_level"]), dtype=tf.int64),
    }

    raw_pred = model_manager.model.predict(inputs, verbose=0)
    log_pred = float(raw_pred[0][0])
    
    rate_usd = float(np.expm1(log_pred))
    rmse = metrics["RMSE"]
    rate_low = float(np.expm1(log_pred - rmse))
    rate_high = float(np.expm1(log_pred + rmse))

    score = sum([
        len(str(description).strip()) > 30,
        len(str(skills).strip()) > 0,
        str(category) not in ("unknown", ""),
        str(country) not in ("unknown", ""),
        str(experience) not in ("unknown", ""),
        float(client_rating) > 0,
        int(client_review_count) > 0,
    ])
    
    confidence_level = "high" if score >= 6 else "medium" if score >= 4 else "low"
    confidence_percentage = int(round((score / 7.0) * 100))
    
    detected_role = detect_role(category, description, skills)

    min_rate = int(round(max(rate_low, 1.0), 0))
    max_rate = int(round(rate_high, 0))
    rate_range_str = f"${min_rate} - ${max_rate}"

    raw_skills = get_skill_recommendations(skills, description, experience)
    mapped_skills = [s["skill"].title() if isinstance(s, dict) else str(s).title() for s in raw_skills]

    mapped_jobs = get_job_suggestions(detected_role)

    return {
        "status": "success",
        "predicted_rate_usd": round(rate_usd, 2),
        "rate_range": rate_range_str,
        "confidence": confidence_percentage,
        "rating_description": get_rating_description(confidence_level, rate_usd),
        "skill_recommendations": mapped_skills,
        "job_suggestions": mapped_jobs,
        "detected_role": detected_role,
        "model": "Deep Learning (TensorFlow Functional API)",
        "model_version": model_manager.config.get("model_version", "unknown"),
        "note": "Prediksi berdasarkan data pasar Upwork.",
    }
