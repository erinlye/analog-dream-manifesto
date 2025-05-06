
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Norms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-sans mb-4">Community Norms</h1>
            <p className="text-ink-400">
              Guidelines for participation in the analog community.
            </p>
          </header>
          
          <div className="space-y-8">
            <Card className="analog-paper">
              <CardHeader>
                <CardTitle className="text-2xl">Our Community Values</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm">
                <p className="italic text-ink-400">
                  Community values will be added here. These represent the foundation of how we interact with each other.
                </p>
                {/* Values content will be added later */}
              </CardContent>
            </Card>

            <Card className="analog-paper">
              <CardHeader>
                <CardTitle className="text-2xl">Expected Behaviors</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm">
                <p className="italic text-ink-400">
                  Expected behaviors will be defined here. These outline how members should engage with the community.
                </p>
                {/* Expected behaviors content will be added later */}
              </CardContent>
            </Card>

            <Card className="analog-paper">
              <CardHeader>
                <CardTitle className="text-2xl">Moderation Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm">
                <p className="italic text-ink-400">
                  Our moderation approach and policies will be detailed here. This section will explain how we maintain community standards.
                </p>
                {/* Moderation policy content will be added later */}
              </CardContent>
            </Card>
          </div>
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

export default Norms;
