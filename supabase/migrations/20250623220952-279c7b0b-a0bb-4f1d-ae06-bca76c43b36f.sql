
-- Create table for travel albums
CREATE TABLE public.travel_albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  location TEXT,
  travel_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for travel photos within albums
CREATE TABLE public.travel_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES public.travel_albums(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  location TEXT,
  taken_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for project blogs
CREATE TABLE public.project_blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add some indexes for better performance
CREATE INDEX idx_travel_photos_album_id ON public.travel_photos(album_id);
CREATE INDEX idx_travel_photos_display_order ON public.travel_photos(display_order);
CREATE INDEX idx_project_blogs_published ON public.project_blogs(published);
CREATE INDEX idx_project_blogs_featured ON public.project_blogs(featured);

-- Enable Row Level Security (we'll keep it simple for now - all data is public)
ALTER TABLE public.travel_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_blogs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since this is a portfolio site)
CREATE POLICY "Anyone can view travel albums" ON public.travel_albums FOR SELECT USING (true);
CREATE POLICY "Anyone can view travel photos" ON public.travel_photos FOR SELECT USING (true);
CREATE POLICY "Anyone can view published project blogs" ON public.project_blogs FOR SELECT USING (published = true);

-- Insert some placeholder data for travel albums
INSERT INTO public.travel_albums (title, description, location, travel_date, cover_image_url) VALUES
('Japan Adventure', 'Exploring the beautiful landscapes and culture of Japan', 'Japan', '2024-03-15', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'),
('European Cities', 'A journey through historic European capitals', 'Europe', '2024-01-20', 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800'),
('Mountain Hiking', 'Adventures in the great outdoors', 'Various Locations', '2023-11-10', 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800');

-- Insert some placeholder travel photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Japan Adventure'), 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 'Cherry blossoms in full bloom', 'Tokyo', '2024-03-15', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Japan Adventure'), 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800', 'Traditional temple architecture', 'Kyoto', '2024-03-16', 2),
((SELECT id FROM public.travel_albums WHERE title = 'European Cities'), 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800', 'Historic city center', 'Prague', '2024-01-21', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Mountain Hiking'), 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800', 'Mountain river valley', 'Alps', '2023-11-10', 1);

-- Insert some placeholder project blogs
INSERT INTO public.project_blogs (title, description, content, tech_stack, github_url, demo_url, image_urls, published, featured) VALUES
('E-Commerce Platform', 'A full-stack e-commerce solution with modern UI and robust backend', 'This project showcases a complete e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, and payment integration.', 
ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://github.com/yourusername/ecommerce-platform', 'https://demo-ecommerce.com', 
ARRAY['https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800'], true, true),

('Task Management App', 'A collaborative task management tool for teams', 'Built a comprehensive task management application with real-time collaboration features, drag-and-drop functionality, and team management capabilities.',
ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'], 'https://github.com/yourusername/task-manager', 'https://demo-tasks.com',
ARRAY['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'], true, true),

('Weather Dashboard', 'Real-time weather monitoring with beautiful visualizations', 'A responsive weather dashboard that displays current conditions, forecasts, and interactive weather maps using modern data visualization techniques.',
ARRAY['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'], 'https://github.com/yourusername/weather-dashboard', 'https://demo-weather.com',
ARRAY['https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800'], true, false);
