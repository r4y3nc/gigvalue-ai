import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./components/ui/Header";
import LandingPage from "./pages/LandingPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(null);
  const [skills, setSkills] = useState([]);
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
    setStep(0);
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-lime-200">
      {step !== 4 && <Header onNavigate={handleNavigate} />}
      <main className="flex-1 flex flex-col grow relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <LandingPage key="step-0" onStart={() => setStep(1)} />
          )}
          {step === 1 && (
            <ExperiencePage
              key="step-1"
              level={level}
              setLevel={setLevel}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <SkillsPage
              key="step-2"
              skills={skills}
              setSkills={setSkills}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <LoadingPage key="step-3" onComplete={() => setStep(4)} />
          )}
          {step === 4 && <ResultPage key="step-4" onReset={resetAll} />}
        </AnimatePresence>
      </main>
    </div>
  );
}