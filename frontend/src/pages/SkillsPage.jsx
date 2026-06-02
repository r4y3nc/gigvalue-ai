import { useState, useEffect } from "react";
import { Search, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { skillsPageData } from "../data/constants";
import laptopImg from "../assets/bigclay/laptop.png";
import { getSkills } from "../services/api";

const SkillsPage = ({ onNext, onBack, skills, setSkills, profile, setProfile }) => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const dataJson = await getSkills();
        
        if (dataJson.success && dataJson.data?.skills) {
          setAvailableSkills(dataJson.data.skills);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Gagal memuat daftar skill:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();

    return () => {
      controller.abort();
    };
  }, []);

  const toggleSkill = (s) =>
    setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const updateProfile = (updates) =>
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));

  const getDisplayedSkills = () => {
    const unselectedSkills = availableSkills.filter((skill) => !skills.includes(skill));

    if (searchQuery.trim() !== "") {
      return unselectedSkills
        .filter((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 10);
    }

    const roleLower = (profile.role || "").toLowerCase();
    
    const matchedSkills = unselectedSkills.filter((skill) => {
      const skillLower = skill.toLowerCase();
      
      if (roleLower.includes("data") || roleLower.includes("ml") || roleLower.includes("science") || roleLower.includes("python")) {
        return ["python", "tensorflow", "pytorch", "postgresql", "mongodb", "aws", "kubernetes"].includes(skillLower);
      }
      if (roleLower.includes("web") || roleLower.includes("react") || roleLower.includes("front") || roleLower.includes("dev")) {
        return ["react", "next.js", "typescript", "tailwind css", "fastapi", "docker", "graphql"].includes(skillLower);
      }
      
      return skillLower.includes(roleLower) || roleLower.includes(skillLower);
    });

    const combinedUnique = Array.from(new Set([...matchedSkills, ...unselectedSkills]));
    
    return combinedUnique.slice(0, 7);
  };

  const displayedSkills = getDisplayedSkills();

  const canContinue = skills.length > 0 || (profile?.extraSkills || "").trim() !== "";

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

      <div className="relative w-full mb-8">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={skillsPageData.search_placeholder}
          className="w-full pl-16 pr-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-4 text-lg bg-white"
          style={{ "--tw-ring-color": "#83AA3E20" }}
        />
      </div>

      <div className="w-full max-w-3xl">
        <h3 className="font-bold text-slate-800 text-lg mb-4">
          {skillsPageData.selected_label} ({skills.length})
        </h3>
        
        {skills.length > 0 && (
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {skills.map((selectedSkill) => (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={`selected-${selectedSkill}`}
                    onClick={() => toggleSkill(selectedSkill)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 font-bold text-sm transition-all cursor-pointer text-slate-800 bg-white shadow-sm"
                    style={{ borderColor: "#83AA3E" }}
                  >
                    {selectedSkill}
                    <X className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 mb-20">
          {loading ? (
            <div className="text-slate-400 text-sm italic">Memuat rekomendasi teknologi...</div>
          ) : displayedSkills.length === 0 ? (
            <div className="text-slate-400 text-sm italic">
              Skill tidak ditemukan. Silakan ketik manual di bawah.
            </div>
          ) : (
            displayedSkills.map((s) => {
              return (
                <button
                  key={`suggestion-${s}`}
                  onClick={() => {
                    toggleSkill(s);
                    if (searchQuery !== "") setSearchQuery(""); 
                  }}
                  className="px-6 py-3 rounded-full border-2 font-semibold text-base transition-all bg-white cursor-pointer border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"
                >
                  {s}
                </button>
              );
            })
          )}
        </div>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 mb-16">
          {skillsPageData.extra_label}
          <input
            type="text"
            value={profile.extraSkills || ""}
            onChange={(event) => updateProfile({ extraSkills: event.target.value })}
            placeholder={skillsPageData.extra_placeholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4"
            style={{ "--tw-ring-color": "#83AA3E20" }}
          />
        </label>
      </div>

      <div className="flex justify-end mt-auto mb-12">
        <button
          disabled={!canContinue}
          onClick={onNext}
          className="disabled:opacity-40 disabled:cursor-not-allowed text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
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
