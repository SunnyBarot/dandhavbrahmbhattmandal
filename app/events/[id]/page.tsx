import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react";
import { getEventById } from "@/lib/mockData"; // Import the function to get event by id.
import { events } from "@/lib/mockData"; // Import the events data.

const categoryVariant = {
  general: "blue" as const,
  meeting: "gray" as const,
  festival: "amber" as const,
  maintenance: "red" as const,
  social: "green" as const,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: "Event" };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(events, id);
  if (!event) notFound();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      {event.image_url && (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>

      <div className="grid gap-4 sm:grid-cols-3 mb-8 bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Date & Time</p>
            <p className="text-sm font-medium">{formatDateTime(event.event_date)}</p>
          </div>
        </div>
        {event.end_date && (
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Ends</p>
              <p className="text-sm font-medium">{formatDateTime(event.end_date)}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-medium">{event.location}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        {event.title} is an event that will take place at {event.location} on {formatDateTime(event.event_date)}. It is expected to have {event.attendees} attendees. We hope to see you there!
      </div>
    </div>
  );
}
