import Link from "next/link";
import { Announcement } from "@/types";
import { formatDate, truncateText } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { Pin, ArrowRight } from "lucide-react";

const priorityVariant = {
  low: "gray" as const,
  normal: "blue" as const,
  high: "amber" as const,
  urgent: "red" as const,
};

export default function LatestAnnouncements({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
          <p className="text-gray-500">No announcements yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Latest Announcements</h2>
          <Link href="/announcements" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
          
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                a.priority === "urgent" ? "border-red-500" : a.priority === "high" ? "border-amber-500" : "border-blue-500"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {a.is_pinned && <Pin className="h-3.5 w-3.5 text-amber-500" />}
                <Badge variant={priorityVariant[a.priority]}>{a.priority}</Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{a.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{truncateText(a.body, 120)}</p>
              <p className="text-xs text-gray-400">{formatDate(a.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
