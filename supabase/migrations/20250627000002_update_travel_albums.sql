-- Replace sample travel data with actual albums from albums.json
-- First, clear existing sample data
DELETE FROM public.travel_photos;
DELETE FROM public.travel_albums;

-- Insert actual travel albums
INSERT INTO public.travel_albums (title, description, location, travel_date, cover_image_url) VALUES
('Hyderabad, India', 'The City of Pearls - a perfect blend of old and new India', 'Hyderabad, India', '2024-01-15', '/images/travel/hyderabad.jpg'),
('Rajasthan, India', 'The Land of Kings - where history comes alive in every corner', 'Rajasthan, India', '2024-02-20', '/images/travel/rajasthan.jpg'),
('Delhi, India', 'The Heart of India - where ancient monuments meet modern life', 'Delhi, India', '2024-03-10', '/images/travel/delhi.jpg'),
('Abu Dhabi, UAE', 'The Capital of the Emirates - where tradition meets innovation', 'Abu Dhabi, UAE', '2024-04-05', '/images/travel/abu-dhabi.jpg'),
('Byron Bay, Australia', 'The Easternmost Point - where the Pacific meets laid-back Aussie culture', 'Byron Bay, Australia', '2024-05-12', '/images/travel/byron-bay.jpg'),
('Sydney, Australia', 'The Harbour City - Australia''s most iconic metropolis', 'Sydney, Australia', '2024-06-08', '/images/travel/sydney.jpg');

-- Insert placeholder photos for each album (you can add actual photos later)
-- Note: These photos reference files that should be placed in the corresponding folders

-- Hyderabad photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo1.jpg', 'Historic Charminar monument', 'Hyderabad', '2024-01-15', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo2.jpg', 'Beautiful Golconda Fort', 'Hyderabad', '2024-01-15', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo3.jpg', 'Traditional Hyderabadi cuisine', 'Hyderabad', '2024-01-16', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo4.jpg', 'Bustling local markets', 'Hyderabad', '2024-01-16', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo5.jpg', 'Modern tech city skyline', 'Hyderabad', '2024-01-17', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Hyderabad, India'), '/images/travel/hyderabad/photo6.jpg', 'Sunset over Hussain Sagar Lake', 'Hyderabad', '2024-01-17', 6);

-- Rajasthan photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo1.jpg', 'Majestic Amber Palace', 'Jaipur', '2024-02-20', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo2.jpg', 'Golden Jaisalmer Fort', 'Jaisalmer', '2024-02-21', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo3.jpg', 'Colorful traditional textiles', 'Jodhpur', '2024-02-22', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo4.jpg', 'Desert camel safari', 'Thar Desert', '2024-02-23', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo5.jpg', 'Magnificent City Palace', 'Udaipur', '2024-02-24', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Rajasthan, India'), '/images/travel/rajasthan/photo6.jpg', 'Lake Pichola at sunset', 'Udaipur', '2024-02-24', 6);

-- Delhi photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo1.jpg', 'Iconic Red Fort', 'Old Delhi', '2024-03-10', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo2.jpg', 'India Gate memorial', 'New Delhi', '2024-03-10', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo3.jpg', 'Lotus Temple architecture', 'New Delhi', '2024-03-11', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo4.jpg', 'Vibrant Chandni Chowk market', 'Old Delhi', '2024-03-11', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo5.jpg', 'Humayun''s Tomb gardens', 'New Delhi', '2024-03-12', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Delhi, India'), '/images/travel/delhi/photo6.jpg', 'Modern Connaught Place', 'New Delhi', '2024-03-12', 6);

-- Abu Dhabi photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo1.jpg', 'Sheikh Zayed Grand Mosque', 'Abu Dhabi', '2024-04-05', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo2.jpg', 'Emirates Palace luxury', 'Abu Dhabi', '2024-04-05', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo3.jpg', 'Corniche waterfront', 'Abu Dhabi', '2024-04-06', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo4.jpg', 'Yas Island attractions', 'Yas Island', '2024-04-06', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo5.jpg', 'Desert safari adventure', 'Liwa Desert', '2024-04-07', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Abu Dhabi, UAE'), '/images/travel/abu-dhabi/photo6.jpg', 'Modern skyline at night', 'Abu Dhabi', '2024-04-07', 6);

-- Byron Bay photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo1.jpg', 'Iconic lighthouse view', 'Byron Bay', '2024-05-12', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo2.jpg', 'Perfect surfing waves', 'Main Beach', '2024-05-12', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo3.jpg', 'Hippy markets and culture', 'Byron Bay', '2024-05-13', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo4.jpg', 'Coastal walking trails', 'Cape Byron', '2024-05-13', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo5.jpg', 'Stunning sunset beach', 'Wategos Beach', '2024-05-14', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Byron Bay, Australia'), '/images/travel/byron-bay/photo6.jpg', 'Hinterland rainforest', 'Nimbin', '2024-05-14', 6);

-- Sydney photos
INSERT INTO public.travel_photos (album_id, image_url, caption, location, taken_date, display_order) VALUES
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo1.jpg', 'Sydney Opera House', 'Sydney Harbour', '2024-06-08', 1),
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo2.jpg', 'Harbour Bridge climb', 'Sydney Harbour', '2024-06-08', 2),
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo3.jpg', 'Bondi Beach waves', 'Bondi', '2024-06-09', 3),
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo4.jpg', 'The Rocks historic area', 'The Rocks', '2024-06-09', 4),
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo5.jpg', 'Royal Botanic Gardens', 'Sydney', '2024-06-10', 5),
((SELECT id FROM public.travel_albums WHERE title = 'Sydney, Australia'), '/images/travel/sydney/photo6.jpg', 'Circular Quay at night', 'Sydney Harbour', '2024-06-10', 6);
