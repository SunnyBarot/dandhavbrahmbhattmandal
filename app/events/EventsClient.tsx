"use client";

import { useState } from "react";
import { Event } from "@/types";
import EventCard from "@/components/cards/EventCard";
import { isUpcoming } from "@/lib/utils";
import { Calendar } from "lucide-react";

const categories = ["all", "general", "meeting", "festival", "social", "maintenance"] as const;

export default function EventsClient({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = events.filter((e) => filter === "all" || e.category === filter);
  const upcoming = filtered.filter((e) => isUpcoming(e.event_date));
  const past = filtered.filter((e) => !isUpcoming(e.event_date));

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No events yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Past Events</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-75">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
