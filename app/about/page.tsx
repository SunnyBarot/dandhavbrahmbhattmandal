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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ સંસ્થા વિષે </h1>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ સંસ્થામાં આપનું સ્વાગત છે!
              સંસ્થા બ્રહ્મભટ્ટ સમાજથી છે અને હંમેશા વિદ્યાર્થીઓના વિકાસ અને સફળતા માટે કટિબદ્ધ છીએ.
              અમારી સંસ્થા મજબૂત મૂલ્યો જેમ કે સહકાર, શિસ્ત અને શિક્ષણ પાર આધારિત છે.
              અમારી દૂરદર્શિતા એ છે કે અમે આપણા સમાજની યુવાપેઢી ઉત્તમ તકો પ્રાપ્ત કરે એ માટે એમને જરૂરી
              માર્ગદર્શન અને પ્રેરણા તેમજ જરૂરી સાધનો પુરા પાડીએ ખાસ કરીને તેમને પ્રતિષ્ઠિત સરકારી આધિકારી
              બનવા માટે પ્રોત્સાહિત કરીએ. તો આઓ ચાલો આપડે બધા મળીને એક પ્રેરણાદાયક, સહાયક અને
              સશક્ત વાતાવરણ બનાવીએ જ્યાં દરેક વિદ્યાર્થી મોટા સપના જોઈ શકે અને સફળતા પ્રાપ્ત કરી શકે.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ સંસ્થા સમાજના વિકાસ માટે છાત્રાલયો, ભોજનાલય અને જરૂરી સુવિધાઓ ઉભી કરેલી છે,
              જેથી વિદ્યાર્થીઓને શ્રેષ્ઠ નિવાસ અને અભ્યાસનું વાતાવરણ મળી શકે. સંસ્થા નિયમિત રીતે GPSC  જેવી સ્પર્ધાત્મક પરીક્ષાઓ
              માટે વિનામૂલ્યે વિવિધ વર્ગોનું આયોજન કરતી રહી છે, જેથી યુવાપેઢી ને સરકારી નોકરી માટે સક્ષમ બનાવી શકાય.
              તે ઉપરાંત, બ્રહ્મભટ્ટ સમાજની દીકરીઓ માટે અમદાવાદમાં રહીને ભણવા માટે સુરક્ષિત અને સુવિધાસભર પેઈંગ ગેસ્ટ (PG)
              સુવિધા પણ ચલાવવામાં આવે છે.
              તમે લાંબા સમયથી જોડાયેલા હોવ કે નવા જોડાયા હોવ, સંસ્થા તમારું હર્ધિક સ્વાગત કરે છે.
              આ સંસ્થા માસિક અંક "બ્રહ્મભટ્ટ એકતા" પણ બહાર પાડે છે તો સંસ્થાના આજીવન સભ્ય બની સંસ્થાના કાર્યોમાં
              સહભાગી બની શકો છો.
              હાલ સંસ્થાનું આ વેબ પેજ નિર્માણાધીન છે તો ધીરે ધીરે બધી જ માહિતી આ વેબ પેજ ઉપર સમાવી લેવામાં આવશે.
              તો બધાને વિનંતી છે કે સમયાંતરે આ વેબ પેજની મુલાકાત લેતા રહેજો.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              {/*<Shield className="h-6 w-6 text-emerald-600" />*/}
              <h2 className="text-xl font-bold text-gray-900">📜 સંસ્થા સાથે સંકળાયેલા દરેક વ્યક્તિ એ ધ્યાનમાં રાખવા જેવી બાબતો </h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૧.</span> દરેક સભ્યે અન્ય સભ્યો, વિદ્યાર્થીઓ અને સંસ્થાના સ્ટાફ સાથે સન્માનપૂર્ણ વર્તન રાખવું.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૨.</span> સંસ્થાના ઉદ્દેશો અને પ્રવૃત્તિઓમાં સક્રિય સહભાગી થવું.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૩.</span> વ્યક્તિગત લાભ કરતા સમાજના હિતને પ્રાથમિકતા આપવી.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૪.</span> તમામ કાર્યોમાં ઈમાનદારી રાખવી.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૫</span> આર્થિક અને વ્યવહારિક બાબતોમાં પારદર્શિતા જાળવવી.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૬.</span> મીટિંગ, કાર્યક્રમો અને જવાબદારીઓમાં સમયનું પાલન કરવું.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૭</span> સંસ્થાના તમામ નિયમો અને નિર્ણયોને માનવું અને અનુસરવું.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૮.</span> સંસ્થાનો ઉપયોગ કોઈપણ રાજકીય અથવા વ્યક્તિગત લાભ માટે ન કરવો.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૯.</span> સંસ્થાની મિલકત અને સુવિધાઓનું સાચવણીપૂર્વક ઉપયોગ કરવો.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૧૦.</span> વિવાદો શાંતિપૂર્ણ રીતે ઉકેલવા પ્રયત્ન કરવો.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૧૧.</span> સંસ્થાની આંતરિક માહિતી બહાર શેર ન કરવી.</li>
              <li className="flex gap-2"><span className="text-emerald-500 font-bold">૧૨.</span> નિયમોનો ભંગ થાય તો સંસ્થા દ્વારા યોગ્ય કાર્યવાહી કરવામાં આવશે.</li>
            </ul>
          </section>
          {/** 
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
          </section>*/
          }
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
