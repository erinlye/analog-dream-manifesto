    
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
              Support the diverse ways people are accessing analog living. 
              Be creative and kind. 
              Analog has zero tolerance for hate speech, hurtful language, sexual language or extortion, or any other online abuse. These accounts will be promptly removed from analog.
              Living analog is living a political life against the tech industry. We don’t shy away from these healthy political conversations, but they need to happen with respect. Debate ideas not people. Do not be political in a way that does not support or relate to analog living.
              Do not post sexually explicit content on any forum site. 
            </p>
          </header>
          

            <Card className="analog-paper">
              <CardHeader>
                <CardTitle className="text-2xl">Moderation Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm">
                <p className="italic text-ink-400">
                  We each moderate once a week:
                  Emma - Monday
                  Jenny - Wednesday
                  Emily - Friday
                  Erin - Saturday
                  When people make communities, they become the moderator of their communities.
                  They have to moderate the space at least once per week.
                  The general platform moderators will oversee the communities once per week and contact moderators if they see something concerning.  
                </p>
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
