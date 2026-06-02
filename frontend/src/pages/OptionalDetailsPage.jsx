import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { optionalDetailsPageData, resultData } from "../data/constants";

const OptionalDetailsPage = ({ onNext, onBack, profile, setProfile }) => {
  const formatRp = (num) => {
    if (num === null || num === undefined || num === 0) return "";
    return (
      "Rp " + Number(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  const parseNumber = (str) => {
    const onlyDigits = (str || "").toString().replace(/[^0-9]/g, "");
    return onlyDigits === "" ? 0 : Number(onlyDigits);
  };

  // derive suggested chips from market price range if available
  const suggested = (() => {
    const rangeStr = resultData?.rate_recommendation?.price_range || "";
    const matches = rangeStr.match(/\d[\d\.]+/g) || [];
    const nums = matches.map((s) => Number(s.replace(/\./g, "")));
    if (nums.length >= 2) {
      const low = nums[0];
      const high = nums[1];
      const mid = Math.round((low + high) / 2 / 1000) * 1000;
      return [low, mid, high];
    }
    // fallback presets (in IDR)
    return [50000, 100000, 150000];
  })();

  return (
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
        <label className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
          {optionalDetailsPageData.rate_label}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={profile.targetRate === 0 ? "" : formatRp(profile.targetRate)}
            onChange={(event) => {
              const num = parseNumber(event.target.value);
              setProfile((prev) => ({ ...prev, targetRate: num }));
            }}
            placeholder={formatRp(suggested[1])}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />

          <div className="flex gap-3 mt-2">
            {suggested.map((val) => {
              const isSelected = profile.targetRate === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setProfile((prev) => ({ ...prev, targetRate: val }))}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 font-bold text-sm transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "text-slate-800 shadow-sm"
                      : "text-slate-500 border-slate-200 hover:text-slate-700 hover:border-slate-300"
                  }`}
                  style={isSelected ? { borderColor: "#83AA3E" } : undefined}
                >
                  {formatRp(val)}
                </button>
              );
            })}
          </div>
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
};

export default OptionalDetailsPage;
