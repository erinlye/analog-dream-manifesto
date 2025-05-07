
import Navigation from '../components/Navigation';
import ManifestoEntries from '../components/ManifestoEntries';

const Manifesto = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Manifesto of Analog Dreams</h1>
            <p className="text-ink-400 font-sans">
              Our collective vision for a more intentional relationship with technology.
            </p>
          </header>

          <ManifestoEntries />
        </div>
      </main>
      <footer className="border-t border-paper-300/40 py-8 mt-16">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community</p>
        </div>
      </footer>
    </div>
  );
};

export default Manifesto;
