import { headerData } from "../../data/constants";
import { useEffect, useState } from "react";

const Header = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (target) => {
    if (!target) return;
    if (typeof onNavigate === "function") return onNavigate(target);

    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full">
      {isScrolled ? <div className="h-[76px]" /> : null}
      <header className={`w-full z-50 ${isScrolled ? "fixed top-4 left-0" : "relative"}`}>
        <div className={`mx-auto ${isScrolled ? "max-w-6xl px-4" : "max-w-7xl px-6 md:px-12"}`}>
          <div
            className={`flex items-center justify-between ${
              isScrolled
                ? "rounded-full bg-white/75 backdrop-blur px-6 py-3 shadow-sm"
                : "py-5"
            }`}
          >
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-900 cursor-pointer"
            >
              {headerData.brand}
            </button>

            <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
              {headerData.nav.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => handleNavClick(item.target)}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
