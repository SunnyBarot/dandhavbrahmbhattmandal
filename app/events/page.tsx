import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Event } from "@/types";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming and past community events.",
};

export default async function EventsPage() {
  let events: Event[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("event_date", { ascending: false });
    events = (data as Event[]) || [];
  } catch {
    // Supabase not configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Events</h1>
      <p className="text-gray-600 mb-8">Stay up to date with community happenings.</p>
      <EventsClient events={events} />
    </div>
  );
}
