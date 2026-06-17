import React, { useState, useMemo } from "react";
import { SCHOLARSHIPS } from "../data";
import { Scholarship, ScholarshipApplication } from "../types";
import { GraduationCap, Search, SlidersHorizontal, ArrowRight, Check, CheckCircle2, AlertTriangle, ShieldCheck, Bookmark, FileText, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScholarshipsView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userGPA, setUserGPA] = useState<number>(2.0);
  const [isFirstGen, setIsFirstGen] = useState<boolean>(false);
  const [isVeteran, setIsVeteran] = useState<boolean>(false);
  const [activeSliderExpanded, setActiveSliderExpanded] = useState<boolean>(false);

  // Application engine state
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [selectedScholarshipsToApply, setSelectedScholarshipsToApply] = useState<Scholarship[]>([]);
  const [formData, setFormData] = useState<ScholarshipApplication>({
    fullName: "",
    email: "",
    phone: "",
    nvcStudentId: "",
    gpa: 2.0,
    major: "",
    financialNeed: "high",
    personalStatement: "",
    selectedScholarships: []
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [applicationReceiptId, setApplicationReceiptId] = useState<string>("");

  // Categories list
  const categories = [
    { id: "all", label: "All Funds" },
    { id: "viticulture", label: "Viticulture (VEST)" },
    { id: "health", label: "Nursing & Health Care" },
    { id: "hospitality", label: "Culinary & Hospitality" },
    { id: "first-gen", label: "First Generation" },
    { id: "veteran", label: "Military Veterans" },
    { id: "stem", label: "STEM Sciences" },
    { id: "general", label: "General & Resiliency" }
  ];

  // Scholarship matching filter algorithm
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter((sch) => {
      // 1. Search Query
      if (
        searchQuery &&
        !sch.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sch.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Category Filter
      if (activeCategory !== "all" && sch.category !== activeCategory) {
        return false;
      }

      // 3. GPA requirement check
      if (sch.gpaRequirement > userGPA) {
        return false;
      }

      // 4. Special flags
      if (isFirstGen && sch.category === "first-gen") {
        return true;
      }
      if (isVeteran && sch.category === "veteran") {
        return true;
      }

      return true;
    });
  }, [activeCategory, searchQuery, userGPA, isFirstGen, isVeteran]);

  const handleLaunchApply = (sch: Scholarship) => {
    // Add to selected list and pop open form
    if (!selectedScholarshipsToApply.some((s) => s.id === sch.id)) {
      setSelectedScholarshipsToApply([...selectedScholarshipsToApply, sch]);
    }
    setFormData((prev) => ({
      ...prev,
      gpa: userGPA // prepopulate with filter
    }));
    setIsApplying(true);
  };

  const handleToggleApplicationSelection = (sch: Scholarship) => {
    if (selectedScholarshipsToApply.some((s) => s.id === sch.id)) {
      setSelectedScholarshipsToApply(selectedScholarshipsToApply.filter((s) => s.id !== sch.id));
    } else {
      setSelectedScholarshipsToApply([...selectedScholarshipsToApply, sch]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gpa" ? parseFloat(value) : value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Legal Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please input a valid email address";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.nvcStudentId.trim()) {
      errors.nvcStudentId = "Napa Valley College ID is required";
    } else if (!/^N\d{7}$/i.test(formData.nvcStudentId.trim())) {
      errors.nvcStudentId = "Student ID must begin with 'N' followed by 7 digits (e.g., N0123456)";
    }
    if (!formData.major.trim()) errors.major = "Current academic program or major is required";
    if (!formData.personalStatement.trim()) {
      errors.personalStatement = "Personal narrative statement is essential for consideration";
    } else if (formData.personalStatement.split(/\s+/).length < 20) {
      errors.personalStatement = "Your personal statement must be at least 20 words";
    }

    // Check GPA logic matches selected scholarships
    selectedScholarshipsToApply.forEach((sch) => {
      if (formData.gpa < sch.gpaRequirement) {
        errors.gpa = `Your GPA (${formData.gpa}) is below the required ${sch.gpaRequirement} GPA for ${sch.name}`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API submit delay
      const randNum = Math.floor(100000 + Math.random() * 900000);
      setApplicationReceiptId(`NVC-SCH-2026-${randNum}`);
      setIsSubmitted(true);
    }
  };

  const resetAll = () => {
    setIsApplying(false);
    setIsSubmitted(false);
    setSelectedScholarshipsToApply([]);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      nvcStudentId: "",
      gpa: 2.0,
      major: "",
      financialNeed: "high",
      personalStatement: "",
      selectedScholarships: []
    });
    setFormErrors({});
  };

  return (
    <div className="bg-stone-50 font-sans min-h-screen pb-20">
      {/* Editorial Header Banner */}
      <section className="bg-nvc-green-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
            alt="Graduation Caps"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-3">
          <span className="text-nvc-gold-light text-xs font-display font-black tracking-widest uppercase">
            NVC SCHOLARSHIP CENTER
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight">
            Academic Pathways Funded by Napa Valley
          </h1>
          <div className="h-1 w-16 bg-nvc-gold mx-auto my-1 rounded-full" />
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Removing financial barriers is our primary goal. Access over 50 specific scholarship funds with a single core application.
          </p>
        </div>
      </section>

      {!isApplying ? (
        <>
          {/* SEARCH & FILTER PORTAL */}
          <section className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Search query input */}
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search scholarships (e.g. Winery, Nursing...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all"
                  />
                </div>

                {/* Sub-Filters Toggle Action */}
                <button
                  onClick={() => setActiveSliderExpanded(!activeSliderExpanded)}
                  className={`px-4 py-2.5 border text-xs font-display font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors w-full lg:w-auto ${
                    activeSliderExpanded
                      ? "border-nvc-green bg-nvc-green-pale text-nvc-green font-bold"
                      : "border-stone-200 hover:bg-stone-50 text-stone-600"
                  }`}
                >
                  <SlidersHorizontal className="h-4.5 w-4.5" />
                  {activeSliderExpanded ? "Hide Matching Criteria" : "Refine Match Filters (GPA, background)"}
                </button>
              </div>

              {/* Dynamic matching sliders drawers */}
              {activeSliderExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-stone-50/50 rounded-xl p-6 border border-stone-150 flex flex-col md:flex-row gap-8 justify-between items-center"
                >
                  {/* GPA Criteria */}
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-stone-700">
                      <span className="font-semibold uppercase tracking-wider">Your Current GPA</span>
                      <span className="font-mono font-bold text-nvc-green bg-nvc-green-pale px-2.5 py-1 rounded-md">
                        {userGPA.toFixed(2)} Min
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="4.0"
                      step="0.1"
                      value={userGPA}
                      onChange={(e) => setUserGPA(parseFloat(e.target.value))}
                      className="w-full accent-nvc-green h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-400">Shows scholarships matching your GPA scope.</span>
                  </div>

                  {/* Demographic toggles */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <label className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200 hover:border-nvc-green cursor-pointer transition-colors shadow-xs select-none">
                      <input
                        type="checkbox"
                        checked={isFirstGen}
                        onChange={(e) => setIsFirstGen(e.target.checked)}
                        className="rounded accent-nvc-green h-4 w-4"
                      />
                      <div className="text-left">
                        <span className="font-semibold text-xs block text-stone-800">First-Generation Student</span>
                        <span className="text-[9px] text-stone-400 leading-tight block">First in your family to attend college.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200 hover:border-nvc-green cursor-pointer transition-colors shadow-xs select-none">
                      <input
                        type="checkbox"
                        checked={isVeteran}
                        onChange={(e) => setIsVeteran(e.target.checked)}
                        className="rounded accent-nvc-green h-4 w-4"
                      />
                      <div className="text-left">
                        <span className="font-semibold text-xs block text-stone-800">Military Veteran status</span>
                        <span className="text-[9px] text-stone-400 leading-tight block">Open to honorably discharged veterans.</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Categoric Menu list tabs */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-display font-medium transition-colors cursor-pointer focus:outline-none ${
                      activeCategory === cat.id
                        ? "bg-nvc-green text-white font-bold"
                        : "bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* RESULTS GRID */}
          <section className="max-w-7xl mx-auto px-4 mt-8 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono text-stone-400">
                Showing {filteredScholarships.length} scholarships matching current filters
              </span>
              {(searchQuery || activeCategory !== "all" || userGPA > 2.0 || isFirstGen || isVeteran) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setUserGPA(2.0);
                    setIsFirstGen(false);
                    setIsVeteran(false);
                  }}
                  className="text-xs text-nvc-gold font-semibold hover:underline cursor-pointer"
                >
                  Clear all criteria
                </button>
              )}
            </div>

            {filteredScholarships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredScholarships.map((sch) => (
                  <div
                    key={sch.id}
                    className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-5 relative group"
                  >
                    <div className="absolute top-0 right-12 h-1.5 w-16 bg-nvc-gold rounded-b-md" />
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center pr-10">
                        <span className="text-nvc-gold font-mono font-bold text-[10px] tracking-wider uppercase">
                          {sch.category} Division
                        </span>
                        <span className="text-stone-400 text-[10px] font-semibold flex items-center gap-1">
                          GPA req: {sch.gpaRequirement.toFixed(1)}
                        </span>
                      </div>
                      <h3 className="text-stone-900 font-serif font-bold text-sm leading-tight tracking-tight group-hover:text-nvc-green transition-colors">
                        {sch.name}
                      </h3>
                      <p className="text-stone-500 text-xs leading-relaxed font-sans mt-1">
                        {sch.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-display font-black text-nvc-green">
                          ${sch.amount.toLocaleString()}
                        </span>
                        <span className="text-stone-400 text-[9px] font-mono leading-none">
                          Deadline: {sch.deadline}
                        </span>
                      </div>

                      <button
                        onClick={() => handleLaunchApply(sch)}
                        className="px-4 py-2 bg-nvc-green-pale hover:bg-nvc-green text-nvc-green hover:text-white font-display font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer group"
                      >
                        Apply for this fund
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 py-16 px-4 text-center max-w-lg mx-auto flex flex-col items-center gap-4">
                <Bookmark className="h-12 w-12 text-stone-300 stroke-1" />
                <div>
                  <h4 className="text-stone-800 font-serif font-black text-base">No Matching Scholarships found</h4>
                  <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                    Some scholarships have rigid requirements (e.g. GPA or specific veteran flags). Try lowering your GPA search criteria or toggling first-generation fields on the matching bar.
                  </p>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        /* INTERACTIVE APPLICATION FORM STATE */
        <section className="max-w-4xl mx-auto px-4 mt-12 sm:px-6">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            {/* Form Top Brand Header bar */}
            <div className="bg-nvc-green text-white p-6 md:p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 stroke-1 text-nvc-gold-light animate-pulse" />
                <div>
                  <h3 className="font-serif font-black text-lg md:text-xl">NVC Foundation Core Application</h3>
                  <p className="text-stone-200 text-xs">Fill out this core sheet once to apply for all active funds</p>
                </div>
              </div>
              <button
                onClick={resetAll}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
                aria-label="Back"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form-fields"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-10 flex flex-col gap-6 font-sans"
                >
                  {/* Selected Scholarships to Apply */}
                  <div className="bg-stone-50 border border-stone-150 rounded-xl p-4 md:p-5 flex flex-col gap-3.5">
                    <span className="text-xs font-display font-extrabold text-stone-700 tracking-wider block uppercase">
                      Selected Funds applied for ({selectedScholarshipsToApply.length})
                    </span>
                    <div className="flex flex-col gap-2">
                      {SCHOLARSHIPS.map((sch) => {
                        const isSelected = selectedScholarshipsToApply.some((s) => s.id === sch.id);
                        return (
                          <div
                            key={sch.id}
                            onClick={() => handleToggleApplicationSelection(sch)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer flex justify-between items-center select-none transition-all ${
                              isSelected
                                ? "bg-nvc-green-pale/55 border-nvc-green text-nvc-green-dark font-semibold font-display"
                                : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                            }`}
                          >
                            <span className="truncate pr-4">{sch.name}</span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-mono text-stone-500">${sch.amount.toLocaleString()}</span>
                              <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "bg-nvc-green border-nvc-green text-white" : "border-stone-300"
                              }`}>
                                {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {selectedScholarshipsToApply.length === 0 && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="h-3 w-3" /> Please select at least one scholarship fund
                      </span>
                    )}
                  </div>

                  {/* Student Data Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Legal Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Student legal Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.fullName ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.fullName && (
                        <span className="text-[10px] text-red-500">{formErrors.fullName}</span>
                      )}
                    </div>

                    {/* Academic Major */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Academic Major / Career Certificate *</label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        placeholder="e.g., Viticulture and Enology, ADN Nursing"
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.major ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.major && (
                        <span className="text-[10px] text-red-500">{formErrors.major}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Institutional Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@napavalley.edu"
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.email ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-red-500">{formErrors.email}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Contact Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(707) 123-4567"
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.phone ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] text-red-500">{formErrors.phone}</span>
                      )}
                    </div>

                    {/* NVC ID */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Nampa Valley College Student ID *</label>
                      <input
                        type="text"
                        name="nvcStudentId"
                        value={formData.nvcStudentId}
                        onChange={handleInputChange}
                        placeholder="N0123456"
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.nvcStudentId ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.nvcStudentId && (
                        <span className="text-[10px] text-red-500">{formErrors.nvcStudentId}</span>
                      )}
                    </div>

                    {/* GPA input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Your Declared Cumulative GPA *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="2.0"
                        max="4.0"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        className={`w-full bg-stone-50 border px-3.5 py-2 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.gpa ? "border-red-400 bg-red-50/10" : "border-stone-200"
                        }`}
                      />
                      {formErrors.gpa && (
                        <span className="text-[10px] text-red-500">{formErrors.gpa}</span>
                      )}
                    </div>

                    {/* Financial Need Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">FAFSA Financial Need Level *</label>
                      <select
                        name="financialNeed"
                        value={formData.financialNeed}
                        onChange={handleInputChange}
                        className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all"
                      >
                        <option value="high">High Need (FAFSA Pell Eligible / Est. EFC $0)</option>
                        <option value="moderate">Moderate Need (Cal Grant / partial assistance)</option>
                        <option value="low">Low Need (independent preference)</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Statement essay */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-xs font-display font-bold text-stone-700">
                      Personal Statement essay (minimum 20 words) *
                    </label>
                    <textarea
                      name="personalStatement"
                      value={formData.personalStatement}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Share your personal background, detailing your educational goals, career plans within your choice major, and how the scholarship will support of your Napa Valley community advancement."
                      className={`w-full bg-stone-50 border px-3.5 py-3.5 rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-nvc-green focus:bg-white transition-all leading-relaxed ${
                        formErrors.personalStatement ? "border-red-400 bg-red-50/10" : "border-stone-200"
                      }`}
                    />
                    <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1">
                      <span>Provide deep, reflective insights to increase selection likelihood.</span>
                      <span className="font-mono">
                        Words count: {formData.personalStatement.trim() ? formData.personalStatement.trim().split(/\s+/).length : 0}
                      </span>
                    </div>
                    {formErrors.personalStatement && (
                      <span className="text-[10px] text-red-500">{formErrors.personalStatement}</span>
                    )}
                  </div>

                  {/* Submit actions */}
                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3 justify-end items-center mt-4">
                    <button
                      type="button"
                      onClick={resetAll}
                      className="px-6 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-display font-bold text-sm rounded-xl cursor-pointer transition-colors w-full sm:w-auto"
                    >
                      Cancel Application
                    </button>
                    <button
                      type="submit"
                      disabled={selectedScholarshipsToApply.length === 0}
                      className="px-8 py-3 bg-nvc-gold hover:bg-nvc-gold-dark text-stone-950 font-display font-black text-sm rounded-xl tracking-wider shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                    >
                      <ShieldCheck className="h-4.5 w-4.5" />
                      SUBMIT LEGAL APPLICATION
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* SUCCESS STATE SLATE WITH TRACKING ID */
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 md:p-14 text-center flex flex-col items-center gap-6 font-sans"
                >
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-150 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-serif font-black text-2xl tracking-tight">
                      Application Submitted Successfully!
                    </h4>
                    <p className="text-stone-500 text-xs mt-1 max-w-lg mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. Your formal declaration has been successfully signed, cataloged, and queued for evaluation by Isabella Martinez & the NVC Foundation Scholarships evaluation committee.
                    </p>
                  </div>

                  {/* High Fidelity Receipt Panel */}
                  <div className="bg-stone-50 border border-stone-150 rounded-2xl p-6 text-left max-w-md w-full flex flex-col gap-4 font-mono text-[11px] shadow-sm">
                    <div className="border-b border-dashed border-stone-200 pb-3 flex justify-between tracking-wide">
                      <span className="font-bold">NVC SCHOLARSHIP LEDGER</span>
                      <span className="text-stone-400">JULY 2026 CYCLE</span>
                    </div>

                    <div className="flex flex-col gap-2 border-b border-dashed border-stone-200 pb-3">
                      <div className="flex justify-between">
                        <span>STUDENT NAME:</span>
                        <span className="text-stone-800 font-bold">{formData.fullName.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>STUDENT NVC ID:</span>
                        <span className="text-stone-800 font-bold">{formData.nvcStudentId.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPA CERTIFIED:</span>
                        <span className="text-stone-800 font-bold">{formData.gpa.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DECLARED MAJOR:</span>
                        <span className="text-stone-800 font-bold max-w-[200px] truncate align-right">{formData.major.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-bold">FUNDS TARGETED:</span>
                      {selectedScholarshipsToApply.map((sch) => (
                        <div key={sch.id} className="flex justify-between text-stone-600 pl-2">
                          <span className="truncate max-w-[240px] lowercase first-letter:uppercase">» {sch.name}</span>
                          <span className="font-semibold text-nvc-green-dark">${sch.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-stone-200 pt-3 flex justify-between items-center text-xs">
                      <span className="font-bold uppercase">RECEIPT ID:</span>
                      <span className="font-bold text-nvc-gold-dark">{applicationReceiptId}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-400 max-w-sm">
                    A copies confirmation and next steps guidelines has been sent to <strong>{formData.email}</strong>. Evaluation results are released in late October.
                  </p>

                  <button
                    onClick={resetAll}
                    className="mt-4 px-6 py-2.5 bg-nvc-green text-white text-xs font-display font-bold rounded-lg hover:bg-nvc-green-dark transition-colors cursor-pointer"
                  >
                    Return to Scholarship directory
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}
