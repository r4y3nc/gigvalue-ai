import { Search, ArrowRight } from "lucide-react";

/**
 * HeroSearchBar — reusable search bar used in Hero and CTA sections.
 * Props:
 *   placeholder  — input placeholder text
 *   buttonLabel  — button text (defaults to "Mulai")
 *   size         — "lg" (hero) | "md" (cta), defaults to "lg"
 *   onSubmit     — callback when button is clicked
 *   defaultValue — controlled input value (optional)
 */
const HeroSearchBar = ({
  placeholder,
  buttonLabel = "Mulai",
  size = "lg",
  onSubmit,
  defaultValue = "",
}) => {
  const isLg = size === "lg";

  return (
    <div className={`relative w-full ${isLg ? "max-w-2xl" : "max-w-2xl"}`}>
      <Search
        className={`absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 ${isLg ? "w-6 h-6" : "w-5 h-5"}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full bg-white shadow-xs text-slate-800 placeholder:text-slate-400 rounded-full border-2 border-slate-200 focus:outline-none focus:ring-4 transition-all ${
          isLg
            ? "pl-16 pr-40 py-5 text-lg"
            : "pl-14 pr-40 py-5 text-base"
        }`}
        style={{ "--tw-ring-color": "#83AA3E25" }}
      />
      <button
        onClick={onSubmit}
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md cursor-pointer ${
          isLg ? "px-6 py-3.5 text-base" : "px-7 py-3.5 text-sm"
        }`}
        style={{ backgroundColor: "#83AA3E" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a8f2f")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
      >
        {buttonLabel}
        {isLg ? <ArrowRight className="w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default HeroSearchBar;
