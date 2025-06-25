import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Particles from "@/components/Particles";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const { data: album, isLoading: albumLoading } = useQuery({
    queryKey: ['album', albumId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_albums')
        .select('*')
        .eq('id', albumId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ['album-photos', albumId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_photos')
        .select('*')
        .eq('album_id', albumId)
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
  });

  if (albumLoading || photosLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading album...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-white mb-4">Album Not Found</h1>
              <Link to="/gallery" className="text-orange-500 hover:text-orange-600 flex items-center justify-center gap-2">
                <ArrowLeft size={20} />
                Back to Gallery
              </Link>
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
      
      <div className="relative z-10 pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Gallery
          </Link>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{album.title}</h1>
            {album.description && (
              <p className="text-lg text-gray-300 mb-2">{album.description}</p>
            )}
            {album.location && (
              <p className="text-orange-500 font-medium">{album.location}</p>
            )}
          </div>

          {photos && photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={photo.caption || 'Travel photo'}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {photo.caption && (
                    <div className="p-4">
                      <p className="text-gray-300 text-sm">{photo.caption}</p>
                      {photo.location && (
                        <p className="text-orange-500 text-xs mt-1">{photo.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No photos in this album yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl max-h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption || 'Travel photo'}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            {(selectedPhoto.caption || selectedPhoto.location) && (
              <div className="p-6">
                {selectedPhoto.caption && (
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedPhoto.caption}</h3>
                )}
                {selectedPhoto.location && (
                  <p className="text-orange-500 font-medium">{selectedPhoto.location}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;
