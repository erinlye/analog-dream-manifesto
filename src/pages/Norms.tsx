
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Norms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-10 mt-6">
            <h1 className="text-3xl md:text-4xl font-sans font-bold italic mb-4">community norms that keep analog abundant</h1>
          </header>
          
          <Card className="analog-paper mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">community norms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                support the diverse ways people are accessing analog living.
                <br />
                be creative and kind.
                <br />
                analog has zero tolerance for hate speech, hurtful language, sexual language or extortion, or any other online abuse. these accounts will be promptly removed from analog.
                <br />
                living analog is living a political life against the tech industry. we don't shy away from these healthy political conversations, but they need to happen with respect. debate ideas not people. do not be political in a way that does not support or relate to analog living.
                <br />
                do not post sexually explicit content on any forum site.
              </p>
            </CardContent>
          </Card>
          
          <Card className="analog-paper mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">moderation policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                we each moderate once a week:
                <br />
                emma - monday
                <br />
                jenny - wednesday
                <br />
                emily - friday
                <br />
                erin - saturday
                <br />
                when people make communities, they become the moderator of their communities.
                <br />
                they have to moderate the space at least once per week.
                <br />
                the general platform moderators will oversee the communities once per week and contact moderators if they see something concerning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="analog-paper">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">community feedback</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p className="text-ink-400">
                we welcome community feedback on norms — analog is built on peer production. please reach out with suggestions and ideas.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t border-paper-300/40 py-8 mt-16">
        <div className="analog-container text-center text-ink-400 text-sm">
          <p>© {new Date().getFullYear()} analog community</p>
        </div>
      </footer>
    </div>
  );
};

export default Norms;
