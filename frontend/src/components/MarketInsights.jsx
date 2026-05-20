import { TrendingUp, TrendingDown } from "lucide-react";
import { trendingSkillsTicker, emergingRoles, inDemandSkills, marketInsightsText } from "../data/constants";
import randomClay1Img from "../assets/bigclay/randomclay1.png";
import bagjobImg from "../assets/bigclay/bagjob.png";

const MarketInsights = () => (
  <div className="relative w-full mt-2 mb-10 overflow-hidden">
    <img
      src={bagjobImg}
      alt="Bag job"
      className="hidden lg:block pointer-events-none select-none absolute right-[-360px] top-1/2 -translate-y-1/2 w-[720px] xl:w-[820px] h-auto object-contain"
    />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col gap-16">
      {/* Trending Skills */}
      <div>
     <div className="flex justify-between items-start">
      <div>
        <h3 className="text-5xl font-extrabold text-slate-900 self-start">
          {marketInsightsText.trending_title}
        </h3>
        <p className="text-xl mt-4 text-slate-600">
          {marketInsightsText.trending_text}
        </p>
      </div>

        <img
          src={randomClay1Img}
          alt="Ilustrasi"
          className="pointer-events-none select-none w-32 md:w-55 object-contain"
        />
      </div>
      </div>

      {/* Emerging Roles & In-demand Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-50 rounded-3xl p-8 md:p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">{marketInsightsText.emerging_title}</h3>
        <div className="flex flex-col gap-6">
          {emergingRoles.map((role, i) => (
            <div key={i} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-slate-900">{role.title}</h4>
                <span className="font-bold text-slate-700 bg-white px-3 py-1 rounded-xl shadow-sm text-sm shrink-0">
                  {role.rate}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-3">{role.desc}</p>
              <span className="inline-flex items-center gap-1 font-bold text-xs px-2 py-1 rounded-lg w-fit bg-brand-light text-brand">
                <TrendingUp className="w-3.5 h-3.5" /> {role.change} {marketInsightsText.growth_suffix}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-10 border-5 border-slate-100 shadow-xs">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">{marketInsightsText.indemand_title}</h3>
        <div className="flex flex-col gap-8">
          {inDemandSkills.map((category, i) => (
            <div key={i}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  </div>
);

export default MarketInsights;
