// projects.js
// This file exports an array of project objects for the portfolio.
// To add a new project, add an object to this array and drop the image in /public/assets/projects/.

const projects = [
  {
    id: 1,
    title: 'Stock Market Dashboard',
    description: 'A modern dashboard to search and visualize real-time stock prices, financials, and news. Includes interactive charts and key metrics for top companies.',
    icon: '📈',
    slug: 'stock-market-dashboard',
  },
  {
    id: 2,
    title: 'Markdown Blog Generator',
    description: 'Generate and publish markdown-based blogs with live preview.',
    icon: '📝',
    slug: 'markdown-blog-generator',
  },
  {
    id: 3,
    title: 'UK Real Estate ROI Finder',
    description: 'Interactive dashboard to find the best UK region for property investment by ROI, year by year.',
    icon: '🏠',
    slug: 'roi-calculator',
  },
];

export default projects;
