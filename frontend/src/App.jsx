import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import { getProfile } from './services/api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';

const App = () => {
  const [session, setSession] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkProfile(session);
      } else {
        setLoading(false);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkProfile(session);
      } else {
        setHasProfile(null);
        setLoading(false);
      }
    });
  }, []);

  const checkProfile = async (session) => {
    try {
      const res = await getProfile(session.access_token);
      setHasProfile(res.data !== null);
    } catch {
      setHasProfile(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );

  if (!session) return <Login />;

  if (!hasProfile) return (
    <Onboarding
      session={session}
      onComplete={() => setHasProfile(true)}
    />
  );

  const renderPage = () => {
    switch (path) {
      case '/profile': return <Profile session={session} />;
      default: return <Home session={session} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar session={session} />
      {renderPage()}
    </div>
  );
};

export default App;