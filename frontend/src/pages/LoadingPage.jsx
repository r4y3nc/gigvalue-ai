import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import ProgressBar from "../components/ui/ProgressBar";
import { loadingSteps, loadingPageData } from "../data/constants";
import brainImg from "../assets/bigclay/brain.png";

const LoadingPage = ({ onComplete, isLoading }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeStep === loadingSteps.length - 1 && !isLoading) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [activeStep, isLoading, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto flex flex-col pt-4 px-4 overflow-hidden"
    >
      <div className="mb-20">
        <ProgressBar currentStep={5} />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-16 mt-8 max-w-4xl mx-auto w-full px-4">
        <div className="w-40 h-40 md:w-52 md:h-52 shrink-0">
          <img
            src={brainImg}
            alt={loadingPageData.alt_brain}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 mt-6">
          <h2 className="text-4xl font-extrabold mb-12 text-slate-900">{loadingPageData.title}</h2>
          <div className="flex flex-col gap-6">
            {loadingSteps.map((text, i) => (
              <div
                key={text}
                className={`flex items-center gap-4 text-xl font-medium transition-all duration-700 ${
                  i <= activeStep ? "opacity-100 text-slate-700" : "opacity-20 text-slate-300 translate-y-2"
                }`}
              >
                {i < activeStep ? (
                  <CheckCircle2 className="w-8 h-8 shrink-0" style={{ color: "#83AA3E" }} />
                ) : i === activeStep ? (
                  <div className="w-8 h-8 rounded-full border-4 border-slate-200 shrink-0 animate-spin" style={{ borderTopColor: "#83AA3E" }} />
                ) : (
                  <div className="w-8 h-8 rounded-full border-4 border-slate-200 shrink-0" />
                )}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
