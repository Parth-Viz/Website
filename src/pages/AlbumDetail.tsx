
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import MovingBackground from "@/components/MovingBackground";
import { ArrowLeft } from "lucide-react";
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
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading album...</p>
          </div>
        </div>
      </MovingBackground>
    );
  }

  if (!album) {
    return (
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Album Not Found</h1>
            <Link to="/gallery" className="text-orange-500 hover:text-orange-600 flex items-center justify-center gap-2">
              <ArrowLeft size={20} />
              Back to Gallery
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
        <div className="max-w-6xl mx-auto px-4 py-16">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Gallery
          </Link>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{album.title}</h1>
            {album.description && (
              <p className="text-lg text-gray-700 mb-2">{album.description}</p>
            )}
            {album.location && (
              <p className="text-orange-600 font-medium">{album.location}</p>
            )}
          </div>

          {photos && photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                      <p className="text-gray-700 text-sm">{photo.caption}</p>
                      {photo.location && (
                        <p className="text-orange-600 text-xs mt-1">{photo.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No photos in this album yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption || 'Travel photo'}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            {(selectedPhoto.caption || selectedPhoto.location) && (
              <div className="p-6">
                {selectedPhoto.caption && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedPhoto.caption}</h3>
                )}
                {selectedPhoto.location && (
                  <p className="text-orange-600 font-medium">{selectedPhoto.location}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </MovingBackground>
  );
};

export default AlbumDetail;
