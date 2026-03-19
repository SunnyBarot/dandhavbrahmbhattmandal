-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- RESIDENTS (registration data)
-- ============================================================
CREATE TABLE residents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  unit_number TEXT NOT NULL,
  building_name TEXT,
  move_in_date DATE,
  household_size INTEGER DEFAULT 1,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'meeting', 'festival', 'maintenance', 'social')),
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  caption TEXT,
  album TEXT DEFAULT 'general',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Residents: anyone can insert (register), only admins can read/update
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON residents FOR INSERT WITH CHECK (true);
CREATE POLICY "Only approved residents are publicly visible" ON residents FOR SELECT USING (status = 'approved');

-- Events: public read, admin write
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published events are public" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (auth.role() = 'authenticated');

-- Announcements: public read, admin write
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published announcements are public" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (auth.role() = 'authenticated');

-- Gallery: public read, admin write
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery is public" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- Contact messages: anyone can insert, admin can read
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send message" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_announcements_created ON announcements(created_at DESC);
CREATE INDEX idx_residents_status ON residents(status);
CREATE INDEX idx_gallery_album ON gallery_images(album);

-- ============================================================
-- STORAGE BUCKETS (run in Supabase dashboard or via API)
-- ============================================================
-- Create buckets: 'gallery' (public), 'avatars' (public), 'documents' (public)