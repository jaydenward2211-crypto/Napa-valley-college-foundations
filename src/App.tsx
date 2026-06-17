import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ScholarshipsView from "./components/ScholarshipsView";
import WaysToGiveView from "./components/WaysToGiveView";
import NewsEventsView from "./components/NewsEventsView";
import { PageTab } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>("home");

  // Reset scroll on tab transitions to replicate normal multi-page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-nvc-gold/30 selection:text-nvc-green-dark">
      {/* Brand Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Router */}
      <main className="flex-grow">
        {activeTab === "home" && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === "about" && <AboutView />}
        {activeTab === "scholarships" && <ScholarshipsView />}
        {activeTab === "give" && <WaysToGiveView />}
        {activeTab === "news-events" && <NewsEventsView />}
      </main>

      {/* Operational Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
