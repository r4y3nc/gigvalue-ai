import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';

const App = () => {
  const path = window.location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {path === '/history' ? <History /> : <Home />}
    </div>
  );
};

export default App;