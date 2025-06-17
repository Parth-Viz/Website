const a=[{slug:"ai-image-tagging-gallery",title:"AI Image Tagging Gallery",description:"A photo gallery that uses AI to automatically tag and organize your images.",thumbnail:"/assets/ai-gallery-thumb.jpg",banner:"/assets/ai-gallery-banner.jpg",tech:["React","TensorFlow.js","face-api.js","Tailwind CSS"],tags:["AI","Gallery","React"],blog:`## Overview
This project leverages TensorFlow.js and face-api.js to automatically tag and organize uploaded images. Users can create albums, search by tag or face, and label detected faces.

## Tech Stack
- React
- TensorFlow.js
- face-api.js
- Tailwind CSS

## How it was built
Images are processed in the browser using MobileNet and face-api.js. Tags and face data are stored in localStorage. The UI is built with React and styled with Tailwind.

## Code Example
\`\`\`js
const predictions = await model.classify(img);
\`\`\`

## Takeaways
- Learned about client-side AI
- Optimized for performance and UX
`},{slug:"stock-dashboard",title:"Stock Market Dashboard",description:"A real-time dashboard for tracking stocks and market trends.",thumbnail:"/assets/stock-dashboard-thumb.jpg",banner:"/assets/stock-dashboard-banner.jpg",tech:["React","Chart.js","REST APIs","Tailwind CSS"],tags:["Finance","APIs","React"],blog:`## Overview
A dashboard that fetches and visualizes real-time stock data.

## Tech Stack
- React
- Chart.js
- REST APIs
- Tailwind CSS

## How it was built
Uses fetch to get stock data from a public API, then renders interactive charts.

## Code Example
\`\`\`js
fetch('https://api.example.com/stock')
  .then(res => res.json())
  .then(data => setStockData(data));
\`\`\`

## Takeaways
- Learned about API integration
- Chart.js for data viz
`},{slug:"budget-tracker-app",title:"Budget Tracker App",description:"Track your expenses and income with beautiful charts and summaries.",thumbnail:"/assets/budget-tracker-thumb.jpg",banner:"/assets/budget-tracker-banner.jpg",tech:["React","Chart.js","LocalStorage","Tailwind CSS"],tags:["Finance","React"],blog:`## Overview
A simple app to track expenses and income, with charts and monthly summaries.

## Tech Stack
- React
- Chart.js
- LocalStorage
- Tailwind CSS

## How it was built
Transactions are stored in localStorage. Charts are rendered with Chart.js.

## Code Example
\`\`\`js
localStorage.setItem('transactions', JSON.stringify(transactions));
\`\`\`

## Takeaways
- Learned about state management
- Data persistence in browser
`},{slug:"wellness-habit-tracker",title:"Wellness Habit Tracker",description:"Track daily habits and wellness goals with streaks and reminders.",thumbnail:"/assets/wellness-habit-thumb.jpg",banner:"/assets/wellness-habit-banner.jpg",tech:["React","LocalStorage","Tailwind CSS"],tags:["Wellness","React"],blog:`## Overview
A habit tracker for wellness and productivity.

## Tech Stack
- React
- LocalStorage
- Tailwind CSS

## How it was built
Habits and streaks are stored in localStorage. Responsive UI with Tailwind.

## Code Example
\`\`\`js
setHabits([...habits, newHabit]);
\`\`\`

## Takeaways
- Learned about habit-forming UX
- Responsive design
`},{slug:"markdown-blog-generator",title:"Markdown Blog Generator",description:"Generate and publish markdown-based blogs with live preview.",thumbnail:"/assets/markdown-blog-thumb.jpg",banner:"/assets/markdown-blog-banner.jpg",tech:["React","Markdown","Tailwind CSS"],tags:["Blog","Markdown","React"],blog:`## Overview
A markdown blog generator with live preview and easy publishing.

## Tech Stack
- React
- Markdown
- Tailwind CSS

## How it was built
Uses a markdown parser for live preview. Blogs are saved as markdown files.

## Code Example
\`\`\`js
import marked from 'marked';
const html = marked(markdownText);
\`\`\`

## Takeaways
- Learned about markdown parsing
- Blog publishing workflow
`}];export{a as default};
