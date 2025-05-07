
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
    : "text-white hover:text-yellow-200 transition-colors";

  return (
    <header className="bg-[#6CADDE] shadow-retro-lg border-b-2 border-[#3080C0]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-comic text-4xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] hover:text-yellow-200">
            analog
          </Link>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        
        <nav className="md:flex items-center gap-4 hidden">
          <Link to="/" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>home</Link>
          {isDisabled ? (
            <>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>manifesto</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>communities</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>projects</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>learning</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>imagining</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>organizing</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>plugs</a>
              <a href="#" onClick={handleDisabledClick} className={linkClass}>norms</a>
            </>
          ) : (
            <>
              <Link to="/manifesto" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>manifesto</Link>
              <Link to="/communities" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>communities</Link>
              <Link to="/projects" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>projects</Link>
              <Link to="/learning" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>learning</Link>
              <Link to="/imagining" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>imagining</Link>
              <Link to="/organizing" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>organizing</Link>
              <Link to="/plugs" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>plugs</Link>
              <Link to="/norms" className={`${linkClass} font-comic text-sm bg-[#3080C0] px-3 py-1 rounded-md border border-[#246090] hover:bg-[#246090]`}>norms</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
