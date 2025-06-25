import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Camera, Code2, User, ExternalLink, Github } from "lucide-react";
import TiltedCard from "@/components/TiltedCard";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: projects, isLoading } = useQuery({
    queryKey: ['project-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3); // Only show first 3 projects on homepage
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen relative bg-black">
      {/* Particles Background - Full Page */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Hello, I'm <span className="text-orange-500">Parth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              A Junior Business Analyst with a passion for data-driven insights 
              and exploring the world through technology and adventure.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              View My Work <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => scrollToSection('gallery')}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 text-lg"
            >
              See My Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 pt-6 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
          <div className="prose prose-lg mx-auto text-gray-300">
            <p className="text-xl leading-relaxed">
              I'm a Junior Business Analyst with a keen eye for transforming complex data into actionable business insights. 
              My analytical mindset combined with creative problem-solving helps organizations make informed decisions 
              that drive growth and efficiency.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              Currently focused on mastering data visualization, process optimization, and stakeholder communication. 
              I enjoy working with tools like Excel, SQL, Tableau, and Python to uncover patterns and trends that 
              tell compelling business stories.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              When I'm not analyzing data or creating reports, you'll find me exploring new destinations with my camera, 
              always seeking fresh perspectives both in business and in life. I believe that diverse experiences 
              fuel innovative thinking and better analytical approaches.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              My goal is to bridge the gap between technical analysis and business strategy, helping teams understand 
              not just what the data says, but what it means for their success.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Code2 className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore my analytical projects, from business intelligence dashboards to process improvement initiatives.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading projects...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects?.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {project.screenshot_urls && project.screenshot_urls.length > 0 && (
                    <div className="h-48 overflow-hidden">
                      <TiltedCard
                        imageSrc={project.screenshot_urls[0]}
                        altText={project.title}
                        captionText={project.title}
                        containerHeight="192px"
                        containerWidth="100%"
                        imageHeight="192px"
                        imageWidth="100%"
                        rotateAmplitude={8}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={false}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack?.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                          Read More
                        </Button>
                      </Link>
                      
                      <div className="flex space-x-3">
                        {project.github_url && (
                          <a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-orange-500 transition-colors"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.demo_url && (
                          <a 
                            href={project.demo_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-orange-500 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/projects">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                View All Projects <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Camera className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            <h2 className="text-4xl font-bold text-white mb-4">Travel Gallery</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Journey through my adventures around the world, captured through my lens.
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/gallery">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Explore Gallery <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-400 mb-8">
            Interested in collaborating on business analysis projects or just want to chat about data insights?
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;