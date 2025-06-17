// pages/projects/[slug].jsx
// Renders the detail page for a single project, based on the slug in the URL (icon-only, no images)

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../../data/projects';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/projects" className="text-blue-600 underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full pt-24 px-4 max-w-2xl mx-auto flex flex-col items-center">
      <span className="text-7xl mb-6">{project.icon}</span>
      <h1 className="text-3xl font-extrabold mb-4 text-center">{project.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">{project.description}</p>
      {/* Add more detailed info here as needed */}
      <Link to="/projects" className="text-blue-600 underline">← Back to Projects</Link>
    </section>
  );
};

export default ProjectDetailPage;
