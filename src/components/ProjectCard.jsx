// ProjectCard.jsx
// Reusable card component for displaying a project summary on the projects grid.
// Props: title, description, icon, slug
// The entire card is clickable and routes to the project detail page.

import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ title, description, icon, slug }) => (
  <Link
    to={`/projects/${slug}`}
    className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label={`View details for ${title}`}
  >
    <div className="p-6 flex flex-col items-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white text-center">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm text-center">{description}</p>
    </div>
  </Link>
);

export default ProjectCard;
