import { Search, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { allSkills, skillsPageData } from "../data/constants";
import laptopImg from "../assets/bigclay/laptop.png";

const SkillsPage = ({ onNext, onBack, skills, setSkills }) => {
  const toggleSkill = (s) =>
    setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

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
        <ArrowLeft className="w-4 h-4" /> {skillsPageData.back_label}
      </button>
      <ProgressBar currentStep={2} />
      <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-16 mt-10">
        <div className="shrink-0 w-32 h-32 md:w-40 md:h-40">
          <img src={laptopImg} alt={skillsPageData.alt_laptop} className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-slate-900 leading-tight">
            {skillsPageData.title_1}
            <br className="hidden md:block" />
            {skillsPageData.title_2}
          </h2>
          <p className="text-slate-500 text-lg font-medium">{skillsPageData.subtitle}</p>
        </div>
      </div>
      <div className="relative w-full mb-12">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder={skillsPageData.search_placeholder}
          className="w-full pl-16 pr-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-4 text-lg bg-white"
          style={{ "--tw-ring-color": "#83AA3E20" }}
        />
      </div>
      <div className="w-full max-w-3xl">
        <h3 className="font-bold text-slate-800 text-lg mb-6">
          {skillsPageData.selected_label} ({skills.length})
        </h3>
        <div className="flex flex-wrap gap-3 mb-20">
          {allSkills.map((s) => {
            const isSelected = skills.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={`px-6 py-3 rounded-full border-4 font-semibold text-base transition-all bg-white cursor-pointer ${
                  isSelected
                    ? "border-brand text-slate-800 shadow-[0_1px_4px_rgba(131,170,62,0.15)]"
                    : "border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end mt-auto mb-12">
        <button
          disabled={skills.length === 0}
          onClick={onNext}
          className="disabled:opacity-40 disabled:cursor-not-allowed text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ backgroundColor: "#83AA3E" }}
          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#6a8f2f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
        >
          {skillsPageData.next_button}
        </button>
      </div>
    </motion.div>
  );
};

export default SkillsPage;
