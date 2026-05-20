// LevelCard — uses PNG image, per-card selection border color
const LevelCard = ({ title, desc, img, alt, selected, onClick, borderColor }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-4xl p-8 pt-10 flex flex-col items-center text-center transition-all duration-300 bg-white border-7 ${
      selected
        ? `${borderColor || "border-brand"} shadow-[0_8px_40px_rgba(0,0,0,0.08)] scale-[1.02]`
        : "border-slate-100 hover:border-slate-200 hover:shadow-md"
    }`}
  >
    <div className="w-36 h-36 mb-8 flex items-center justify-center">
      <img src={img} alt={alt || title} className="w-full h-full object-contain" />
    </div>
    <h3 className="text-3xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">{desc}</p>
  </div>
);

export default LevelCard;
