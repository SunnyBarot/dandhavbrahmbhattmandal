import type { Metadata } from "next";
import { Announcement } from "@/types";
import AnnouncementsClient from "./AnnouncementsClient";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Community notices and bulletins.",
};

export default async function AnnouncementsPage() {
  let announcements: Announcement[] = [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
      <p className="text-gray-600 mb-8">Important notices and updates from the community.</p>
      <AnnouncementsClient announcements={announcements} />
    </div>
  );
}
