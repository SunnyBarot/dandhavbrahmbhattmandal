export interface Resident {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  unit_number: string;
  building_name: string | null;
  move_in_date: string | null;
  household_size: number;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  avatar_url: string | null;
  status: "pending" | "approved" | "rejected";
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  end_date: string | null;
  location: string;
  image_url: string | null;
  category: "general" | "meeting" | "festival" | "maintenance" | "social";
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: "low" | "normal" | "high" | "urgent";
  is_pinned: boolean;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  album: string;
  uploaded_by: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}