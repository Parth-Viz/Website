// pages/projects/index.jsx
// Renders the grid of project cards using the new ProjectCard and projects.js (icon-only, no images)

import React from 'react';
import ProjectCard from '../../components/ProjectCard';
import projects from '../../data/projects';

const ProjectsPage = () => (
  <section className="min-h-screen w-full pt-24 px-4">
    <h2 className="text-4xl font-extrabold mb-8 text-center">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          icon={project.icon}
          slug={project.slug}
        />
      ))}
    </div>
  </section>
);

export default ProjectsPage;
