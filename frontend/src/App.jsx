import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/Login';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );

  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar session={session} />
      {path === '/history' ? <History /> : <Home />}
    </div>
  );
};

export default App;