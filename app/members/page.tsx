import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Resident } from "@/types";
import MembersClient from "./MembersClient";

export const metadata: Metadata = {
  title: "Members Directory",
  description: "Browse our community resident directory.",
};

export default async function MembersPage() {
  let members: Resident[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("residents")
      .select("id, full_name, unit_number, building_name, avatar_url, status")
      .eq("status", "approved")
      .order("full_name");
    members = (data as Resident[]) || [];
  } catch {
    // Supabase not configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Directory</h1>
      <p className="text-gray-600 mb-8">Browse our community residents.</p>
      <MembersClient members={members} />
    </div>
  );
}
