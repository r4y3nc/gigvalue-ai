import { TrendingUp, TrendingDown } from "lucide-react";
import { trendingSkillsTicker } from "../../data/constants";

const items = [...trendingSkillsTicker, ...trendingSkillsTicker];

const TrendingMarquee = () => (
  <div className="relative w-full overflow-hidden py-2">
    <div className="pointer-events-none absolute left-0 top-0 z-1 h-full w-28 bg-gradient-to-r from-[#f6f5f3] to-transparent" />
    <div className="pointer-events-none absolute right-0 top-0 z-1 h-full w-28 bg-gradient-to-l from-[#f6f5f3] to-transparent" />
    <div className="animate-marquee">
      {items.map((item, i) => (
        <div
          key={i}
          className="mx-3 flex shrink-0 items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm border border-slate-100"
        >
          <span className="font-semibold text-slate-800 text-sm">{item.name}</span>
          <div className={`flex items-center gap-1 font-semibold text-xs ${item.up ? "text-brand" : "text-yellow-600"}`}>
            {item.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {item.change}
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">{item.rate}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TrendingMarquee;
