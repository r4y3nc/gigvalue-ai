const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold tracking-wide">💼 GigValue AI</h1>
      <div className="flex gap-6 text-sm font-medium">
        <a href="/" className="hover:text-indigo-200 transition">Home</a>
        <a href="/history" className="hover:text-indigo-200 transition">History</a>
      </div>
    </nav>
  );
};

export default Navbar;