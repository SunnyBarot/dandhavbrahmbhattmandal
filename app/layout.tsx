import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: {
    default: "શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ, અમદાવાદ",
    template: "%s | શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ, અમદાવાદ",
  },
  description: "દંઢાવ પ્રદેશની એક માત્ર પ્રગતિવાંછુ સંસ્થા - શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ, અમદાવાદ. અમારી સંસ્થા સમાજ સેવા, શૈક્ષણિક પ્રવૃત્તિઓ અને સાંસ્કૃતિક કાર્યક્રમો દ્વારા દંઢાવ પ્રદેશના વિકાસ માટે કાર્યરત છે.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
