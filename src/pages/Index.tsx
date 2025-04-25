
import Navigation from '../components/Navigation';
import AnalogQuestion from '../components/AnalogQuestion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="analog-container py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">A community for analog dreamers</h1>
            <p className="text-lg md:text-xl text-ink-400 max-w-2xl mx-auto">
              We're building a platform to promote and communally learn how to live more analog lifestyles in our increasingly digital world.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AnalogQuestion />
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl mb-6">Join the movement</h2>
            <p className="text-ink-400 mb-8">Connect with others who are seeking intentional relationships with technology.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/communities" 
                className="analog-button"
              >
                Explore Communities
              </Link>
              <Link 
                to="/manifesto" 
                className="px-6 py-3 border border-ink-300 rounded-sm hover:bg-paper-100 transition-colors"
              >
                Read Our Manifesto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-paper-300/40 py-8">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} Analog Community • <a href="#" className="analog-link">Contact</a></p>
        </div>
      </footer>
    </div>
  );
};

// Add the Link import
import { Link } from 'react-router-dom';

export default Index;
