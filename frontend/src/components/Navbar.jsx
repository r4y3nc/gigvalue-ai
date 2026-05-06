import { supabase } from '../services/supabaseClient';

const Navbar = ({ session }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold tracking-wide">💼 GigValue AI</h1>
      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="/" className="hover:text-indigo-200 transition">Home</a>
        <a href="/history" className="hover:text-indigo-200 transition">History</a>
        <span className="text-indigo-200">{session?.user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-50 transition text-xs font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;