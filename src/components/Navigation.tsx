
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className="border-b border-paper-300/40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl">
            analog
          </Link>
          <button className="md:hidden">
            {/* Menu button for mobile - could be expanded */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        
        <nav className="md:flex items-center gap-6 hidden">
          <Link to="/" className="hover:text-ink-400 transition-colors">Home</Link>
          <Link to="/manifesto" className="hover:text-ink-400 transition-colors">Manifesto</Link>
          <Link to="/communities" className="hover:text-ink-400 transition-colors">Communities</Link>
          <Link to="/projects" className="hover:text-ink-400 transition-colors">Projects</Link>
          <Link to="/learning" className="hover:text-ink-400 transition-colors">Learning</Link>
          <Link to="/imagining" className="hover:text-ink-400 transition-colors">Imagining</Link>
          <Link to="/organizing" className="hover:text-ink-400 transition-colors">Organizing</Link>
          <Link to="/plugs" className="hover:text-ink-400 transition-colors">Plugs</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
