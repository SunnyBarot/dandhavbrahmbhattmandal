import Link from "next/link";
import { UserPlus, Calendar, Image, Info, Users, Megaphone } from "lucide-react";

const links = [
  { href: "/register", label: "Register", description: "Join our community", icon: UserPlus, color: "bg-blue-50 text-blue-600" },
  { href: "/events", label: "Events", description: "See what's happening", icon: Calendar, color: "bg-emerald-50 text-emerald-600" },
  { href: "/gallery", label: "Gallery", description: "View community photos", icon: Image, color: "bg-amber-50 text-amber-600" },
  { href: "/members", label: "Members", description: "Resident directory", icon: Users, color: "bg-purple-50 text-purple-600" },
  { href: "/announcements", label: "Notices", description: "Community updates", icon: Megaphone, color: "bg-red-50 text-red-600" },
  { href: "/about", label: "About", description: "Community info", icon: Info, color: "bg-gray-50 text-gray-600" },
];

export default function QuickLinks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`p-3 rounded-xl ${link.color} mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{link.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
