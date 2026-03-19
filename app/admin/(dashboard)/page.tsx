import { createClient } from "@/lib/supabase/server";
import { Users, Calendar, Megaphone, Mail } from "lucide-react";

async function getCount(tableName: string, filter?: Record<string, string | boolean>) {
  try {
    const supabase = await createClient();
    let query = supabase.from(tableName).select("id", { count: "exact", head: true });
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        query = query.eq(key, value);
      }
    }
    const { count } = await query;
    return count || 0;
  } catch {
    return 0;
  }
}

export default async function AdminDashboard() {
  const [pendingMembers, upcomingEvents, totalAnnouncements, unreadMessages] = await Promise.all([
    getCount("residents", { status: "pending" }),
    getCount("events", { is_published: true }),
    getCount("announcements", { is_published: true }),
    getCount("contact_messages", { is_read: false }),
  ]);

  const stats = [
    { label: "Pending Registrations", value: pendingMembers, icon: Users, color: "bg-amber-50 text-amber-600" },
    { label: "Published Events", value: upcomingEvents, icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Announcements", value: totalAnnouncements, icon: Megaphone, color: "bg-emerald-50 text-emerald-600" },
    { label: "Unread Messages", value: unreadMessages, icon: Mail, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
