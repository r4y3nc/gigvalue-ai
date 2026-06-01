import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import LevelCard from "../components/ui/LevelCard";
import { experiencePageData } from "../data/constants";

import beginnerImg from "../assets/bigclay/beginer.png";
import intermediateImg from "../assets/bigclay/intermediate.png";
import expertImg from "../assets/bigclay/expert.png";

const levelImages = [beginnerImg, intermediateImg, expertImg];

const ExperiencePage = ({ onNext, onBack, level, setLevel, role }) => {
  
  const dynamicTitle = role && role.trim() !== ""
    ? `Seberapa berpengalaman kamu di ${role}?`
    : "Seberapa berpengalaman kamu di bidang ini?";

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
        <ArrowLeft className="w-4 h-4" /> {experiencePageData.back_label}
      </button>
      <ProgressBar currentStep={1} />
      
      <div className="text-center mb-16 mt-6">
        <h2 className="text-4xl font-extrabold mb-4 text-slate-900">{dynamicTitle}</h2>
        <p className="text-slate-500 text-lg">{experiencePageData.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {experiencePageData.levels.map((lvl, i) => (
          <LevelCard
            key={lvl.id}
            title={lvl.title}
            desc={lvl.desc}
            img={levelImages[i]}
            alt={lvl.alt}
            borderColor={lvl.borderColor}
            selected={level === lvl.id}
            onClick={() => setLevel(lvl.id)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          disabled={!level}
          onClick={onNext}
          className="disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ backgroundColor: "#83AA3E" }}
          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#6a8f2f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
        >
          {experiencePageData.next_button}
        </button>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;
