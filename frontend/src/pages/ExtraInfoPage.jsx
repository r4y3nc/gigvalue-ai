import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { extraInfoPageData } from "../data/constants";

const ExtraInfoPage = ({ onNext, onBack, profile, setProfile }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="w-full max-w-5xl mx-auto flex flex-col pt-4 px-4"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-10 w-fit self-start font-medium transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" /> {extraInfoPageData.back_label}
    </button>
    <ProgressBar currentStep={4} />

    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-900">
          {extraInfoPageData.title}
        </h2>
        <p className="text-slate-500 text-base md:text-lg">
          {extraInfoPageData.subtitle}
        </p>
      </div>

      <div className="space-y-5">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {extraInfoPageData.country_label}
          <select
            value={profile.country}
            onChange={(event) => setProfile((prev) => ({ ...prev, country: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          >
            {extraInfoPageData.country_options.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {extraInfoPageData.reviews_label}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={profile.reviewCount === 0 ? "" : profile.reviewCount}
            onChange={(event) => {
              const onlyNumbers = event.target.value.replace(/[^0-9]/g, "");

              setProfile((prev) => ({
                ...prev,
                reviewCount: onlyNumbers === "" ? 0 : Number(onlyNumbers),
              }));
            }}
            placeholder="0"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
        </label>

        <label className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
          {extraInfoPageData.rating_label}
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={profile.rating}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  rating: Number(event.target.value),
                }))
              }
              className="w-full accent-lime-500"
            />
            <span className="text-sm font-bold text-slate-700 w-12 text-right">
              {Number(profile.rating || 0).toFixed(2)}
            </span>
          </div>
        </label>
      </div>
    </div>

    <div className="flex justify-end mt-10 mb-12">
      <button
        onClick={onNext}
        className="text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        style={{ backgroundColor: "#83AA3E" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a8f2f")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
      >
        {extraInfoPageData.next_button}
      </button>
    </div>
  </motion.div>
);

export default ExtraInfoPage;
