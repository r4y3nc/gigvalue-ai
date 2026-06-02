import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { profileDescPageData } from "../data/constants";

const ProfileDescPage = ({ onNext, onBack, profile, setProfile, errorMessage }) => {
  const canContinue = profile.profileDesc.trim().length > 0;

  return (
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
        <ArrowLeft className="w-4 h-4" /> {profileDescPageData.back_label}
      </button>
      <ProgressBar currentStep={3} />

      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-900">
            {profileDescPageData.title}
          </h2>
          <p className="text-slate-500 text-base md:text-lg">
            {profileDescPageData.subtitle}
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          {profileDescPageData.story_label}
          <textarea
            rows={6}
            value={profile.profileDesc}
            onChange={(event) => setProfile((prev) => ({ ...prev, profileDesc: event.target.value }))}
            placeholder={profileDescPageData.story_placeholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold mt-1">
              {errorMessage}
            </p>
          )}
        </label>
      </div>

      <div className="flex justify-end mt-10 mb-12">
        <button
          disabled={!canContinue}
          onClick={onNext}
          className="disabled:opacity-40 disabled:cursor-not-allowed text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          style={{ backgroundColor: "#83AA3E" }}
          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#6a8f2f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
        >
          {profileDescPageData.next_button}
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDescPage;
