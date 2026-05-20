import { Zap } from "lucide-react";
import { ctaSection } from "../data/constants";
import HeroSearchBar from "./ui/HeroSearchBar";

const CTASection = ({ onStart }) => (
  <section className="w-full max-w-5xl mx-auto px-4 py-24">
    <div className="relative rounded-[40px] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center flex flex-col items-center gap-6">

      {/* Heading */}
      <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-slate-900 max-w-2xl leading-tight">
        {ctaSection.title_1}{" "}
        <span style={{ color: "#83AA3E" }}>{ctaSection.title_highlight}</span>
      </h2>

      {/* Description */}
      <p className="relative z-10 text-slate-400 text-lg max-w-xl leading-relaxed">
        {ctaSection.desc}
      </p>

      {/* Shared search bar — same as hero */}
      <div className="relative z-10 w-full max-w-2xl">
        <HeroSearchBar
          placeholder={ctaSection.search_placeholder}
          buttonLabel={ctaSection.cta_button}
          size="md"
          onSubmit={onStart}
        />
      </div>


    </div>
  </section>
);

export default CTASection;
