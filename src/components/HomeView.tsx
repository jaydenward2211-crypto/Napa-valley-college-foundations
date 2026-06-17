import React, { useState, useEffect } from "react";
import { PageTab } from "../types";
import { SCHOLARSHIPS } from "../data";
import { ArrowRight, Gift, Award, HelpCircle, GraduationCap, FlameKindling, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  setActiveTab: (tab: PageTab) => void;
}

const INSIGHTS = [
  {
    quote: "Receiving the Mondavi Culinary Fellowship allowed me to cut back my restaurant hours and focus on gastronomy. I went from dishwasher to sous chef with NVC's encouragement.",
    author: "Diego Alvarez",
    major: "Culinary Arts & Hospitality Management",
    year: "Class of 2026"
  },
  {
    quote: "As a veteran, matching into NVC's Chevron scholarship gave me vital security for books and childcare. The Veterans Resource Center became my second family.",
    author: "Elena Vasquez",
    major: "Business Administration",
    year: "Class of 2025"
  },
  {
    quote: "The Viticulture scholarship allowed me to spend my evenings studying in NVC's research vineyard instead of worrying about rent. Today, I am managing modern crop diagnostics.",
    author: "Marcus Vance",
    major: "Viticulture & Enology (VEST)",
    year: "Class of 2026"
  }
];

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [activeQuote, setActiveQuote] = useState(0);

  // Static quotes interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % INSIGHTS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-stone-50 font-sans min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[480px] lg:h-[600px] overflow-hidden flex items-center">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1800"
            alt="Beautiful Napa Valley Vineyard"
            className="w-full h-full object-cover filter brightness-[0.38] contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle green overlay */}
          <div className="absolute inset-0 bg-nvc-green-dark/20 mix-blend-multiply" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col items-start gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col gap-4"
          >
            <span className="text-nvc-gold-light md:text-sm text-xs tracking-widest font-display font-black uppercase text-glow">
              TRANSFORMING LIVES IN NAPA VALLEY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight tracking-tight drop-shadow-sm">
              Supporting Student Ambition. <br className="hidden md:inline" />
              <span className="text-nvc-gold-light font-style: italic">Enriching</span> Our Communities.
            </h1>
            <p className="text-stone-200 text-sm md:text-base leading-relaxed font-sans max-w-xl">
              Since 1968, the Napa Valley College Foundation has matched community generosity with ambitious minds, funding academic excellence, viticulture labs, healthcare programs, and individual financial resiliencies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto"
          >
            <button
              onClick={() => setActiveTab("give")}
              className="px-8 py-3.5 bg-nvc-gold hover:bg-nvc-gold-dark text-stone-950 font-display font-black text-sm rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift className="h-4.5 w-4.5" />
              DONATE TO THE HARVEST
            </button>
            <button
              onClick={() => setActiveTab("scholarships")}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-sm rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap className="h-4.5 w-4.5" />
              APPLY FOR SCHOLARSHIPS
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC METRICS SECTION */}
      <section className="bg-white border-y border-stone-200 shadow-sm relative z-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="flex flex-col items-center gap-2 py-4 md:py-0">
              <span className="text-4xl lg:text-5xl font-display font-black text-nvc-green-dark">
                $1.2M+
              </span>
              <span className="text-nvc-gold text-xs font-display font-bold uppercase tracking-widest">
                Scholarships Awarded Annually
              </span>
              <p className="text-stone-500 text-xs px-6 mt-1">
                Funded by individual vineyards, estates, and memorial trusts.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 md:py-0">
              <span className="text-4xl lg:text-5xl font-display font-black text-nvc-green-dark">
                800+
              </span>
              <span className="text-nvc-gold text-xs font-display font-bold uppercase tracking-widest">
                Students Supported Yearly
              </span>
              <p className="text-stone-500 text-xs px-6 mt-1">
                Reducing education debt and providing critical regional work pathways.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 md:py-0">
              <span className="text-4xl lg:text-5xl font-display font-black text-nvc-green-dark">
                $5.1M+
              </span>
              <span className="text-nvc-gold text-xs font-display font-bold uppercase tracking-widest">
                Active Endowment Assets
              </span>
              <p className="text-stone-500 text-xs px-6 mt-1">
                Safely invested to secure scholarships for future Napa children.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIORITIES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-nvc-green text-xs font-display font-extrabold uppercase tracking-widest">
            Investing in Opportunities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight">
            How Your Philanthropy Supports Success
          </h2>
          <div className="h-1.5 w-16 bg-nvc-gold mx-auto rounded-full" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-2">
            The Foundation works collaboratively with Napa Valley College faculty to route capital into targeted programs keeping winemaking, medical clinical support, and technical arts at the national limit of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Viticulture & VEST */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1516594798947-e6fc50d1e78a?auto=format&fit=crop&q=80&w=700"
                alt="Agricultural Vineyards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-nvc-green text-white text-[10px] tracking-widest font-display font-bold px-3 py-1 rounded-full uppercase">
                AGRICULTURE & Viticulture
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
              <h3 className="text-lg font-serif font-bold text-stone-800">
                Winery Excellence (VEST)
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed flex-grow">
                Napa is a global viticulture capital. The foundation supports state-of-the-art soil machinery, drone harvesting labs, and the campus's own instructional commercial winery to educate tomorrow’s cellarmasters.
              </p>
              <button
                onClick={() => setActiveTab("give")}
                className="text-nvc-green hover:text-nvc-gold font-display font-bold text-xs flex items-center gap-1.5 group cursor-pointer mt-2"
              >
                GIVE TO INTEGRATED VEST FUND
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Health Occupations */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=700"
                alt="Medical Nursing Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-nvc-green text-white text-[10px] tracking-widest font-display font-bold px-3 py-1 rounded-full uppercase">
                HEALTH CARE PATHWAYS
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
              <h3 className="text-lg font-serif font-bold text-stone-800">
                Registered Nursing Labs
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed flex-grow">
                The local healthcare workforce faces massive staffing deficits. We provide simulation testing mannequins, pediatric monitors, and critical clinical travel bursaries to keep top-tier talent graduating locally.
              </p>
              <button
                onClick={() => setActiveTab("give")}
                className="text-nvc-green hover:text-nvc-gold font-display font-bold text-xs flex items-center gap-1.5 group cursor-pointer mt-2"
              >
                SUPPORT HEALING LIVES FUND
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Emergency Hardship */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1541829019-2131560db32e?auto=format&fit=crop&q=80&w=700"
                alt="Student studying with resilience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-stone-700 text-white text-[10px] tracking-widest font-display font-bold px-3 py-1 rounded-full uppercase">
                CRITICAL AID
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
              <h3 className="text-lg font-serif font-bold text-stone-800">
                President’s Resiliency Grants
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed flex-grow">
                Over 40% of community college students face sudden housing or dietary crises. Our donor emergency funds provide matching rapid checks within 24 hours to clear automotive failures, rent deficits, and sudden bills.
              </p>
              <button
                onClick={() => setActiveTab("scholarships")}
                className="text-nvc-green hover:text-nvc-gold font-display font-bold text-xs flex items-center gap-1.5 group cursor-pointer mt-2"
              >
                REQUEST EMERGENCY GRANTS
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STUDENT VOICES CAROUSEL (Editorial & High Craft) */}
      <section className="bg-nvc-green-pale border-y border-nvc-green/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
          <div className="text-center flex flex-col gap-1">
            <span className="text-nvc-green text-xs font-display font-bold uppercase tracking-widest">
              Impact Spotlights
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              In Their Own Words: Student Success Stories
            </h2>
          </div>

          {/* Quote Banner */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col gap-8 max-w-3xl relative">
            {/* Absolute quote background marker */}
            <span className="absolute top-4 right-8 font-serif text-8xl text-stone-100 italic select-none pointer-events-none">
              “
            </span>

            <motion.div
              key={activeQuote}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 relative z-10"
            >
              <p className="text-stone-700 text-base md:text-lg leading-relaxed font-serif italic text-center">
                "{INSIGHTS[activeQuote].quote}"
              </p>
              <div className="flex flex-col items-center text-center mt-2">
                <span className="text-stone-900 font-display font-bold text-sm">
                  {INSIGHTS[activeQuote].author}
                </span>
                <span className="text-nvc-gold text-xs font-display font-semibold">
                  {INSIGHTS[activeQuote].major}
                </span>
                <span className="text-stone-400 text-[10px] uppercase font-mono mt-0.5">
                  {INSIGHTS[activeQuote].year}
                </span>
              </div>
            </motion.div>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {INSIGHTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuote(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeQuote === idx ? "w-8 bg-nvc-gold" : "w-2.5 bg-stone-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE QUALIFIER COMPONENT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-nvc-green-dark text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Grape graphic detail accent */}
          <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-nvc-gold-light animate-pulse" />
              <span className="text-nvc-gold-light text-xs font-display font-extrabold uppercase tracking-widest">
                Eligibility Finder
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold">
              Ready to Fund Your Future?
            </h3>
            <p className="text-stone-200 text-xs leading-relaxed font-sans">
              Our streamlined matching engine scans all active estate, viticulture, nursing, and general scholarships in under a minute. Submit your GPA and find your award!
            </p>
          </div>

          <button
            onClick={() => setActiveTab("scholarships")}
            className="flex-shrink-0 px-7 py-3.5 bg-nvc-gold hover:bg-nvc-gold-light text-stone-950 font-display font-black text-sm rounded-xl tracking-wider shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            NVC SCHOLARSHIP MATCH
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
