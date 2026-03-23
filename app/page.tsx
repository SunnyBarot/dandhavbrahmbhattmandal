import HeroBanner from "@/components/home/HeroBanner";
import QuickLinks from "@/components/home/QuickLinks";
import LatestAnnouncements from "@/components/home/LatestAnnouncements";
import EventCard from "@/components/cards/EventCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Announcement, Event } from "@/types";
import { events } from '@/lib/mockData';// Importing mock data of events
import { announcements } from '@/lib/mockData'; // Importing mock data of announcements

export default async function HomePage() {
  let announcements: Announcement[] = [];
  let upcomingEvents: Event[] = [];
  return (
    <>
      <HeroBanner />
      <QuickLinks />
      <LatestAnnouncements announcements={announcements} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events. Check back soon!</p>
          )}
        </div>
      </section>
    </>
  );
}
