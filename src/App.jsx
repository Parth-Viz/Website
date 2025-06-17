import { useState } from 'react';
import GallerySection from './components/GallerySection';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="bg-black text-white font-sans min-h-screen w-full" style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Local video background (renamed to background.mp4) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ objectFit: 'cover' }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Sticky, minimal nav */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-20 bg-transparent">
        <div className="text-2xl font-black tracking-tight uppercase text-white">Your Name</div>
        <div className="flex gap-8 text-lg">
          <button onClick={() => setActiveSection('home')} className={activeSection === 'home' ? 'font-bold underline underline-offset-8 text-white' : 'hover:opacity-70 transition text-white'}>Home</button>
          <button onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'font-bold underline underline-offset-8 text-white' : 'hover:opacity-70 transition text-white'}>Projects</button>
          <button onClick={() => setActiveSection('gallery')} className={activeSection === 'gallery' ? 'font-bold underline underline-offset-8 text-white' : 'hover:opacity-70 transition text-white'}>Gallery</button>
        </div>
      </nav>
      {/* Animated hero section */}
      {activeSection === 'home' && (
        <section className="flex flex-col items-center justify-center h-screen w-full text-center relative pt-24">
          <div className="flex flex-col gap-6 items-center justify-center h-full">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-4 animate-fade-in-up">Hi, I'm <span className="text-blue-400">Your Name</span></h1>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-2xl animate-fade-in-up delay-200">Creative Developer & Designer. I build beautiful, interactive web experiences.</p>
            <div className="flex gap-6 mt-8 animate-fade-in-up delay-400">
              <button onClick={() => setActiveSection('projects')} className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-semibold">View Projects</button>
              <button onClick={() => setActiveSection('gallery')} className="px-8 py-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition text-lg font-semibold">View Gallery</button>
            </div>
          </div>
        </section>
      )}
      {/* Projects section placeholder */}
      {activeSection === 'projects' && (
        <section className="flex flex-col items-center justify-center min-h-screen w-full text-center pt-32">
          <h2 className="text-5xl font-black mb-8 tracking-tight">Projects</h2>
          <div className="text-gray-400">Showcase your best work here with big, visual cards and smooth hover effects.</div>
        </section>
      )}
      {/* Gallery section */}
      {activeSection === 'gallery' && (
        <GallerySection />
      )}
      {/* Simple fade-in-up animation keyframes */}
      <style>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s cubic-bezier(.23,1.01,.32,1) forwards;
        }
        .animate-fade-in-up.delay-200 { animation-delay: .2s; }
        .animate-fade-in-up.delay-400 { animation-delay: .4s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
