-- Initial table creation for Cross-Team Puzzles Phase 2

-- Nodes representing puzzles
CREATE TABLE IF NOT EXISTS public.nodes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    team text NOT NULL, -- e.g. 'Red', 'Blue', 'Green'
    status text NOT NULL DEFAULT 'locked', -- 'locked', 'unlocked', 'solved'
    required_node_id uuid REFERENCES public.nodes(id), -- If another node needs to be solved first
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Global game state
CREATE TABLE IF NOT EXISTS public.global_state (
    id integer PRIMARY KEY, -- We'll just use id=1 for the single row
    threat_level integer NOT NULL DEFAULT 100,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add some seed data to map out a cross-team dependency
INSERT INTO public.global_state (id, threat_level) VALUES (1, 100) ON CONFLICT DO NOTHING;
