import { CheckCircle2, ArrowRight, Share2, Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { resultData, dummyJobs } from "../data/constants";

import coinImg from "../assets/bigclay/coin.png";
import stockupImg from "../assets/bigclay/stockup.png";

const BRAND = "#83AA3E";
const BRAND_LIGHT = "#f0f7e0";

const parsePercentage = (value) => {
  const numericValue = Number.parseFloat(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(numericValue) ? Math.max(0, Math.min(100, numericValue)) : 0;
};

const getConfidenceTone = (percentage) => {
  if (percentage >= 85) {
    return { backgroundColor: BRAND_LIGHT, color: BRAND };
  }

  if (percentage >= 70) {
    return { backgroundColor: "#fef3c7", color: "#b45309" };
  }

  if (percentage >= 50) {
    return { backgroundColor: "#ffedd5", color: "#c2410c" };
  }

  return { backgroundColor: "#fee2e2", color: "#b91c1c" };
};

/* ─── Main page ─────────────────────────────────────────────── */
const ResultPage = ({ onReset }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto flex flex-col pt-8 pb-32 px-4"
    >
      {/* Status bar */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
        >
          <CheckCircle2 className="w-4 h-4" />
          {resultData.page_header.status_badge}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 leading-tight">
        {resultData.page_header.title}
      </h1>
      <p className="text-slate-500 leading-relaxed text-base mb-8">
        {resultData.page_header.description}
      </p>

      <RateCard />
      <SkillUpCard />
      <JobsList />

      {/* Footer area */}
      <div className="w-full flex flex-col items-center pt-8 text-center">
        <p className="text-sm font-medium text-slate-400 mb-6">
          {resultData.footer.disclaimer_text}
        </p>
        <button
          onClick={onReset}
          className="w-full text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.01] active:scale-[0.99] text-base shadow-lg"
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

/* ─── Rate card ─────────────────────────────────────────────── */
const RateCard = () => {
  const confidencePercentage = parsePercentage(
    resultData.rate_recommendation.confidence_info.percentage,
  );
  const confidenceTone = getConfidenceTone(confidencePercentage);

  return (
    <div className="rounded-2xl border-5 border-slate-100 bg-white shadow-xs mb-4 overflow-hidden">
      <div className="flex items-center gap-4 p-5 pb-4 border-b border-slate-100">
        <div className="w-14 h-14 shrink-0">
          <img src={coinImg} alt="Coin" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wider text-slate-400 mb-0.5">
            {resultData.rate_recommendation.title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {resultData.rate_recommendation.price_range}
            </span>
            <span className="text-slate-400 font-semibold text-base">
              {resultData.rate_recommendation.price_unit}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            {resultData.rate_recommendation.confidence_label}
            <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={confidenceTone}>
              {resultData.rate_recommendation.confidence_info.status_label}
            </span>
          </div>
          <span className="font-extrabold text-lg" style={{ color: confidenceTone.color }}>
            {resultData.rate_recommendation.confidence_info.percentage}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: confidenceTone.color }}
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {resultData.rate_recommendation.avatar_initials.map((init, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-5 border-white text-[10px] flex items-center justify-center text-white font-bold"
              >
                {init}
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-400">
            {resultData.rate_recommendation.based_on_prefix} {resultData.rate_recommendation.confidence_info.data_source}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Skill-up card ─────────────────────────────────────────── */
const SkillUpCard = () => (
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
          {resultData.skill_improvement.skills_tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Jobs list ─────────────────────────────────────────────── */
const JobsList = () => (
  <div className="rounded-2xl border-5 border-slate-100 bg-white shadow-xs mb-6 overflow-hidden">
    <div className="p-5 border-b border-slate-100">
      <h3 className="text-base font-bold text-slate-900">{resultData.jobs_section.title}</h3>
    </div>
    <div className="px-5 py-2">
      {dummyJobs.map((job, i) => (
        <div
          key={i}
          className="py-4 border-b border-slate-100 last:border-0 flex items-start justify-between gap-4 cursor-pointer group"
        >
          <div className="flex-1 min-w-0">
            <h4
              className="font-semibold text-slate-900 text-sm mb-1 leading-snug transition-colors"
              style={{ "--hover-color": BRAND }}
            >
              {job.title}
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {job.tags.map((tag) => (
                <span key={tag} className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="font-extrabold text-slate-900 text-sm">{job.rate}</span>
            <p className="text-slate-400 text-xs">{job.type}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-slate-100">
      <button className="w-full text-center text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 py-1 text-slate-600 hover:text-brand">
        {resultData.jobs_section.cta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ResultPage;
