import { CheckCircle2, ArrowRight, Share2, Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { resultData } from "../data/constants";

import coinImg from "../assets/bigclay/coin.png";
import stockupImg from "../assets/bigclay/stockup.png";

const BRAND = "#83AA3E";
const BRAND_LIGHT = "#f0f7e0";
const KURS_USD_TO_IDR = 16000; 

const SKILL_CAPITALIZATION_MAP = {
  "javascript": "JavaScript",
  "html": "HTML",
  "css": "CSS",
  "php": "PHP",
  "sql": "SQL",
  "wordpress": "WordPress",
  "shopify": "Shopify",
  "woocommerce": "WooCommerce",
  "typescript": "TypeScript",
  "next.js": "Next.js",
  "node.js": "Node.js",
  "html5": "HTML5",
  "numpy": "NumPy",
  "tensorflow": "TensorFlow",
  "nlp": "NLP",
  "etl": "ETL",
  "bigquery": "BigQuery",
  "power bi": "Power BI",
  "ios": "iOS",
  "aws": "AWS",
  "amazon web services": "Amazon Web Services",
  "devops": "DevOps",
  "api": "API",
  "restful api": "RESTful API",
  "ui design": "UI Design",
  "ux design": "UX Design",
  "seo": "SEO",
  "seo writing": "SEO Writing",
  "gpt": "GPT",
  "llm": "LLM",
  "chatgpt": "ChatGPT",
  "generative ai": "Generative AI",
  "nft": "NFT",
  "web3": "Web3",
  "defi": "DeFi",
  "quickbooks": "QuickBooks",
};

const formatToIDR = (rateInput) => {
  if (!rateInput) return "Rp 0";

  const formatRp = (val) => `Rp ${val.toLocaleString("id-ID")}`;
  const roundThousands = (val) => Math.round((Number(val) * KURS_USD_TO_IDR) / 1000) * 1000;

  if (typeof rateInput === "number") {
    return formatRp(roundThousands(rateInput));
  }

  if (typeof rateInput === "string") {
    const numbers = rateInput.match(/\d+(\.\d+)?/g);
    if (numbers && numbers.length >= 2) {
      return `${formatRp(roundThousands(numbers[0]))} - ${formatRp(roundThousands(numbers[1]))}`;
    } else if (numbers && numbers.length === 1) {
      return formatRp(roundThousands(numbers[0]));
    }
  }

  return "Rp 0";
};

const getConfidenceTone = (percentage) => {
  const score = Number(percentage) || 0;
  if (score >= 85) return { backgroundColor: BRAND_LIGHT, color: BRAND, label: "Sangat Realistis" };
  if (score >= 70) return { backgroundColor: "#fef3c7", color: "#b45309", label: "Cukup Realistis" };
  if (score >= 50) return { backgroundColor: "#ffedd5", color: "#c2410c", label: "Kurang Akurat" };
  return { backgroundColor: "#fee2e2", color: "#b91c1c", label: "Butuh Data Tambahan" };
};

/* ─── Main page ─────────────────────────────────────────────── */
const ResultPage = ({ result, onReset, profile }) => {
  if (!result) {
    return (
      <div className="w-full text-center py-20 text-slate-500 font-medium">
        Memuat data analisis pasar...
      </div>
    );
  }

  const payload = result.data || result;

  const predictedRate = payload.predicted_rate || 0;       
  const rateRange = payload.rate_range || "";              
  const confidenceScore = payload.confidence || 0;         
  const insightAi = payload.rating_description || null;    
  const jobsList = payload.job_suggestions || [];          

  const rawSkillRecommendations = payload.skill_recommendations || [];
  
  const skillUpList = rawSkillRecommendations.map(skill => {
    const cleanKey = skill.trim().toLowerCase();
    return SKILL_CAPITALIZATION_MAP[cleanKey] || skill;
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto flex flex-col pt-8 pb-32 px-4"
      >
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            <CheckCircle2 className="w-4 h-4" />
            {resultData.page_header.status_badge}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors cursor-pointer">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Tarif kamu sebagai <span className="text-brand">{profile.role || "Freelancer"}</span>
        </h1>
        <p className="text-slate-500 leading-relaxed text-base mb-8">
          {resultData.page_header.description}
        </p>

        <RateCard 
          predictedRate={predictedRate} 
          rateRange={rateRange} 
          confidence={confidenceScore} 
          insight={insightAi} 
        />
        
        <SkillUpCard skillsTags={skillUpList} />
        
        {/* <JobsList jobs={jobsList} /> */}

        <div className="w-full flex flex-col items-center pt-8 text-center">
          <p className="text-sm font-medium text-slate-400 mb-6">
            {resultData.footer.disclaimer_text}
          </p>
          <button
            onClick={onReset}
            className="w-full text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.01] active:scale-[0.99] text-base shadow-lg cursor-pointer"
            style={{ backgroundColor: BRAND }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a8f2f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
          >
            {resultData.footer.action_button}
          </button>
        </div>
      </motion.div>
    </>
  );
};

/* ─── Rate card ─────────────────────────────────────────────── */
const RateCard = ({ predictedRate, rateRange, confidence, insight }) => {
  const confidenceTone = getConfidenceTone(confidence);
  
  const formattedRange = formatToIDR(rateRange); 
  const exactPredictedIDR = formatToIDR(predictedRate);

  const cleanInsightDetail = insight?.detail
    ? insight.detail.replace(/\$\d+(\.\d+)?(\s*\/jam|\/hr)?/gi, `${exactPredictedIDR}/jam`)
    : "";

  return (
    <div className="rounded-2xl border-5 border-slate-100 bg-white shadow-xs mb-4 overflow-hidden">
      <div className="flex items-center gap-5 p-5 pb-5 border-b border-slate-100">
        <div className="w-14 h-14 shrink-0">
          <img src={coinImg} alt="Coin" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wider text-slate-400 mb-3 uppercase">
            {resultData.rate_recommendation.title}
          </p>
          
          <div className="flex flex-col gap-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Tarif Ideal Kamu
              </span>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {exactPredictedIDR}
                </span>
                <span className="text-slate-400 font-semibold text-sm md:text-base">
                  {resultData.rate_recommendation.price_unit}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Rentang Tarif Pasar
              </span>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {formattedRange}
                </span>
                <span className="text-slate-400 font-semibold text-sm md:text-base">
                  {resultData.rate_recommendation.price_unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {insight && (
        <div className="mx-5 mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-slate-200 text-slate-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              {insight.level || "Analisis AI"}
            </span>
            <h4 className="font-bold text-slate-800 text-sm leading-tight">
              {insight.headline}
            </h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
            {cleanInsightDetail}
          </p>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            {resultData.rate_recommendation.confidence_label}
            <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={confidenceTone}>
              {confidenceTone.label}
            </span>
          </div>
          <span className="font-extrabold text-lg" style={{ color: confidenceTone.color }}>
            {confidence}%
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: confidenceTone.color }}
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row bg-slate-50/50 p-2.5 rounded-xl border border-dashed border-slate-100">
          <div className="flex -space-x-2 shrink-0">
            {resultData.rate_recommendation.avatar_initials.map((init, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white text-[11px] flex items-center justify-center text-white font-black"
              >
                {init}
              </div>
            ))}
          </div>
          <div className="text-xs font-semibold text-slate-400 leading-tight">
            <span>{resultData.rate_recommendation.based_on_prefix} 2jt+ pengguna aktif Upwork </span>
            <span className="text-slate-300 mx-1">|</span>
            <span className="text-[#83AA3E] font-bold">Berdasarkan ML Inference</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Skill-up card ─────────────────────────────────────────── */
const SkillUpCard = ({ skillsTags }) => (
  <div className="rounded-2xl border-5 border-slate-100 bg-white shadow-xs mb-4 overflow-hidden">
    <div className="flex items-start gap-4 p-5 pb-0">
      <div className="w-14 h-14 shrink-0">
        <img src={stockupImg} alt="Stock up" className="w-full h-full object-contain" />
      </div>
      <div className="flex-1">
        <p className="text-base font-bold text-slate-900 mb-1">
          {resultData.skill_improvement.title}
        </p>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">
          {resultData.skill_improvement.description}
        </p>
        <div className="flex flex-wrap gap-2 pb-5">
          {skillsTags.length > 0 ? (
            skillsTags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-sm font-bold shadow-xs border border-emerald-100"
                style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm italic text-slate-400">Tidak ada rekomendasi keahlian tambahan.</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Jobs list ─────────────────────────────────────────────── */
const JobsList = ({ jobs }) => (
  <div className="rounded-2xl border-5 border-slate-100 bg-white shadow-xs mb-6 overflow-hidden">
    <div className="p-5 border-b border-slate-100">
      <h3 className="text-base font-bold text-slate-900">{resultData.jobs_section.title}</h3>
    </div>
    <div className="px-5 py-2">
      {jobs.length > 0 ? (
        jobs.map((job, i) => {
          const jobRateRaw = job.rate || "0";
          const formattedJobRate = formatToIDR(jobRateRaw);

          return (
            <div
              key={i}
              className="py-4 border-b border-slate-100 last:border-0 flex items-start justify-between gap-4 cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm mb-1 leading-snug transition-colors group-hover:text-[#83AA3E]">
                  {job.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {job.tags &&
                    job.tags.map((tag) => (
                      <span key={tag} className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-100">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-extrabold text-slate-900 text-sm block">
                  {formattedJobRate}
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  {job.type || "Hourly"}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="py-8 text-center text-sm text-slate-400 italic">
          Tidak ada rekomendasi lowongan spesifik untuk saat ini.
        </div>
      )}
    </div>
    <div className="p-4 border-t border-slate-100 bg-slate-50/30">
      <button className="w-full text-center text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1 cursor-pointer py-1">
        {resultData.jobs_section.cta} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ResultPage;