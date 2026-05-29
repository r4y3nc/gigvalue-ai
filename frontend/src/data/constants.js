// ─── Result page data ─────────────────────────────────────────────────────────
export const resultData = {
  page_header: {
    status_badge: "Analisis selesai",
    title: "Tarif kamu sebagai Data Scientist",
    description:
      "Ini dia estimasi tarif kamu berdasarkan data pasar nyata. Kita juga kasih tahu skill apa yang bisa naikkin tarif kamu, plus beberapa lowongan relevan langsung dari Upwork.",
  },
  rate_recommendation: {
    title: "Estimasi Tarif Kamu",
    price_range: "Rp 70.000 – Rp 100.000",
    price_unit: "/jam",
    demand_label: "High Demand 🔥",
    confidence_label: "Tingkat Keyakinan",
    confidence_info: {
      percentage: "85%",
      data_source: "2jt+ pengguna aktif Upwork",
      status_label: "Sangat Realistis",
    },
    avatar_initials: ["U", "F", "D"],
    based_on_prefix: "Berdasarkan",
  },
  skill_improvement: {
    badge_label: "Skill Up 🚀",
    title: "Mau naikkin tarifmu?",
    description:
      "Kuasai skill-skill ini yang lagi banyak dicari klien sekarang, dan batas atas tarif kamu bisa ikut naik:",
    skills_tags: ["Tableau", "Deep Learning", "TensorFlow"],
    est_prefix: "+ Est.",
  },
  jobs_section: {
    title: "Lowongan yang cocok buat kamu",
    cta: "28+ lowongan serupa tersedia sekarang di Upwork ",
  },
  footer: {
    disclaimer_text: "AI bisa salah. Cek lagi sebelum ambil keputusan penting ya.",
    action_button: "Selesai",
  },
};

// ─── Market data ──────────────────────────────────────────────────────────────
export const trendingSkillsTicker = [
  { name: "Frontend Developer", change: "+38%", up: true, rate: "Rp 180k/jam" },
  { name: "UI/UX Designer", change: "+42%", up: true, rate: "Rp 170k/jam" },
  { name: "Data Analyst", change: "+31%", up: true, rate: "Rp 200k/jam" },
  { name: "Backend Developer", change: "+27%", up: true, rate: "Rp 220k/jam" },
  { name: "Mobile Developer", change: "+34%", up: true, rate: "Rp 210k/jam" },
  { name: "AI Engineer", change: "+51%", up: true, rate: "Rp 300k/jam" },
  { name: "Product Designer", change: "+29%", up: true, rate: "Rp 190k/jam" },
  { name: "QA Engineer", change: "+18%", up: true, rate: "Rp 150k/jam" },
];

export const emergingRoles = [
  { title: "Pelatih Model AI", desc: "Melatih dan menyempurnakan model AI generatif biar makin pintar", change: "+56%", rate: "Rp 150k/jam" },
  { title: "Pengembang Aplikasi Mobile", desc: "Bikin aplikasi iOS & Android pakai Flutter atau React Native", change: "+44%", rate: "Rp 200k/jam" },
  { title: "Pengembang Chatbot", desc: "Merancang chatbot berbasis LLM yang beneran berguna buat bisnis", change: "+31%", rate: "Rp 180k/jam" },
  { title: "Desainer UI/UX", desc: "Mendesain antarmuka digital yang enak dipake dan enak diliat", change: "+28%", rate: "Rp 160k/jam" },
  { title: "Pengembang API & Backend", desc: "Membangun API yang scalable dan bisa diandalkan banyak sistem", change: "+24%", rate: "Rp 250k/jam" },
];

export const inDemandSkills = [
  { category: "Pengembangan Web", skills: ["React.js", "Next.js", "Node.js", "Webflow", "Laravel"] },
  { category: "Mobile & Desktop", skills: ["Flutter", "React Native", "Swift", "Kotlin", "Electron"] },
  { category: "Desain Produk", skills: ["Figma", "Adobe XD", "UI/UX", "Identitas Merek", "Desain Sistem"] },
  { category: "AI & Data", skills: ["Python", "TensorFlow", "LangChain", "Machine Learning", "Data Viz"] },
];

export const dummyJobs = [
  { title: "Senior Data Scientist for Fintech Startup", type: "Hourly", rate: "Rp 85.000", tags: ["Python", "Machine Learning"] },
  { title: "Machine Learning Engineer (NLP)", type: "Fixed-price", rate: "Rp 95.000", tags: ["NLP", "TensorFlow"] },
  { title: "Data Analyst / Scientist untuk E-commerce", type: "Hourly", rate: "Rp 75.000", tags: ["SQL", "Tableau"] },
  { title: "Python Data Scientist with Tableau Expert", type: "Hourly", rate: "Rp 90.000", tags: ["Python", "Data Viz"] },
];

// ─── Skills page ──────────────────────────────────────────────────────────────
export const allSkills = ["Python", "TensorFlow", "SQL", "Statistics", "NLP", "Neural Network", "Scikit-learn"];

// ─── Loading page ─────────────────────────────────────────────────────────────
export const loadingSteps = [
  "Membaca profil keahlian kamu...",
  "Mencocokkan dengan data jutaan freelancer Upwork...",
  "Menghitung estimasi tarif yang realistis...",
  "Menyiapkan rekomendasimu...",
];

// ─── Landing page — hero ──────────────────────────────────────────────────────
export const hero = {
  heading_1: "Cari tahu",
  heading_highlight: "harga",
  heading_2: "wajar kamu",
  heading_3: "di pasar global, dalam",
  heading_highlight_2: "hitungan detik.",
  subheading: "Masukkan peran kamu, dan kami prediksi tarif paling kompetitif berdasarkan jutaan data freelancer aktif.",
  search_placeholder: "Coba: frontend developer, UI/UX, backend developer...",
  search_value: "Data Science",
  cta_button: "Mulai",
  data_badge: "Data powered by Upwork",
};

// ─── Landing page — stats (showcase cards) ───────────────────────────────────
export const stats = {
  section_title: "Tarif akurat, hasil cepat.",
  cards: [
    {
      title: "5jt+ profil Upwork dianalisis",
      desc: "Kami ambil pola tarif dari jutaan freelancer dengan peran dan skill serupa, terus rangkum jadi insight yang bisa langsung kamu pakai.",
      alt: "Ilustrasi data Upwork",
    },
    {
      title: "Ada confidence score-nya juga",
      desc: "Bukan cuma angka doang — kamu juga tahu seberapa yakin model terhadap hasilnya, biar kamu makin pede ambil keputusan.",
      alt: "Ilustrasi akurasi prediksi",
    },
    {
      title: "Hasil muncul dalam kurang dari 10 detik",
      desc: "Dapat range tarif kompetitif tanpa riset manual berjam-jam. Plus rekomendasi skill buat naikkin tarifmu lebih jauh.",
      alt: "Ilustrasi waktu proses",
    },
    {
      title: "Gratis. Sepenuhnya.",
      desc: "Nikmati prediksi tarif, insight pasar, dan rekomendasi skill — tanpa kartu kredit, tanpa daftar, langsung pakai.",
      alt: "Ilustrasi kartu kredit gratis",
    },
  ],
};

// ─── Landing page — how it works ─────────────────────────────────────────────
export const howItWorks = {
  section_badge: "Cara Kerjanya",
  section_title: "Cuma 3 langkah, serius.",
  step_label: "Langkah",
  steps: [
    {
      number: "01",
      title: "Pilih level pengalamanmu",
      desc: "Ceritain seberapa ahli kamu di bidang ini. Level pengalaman kamu berpengaruh langsung ke range tarif yang direkomendasikan.",
      alt: "Expert illustration",
    },
    {
      number: "02",
      title: "Pilih skill yang kamu kuasai",
      desc: "Pilih minimal 1 skill dari bidangmu. Makin spesifik pilihanmu, makin akurat estimasinya.",
      alt: "Laptop illustration",
    },
    {
      number: "03",
      title: "Langsung dapat estimasi tarifmu",
      desc: "GigValue proses datamu dan kasih range harga lengkap dengan confidence score. Bonus: rekomendasi skill dan lowongan terkait dari Upwork.",
      alt: "Coin illustration",
    },
  ],
};

// ─── Landing page — market insights ──────────────────────────────────────────
export const marketInsightsText = {
  trending_title: "Berapa bayaran profesi IT sekarang?",
  trending_text: "Lihat tren tarif terbaru buat peran-peran paling populer di pasar freelance.",
  emerging_title: "Profesi yang Lagi Naik Daun",
  indemand_title: "Skill yang Paling Dicari Klien",
  growth_suffix: "Pertumbuhan",
};

// ─── Landing page — CTA section ───────────────────────────────────────────────
export const ctaSection = {
  badge: "Gratis. Tanpa daftar.",
  title_1: "Kamu sebenarnya worth",
  title_highlight: "berapa di pasar?",
  desc: "Jangan tebak-tebakan soal tarif. Biarkan data dari jutaan freelancer Upwork yang jawab — dalam detik, bukan minggu.",
  search_placeholder: "Coba: frontend developer, UI/UX, backend developer...",
  cta_button: "Mulai",
  social_proof: "Berdasarkan 2jt+ pengguna aktif Upwork",
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqData = {
  badge: "FAQ",
  title: "Ada yang mau ditanyain?",
  desc: "Kumpulan pertanyaan yang paling sering ditanyain soal GigValue AI.",
  items: [
    { q: "Gimana GigValue ngitung estimasi tarifnya?", a: "Kami pakai model machine learning yang dilatih dari jutaan data profil dan tarif freelancer di Upwork. Hasilnya dikombinasikan sama level pengalaman dan skill yang kamu pilih buat kasih range yang relevan sama pasar sekarang." },
    { q: "Seberapa akurat estimasi tarifnya?", a: "Estimasi kami dilengkapi confidence score biar kamu tahu seberapa yakin modelnya. Semakin spesifik skill yang kamu pilih, semakin akurat hasilnya. Kami rekomendasikan pakai ini sebagai referensi awal, bukan angka mati." },
    { q: "Apa itu confidence score?", a: "Confidence score itu indikator seberapa kuat data yang mendukung estimasi tarifmu. Angka 85% misalnya, artinya model cukup yakin range itu realistis berdasarkan data yang tersedia." },
    { q: "Apakah GigValue bisa dipakai buat semua bidang IT?", a: "Sekarang GigValue fokus ke peran-peran yang paling umum di Upwork — pengembangan web, mobile, desain, data, dan AI. Kami terus nambah cakupannya secara berkala." },
    { q: "Data darimana yang GigValue pakai?", a: "Kami menganalisis data dari profil dan posting pekerjaan di Upwork, mencakup 2 juta+ pengguna aktif. Data diperbarui secara berkala biar estimasinya tetap relevan sama kondisi pasar terkini." },
    { q: "Apakah GigValue gratis?", a: "Ya, sepenuhnya gratis. Kamu bisa cek estimasi tarif, lihat insight pasar, dan dapat rekomendasi skill tanpa perlu daftar atau masukin info pembayaran apapun." },
    { q: "Kenapa ada rekomendasi skill di hasil prediksi?", a: "Karena tarif kamu bisa naik kalau kamu kuasai skill yang lagi banyak dicari. Rekomendasi ini berdasarkan tren permintaan pasar, bukan sekadar daftar skill random." },
    { q: "Apakah data saya disimpan?", a: "Kami tidak menyimpan informasi pribadi kamu. Input yang kamu masukkan hanya digunakan untuk menghasilkan estimasi dan tidak diteruskan ke pihak lain." },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footerData = {
  brand_name: "gigvalue.ai",
  brand_desc: "Platform prediksi tarif freelance berbasis data Upwork real-time, khusus buat freelancer Indonesia.",
  headline: "Cari tahu nilai pasarmu — pakai data nyata, bukan feeling.",
  social_links: ["𝕏", "in", "ig"],
  columns: [
    {
      heading: "Produk",
      links: ["Prediksi Tarif", "Analisis Skill", "Market Insights", "Trending Skills"],
    },
    {
      heading: "Sumber Daya",
      links: ["Blog", "FAQ", "Cara Kerja", "Panduan Freelancer"],
    },
    {
      heading: "Hukum",
      links: ["Kebijakan Privasi", "Syarat & Ketentuan", "Cookie Policy"],
    },
  ],
  copyright: "GigValue AI.",
  disclaimer: "AI bisa salah. Selalu cek lagi sebelum ambil keputusan penting.",
};

// ─── Header ───────────────────────────────────────────────────────────────────
export const headerData = {
  brand: "gigvalue.ai",
  nav: [
    { label: "Home", target: "home" },
    { label: "Cara Kerja", target: "cara-kerja" },
    { label: "Insight Pasar", target: "market" },
    { label: "Tentang", target: "tentang" },
  ],
};

// ─── Experience page ──────────────────────────────────────────────────────────
export const experiencePageData = {
  back_label: "Kembali",
  title: "Seberapa berpengalaman kamu di Data Science?",
  subtitle: "Ini yang nentuin seberapa tinggi range tarif kamu.",
  next_button: "Selanjutnya",
  levels: [
    {
      id: "beginner",
      title: "Beginner",
      desc: "Aku Baru mulai dan punya pengalaman di bawah 1 tahun",
      borderColor: "border-brand",
      alt: "Beginner level illustration",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      desc: "Aku bisa tapi belum ahli dan punya pengalaman sekitar 1-3 tahun.",
      borderColor: "border-blue-500",
      alt: "Intermediate level illustration",
    },
    {
      id: "expert",
      title: "Expert",
      desc: "Aku ahli, percaya diri dan punya pengalaman lebih dari 3 tahun.",
      borderColor: "border-purple-500",
      alt: "Expert level illustration",
    },
  ],
};

// ─── Skills page ──────────────────────────────────────────────────────────────
export const skillsPageData = {
  back_label: "Kembali",
  title_1: "Tech Skills",
  title_2: "yang kamu kuasai",
  subtitle: "Pilih minimal 1 skill. Makin banyak, makin akurat estimasinya.",
  search_placeholder: "Cari skill...",
  selected_label: "Dipilih",
  extra_label: "Skill tambahan (pisahkan koma)",
  extra_placeholder: "GraphQL, Redis...",
  next_button: "Selanjutnya",
  alt_laptop: "Pilih skill kamu",
};

// ─── Deskripsi profil page ──────────────────────────────────────────────────
export const profileDescPageData = {
  back_label: "Kembali",
  title: "Deskripsi Profil",
  subtitle: "Ceritakan pengalamanmu secara singkat.",
  story_label: "Ceritakan pengalamanmu",
  story_placeholder: "3 tahun membangun web app untuk startup B2B, spesialis React dan Node.js...",
  next_button: "Selanjutnya",
};

// ─── Detail opsional page ───────────────────────────────────────────────────
export const optionalDetailsPageData = {
  back_label: "Kembali",
  title: "Detail tambahan",
  subtitle: "Opsional, membantu saran AI lebih akurat.",
  achievement_label: "Pencapaian terbesar (opsional)",
  achievement_placeholder: "Meningkatkan performa app 40%, sistem payment 10.000+ user...",
  industry_label: "Target klien/industri (opsional)",
  industry_placeholder: "Startup teknologi...",
  rate_label: "Target tarif/jam (USD) - untuk saran AI",
  next_button: "Selanjutnya",
};

// ─── Info tambahan page ─────────────────────────────────────────────────────
export const extraInfoPageData = {
  back_label: "Kembali",
  title: "Info tambahan",
  subtitle: "Opsional - meningkatkan akurasi.",
  country_label: "Negara",
  country_options: ["United States", "Canada", "United Kingdom", "Australia", "Indonesia"],
  reviews_label: "Jumlah review diterima",
  rating_label: "Rating klien (jika ada)",
  next_button: "Selanjutnya",
};

// ─── Loading page ─────────────────────────────────────────────────────────────
export const loadingPageData = {
  title: "Lagi ngitung estimasi tarif kamu...",
  alt_brain: "AI lagi kerja keras",
};