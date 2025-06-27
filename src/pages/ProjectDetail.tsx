import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Particles from "@/components/Particles";
import { ArrowLeft, ExternalLink, Github, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, stiffness: 60 } },
};

const ProjectDetail = () => {
  const { projectId } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_blogs')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black font-inter">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading project...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black font-inter">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
              <Link to="/projects" className="text-orange-500 hover:text-orange-600 flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-poppins">
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
      
      <div className="relative z-10 pt-20 min-h-screen flex justify-center items-start px-2">
        <motion.div
          className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-700"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Link to="/projects" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{project.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{project.description}</p>

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.screenshot_urls && project.screenshot_urls.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshot_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">About This Project</h3>
            <div className="prose prose-lg text-gray-300">
              {project.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 shadow-md hover:scale-105 transition-transform duration-200"
              >
                <Github size={20} />
                View Code
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:scale-105 transition-transform duration-200"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
