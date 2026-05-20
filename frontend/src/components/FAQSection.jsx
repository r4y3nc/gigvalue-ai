import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "../data/constants";

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-semibold text-slate-900 text-base md:text-lg pr-4">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180 text-brand" : ""}`}
        />
      </button>
      <div className={`accordion-content ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="pb-6 text-slate-500 text-base leading-relaxed pr-10">{a}</p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="w-full max-w-3xl mx-auto px-4 py-24">
    <div className="text-center mb-16">
      <span className="inline-block bg-brand-light text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
        {faqData.badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{faqData.title}</h2>
      <p className="text-slate-500 text-lg max-w-xl mx-auto">{faqData.desc}</p>
    </div>
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-6 md:px-10">
      {faqData.items.map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  </section>
);

export default FAQSection;
