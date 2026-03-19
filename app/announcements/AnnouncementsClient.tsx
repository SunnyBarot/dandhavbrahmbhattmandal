"use client";

import { useState } from "react";
import { Announcement } from "@/types";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import Pagination from "@/components/ui/Pagination";
import { Megaphone } from "lucide-react";

const PAGE_SIZE = 10;

export default function AnnouncementsClient({ announcements }: { announcements: Announcement[] }) {
  const [page, setPage] = useState(1);

  if (announcements.length === 0) {
    return (
      <div className="text-center py-16">
        <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No announcements yet. Check back soon!</p>
      </div>
    );
  }

  const totalPages = Math.ceil(announcements.length / PAGE_SIZE);
  const paginated = announcements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="space-y-4">
        {paginated.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
