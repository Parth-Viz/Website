import React from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Home, Camera, MapPin, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Particles from "@/components/Particles";
import { supabase } from "@/integrations/supabase/client";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, stiffness: 60 } },
};

const AlbumDetail = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const { data: album, isLoading: albumLoading } = useQuery({
    queryKey: ['travel-album', albumId],
    queryFn: async () => {
      if (!albumId) throw new Error('Album ID is required');
      const { data, error } = await supabase
        .from('travel_albums')
        .select('*')
        .eq('id', albumId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!albumId
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ['travel-photos', albumId],
    queryFn: async () => {
      if (!albumId) throw new Error('Album ID is required');
      const { data, error } = await supabase
        .from('travel_photos')
        .select('*')
        .eq('album_id', albumId)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!albumId
  });

  const isLoading = albumLoading || photosLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black font-poppins">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading album...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-black font-poppins">
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-red-400 mb-4">Album Not Found</h1>
              <p className="text-gray-300 mb-8">The album you're looking for doesn't exist.</p>
              <Link to="/gallery">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-poppins">
      {/* Particles Background */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={150}
          particleSpread={8}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/gallery">
          <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500">
            <ArrowLeft size={16} className="mr-2" />
            Back to Gallery
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link to="/">
          <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500">
            <Home size={16} className="mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Album Header */}
          <div className="text-center py-12">
            <motion.h1 
              className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {album.title}
            </motion.h1>
            
            {album.description && (
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {album.description}
              </motion.p>
            )}

            <div className="flex items-center justify-center space-x-6 text-gray-400">
              {album.location && (
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>{album.location}</span>
                </div>
              )}
              {album.travel_date && (
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{new Date(album.travel_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center">
                <Camera size={18} className="mr-2" />
                <span>{photos?.length || 0} photos</span>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          {!photos || photos.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">No photos in this album yet.</p>
              <p className="text-gray-500 text-sm mt-2">Photos will appear here once they're added to the album.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="bg-gray-900/80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={photo.caption || `Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {(photo.caption || photo.location || photo.taken_date) && (
                    <div className="p-4">
                      {photo.caption && (
                        <p className="text-white text-sm mb-2">{photo.caption}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        {photo.location && (
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {photo.location}
                          </div>
                        )}
                        {photo.taken_date && (
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {new Date(photo.taken_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
