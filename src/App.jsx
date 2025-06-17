import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import ProjectsPage from './pages/projects/index';
import ProjectDetailPage from './pages/projects/[slug]';
import StockMarketDashboard from './pages/projects/stock-market-dashboard';
import projects from './data/projects';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <Router>
      <div className="bg-black text-white font-sans min-h-screen w-full relative">
        {/* Minimal nav */}
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-20 bg-transparent">
          <div className="text-2xl font-black tracking-tight uppercase text-white">Parth Viz</div>
          <div className="flex gap-8 text-lg">
            <Link to="/" className="hover:opacity-70 transition text-white">Home</Link>
            <Link to="/projects" className="hover:opacity-70 transition text-white">Projects</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <section className="flex flex-col items-center justify-center h-screen w-full text-center relative pt-24">
              <div className="flex flex-col gap-6 items-center justify-center h-full">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-4">Hi, I'm <span className="text-blue-400">Pat</span></h1>
                <p className="text-2xl md:text-3xl text-gray-300 max-w-2xl">Pro sound engineer and guitarist. I build cool websites using copilot</p>
                <div className="flex gap-6 mt-8">
                  <Link to="/projects" className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-semibold">View Projects</Link>
                </div>
              </div>
            </section>
          } />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/projects/stock-market-dashboard" element={<StockMarketDashboard />} />
        </Routes>
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
