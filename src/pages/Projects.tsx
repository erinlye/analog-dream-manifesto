
import Navigation from '../components/Navigation';

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Projects</h1>
            <p className="text-ink-400">
              Collaborative analog activities to try and share.
            </p>
          </header>
          
          <div className="analog-paper text-center py-10">
            <h2 className="text-xl font-serif mb-4">Coming Soon</h2>
            <p>The Projects section is under development. Check back shortly!</p>
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

export default Projects;
