import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: {
    default: "દંઢાવ બ્રહ્મભટ્ટ મંડળ",
    template: "%s | દંઢાવ બ્રહ્મભટ્ટ11 મંડળ",
  },
  description: "A connected neighborhood where everyone belongs. Stay informed, get involved, and build lasting connections.",
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
