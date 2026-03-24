import { Users, Calendar, Megaphone, Mail } from "lucide-react";
import { events, announcements } from "@/lib/mockData";

// Mock extra data (you can later move this to mockData.ts)
const contactMessages = [
  { id: "1", is_read: false },
  { id: "2", is_read: true },
];

const residents = [
  { id: "1", status: "pending" },
  { id: "2", status: "approved" },
  { id: "3", status: "pending" },
];

// Generic count function using mock data
function getCount(
  tableName: string,
  filter?: Record<string, string | boolean>
) {
  let data: any[] = [];

  switch (tableName) {
    case "residents":
      data = residents;
      break;
    case "events":
      data = events;
      break;
    case "announcements":
      data = announcements;
      break;
    case "contact_messages":
      data = contactMessages;
      break;
    default:
      data = [];
  }

  if (filter) {
    data = data.filter((item) =>
      Object.entries(filter).every(
        ([key, value]) => item[key] === value
      )
    );
  }

  return data.length;
}

export default function AdminDashboard() {
  const pendingMembers = getCount("residents", { status: "pending" });
  const upcomingEvents = getCount("events"); // no filter in mock
  const totalAnnouncements = getCount("announcements");
  const unreadMessages = getCount("contact_messages", { is_read: false });

  const stats = [
    {
      label: "Pending Registrations",
      value: pendingMembers,
      icon: Users,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Published Events",
      value: upcomingEvents,
      icon: Calendar,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Announcements",
      value: totalAnnouncements,
      icon: Megaphone,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Unread Messages",
      value: unreadMessages,
      icon: Mail,
      color: "bg-red-50 text-red-600",
    },
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
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
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