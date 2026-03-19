"use client";

import { useState } from "react";
import { Announcement } from "@/types";
import { formatDate, truncateText } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { Pin, ChevronDown, ChevronUp } from "lucide-react";

const priorityVariant = {
  low: "gray" as const,
  normal: "blue" as const,
  high: "amber" as const,
  urgent: "red" as const,
};

export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 transition-all ${
        announcement.priority === "urgent"
          ? "border-red-500"
          : announcement.priority === "high"
          ? "border-amber-500"
          : "border-blue-500"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {announcement.is_pinned && <Pin className="h-3.5 w-3.5 text-amber-500" />}
        <Badge variant={priorityVariant[announcement.priority]}>{announcement.priority}</Badge>
        <span className="text-xs text-gray-400 ml-auto">{formatDate(announcement.created_at)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{announcement.title}</h3>
      <p className="text-sm text-gray-600 whitespace-pre-line">
        {expanded ? announcement.body : truncateText(announcement.body, 150)}
      </p>
      {announcement.body.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {expanded ? (
            <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
          ) : (
            <>Read more <ChevronDown className="h-3.5 w-3.5" /></>
          )}
        </button>
      )}
    </div>
  );
}
