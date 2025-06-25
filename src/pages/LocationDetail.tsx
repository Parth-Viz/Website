import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import MovingBackground from "@/components/MovingBackground";
import { useState, useEffect } from "react";

interface LocationData {
  title: string;
  description: string;
  coverImage: string;
  photos: string[];
}

const LocationDetail = () => {
  const { locationSlug } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const response = await fetch('/images/travel/albums.json');
        const data = await response.json();
        const locationData = data[locationSlug];
        
        if (locationData) {
          setLocation(locationData);
        }
      } catch (error) {
        console.error('Error loading location data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (locationSlug) {
      loadLocationData();
    }
  }, [locationSlug]);

  if (isLoading) {
    return (
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading location...</p>
          </div>
        </div>
      </MovingBackground>
    );
  }

  if (!location) {
    return (
      <MovingBackground>
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Location Not Found</h1>
            <Link to="/" className="text-orange-500 hover:text-orange-600 flex items-center justify-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
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
          <Link to="/" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{location.title}</h1>
            <p className="text-lg text-gray-700 mb-2">{location.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {location.photos.map((photo, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={photo}
                    alt={`${location.title} photo ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Hide the image if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto}
              alt={`${location.title} photo`}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{location.title}</h3>
              <p className="text-gray-600">{location.description}</p>
            </div>
          </div>
        </div>
      )}
    </MovingBackground>
  );
};

export default LocationDetail; 