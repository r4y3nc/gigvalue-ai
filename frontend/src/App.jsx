import { useState, useEffect } from "react";
import usePrediction from "./hooks/usePrediction";
import { AnimatePresence } from "motion/react";
import Header from "./components/ui/Header";
import LandingPage from "./pages/LandingPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import ProfileDescPage from "./pages/ProfileDescPage";
import OptionalDetailsPage from "./pages/OptionalDetailsPage";
import ExtraInfoPage from "./pages/ExtraInfoPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import { hero } from "./data/constants";

export default function App() {
  const [step, setStep] = useState(0);
  const { result, predict, reset, loading, error } = usePrediction();

  // 🌟 State local untuk menampung pesan error validasi secara modern
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (result) {
      sessionStorage.setItem("predictionResult", JSON.stringify(result));
    }
  }, [result]);

  // 🌟 Reset error setiap kali user berpindah halaman/step
  useEffect(() => {
    setValidationError("");
  }, [step]);

  const [level, setLevel] = useState(null);
  const [skills, setSkills] = useState([]);
  const initialProfile = {
    role: hero.search_value,
    extraSkills: "",
    profileDesc: "",
    achievements: "",
    targetIndustry: "",
    targetRate: 0,
    country: "Indonesia",
    reviewCount: 0,
    rating: 0,
  };
  const [profile, setProfile] = useState(initialProfile);
  const [pendingScrollId, setPendingScrollId] = useState(null);

  const scrollToId = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 104;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const handleNavigate = (id) => {
    if (!id) return;
    if (step === 0) return scrollToId(id);

    setPendingScrollId(id);
    setStep(0);
  };

  useEffect(() => {
    if (pendingScrollId && step === 0) {
      requestAnimationFrame(() => {
        scrollToId(pendingScrollId);
        setPendingScrollId(null);
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, pendingScrollId]);

  const resetAll = () => {
    setLevel(null);
    setSkills([]);
    setProfile(initialProfile);
    reset();
    sessionStorage.removeItem("predictionResult");
    setStep(0);
  };

  // 🌟 Validasi Step 0 (Landing Page)
  const handleStart = (roleValue) => {
    const nextRole = (roleValue || "").trim();
    
    if (!nextRole) {
      setValidationError("Peran atau profesi wajib diisi untuk memulai analisis!");
      return; 
    }

    setValidationError("");
    setProfile((prev) => ({ ...prev, role: nextRole }));
    setStep(1);
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-lime-200">
      {step !== 7 && <Header onNavigate={handleNavigate} />}
      <main className="flex-1 flex flex-col grow relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <LandingPage 
              key="step-0" 
              onStart={handleStart} 
              errorMessage={validationError} // ⬅️ Oper ke LandingPage
            />
          )}
          {step === 1 && (
            <ExperiencePage
              key="step-1"
              level={level}
              setLevel={setLevel}
              role={profile.role}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <SkillsPage
              key="step-2"
              skills={skills}
              setSkills={setSkills}
              profile={profile}
              setProfile={setProfile}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <ProfileDescPage
              key="step-3"
              profile={profile}
              setProfile={setProfile}
              errorMessage={validationError} // ⬅️ Oper ke ProfileDescPage
              onNext={() => {
                const textLength = (profile.profileDesc || "").trim().length;
                if (textLength < 20) {
                  setValidationError(`Deskripsi terlalu pendek (minimal 20 karakter, saat ini: ${textLength} karakter).`);
                  return; 
                }
                setValidationError("");
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <OptionalDetailsPage
              key="step-4"
              profile={profile}
              setProfile={setProfile}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <ExtraInfoPage
              key="step-5"
              profile={profile}
              setProfile={setProfile}
              onNext={() => {
                const allSkills = [...skills];
                if (profile.extraSkills && profile.extraSkills.trim() !== "") {
                  allSkills.push(profile.extraSkills.trim());
                }

                let finalDescription = profile.profileDesc || "";
                if (profile.achievements && profile.achievements.trim() !== "") {
                  finalDescription += `\n\nPencapaian Terbesar: ${profile.achievements.trim()}`;
                }

                predict({
                  category: profile.role || "unknown",
                  experience_level: level,
                  skills: allSkills,
                  description: finalDescription,
                  country: profile.country || "unknown",
                  client_rating: profile.rating || 0.0,
                  client_review_count: profile.reviewCount || 0,
                });

                setStep(6);
              }}
              onBack={() => setStep(4)}
            />
          )}
          {step === 6 && (
            <LoadingPage 
              key="step-6" 
              isLoading={loading} 
              onComplete={() => {
                if (error) {
                  setValidationError(`Gagal mengambil prediksi: ${error}`);
                  setStep(5);
                } else {
                  setStep(7);
                }
              }} 
            />
          )}
          {step === 7 && <ResultPage key="step-7" result={result} onReset={resetAll} profile={profile} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
