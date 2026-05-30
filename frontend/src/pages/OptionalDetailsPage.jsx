import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { optionalDetailsPageData } from "../data/constants";

const OptionalDetailsPage = ({ onNext, onBack, profile, setProfile }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="w-full max-w-5xl mx-auto flex flex-col pt-4 px-4"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-10 w-fit self-start font-medium transition-colors"
    >
      <ArrowLeft className="w-4 h-4" /> {optionalDetailsPageData.back_label}
    </button>
    <ProgressBar currentStep={4} />

    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-900">
          {optionalDetailsPageData.title}
        </h2>
        <p className="text-slate-500 text-base md:text-lg">
          {optionalDetailsPageData.subtitle}
        </p>
      </div>

      <div className="space-y-5">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {optionalDetailsPageData.achievement_label}
          <textarea
            rows={4}
            value={profile.achievements}
            onChange={(event) => setProfile((prev) => ({ ...prev, achievements: event.target.value }))}
            placeholder={optionalDetailsPageData.achievement_placeholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {optionalDetailsPageData.industry_label}
          <input
            type="text"
            value={profile.targetIndustry}
            onChange={(event) => setProfile((prev) => ({ ...prev, targetIndustry: event.target.value }))}
            placeholder={optionalDetailsPageData.industry_placeholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {optionalDetailsPageData.rate_label}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={profile.targetRate === 0 ? "" : profile.targetRate}
            onChange={(event) => {
              const onlyNumbers = event.target.value.replace(/[^0-9]/g, "");

              setProfile((prev) => ({
                ...prev,
                targetRate: onlyNumbers === "" ? 0 : Number(onlyNumbers),
              }));
            }}
            placeholder="0"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
        </label>
      </div>
    </div>

    <div className="flex justify-end mt-auto mb-12">
      <button
        onClick={onNext}
        className="text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
        style={{ backgroundColor: "#83AA3E" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a8f2f")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
      >
        {optionalDetailsPageData.next_button}
      </button>
    </div>
  </motion.div>
);

export default OptionalDetailsPage;
