// ProjectsPage.jsx
// Renders a responsive grid of ProjectCard components using project data from projects.js
// To add a new project, edit src/data/projects.js and drop the image in /public/assets/projects/

import React from 'react';
import ProjectCard from './common/ProjectCard';
import projects from '../data/projects';

const ProjectsPage = () => (
  <section className="min-h-screen w-full pt-24 px-4">
    <h2 className="text-4xl font-extrabold mb-8 text-center">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          image={project.image}
          slug={project.slug}
        />
      ))}
    </div>
  </section>
);

export default ProjectsPage;

// This file is now obsolete. Use src/pages/projects/index.jsx instead.
// (Safe to delete)
