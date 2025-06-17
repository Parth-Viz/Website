# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Portfolio Project Structure (2025 Redesign)

## Overview
This portfolio is built with React, Vite, and Tailwind CSS. The project card and routing system is fully modular and futureproof.

## Structure

- `src/components/ProjectCard.jsx` — Reusable card for project summaries.
- `src/data/projects.js` — Array of project data. Add new projects here and drop images in `/public/assets/projects/`.
- `src/pages/projects/index.jsx` — Projects grid page. Imports and maps through `projects.js`.
- `src/pages/projects/[slug].jsx` — Individual project detail page. Reads slug from URL and displays project info.
- `public/assets/projects/` — All project images. Use `/assets/projects/your-image.png` as the path in `projects.js`.

## Adding a Project
1. Add a new object to `src/data/projects.js`.
2. Place the image in `public/assets/projects/`.
3. The project will appear automatically on the projects page.

## Notes
- All legacy/broken code and unused assets have been removed for clarity and maintainability.
- The system is fully responsive and accessible.
