
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import MovingBackground from "@/components/MovingBackground";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

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
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
      </MovingBackground>
    );
  }

  if (!project) {
    return (
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-orange-500 hover:text-orange-600 flex items-center justify-center gap-2">
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
          </div>
        </div>
      </MovingBackground>
    );
  }

  return (
    <MovingBackground>
      <Navigation />
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            
            <p className="text-lg text-gray-700 mb-6">{project.description}</p>

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.screenshot_urls && project.screenshot_urls.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Screenshots</h3>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Project</h3>
              <div className="prose prose-lg text-gray-700">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </MovingBackground>
  );
};

export default ProjectDetail;
