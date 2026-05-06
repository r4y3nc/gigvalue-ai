import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/';
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">
          gigvalue.ai
        </p>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Temukan Tarif Jasa Anda di Pasar Global.
        </h1>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-black">
        <div className="max-w-md w-full mx-auto">

          {/* Toggle Login/Signup */}
          <div className="flex gap-6 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(null); setMessage(null); }}
              className={`text-sm font-medium pb-1 border-b-2 transition ${
                isLogin
                  ? 'text-white border-white'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); setMessage(null); }}
              className={`text-sm font-medium pb-1 border-b-2 transition ${
                !isLogin
                  ? 'text-white border-white'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-black px-4 py-4 rounded-none text-sm focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-black px-4 py-4 rounded-none text-sm focus:outline-none"
            />

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            {message && (
              <p className="text-green-400 text-xs">{message}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-black py-4 text-sm font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
