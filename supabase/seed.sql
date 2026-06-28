-- Seed nodes for the Rotterdam game area around the Groothandelsgebouw
-- Coordinates are in WGS84 (lat/lng). Mapbox uses [lng, lat].

INSERT INTO public.nodes (id, name, team, status, required_node_id, description, lat, lng, radius) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Groothandelsgebouw Entry', 'Red', 'unlocked', NULL, 'Start van de missie bij het Groothandelsgebouw.', 51.9225, 4.4792, 50),
  ('22222222-2222-2222-2222-222222222222', 'Centraal Station Relay', 'Blue', 'locked', '11111111-1111-1111-1111-111111111111', 'Unlockt na het eerste Groothandelsgebouw station.', 51.9244, 4.4697, 40),
  ('33333333-3333-3333-3333-333333333333', 'Cube Houses Cache', 'Green', 'locked', '22222222-2222-2222-2222-222222222222', 'Einddoel bij de Cube Houses.', 51.9205, 4.4902, 40),
  ('44444444-4444-4444-4444-444444444444', 'Markthal Drop', 'Red', 'locked', '11111111-1111-1111-1111-111111111111', 'Tweede unlock voor het Red team.', 51.9199, 4.4863, 35)
ON CONFLICT (id) DO NOTHING;
