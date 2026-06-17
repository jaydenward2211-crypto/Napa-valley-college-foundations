import React, { useState } from "react";
import { BOARD_MEMBERS, STAFF_MEMBERS } from "../data";
import { BoardMember, StaffMember } from "../types";
import { Award, ShieldAlert, CheckCircle, Landmark, Sparkles, Building2, Eye, UserPlus, Mail, Phone, X, ChartPie, TrendingUp, HandCoins } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AboutView() {
  const [activeSubTab, setActiveSubTab] = useState<"story" | "leadership" | "compliance">("story");
  const [selectedBoardMember, setSelectedBoardMember] = useState<BoardMember | null>(null);

  // Financial layout ratios (simulate active audit reports)
  const financialSources = [
    { label: "Vintner Partnerships / Harvest Pledges", percent: 38, amount: "$456,000", bg: "bg-nvc-green" },
    { label: "Private Endowments & Legacy Wills", percent: 32, amount: "$384,000", bg: "bg-nvc-teal" },
    { label: "Corporate Sponsorship & Local Banks", percent: 20, amount: "$240,000", bg: "bg-nvc-gold" },
    { label: "Public Trustees / Campus Matching Grants", percent: 10, amount: "$120,000", bg: "bg-stone-500" }
  ];

  const financialAllocations = [
    { label: "Student Scholarships & Emergency Bursaries", percent: 65, amount: "$780,000", bg: "bg-nvc-green" },
    { label: "Viticulture Laboratory & Medical Sim Equipment", percent: 22, amount: "$264,000", bg: "bg-nvc-teal" },
    { label: "Instructional Support & Career Certifications", percent: 8, amount: "$96,000", bg: "bg-nvc-gold" },
    { label: "Administrative Operations & Integrity compliance", percent: 5, amount: "$60,000", bg: "bg-stone-500" }
  ];

  return (
    <div className="bg-stone-50 font-sans min-h-screen">
      {/* Editorial Mini Banner */}
      <section className="bg-nvc-green-dark text-white py-16 px-4 text-center relative overflow-hidden">
        {/* Decorative grape vine illustration backplate */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1543418219-44e30b057fc5?auto=format&fit=crop&q=80&w=1200"
            alt="Vine leaves texture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-3">
          <span className="text-nvc-gold-light text-xs font-display font-black tracking-widest uppercase">
            WHO WE ARE
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight">
            Our Mission & Legacy
          </h1>
          <div className="h-1 w-16 bg-nvc-gold mx-auto my-1 rounded-full" />
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Securing Napa's tomorrow by investing in the dreams and capabilities of our community college students today.
          </p>
        </div>
      </section>

      {/* SUB MENU TABS WITH ICONS */}
      <section className="bg-white border-b border-stone-200 sticky top-24 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-around px-4">
          <button
            onClick={() => setActiveSubTab("story")}
            className={`py-4 px-2 md:px-6 text-xs md:text-sm font-display font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer focus:outline-none ${
              activeSubTab === "story"
                ? "border-nvc-green text-nvc-green"
                : "border-transparent text-stone-500 hover:text-nvc-green"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Our Story & Values
          </button>
          <button
            onClick={() => setActiveSubTab("leadership")}
            className={`py-4 px-2 md:px-6 text-xs md:text-sm font-display font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer focus:outline-none ${
              activeSubTab === "leadership"
                ? "border-nvc-green text-nvc-green"
                : "border-transparent text-stone-500 hover:text-nvc-green"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Leadership & Staff
          </button>
          <button
            onClick={() => setActiveSubTab("compliance")}
            className={`py-4 px-2 md:px-6 text-xs md:text-sm font-display font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer focus:outline-none ${
              activeSubTab === "compliance"
                ? "border-nvc-green text-nvc-green"
                : "border-transparent text-stone-500 hover:text-nvc-green"
            }`}
          >
            <ChartPie className="h-4 w-4" />
            Financial Compliance
          </button>
        </div>
      </section>

      {/* TABS CONTENT WITH TRANSITIONS */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeSubTab === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="flex flex-col gap-6">
                <span className="text-nvc-green text-xs font-display font-bold uppercase tracking-widest">
                  Est. 1968
                </span>
                <h2 className="text-3xl font-serif font-black text-stone-800 tracking-tight">
                  Over 55 Years of Academic Partnership
                </h2>
                <div className="h-1 w-12 bg-nvc-gold rounded-full" />
                <p className="text-stone-600 text-sm leading-relaxed">
                  The Napa Valley College Foundation is a registered 501(c)(3) supporting organization. Founded in 1968 by community members who believed that Napa County should have access to world-class academic training, the Foundation acts as a steward for philanthropic capital.
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We bridge the gap between public tax financing and the actual cost of providing cutting-edge educational laboratories. Through endowments, private scholarship gifts, and estate trusts, we elevate careers in viticulture, healthcare, computer science, and regional business.
                </p>

                {/* Values Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-nvc-green flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-800 text-xs block">Absolute transparency</strong>
                      <span className="text-stone-500 text-[11px]">Strict annual audits and public IRS 990 visibility.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-nvc-green flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-800 text-xs block">Student Focus</strong>
                      <span className="text-stone-500 text-[11px]">85%+ of capital routed directly into student scholarships.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-nvc-green flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-800 text-xs block">Regional Relevance</strong>
                      <span className="text-stone-500 text-[11px]">Custom modules for locally dominant industries like wine and health.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-nvc-green flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-800 text-xs block">Stewardship Priority</strong>
                      <span className="text-stone-500 text-[11px]">Active, safe wealth expansion of long-term endowment assets.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Imagery Banner */}
              <div className="relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                  alt="Students Graduating happily"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent flex items-end p-8">
                  <div className="text-white flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-nvc-gold-light animate-pulse" />
                    <span className="font-serif font-black text-lg text-white">
                      Expanding pathways to success.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEADERSHIP GRID WITH CLICK TO BIO DIALOG */}
          {activeSubTab === "leadership" && (
            <motion.div
              key="leadership"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-14"
            >
              {/* Foundation Staff Segment */}
              <div>
                <div className="mb-8 flex items-center gap-2">
                  <Award className="h-5 w-5 text-nvc-gold" />
                  <h3 className="text-xl font-serif font-bold text-stone-800">
                    Foundation Professional Staff
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {STAFF_MEMBERS.map((staff) => (
                    <div
                      key={staff.id}
                      className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-nvc-green" />
                      <div>
                        <h4 className="text-stone-950 font-display font-bold text-base">{staff.name}</h4>
                        <span className="text-nvc-gold text-xs font-display font-semibold uppercase tracking-wider block mt-0.5">
                          {staff.role}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed flex-grow">
                        {staff.bio}
                      </p>
                      <div className="pt-4 border-t border-stone-100 flex flex-col gap-2 text-xs font-mono text-stone-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-nvc-green" />
                          <a href={`mailto:${staff.email}`} className="hover:underline">{staff.email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-nvc-green" />
                          <span>{staff.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Board Officers & Directors */}
              <div>
                <div className="mb-8 flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-nvc-green" />
                  <h3 className="text-xl font-serif font-bold text-stone-800">
                    Board of Directors
                  </h3>
                </div>
                <p className="text-stone-500 text-xs mb-6 max-w-2xl leading-relaxed">
                  Our Board of Directors represents a dynamic cross-section of Napa Valley’s agriculture, banking, legal, health, and academic leadership. Click on any member to read their bio and dedication portfolio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BOARD_MEMBERS.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setSelectedBoardMember(member)}
                      className="bg-white border border-stone-200 hover:border-nvc-green-light rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-4 group hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-stone-900 font-display font-semibold text-sm group-hover:text-nvc-green transition-colors">
                            {member.name}
                          </h4>
                          <span className={`text-[9px] px-2 py-0.5 font-display font-bold rounded-full border uppercase ${
                            member.category === "officer"
                              ? "bg-nvc-green-pale text-nvc-green border-nvc-green/20"
                              : "bg-stone-100 text-stone-600 border-stone-200"
                          }`}>
                            {member.category}
                          </span>
                        </div>
                        <span className="text-nvc-gold text-xs block mt-1 font-semibold">
                          {member.role}
                        </span>
                        {member.organization && (
                          <span className="text-stone-400 text-xs block mt-0.5 truncate font-sans">
                            {member.organization}
                          </span>
                        )}
                      </div>
                      <span className="text-nvc-green text-[10px] uppercase tracking-wider font-display font-bold flex items-center gap-1 group-hover:underline">
                        View Profile
                        <Eye className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* FINANCIAL ACCOUNTABILITY WITH CHARTS */}
          {activeSubTab === "compliance" && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-12"
            >
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <span className="text-nvc-green text-xs font-display font-bold uppercase tracking-widest block mb-1">
                      Fiscal Year 2025 Audit
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">
                      Source & Application of Donor Capital
                    </h3>
                  </div>
                  <div className="px-4 py-2 bg-stone-100 rounded-xl border border-stone-200 text-xs font-mono text-stone-600 self-start">
                    Annual Donations Administered: $1,200,000
                  </div>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed max-w-2xl">
                  We are deeply committed to operating with the absolute highest standards of fiduciary integrity. <strong>Over 87 cents of every single dollar</strong> received goes directly to students and classroom innovations. Admin, marketing, and operations overhead is fully covered by private endowment dividends.
                </p>

                {/* VISUAL CHARTS COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
                  {/* Revenue Sources */}
                  <div>
                    <h4 className="text-stone-900 font-serif font-black text-sm mb-4 flex items-center gap-2 border-b border-stone-100 pb-2">
                      <TrendingUp className="h-4 w-4 text-nvc-green" />
                      Where the Money Comes From
                    </h4>
                    <div className="flex flex-col gap-5">
                      {financialSources.map((source, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5 animate-fadeIn">
                          <div className="flex justify-between text-xs text-stone-700">
                            <span className="font-semibold">{source.label}</span>
                            <span className="font-mono font-bold text-nvc-green">{source.percent}% ({source.amount})</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`${source.bg} h-full rounded-full`}
                              style={{ width: `${source.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programmatic Expenditure */}
                  <div>
                    <h4 className="text-stone-900 font-serif font-black text-sm mb-4 flex items-center gap-2 border-b border-stone-100 pb-2">
                      <HandCoins className="h-4 w-4 text-nvc-gold" />
                      Where the Money Goes
                    </h4>
                    <div className="flex flex-col gap-5">
                      {financialAllocations.map((alloc, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5 animate-fadeIn">
                          <div className="flex justify-between text-xs text-stone-700">
                            <span className="font-semibold">{alloc.label}</span>
                            <span className="font-mono font-bold text-nvc-gold">{alloc.percent}% ({alloc.amount})</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`${alloc.bg} h-full rounded-full`}
                              style={{ width: `${alloc.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Badging Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3">
                  <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full font-bold font-mono text-sm border border-emerald-100">
                    IRS 501(c)(3)
                  </span>
                  <h4 className="text-stone-800 font-display font-bold text-xs uppercase tracking-wider">
                    Tax Exemption Status
                  </h4>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    Completely certified by the California Franchise Tax Board for deductibility.
                  </p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3">
                  <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full font-bold font-mono text-sm border border-emerald-100">
                    GOLD RATING
                  </span>
                  <h4 className="text-stone-800 font-display font-bold text-xs uppercase tracking-wider">
                    Candid / GuideStar Status
                  </h4>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    Accredited with highest transparency rating for non-profit record publication.
                  </p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3">
                  <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full font-bold font-mono text-xs border border-emerald-100 uppercase">
                    Independent
                  </span>
                  <h4 className="text-stone-800 font-display font-bold text-xs uppercase tracking-wider">
                    Annual External Audit
                  </h4>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    Independently balanced by certified public accountants. Full reports open on demand.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* DETAILED LEDGER DIALOG OVERLAY */}
      <AnimatePresence>
        {selectedBoardMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBoardMember(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-w-lg w-full z-10 relative flex flex-col"
            >
              {/* Green Header strip */}
              <div className="h-3 bg-nvc-green" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedBoardMember(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 select-none cursor-pointer focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 flex flex-col gap-5">
                <div>
                  <span className={`text-[9px] px-2 py-0.5 font-display font-extrabold rounded-full border uppercase inline-block mb-3 ${
                    selectedBoardMember.category === "officer"
                      ? "bg-nvc-green-pale text-nvc-green border-nvc-green/20"
                      : "bg-stone-100 text-stone-600 border-stone-200"
                  }`}>
                    {selectedBoardMember.category}
                  </span>
                  <h3 className="text-stone-950 font-serif font-bold text-2xl tracking-tight leading-none leading-relaxed">
                    {selectedBoardMember.name}
                  </h3>
                  <span className="text-nvc-gold font-semibold text-sm block mt-1">
                    {selectedBoardMember.role}
                  </span>
                  {selectedBoardMember.organization && (
                    <span className="text-stone-400 text-xs block mt-0.5 font-sans font-medium">
                      {selectedBoardMember.organization}
                    </span>
                  )}
                </div>

                <div className="h-px bg-stone-100" />

                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-display font-extrabold uppercase text-stone-700 tracking-wider">
                    biography & Dedication
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed font-sans">
                    {selectedBoardMember.bio || "No biography has been inputted yet for this director."}
                  </p>
                </div>

                <div className="h-px bg-stone-100 mt-2" />

                <div className="flex items-center gap-2.5 text-[10px] text-stone-400 font-mono">
                  <span>Napa Valley College support Endowment</span>
                  <span>●</span>
                  <span>Active Trustee Portfolio</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
