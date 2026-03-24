function Topbar({ title, onMenu }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="btn-ghost p-2 md:hidden" type="button">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-xl font-bold text-[#1A1A2E]">{title}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="btn-ghost p-2" type="button"><span className="material-symbols-outlined">search</span></button>
        <button className="btn-ghost p-2" type="button"><span className="material-symbols-outlined">notifications</span></button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A6BFF] text-sm font-semibold text-white" type="button">S</button>
      </div>
    </header>
  );
}

export default Topbar;
