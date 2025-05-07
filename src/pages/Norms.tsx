
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Norms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-sans font-bold italic mb-4">Community Norms That Keep Analog Abundant</h1>
          </header>
          
          <Card className="analog-paper mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Community Norms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                Support the diverse ways people are accessing analog living.
                <br />
                Be creative and kind.
                <br />
                Analog has zero tolerance for hate speech, hurtful language, sexual language or extortion, or any other online abuse. These accounts will be promptly removed from analog.
                <br />
                Living analog is living a political life against the tech industry. We don't shy away from these healthy political conversations, but they need to happen with respect. Debate ideas not people. Do not be political in a way that does not support or relate to analog living.
                <br />
                Do not post sexually explicit content on any forum site.
              </p>
            </CardContent>
          </Card>
          
          <Card className="analog-paper mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Moderation Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                We each moderate once a week:
                <br />
                Emma - Monday
                <br />
                Jenny - Wednesday
                <br />
                Emily - Friday
                <br />
                Erin - Saturday
                <br />
                When people make communities, they become the moderator of their communities.
                <br />
                They have to moderate the space at least once per week.
                <br />
                The general platform moderators will oversee the communities once per week and contact moderators if they see something concerning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="analog-paper">
            <CardHeader>
              <CardTitle className="text-2xl">Community Feedback</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                We welcome community feedback on norms — analog is built on peer production. Please reach out with suggestions and ideas.
              </p>
            </CardContent>
          </Card>
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
