import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HARDCODED_ROLES = [
  // --- IT & Software Development ---
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "Software Engineer",
  "Software Architect",
  "QA Tester",
  "Game Developer",
  "Embedded Systems Engineer",

  // --- Data, AI & Web3 ---
  "Data Scientist",
  "Data Analyst",
  "Data Engineer",
  "Business Intelligence Analyst",
  "AI Engineer",
  "Machine Learning Engineer",
  "Prompt Engineer",
  "Blockchain Developer",
  "Web3 Developer",
  "Smart Contract Developer",

  // --- Cloud, Infrastructure & Security ---
  "Cloud Engineer",
  "DevOps Engineer",
  "System Administrator",
  "Database Administrator",
  "Cybersecurity Specialist",
  "Network Engineer",
  "IT Support Specialist",

  // --- Design & Creative ---
  "Designer",
  "UI/UX Designer",
  "Graphic Designer",
  "Motion Graphics Designer",
  "Illustrator",
  "Video Editor",
  "Animator",
  "3D Artist",
  "Art Director",
  "Creative Specialist",
  "Sound Designer",

  // --- Marketing & Sales ---
  "Digital Marketer",
  "SEO Specialist",
  "SEM / PPC Specialist",
  "Social Media Manager",
  "Email Marketing Specialist",
  "Growth Hacker",
  "Content Strategist",
  "Sales Specialist",
  "Business Developer",
  "Lead Generation Specialist",

  // --- Writing & Translation ---
  "Writer",
  "Content Creator",
  "Copywriter",
  "Technical Writer",
  "Ghostwriter",
  "Copy Editor",
  "Translator",
  "Transcriptionist",

  // --- Business, Finance & HR ---
  "Project Manager",
  "Product Manager",
  "Scrum Master",
  "Finance Specialist",
  "Accountant",
  "Financial Analyst",
  "Bookkeeper",
  "Business Consultant",
  "HR Specialist",
  "Recruiter",

  // --- Admin & Customer Support ---
  "Virtual Assistant",
  "Data Entry Specialist",
  "Customer Service Representative",
  "Technical Support Specialist",
  "E-commerce Manager",

  // --- Miscellaneous ---
  "Researcher",
  "Market Researcher",
  "Legal Advisor",
  "Paralegal",
  "Instructional Designer"
];

const HeroSearchBar = ({
  placeholder,
  buttonLabel = "Mulai",
  size = "lg",
  onSubmit,
  defaultValue = "",
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const isLg = size === "lg";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (typeof onSubmit !== "function") return;
    onSubmit(value.trim());
    setIsOpen(false);
  };

  const handleSelectOption = (roleName) => {
    setValue(roleName);
    setIsOpen(false);
  };

  const filteredRoles = HARDCODED_ROLES.filter((role) =>
    role.toLowerCase().includes(value.toLowerCase())
  );

  const hasExactMatch = HARDCODED_ROLES.some(
    (role) => role.toLowerCase() === value.trim().toLowerCase()
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative w-full">
        <Search
          className={`absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 ${isLg ? "w-6 h-6" : "w-5 h-5"}`}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setValue(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
          className={`w-full bg-white shadow-xs text-slate-800 placeholder:text-slate-400 rounded-full border-2 border-slate-200 focus:outline-none focus:ring-4 transition-all ${
            isLg
              ? "pl-16 pr-40 py-5 text-lg"
              : "pl-14 pr-40 py-5 text-base"
          }`}
          style={{ "--tw-ring-color": "#83AA3E20" }}
        />
        <button
          onClick={handleSubmit}
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

      {isOpen && (value.trim() !== "" || filteredRoles.length > 0) && (
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

            {value.trim() !== "" && !hasExactMatch && (
              <button
                type="button"
                onClick={() => handleSelectOption(value.trim())}
                className="w-full px-6 py-3 hover:bg-slate-50 text-base font-bold transition-colors text-left block border-t border-slate-100 cursor-pointer"
                style={{ color: "#83AA3E" }}
              >
                {value.trim()}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchBar;