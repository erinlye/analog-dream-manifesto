
import Navigation from '../components/Navigation';

const Plugs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Shameless Plugs</h1>
            <p className="text-ink-400">
              Events and achievements related to low-tech living.
            </p>
          </header>
          
          <div className="analog-paper text-center py-10">
            <h2 className="text-xl font-serif mb-4">Coming Soon</h2>
            <p>The Shameless Plugs section is under development. Check back shortly!</p>
          </div>
        </div>
      </main>
      <footer className="border-t border-paper-300/40 py-8 mt-16">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community • <a href="#" className="analog-link">Contact</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Plugs;
