import React, { useState } from "react";
import NvcLogo from "./NvcLogo";
import { PageTab } from "../types";
import { Menu, X, Heart, Landmark, GraduationCap, DollarSign, CalendarDays } from "lucide-react";

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home" as PageTab, label: "Home", icon: Landmark },
    { id: "about" as PageTab, label: "About Us", icon: Landmark },
    { id: "scholarships" as PageTab, label: "Scholarships", icon: GraduationCap },
    { id: "give" as PageTab, label: "Ways to Give", icon: DollarSign },
    { id: "news-events" as PageTab, label: "News & Events", icon: CalendarDays },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-nvc-green-pale/50 transition-all">
      {/* Top Bar with Small Announcements */}
      <div className="bg-nvc-green-dark text-stone-100 text-[11px] py-1.5 px-4 flex justify-between items-center tracking-wide font-sans md:px-8">
        <div className="flex items-center gap-4">
          <span>Official Site of the Napa Valley College Foundation</span>
          <span className="hidden md:inline text-nvc-gold-light">●</span>
          <span className="hidden md:inline hover:underline cursor-pointer" onClick={() => setActiveTab("scholarships")}>
            Fall 2026 Scholarship Applications Now Open!
          </span>
        </div>
        <div className="flex items-center gap-4 h-full">
          <span className="font-mono">Contact: (707) 256-7170</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}>
            <NvcLogo className="h-16 md:h-18" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 items-center">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2.5 rounded-md text-[14px] font-display font-semibold transition-all duration-300 flex items-center gap-1.5 focus:outline-none ${
                    isActive
                      ? "text-nvc-green bg-nvc-green-pale"
                      : "text-stone-600 hover:text-nvc-green hover:bg-stone-50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-nvc-green rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Accent CTA */}
            <button
              onClick={() => setActiveTab("give")}
              className="ml-4 px-5 py-2.5 bg-nvc-gold hover:bg-nvc-gold-dark text-white rounded-lg text-sm font-display font-bold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
              DONATE NOW
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setActiveTab("give")}
              className="px-4 py-2 bg-nvc-gold text-white text-xs font-display font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              GIVE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-500 hover:text-nvc-green hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-50 border-t border-stone-200 animate-fadeIn shadow-inner">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-display font-semibold flex items-center gap-3 transition-colors ${
                    isActive
                      ? "text-nvc-green bg-nvc-green-pale border-l-4 border-nvc-green"
                      : "text-stone-700 hover:bg-stone-100 hover:text-nvc-green"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 px-2">
              <button
                onClick={() => {
                  setActiveTab("give");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-nvc-green hover:bg-nvc-green-dark text-stone-100 font-display font-bold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 fill-current animate-pulse" />
                Support NVC Students
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
