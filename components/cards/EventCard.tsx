import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { MapPin, Clock } from "lucide-react";

const categoryVariant = {
  general: "blue" as const,
  meeting: "gray" as const,
  festival: "amber" as const,
  maintenance: "red" as const,
  social: "green" as const,
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
        <div className="relative h-48 bg-gray-200">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <Clock className="h-12 w-12 text-blue-400" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant={categoryVariant[event.category]}>{event.category}</Badge>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm font-medium text-blue-600 mb-1">{formatDate(event.event_date)}</p>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
