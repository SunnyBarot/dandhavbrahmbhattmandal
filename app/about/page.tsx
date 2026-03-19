import type { Metadata } from "next";
import { MapPin, FileText, Shield, Building2 } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our community, rules, guidelines, and facilities.",
};

export default function AboutPage() {
  const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Our Community</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Our Community</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our vibrant residential community! We are a diverse group of families and
              individuals who take pride in our neighborhood. Our community was established to
              foster a safe, friendly, and well-maintained living environment for all residents.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We organize regular events, maintain shared facilities, and work together to make
              our neighborhood a wonderful place to live. Whether you are a long-time resident or
              newly moved in, we welcome you with open arms.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Rules & Guidelines</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">1.</span> Respect quiet hours: 10 PM - 7 AM on weekdays, 11 PM - 8 AM on weekends.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">2.</span> Keep common areas clean and tidy.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">3.</span> Pets must be leashed in shared spaces.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">4.</span> Parking is allowed only in designated spots.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">5.</span> Report maintenance issues promptly to management.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">6.</span> Be considerate of your neighbors at all times.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">Facilities</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Community Hall", "Children's Playground", "Fitness Center", "Swimming Pool", "BBQ Area", "Meeting Room"].map((facility) => (
                <div key={facility} className="bg-gray-50 rounded-lg p-4 text-gray-700 font-medium">
                  {facility}
                </div>
              ))}
            </div>
          </section>

          {mapsUrl && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Location</h2>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Community location map"
                />
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
