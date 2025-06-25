import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Home } from "lucide-react";
import TiltedCard from "@/components/TiltedCard";
import Particles from "@/components/Particles";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const { data: albums, isLoading } = useQuery({
    queryKey: ['travel-albums'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_albums')
        .select('*')
        .order('travel_date', { ascending: false });
      
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
              <p className="text-gray-300 mt-4">Loading albums...</p>
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
            <h1 className="text-5xl font-bold text-white mb-6">Travel Gallery</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A collection of memories from my adventures around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {albums?.map((album) => (
              <Link 
                key={album.id} 
                to={`/gallery/${album.id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <TiltedCard
                      imageSrc={album.cover_image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'}
                      altText={album.title}
                      captionText={album.title}
                      containerHeight="256px"
                      containerWidth="100%"
                      imageHeight="256px"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.08}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                          <div className="text-white">
                            <h3 className="text-lg font-semibold mb-1">{album.title}</h3>
                            {album.location && (
                              <div className="flex items-center text-sm opacity-90">
                                <MapPin size={14} className="mr-1" />
                                {album.location}
                              </div>
                            )}
                          </div>
                        </div>
                      }
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {album.title}
                    </h3>
                    
                    {album.description && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {album.description}
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      {album.location && (
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {album.location}
                        </div>
                      )}
                      {album.travel_date && (
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(album.travel_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
