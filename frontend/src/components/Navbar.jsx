import { supabase } from '../services/supabaseClient';

const Navbar = ({ session }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getInitials = (email) => {
    return email?.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <nav className="px-10 py-5 flex items-center justify-between border-b border-gray-100">
      <a href="/" className="text-sm font-bold">gigvalue.ai</a>
      <div className="flex items-center gap-8 text-sm text-gray-600">
        <a href="/" className="hover:text-black transition">Cara kerja</a>
        <a href="/" className="hover:text-black transition">Home</a>
        <a href="/" className="hover:text-black transition">Tentang</a>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {session?.user?.email?.split('@')[0]}
        </span>
        <a href="/profile">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer hover:bg-gray-300 transition">
            {getInitials(session?.user?.email)}
          </div>
        </a>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 hover:text-black transition ml-2"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
