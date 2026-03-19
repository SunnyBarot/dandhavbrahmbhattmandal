import Link from "next/link";

export default function HeroBanner() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "દંઢાવ બ્રહ્મભટ્ટ મંડળ";

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-center bg-cover bg-no-repeat opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-orange-400">{siteName}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-orange-100 leading-relaxed">
            દંઢાવ પ્રદેશની એક માત્ર પ્રગતિવાંછુ સંસ્થા<br/>
            &nbsp;&nbsp;&nbsp;&nbsp; શ્રી દંઢાવ બ્રહ્મભટ્ટ મંડળ
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
