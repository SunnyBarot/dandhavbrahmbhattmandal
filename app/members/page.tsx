import type { Metadata } from "next";
import { Resident } from "@/types";
import MembersClient from "./MembersClient";

export const metadata: Metadata = {
  title: "Members Directory",
  description: "Browse our community resident directory.",
};

export default async function MembersPage() {
  let members: Resident[] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Directory</h1>
      <p className="text-gray-600 mb-8">Browse our community residents.</p>
      <MembersClient members={members} />
    </div>
  );
}
