import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HeroSearchBar = ({
  placeholder,
  buttonLabel = "Mulai",
  size = "lg",
  onSubmit,
  defaultValue = "",
  roles = [],
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const containerRef = useRef(null);
  const isLg = size === "lg";

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setErrorMessage("");
    setIsOpen(true);
  };

  const handleSelectOption = (roleName) => {
    setValue(roleName);
    setErrorMessage("");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (typeof onSubmit !== "function") return;
    
    const trimmedValue = value.trim();

    const validRole = roles.find(
      (role) => role.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (!validRole) {
      setErrorMessage("Silakan pilih role yang tersedia pada daftar di bawah.");
      setIsOpen(true);
      return;
    }

    setErrorMessage("");
    onSubmit(validRole);
    setIsOpen(false);
  };

  const filteredRoles = value.trim() === "" 
    ? [] 
    : roles.filter((role) =>
        role.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center bg-white border rounded-full shadow-sm transition-all px-4 py-2 ${
          errorMessage ? "border-red-500 ring-4 ring-red-50" : "border-slate-200 focus-within:border-slate-400"
        }`}
      >
        <Search className="text-slate-400 w-5 h-5 ml-2 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={placeholder}
          className="w-full pl-3 pr-4 py-2 text-slate-700 bg-transparent placeholder:text-slate-400 font-medium focus:outline-none text-base md:text-lg"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white px-6 py-3 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          style={{ backgroundColor: "#83AA3E" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a8f2f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#83AA3E")}
        >
          {buttonLabel}
          {isLg ? <ArrowRight className="w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold mt-2 pl-6 text-left animate-pulse">
          {errorMessage}
        </p>
      )}

      {isOpen && filteredRoles.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-md z-[9999] overflow-hidden">
          <div className="h-auto max-h-[196px] overflow-y-auto py-1 text-left">
            {filteredRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleSelectOption(role)}
                className="w-full px-6 py-3 text-slate-700 hover:bg-slate-50 text-base font-medium transition-colors text-left block cursor-pointer"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchBar;
