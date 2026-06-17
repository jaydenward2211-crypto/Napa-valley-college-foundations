import React, { useState } from "react";
import NvcLogo from "./NvcLogo";
import { PageTab } from "../types";
import { Mail, Phone, MapPin, ExternalLink, ArrowRight, Heart } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans mt-auto">
      {/* Upper Footer Segment - Newsletter & Quick Impact */}
      <div className="bg-stone-800/80 border-b border-stone-700/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-white text-lg font-display font-semibold mb-2">
              Stay Connected with the Foundation
            </h3>
            <p className="text-stone-400 text-sm">
              Receive inspiring student success stories, upcoming annual banquet announcements, and tax credit giving deadline reminders.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow bg-stone-900 border border-stone-700 text-stone-200 text-sm py-2.5 px-4 rounded-lg focus:outline-none focus:border-nvc-gold-light transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-nvc-gold hover:bg-nvc-gold-dark text-stone-900 font-display font-bold text-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
              {!subscribed && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Segments */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Foundation Branding Column */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NvcLogo className="h-14 brightness-110 grayscale-20 opacity-90" showText={true} />
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            The Napa Valley College Foundation has partnered with the community since 1968 to turn philanthropic investments into life-changing academic opportunities.
          </p>
          <button
            onClick={() => setActiveTab("give")}
            className="w-fit flex items-center gap-1.5 px-4 py-2 text-xs font-display font-bold bg-nvc-gold/10 text-nvc-gold-light hover:bg-nvc-gold hover:text-stone-900 rounded-lg border border-nvc-gold-light/40 hover:border-nvc-gold transition-all duration-300"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Support NVC Students
          </button>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-nvc-gold">
            EXPLORE
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button onClick={() => setActiveTab("about")} className="hover:text-nvc-gold-light cursor-pointer text-left transition-colors">
                About the Foundation
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("scholarships")} className="hover:text-nvc-gold-light cursor-pointer text-left transition-colors">
                Apply for Scholarships
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("give")} className="hover:text-nvc-gold-light cursor-pointer text-left transition-colors">
                Ways to Donate Online
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("news-events")} className="hover:text-nvc-gold-light cursor-pointer text-left transition-colors">
                News Updates & Events
              </button>
            </li>
            <li>
              <a
                href="https://www.napavalley.edu"
                className="hover:text-nvc-gold-light text-left transition-colors flex items-center gap-1 inline-flex"
                target="_blank"
                rel="noreferrer"
              >
                Napa Valley College Home
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Impact Priorities */}
        <div>
          <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-nvc-gold">
            IMPACT AREAS
          </h4>
          <ul className="space-y-3.5 text-sm text-stone-400">
            <li className="hover:text-stone-300 transition-colors">
              <span className="text-nvc-gold-light mr-1.5 font-bold">»</span>Viticulture & Enology VEST Program
            </li>
            <li className="hover:text-stone-300 transition-colors">
              <span className="text-nvc-gold-light mr-1.5 font-bold">»</span>ADN & Health Occupation Labs
            </li>
            <li className="hover:text-stone-300 transition-colors">
              <span className="text-nvc-gold-light mr-1.5 font-bold">»</span>First-Generation Student Aid
            </li>
            <li className="hover:text-stone-300 transition-colors">
              <span className="text-nvc-gold-light mr-1.5 font-bold">»</span>Military Veterans Center
            </li>
            <li className="hover:text-stone-300 transition-colors">
              <span className="text-nvc-gold-light mr-1.5 font-bold">»</span>President's Emergency Resilience Grants
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Info */}
        <div className="flex flex-col gap-5">
          <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-1 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-nvc-gold">
            CONTACT US
          </h4>
          <div className="flex items-start gap-3.5 text-sm leading-relaxed">
            <MapPin className="h-5 w-5 text-nvc-gold-light flex-shrink-0 mt-0.5" />
            <span>
              <strong>NVC Foundation Office</strong><br />
              Napa Valley College Campus<br />
              2277 Napa-Vallejo Highway<br />
              Building 1500, Room 1530<br />
              Napa, CA 94558
            </span>
          </div>
          <div className="flex items-center gap-3.5 text-sm">
            <Phone className="h-4 w-4 text-nvc-gold-light flex-shrink-0" />
            <span>(707) 256-7170</span>
          </div>
          <div className="flex items-center gap-3.5 text-sm">
            <Mail className="h-4 w-4 text-nvc-gold-light flex-shrink-0" />
            <a href="mailto:foundation@napavalley.edu" className="hover:underline transition-all">
              foundation@napavalley.edu
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright segment */}
      <div className="bg-stone-950 text-stone-500 text-xs py-6 px-4 border-t border-stone-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left leading-relaxed">
            <p>© {new Date().getFullYear()} Napa Valley College Foundation, Inc. All Rights Reserved.</p>
            <p className="text-[10px] text-stone-600 mt-1">
              NVC Foundation is an independent 501(c)(3) non-profit supporting organization. Contributions are tax-deductible to the extent permitted by law.
            </p>
          </div>
          <div className="flex gap-4 text-stone-400">
            <span className="hover:text-nvc-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-nvc-gold cursor-pointer transition-colors">Internal Audits</span>
            <span>|</span>
            <span className="hover:text-nvc-gold cursor-pointer transition-colors">Donor Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
