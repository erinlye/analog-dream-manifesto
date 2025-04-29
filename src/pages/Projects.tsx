
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getAllProjects, getProjectsByPopularity } from '../lib/projectStore';
import { Project } from '../lib/types';
import ProjectCard from '../components/ProjectCard';
import NewProjectForm from '../components/NewProjectForm';
import { Button } from '../components/ui/button';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  
  const loadProjects = () => {
    if (sortBy === 'recent') {
      setProjects(getAllProjects());
    } else {
      setProjects(getProjectsByPopularity());
    }
  };
  
  useEffect(() => {
    loadProjects();
  }, [sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="analog-container">
          <header className="mb-8 mt-6">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Projects Forum</h1>
            <p className="text-ink-400 mb-6">
              Share and discover collaborative analog activities with our community.
            </p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                <Button 
                  variant={sortBy === 'recent' ? 'default' : 'outline'}
                  onClick={() => setSortBy('recent')}
                  size="sm"
                >
                  Recent
                </Button>
                <Button 
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popular')}
                  size="sm"
                >
                  Popular
                </Button>
              </div>
            </div>
          </header>
          
          <NewProjectForm onProjectAdded={loadProjects} />
          
          <div className="space-y-6">
            {projects.length > 0 ? (
              projects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onUpdate={loadProjects} 
                />
              ))
            ) : (
              <div className="analog-paper text-center py-10">
                <h2 className="text-xl font-serif mb-4">No Projects Yet</h2>
                <p>Be the first to share an analog project with the community!</p>
              </div>
            )}
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
