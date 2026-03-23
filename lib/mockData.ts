// Mock data for announcements and events

type Event = {
  id: string;
  title: string;
  event_date: string;
  end_date: string | null;
  image_url: string | null;
  time: string;
  location: string;
  attendees: number;
};
export const announcements = [
    {
        id: 1,
        title: 'Annual Gathering',
        date: '2026-03-30',
        body: 'Join us for our annual gathering to discuss community updates and future plans.',
        location: 'Community Hall',
		priority: "low",
		is_pinned: "True",
		is_published: "False",
		created_by: 'Admin',
		created_at: '2026-03-30',
		updated_at: ''
    },
    {
        id: 2,
        title: 'Volunteer Day',
        date: '2026-04-15',
        body: 'Come out and help us with community cleanup!',
        location: 'City Park',
		priority: "low",
		is_pinned: "True",
		is_published: "False",
		created_by: 'Admin2',
		created_at: '2026-03-30',
		updated_at: ''
    }
];


export const events: Event[] = [
  {
    id: '1',
    title: 'Yoga Class',
    event_date: '2026-03-25',
    end_date: '2026-04-10',
    image_url: null,
    time: '09:00 AM',
    location: 'Community Center',
    attendees: 20
  },
  {
    id: '2',
    title: 'Book Fair',
    event_date: '2026-04-10',
    end_date: '2026-04-10',
    image_url: null,
    time: '10:00 AM',
    location: 'City Library',
    attendees: 100
  }
];

export const getEventById = (
  events: Event[],
  id: string
): Event | undefined => {
  return events.find(event => event.id === id);
};