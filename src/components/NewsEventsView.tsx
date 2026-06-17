import React, { useState } from "react";
import { NEWS_ARTICLES, EVENTS } from "../data";
import { NewsArticle, EventItem } from "../types";
import { Calendar, Search, ArrowRight, UserCheck, MapPin, Clock, X, Info, Sparkles, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsEventsView() {
  const [newsQuery, setNewsQuery] = useState("");
  const [selectedStory, setSelectedStory] = useState<NewsArticle | null>(null);

  // Event RSVP states
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<EventItem | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: "", email: "", guests: 0 });
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [rsvpErrors, setRsvpErrors] = useState<Record<string, string>>({});

  const filteredNews = NEWS_ARTICLES.filter((art) => {
    return (
      art.title.toLowerCase().includes(newsQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(newsQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(newsQuery.toLowerCase())
    );
  });

  const handleRsvpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRsvpData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value
    }));
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!rsvpData.name.trim()) errors.name = "Full Name is required";
    if (!rsvpData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(rsvpData.email)) {
      errors.email = "Please input a valid email address";
    }
    setRsvpErrors(errors);

    if (Object.keys(errors).length === 0 && activeRsvpEvent) {
      setRegisteredEventIds([...registeredEventIds, activeRsvpEvent.id]);
      setActiveRsvpEvent(null);
      setRsvpData({ name: "", email: "", guests: 0 });
    }
  };

  return (
    <div className="bg-stone-50 font-sans min-h-screen pb-20">
      {/* Editorial Header Banner */}
      <section className="bg-nvc-green-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200"
            alt="Napa banquet"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-3">
          <span className="text-nvc-gold-light text-xs font-display font-black tracking-widest uppercase">
            FOUNDATION UPDATES & CALENDAR
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight">
            News & Community Events
          </h1>
          <div className="h-1 w-16 bg-nvc-gold mx-auto my-1 rounded-full" />
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Follow the direct results of your philanthropic donations and secure your place at our upcoming campus wine events and luncheons.
          </p>
        </div>
      </section>

      {/* TWO SECTOR LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 mt-16 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT SECTOR: RECENT NEWS & SPOTLIGHTS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="text-nvc-green text-xs font-display font-bold uppercase tracking-widest block mb-1">
              Recent Newsletters
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
              Stories of Impact & Expansion
            </h3>
            {/* Search filter inside News */}
            <div className="relative max-w-sm mt-4">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={newsQuery}
                onChange={(e) => setNewsQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {filteredNews.map((art) => (
              <div
                key={art.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
                    <span>{art.date}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-nvc-green-pale text-nvc-green-dark font-extrabold uppercase text-[9px] border border-nvc-green/10">
                      {art.category}
                    </span>
                  </div>
                  <h4 className="text-stone-950 font-serif font-bold text-sm leading-snug group-hover:text-nvc-green transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed font-sans">
                    {art.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedStory(art)}
                  className="w-fit text-nvc-green hover:text-nvc-gold font-display font-extrabold text-[11px] flex items-center gap-1.5 cursor-pointer mt-1 group"
                >
                  READ STORY DETAILS
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}

            {filteredNews.length === 0 && (
              <div className="text-center py-12 text-stone-400 text-xs">
                No articles match your query. Try clearing your search fields.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTOR: UPCOMING CALENDAR & RSVP (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="text-nvc-gold text-xs font-display font-black uppercase tracking-widest block mb-1">
              Active Calendar
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight block">
              Join Us on Campus
            </h3>
            <p className="text-stone-500 text-xs mt-3 leading-relaxed">
              We host open vineyard tastings, scholarships orientation seminars, and annual banquets. Support students directly by participating!
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {EVENTS.map((evt) => {
              const isRegistered = registeredEventIds.includes(evt.id);
              return (
                <div
                  key={evt.id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col gap-4 relative overflow-hidden"
                >
                  {isRegistered && (
                    <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[9px] font-display font-black px-4 py-1 rounded-bl-lg uppercase flex items-center gap-1">
                      <UserCheck className="h-3 w-3" />
                      RSVP Registered
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Visual Date Badge */}
                    <div className="h-14 w-12 bg-nvc-green text-white rounded-lg flex flex-col items-center justify-center font-display flex-shrink-0 border border-nvc-green">
                      <span className="text-[9px] uppercase tracking-wide opacity-80">
                        {evt.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-black leading-none mt-0.5">
                        {evt.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 pr-16">
                      <h4 className="text-stone-900 font-serif font-semibold text-sm leading-tight">
                        {evt.title}
                      </h4>
                      <p className="text-stone-500 text-xs leading-none font-sans mt-0.5">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-3 text-[10px] text-stone-400 font-mono justify-between items-start sm:items-center">
                    <div className="flex flex-col gap-1 text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-nvc-green" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-nvc-green" />
                        <span className="truncate max-w-[200px]">{evt.location}</span>
                      </div>
                    </div>

                    {!isRegistered ? (
                      <button
                        onClick={() => setActiveRsvpEvent(evt)}
                        className="px-4 py-2 bg-stone-100 hover:bg-nvc-gold text-stone-800 hover:text-stone-950 font-display font-extrabold rounded-lg tracking-wide shadow-xs transition-colors self-end sm:self-auto cursor-pointer"
                      >
                        RSVP ONLINE
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        ✓ Registered
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OVERLAY DIALOGS: 1. STORY DETAIL */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-w-2xl w-full z-10 relative flex flex-col max-h-[85vh]"
            >
              <div className="h-4 bg-nvc-green" />
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 select-none cursor-pointer focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 overflow-y-auto flex flex-col gap-5">
                <div>
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-2">
                    <span>{selectedStory.date}</span>
                    <span className="text-nvc-gold font-bold uppercase tracking-wider">{selectedStory.category}</span>
                  </div>
                  <h3 className="text-stone-950 font-serif font-black text-2xl tracking-tight leading-snug">
                    {selectedStory.title}
                  </h3>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Main Content paragraphs */}
                <div className="flex flex-col gap-4 text-xs text-stone-600 leading-relaxed font-sans font-medium">
                  <strong>Summary: {selectedStory.summary}</strong>
                  <p>{selectedStory.content}</p>
                </div>

                <div className="h-px bg-stone-100 mt-2" />

                <div className="flex items-center gap-2 text-[10px] text-stone-400">
                  <BookOpen className="h-4 w-4" />
                  <span>Napa Valley College Foundation Communications Archive</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY DIALOGS: 2. EVENT RSVP FORM */}
      <AnimatePresence>
        {activeRsvpEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRsvpEvent(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-w-md w-full z-10 relative flex flex-col"
            >
              <div className="h-3 bg-nvc-gold" />
              {/* Close Button */}
              <button
                onClick={() => setActiveRsvpEvent(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 select-none cursor-pointer focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <form onSubmit={handleRsvpSubmit} className="p-8 flex flex-col gap-5">
                <div>
                  <div className="flex gap-2 items-center text-xs font-mono text-nvc-gold-dark font-bold mb-1 uppercase">
                    <Sparkles className="h-4 w-4" />
                    RSVP Registration
                  </div>
                  <h3 className="text-stone-950 font-serif font-black text-xl tracking-tight leading-tight pr-6">
                    {activeRsvpEvent.title}
                  </h3>
                  <p className="text-stone-400 text-xs mt-1 leading-snug font-sans">
                    Completing registration secures your admission pass to this upcoming event.
                  </p>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Form fields */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <label className="text-[11px] font-display font-semibold text-stone-700">Full Legal Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={rsvpData.name}
                      onChange={handleRsvpChange}
                      placeholder="Your name"
                      className={`placeholder-stone-400 bg-stone-50 text-xs py-2 px-3 border rounded-xl focus:outline-none focus:border-nvc-gold ${
                        rsvpErrors.name ? "border-red-400 bg-red-50/10" : "border-stone-200"
                      }`}
                    />
                    {rsvpErrors.name && <span className="text-[10px] text-red-500">{rsvpErrors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <label className="text-[11px] font-display font-semibold text-stone-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={rsvpData.email}
                      onChange={handleRsvpChange}
                      placeholder="you@example.com"
                      className={`placeholder-stone-400 bg-stone-50 text-xs py-2 px-3 border rounded-xl focus:outline-none focus:border-nvc-gold ${
                        rsvpErrors.email ? "border-red-400 bg-red-50/10" : "border-stone-200"
                      }`}
                    />
                    {rsvpErrors.email && <span className="text-[10px] text-red-500">{rsvpErrors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <label className="text-[11px] font-display font-semibold text-stone-700">Additional Guests</label>
                    <select
                      name="guests"
                      value={rsvpData.guests}
                      onChange={handleRsvpChange}
                      className="bg-stone-50 text-xs py-2 px-3 border border-stone-200 rounded-xl focus:outline-none focus:border-nvc-gold"
                    >
                      <option value={0}>0 Guests (just me)</option>
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="h-px bg-stone-100 mt-2" />

                <button
                  type="submit"
                  className="w-full py-3 bg-nvc-green hover:bg-nvc-green-dark text-white font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Confirm RSVP Registry Pass
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
