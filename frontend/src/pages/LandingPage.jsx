import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import MarketInsights from "../components/MarketInsights";
import TrendingMarquee from "../components/ui/TrendingMarquee";
import HeroSearchBar from "../components/ui/HeroSearchBar";
import Footer from "../components/Footer";

import expertImg from "../assets/bigclay/expert.png";
import laptopImg from "../assets/bigclay/laptop.png";
import coinImg from "../assets/bigclay/coin.png";
import accuracyImg from "../assets/bigclay/accuracy.png";
import upworkuserImg from "../assets/bigclay/upworkuser.png";
import timerImg from "../assets/bigclay/timer.png";
import creditCardImg from "../assets/bigclay/creditcard.png";
import upworkImg from "../assets/bigclay/upwork.png";
import moneyImg from "../assets/bigclay/money.png";
import personWithMoneyImg from "../assets/bigclay/personwithmoney.png";
import stockupImg from "../assets/bigclay/stockup.png";
import bagjobImg from "../assets/bigclay/bagjob.png";
import personGetSalaryImg from "../assets/bigclay/persongetsalary.png";

import number1Img from "../assets/bigclay/number1.png";
import number2Img from "../assets/bigclay/number2.png";
import number3Img from "../assets/bigclay/number3.png";

import { hero, stats, howItWorks } from "../data/constants";
import { getRoles } from "../services/api";

const stepImages = [expertImg, laptopImg, coinImg];
const stepNumberImages = [number1Img, number2Img, number3Img];

const AccordionStepBadge = ({ src, label }) => {
  const [imageBroken, setImageBroken] = useState(false);

  if (!src || imageBroken) {
    return (
      <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand font-semibold text-xs">
        {label}
      </div>
    );
  }

  return <img src={src} alt={label} className="w-12 h-12 object-contain" onError={() => setImageBroken(true)} />;
};

const statsCardImages = [upworkuserImg, accuracyImg, timerImg, creditCardImg];

const RevealSection = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const StatsShowcase = () => (
  <section className="w-full max-w-5xl mx-auto px-4 mt-10 mb-24">
    <div className="mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">{stats.section_title}</h2>
      <p className="text-slate-500 text-lg mt-4 max-w-2xl leading-relaxed">{stats.section_desc}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
      {stats.cards.map((card, i) => (
        <div key={card.title}>
          <div className=" rounded-3xl p-6 md:p-7 border-5 border-slate-100">
            <div className="h-56 flex items-center justify-center">
              <img
                src={statsCardImages[i]}
                alt={card.alt}
                className="max-h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-bold text-slate-900 mt-2 leading-snug">{card.title}</h3>
            <p className="text-slate-500 mt-3 leading-relaxed">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorksAccordion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = howItWorks.steps[activeStep];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 mb-28">
      <div className="text-left mb-6">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{howItWorks.section_title}</h2>
        <p className="text-slate-500 text-lg max-w-2xl">{howItWorks.section_desc}</p>
      </div>

      <div className="bg-white rounded-4xl border-5 border-slate-100 shadow-xs p-5 md:p-8">
        <div className="grid md:grid-cols-[1.06fr_0.94fr] gap-8 md:gap-10 items-center">
          <div>
            <div className="space-y-2">
              {howItWorks.steps.map((step, index) => {
                const isOpen = activeStep === index;
                return (
                  <div key={step.number} className={`group border-b ${isOpen ? "border-b-transparent" : "border-slate-200"} last:border-b-0 hover:border-b-transparent`}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left px-3 md:px-4 py-5 md:py-6 transition-all duration-200 cursor-pointer ${
                        isOpen ? "bg-white rounded-2xl" : "rounded-none"
                      } group-hover:bg-slate-50 group-hover:rounded-2xl group-hover:border-b-transparent`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex-none w-12 h-12 flex items-center justify-center">
                          <AccordionStepBadge src={stepNumberImages[index]} label={step.number} />
                        </div>
                        <div className="flex-1 pr-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="max-w-[420px]">
                              <div className="text-lg md:text-xl font-bold text-slate-900">{step.title}</div>
                              <AnimatePresence initial={false} mode="wait">
                                {isOpen ? (
                                  <motion.div
                                    key={`open-${step.number}`}
                                    initial={{ opacity: 0, y: -8, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -8, height: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                                      {step.desc}
                                    </div>
                                  </motion.div>
                                ) : null}
                              </AnimatePresence>
                            </div>
                            <ChevronDown className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[320px] md:min-h-[420px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="w-full max-w-[320px] md:max-w-[360px] flex items-center justify-center"
              >
                <img
                  src={stepImages[activeStep]}
                  alt={currentStep.alt}
                  className="w-full h-auto max-h-[360px] object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage = ({ onStart, errorMessage, role }) => {
  const [searchVal, setSearchVal] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const response = await getRoles();
        if (response.success && response.data?.roles) {
          setRoles(response.data.roles);
        }
      } catch (err) {
        console.warn("Gagal mengambil roles dari API.", err);
      }
    };
    fetchRolesData();
  }, []);

  const handleSearch = (value) => {
    onStart(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center"
    >
      {/* ── HERO ── */}
      <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center text-center py-10 overflow-hidden">
        <img
          src={upworkImg}
          alt="Upwork"
          className="hidden lg:block pointer-events-none select-none absolute left-1/2 -translate-x-[640px]  top-28 xl:top-32 w-24 xl:w-28 h-auto object-contain rotate-[-15deg] z-0"
        />
        <img
          src={moneyImg}
          alt="Money"
          className="hidden lg:block pointer-events-none select-none absolute left-1/2 -translate-x-[700px]  top-60 xl:top-80 w-28 xl:w-36 h-auto object-contain z-0"
        />
        <img
          src={personWithMoneyImg}
          alt="Person with money"
          className="hidden lg:block pointer-events-none select-none absolute left-1/2 translate-x-[620px]  top-40 w-[430px] h-auto object-contain z-0"
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.05]">
            {hero.heading_1}{" "}
            <span className="relative inline-block">
              <span style={{ color: "#83AA3E" }}>{hero.heading_highlight}</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="#83AA3E" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            {hero.heading_2}
            <br />
            {hero.heading_3}{" "}
            <span style={{ color: "#83AA3E" }}>{hero.heading_highlight_2}</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-6 mx-auto">
            {hero.subheading}
          </p>

          <div className="w-full max-w-2xl mb-8 mx-auto">
            <HeroSearchBar
              placeholder={hero.search_placeholder}
              buttonLabel={hero.cta_button}
              size="lg"
              defaultValue={role || hero.search_value} 
              onSubmit={onStart}
              roles={roles}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm font-semibold mt-3 text-center animate-pulse">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-slate-600">
              <Lock className="w-4 h-4" />
              <span style={{ fontFamily: "Inter" }} className="text-sm font-medium">{hero.data_badge}</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 mb-4">
          <TrendingMarquee />
        </div>
      </section>

      {/* ── STATS (showcase) ── */}
      <RevealSection className="w-full">
        <div id="keunggulan" className="w-full">
          <StatsShowcase />
        </div>
      </RevealSection>

      {/* ── HOW IT WORKS ── */}
      <RevealSection className="w-full">
        <div id="cara-kerja" className="w-full">
          <HowItWorksAccordion />
        </div>
      </RevealSection>

      {/* ── MARKET INSIGHTS ── */}
      <RevealSection className="w-full">
        <div id="market" className="w-full">
          <MarketInsights />
        </div>
      </RevealSection>

      {/* ── SOLUTION ── */}
      <RevealSection className="w-full max-w-5xl mx-auto px-4 py-16">
        <div className="relative">
          <div id="manfaat" className="grid md:grid-cols-2 gap-8 items-center md:items-stretch">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Yang kamu dapat setelah pakai gigvalue</h2>
              <p className="text-slate-500 mt-4">
                Range tarif berbasis data Upwork, confidence score untuk bantu ambil keputusan, plus rekomendasi skill dan referensi lowongan terkait.
              </p>

              <div className="mt-8 bg-white rounded-2xl p-6 border-5 border-slate-100 shadow-sm">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <img src={coinImg} alt="Coin" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="font-semibold">Range tarif yang realistis</div>
                      <div className="text-sm text-slate-500">Lihat estimasi harga pasar untuk role kamu berdasarkan pola tarif freelancer di Upwork.</div>
                    </div>
                  </li>

                  <li className="flex items-center gap-4">
                    <img src={accuracyImg} alt="Accuracy" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="font-semibold">Confidence score</div>
                      <div className="text-sm text-slate-500">Tahu seberapa yakin model dengan prediksi—biar kamu nggak sekadar “nebak angka”.</div>
                    </div>
                  </li>

                  <li className="flex items-center gap-4">
                    <img src={stockupImg} alt="Stock up" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="font-semibold">Rekomendasi skill untuk naik tarif</div>
                      <div className="text-sm text-slate-500">Dapat daftar skill yang relevan untuk meningkatkan batas atas tarif kamu.</div>
                    </div>
                  </li>

                  <li className="flex items-center gap-4">
                    <img src={bagjobImg} alt="Bag job" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="font-semibold">Lowongan terkait sebagai referensi</div>
                      <div className="text-sm text-slate-500">Cek pekerjaan serupa di Upwork untuk validasi tarif dan arah karier.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center md:items-stretch md:justify-end h-full">
              <div className="w-full md:max-w-[560px] h-full rounded-2xl overflow-hidden shadow-sm border-5 border-slate-100">
                <img
                  src={personGetSalaryImg}
                  alt="Person getting salary"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── FOOTER ── */}
      <Footer onStart={onStart} />
    </motion.div>
  );
};

export default LandingPage;
