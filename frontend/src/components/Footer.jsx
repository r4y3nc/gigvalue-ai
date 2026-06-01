import footerIllustration from "../assets/bigclay/footerilustration.png";
import randomClay1Img from "../assets/bigclay/randomclay1.png";
import { footerData, ctaSection } from "../data/constants";
import HeroSearchBar from "./ui/HeroSearchBar";

const Footer = ({ onStart }) => (
  <footer className="w-full">
    <div className="relative w-full">

      {/* ── Fade: white → transparent at top of illustration ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "280px",
          background:
            "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.9) 25%, transparent 100%)",
        }}
      />

      {/* ── CTA — overlaid at top of illustration ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center px-4 pt-20 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight text-center">
          {ctaSection.title_1}{" "}
          <span style={{ color: "#83AA3E" }}>{ctaSection.title_highlight}</span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-lg text-center leading-relaxed">
          {ctaSection.desc}
        </p>
    
      </div>

      {/* ── Footer nav card — overlaid at bottom of illustration ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4">
        <div
          className="relative max-w-6xl mx-auto rounded-[28px] overflow-hidden bg-white/95 backdrop-blur"
  
        >
         

          {/* Headline */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 px-10 pt-10 pb-8 border-b border-stone-200">
            <div className="max-w-sm">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                {footerData.headline}
              </h2>
              <div className="font-bold text-base text-slate-900 tracking-tight">
                {footerData.brand_name}
              </div>
            </div>
             <img
            src={randomClay1Img}
            alt="Ilustrasi"
            className="pointer-events-none select-none w-60"
          />
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-10 py-8 border-b border-stone-200">
            {footerData.columns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-10 py-5">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} {footerData.copyright}
            </p>
            <p className="text-slate-400 text-xs">{footerData.disclaimer}</p>
          </div>
        </div>
      </div>

      {/* ── Illustration — normal flow, full width, NEVER cropped ── */}
      <img
        src={footerIllustration}
        alt="GigValue AI footer illustration"
        className="w-full block"
      />
    </div>
  </footer>
);

export default Footer;
