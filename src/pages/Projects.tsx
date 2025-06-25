import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Home } from "lucide-react";
import TiltedCard from "@/components/TiltedCard";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['project-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading projects...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
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
      
      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500">
            <Home size={16} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-white mb-6">My Projects</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of the digital solutions and creative projects I've built
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pb-20">
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
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Projects;
