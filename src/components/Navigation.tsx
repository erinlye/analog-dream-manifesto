
import { Link } from 'react-router-dom';

interface NavigationProps {
  isDisabled?: boolean;
  onDisabledClick?: () => void;
}

const Navigation = ({ isDisabled = false, onDisabledClick }: NavigationProps) => {
  const handleDisabledClick = (e: React.MouseEvent) => {
    if (isDisabled && onDisabledClick) {
      e.preventDefault();
      onDisabledClick();
    }
  };

  const linkClass = isDisabled 
    ? "text-white/60 cursor-not-allowed transition-colors" 
    : "text-white hover:text-paper-100 transition-colors";

  return (
    <header className="bg-gradient-to-r from-[#6699CC] to-[#336699] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-white hover:text-paper-100">
            analog
          </Link>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        
        <nav className="md:flex items-center gap-6 hidden">
          <Link to="/" className={linkClass}>Home</Link>
          {isDisabled ? (
            <>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Manifesto</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Communities</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Projects</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Learning</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Imagining</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Organizing</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>Plugs</a>
            </>
          ) : (
            <>
              <Link to="/manifesto" className={linkClass}>Manifesto</Link>
              <Link to="/communities" className={linkClass}>Communities</Link>
              <Link to="/projects" className={linkClass}>Projects</Link>
              <Link to="/learning" className={linkClass}>Learning</Link>
              <Link to="/imagining" className={linkClass}>Imagining</Link>
              <Link to="/organizing" className={linkClass}>Organizing</Link>
              <Link to="/plugs" className={linkClass}>Plugs</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
