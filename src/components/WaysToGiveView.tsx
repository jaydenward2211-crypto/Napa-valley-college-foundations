import React, { useState } from "react";
import { Gift, Heart, User, CreditCard, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, Printer, Info, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DonationFormInput } from "../types";

export default function WaysToGiveView() {
  const [step, setStep] = useState<number>(1);
  const [coverFees, setCoverFees] = useState<boolean>(true);
  const [formData, setFormData] = useState<DonationFormInput>({
    amount: 150,
    customAmount: "",
    frequency: "one-time",
    designation: "general",
    honorOf: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "CA",
    zipCode: "",
    paymentMethod: "card"
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receiptResult, setReceiptResult] = useState<{
    id: string;
    total: number;
    feePart: number;
    net: number;
  } | null>(null);

  const donationPresets = [25, 50, 150, 500, 1000];

  const designationFunds = [
    { id: "general", label: "General Endowment / Area of Greatest Need" },
    { id: "vest", label: "Viticulture and Enology Science & Tech (VEST) Fund" },
    { id: "nursing", label: "Nursing & Health Care Education Fund" },
    { id: "emergency", label: "Student Crisis Emergency Resilience Fund" },
    { id: "first-gen", label: "First-Generation Harvest of Opportunity Fund" }
  ];

  const handlePresetSelect = (val: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: val,
      customAmount: ""
    }));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      customAmount: val,
      amount: val ? parseInt(val) : 0
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
    } else if (name === "expiry") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      value = value.slice(0, 5);
    } else if (name === "cvv") {
      value = value.replace(/[^0-9]/g, "").slice(0, 4);
    }
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (formData.amount <= 0) {
        errors.amount = "Please select or input a contribution amount greater than $0";
      }
    } else if (step === 2) {
      if (!formData.fullName.trim()) errors.fullName = "Legal Name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please input a valid email address";
      }
      if (!formData.address.trim()) errors.address = "Billing address is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.zipCode.trim()) {
        errors.zipCode = "Zip Code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
        errors.zipCode = "Zip Code must be exactly 5 digits";
      }
    } else if (step === 3) {
      if (formData.paymentMethod === "card") {
        if (cardInfo.number.replace(/\s+/g, "").length < 15) errors.cardNumber = "Card number must be 15 or 16 digits";
        if (cardInfo.expiry.length < 5) errors.cardExpiry = "Expiry is required (MM/YY)";
        if (cardInfo.cvv.length < 3) errors.cardCvv = "CVV must be 3 or 4 digits";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsProcessing(true);
      // Simulate bank latency
      setTimeout(() => {
        setIsProcessing(false);
        const baseAmount = formData.amount;
        const fees = coverFees ? parseFloat((baseAmount * 0.029 + 0.30).toFixed(2)) : 0;
        const totalAmount = baseAmount + fees;
        const randNum = Math.floor(10000000 + Math.random() * 90000000);

        setReceiptResult({
          id: `NVC-TXN-2026-${randNum}`,
          total: totalAmount,
          feePart: fees,
          net: baseAmount
        });
        setStep(4);
      }, 2000);
    }
  };

  const resetAll = () => {
    setStep(1);
    coverFees && setCoverFees(true);
    setReceiptResult(null);
    setCardInfo({ number: "", expiry: "", cvv: "" });
    setFormData({
      amount: 150,
      customAmount: "",
      frequency: "one-time",
      designation: "general",
      honorOf: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "CA",
      zipCode: "",
      paymentMethod: "card"
    });
    setFormErrors({});
  };

  const activeFundLabel = designationFunds.find((f) => f.id === formData.designation)?.label || "";

  return (
    <div className="bg-stone-50 font-sans min-h-screen pb-20">
      {/* High Fidelity Banner */}
      <section className="bg-nvc-green-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200"
            alt="Hand giving back"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-3">
          <span className="text-nvc-gold-light text-xs font-display font-black tracking-widest uppercase">
            PHILANTHROPY CENTER & LEADERSHIP CIRCLES
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight">
            How to Support NVC Foundations
          </h1>
          <div className="h-1 w-16 bg-nvc-gold mx-auto my-1 rounded-full" />
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Every dollar contributed expands scholarship scopes, restores emergency student crisis buffers, and sustains high-quality viticultural labs.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: GENERAL INFO & PHILOSOPHIES (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="text-nvc-green text-xs font-display font-bold uppercase tracking-widest block mb-1">
              Leadership circles
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
              Honoring Generosity with Strategic Groups
            </h3>
            <p className="text-stone-500 text-xs mt-3 leading-relaxed">
              We formally acknowledge major donors through annual recognition levels, exclusive campus luncheons, and listed directories (upon donor consent).
            </p>
          </div>

          {/* CIRCLE TIERS */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs flex gap-4">
              <span className="h-8 w-8 bg-amber-50 text-nvc-gold flex items-center justify-center font-display font-black text-xs rounded-lg flex-shrink-0">
                1
              </span>
              <div>
                <h4 className="text-stone-900 font-display font-bold text-xs uppercase tracking-wide">
                  President's Harvest Circle ($5,000+)
                </h4>
                <p className="text-stone-500 text-[11px] leading-relaxed mt-1">
                  Includes invitations to VIP estate dinners, naming parameters on specialized departmental scholarships, and direct updates from college trustees.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs flex gap-4">
              <span className="h-8 w-8 bg-stone-100 text-stone-600 flex items-center justify-center font-display font-black text-xs rounded-lg flex-shrink-0">
                2
              </span>
              <div>
                <h4 className="text-stone-900 font-display font-bold text-xs uppercase tracking-wide">
                  Estate Vintner Ambassadors ($2,500+)
                </h4>
                <p className="text-stone-500 text-[11px] leading-relaxed mt-1">
                  Supports active Viticulture drone analysis or Health occupational research rigs. Partners recognized on demonstration room plaques.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs flex gap-4">
              <span className="h-8 w-8 bg-emerald-50 text-nvc-green flex items-center justify-center font-display font-black text-xs rounded-lg flex-shrink-0">
                3
              </span>
              <div>
                <h4 className="text-stone-900 font-display font-bold text-xs uppercase tracking-wide">
                  Napa Opportunity Sponsors ($1,000+)
                </h4>
                <p className="text-stone-500 text-[11px] leading-relaxed mt-1">
                  Fully funds an entire individual student emergency grant cycle, resolving rental or car failure issues to keep lessons rolling.
                </p>
              </div>
            </div>
          </div>

          {/* PLANNED GIVING BLOCK */}
          <div className="bg-nvc-green-pale rounded-2xl p-6 border border-nvc-green/15 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-nvc-green" />
              <strong className="text-nvc-green-dark font-display font-semibold text-xs uppercase tracking-wider">
                Planned Giving & Estate Gifts
              </strong>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed font-sans">
              Planning your legacy can include mutual tax shelters, trust donations, or specifying the Napa Valley College Foundation in your wills. For discrete conversations, please email our Executive Director Jessica Glancy at <a href="mailto:jglancy@napavalley.edu" className="underline font-bold text-nvc-green-dark">jglancy@napavalley.edu</a>.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-STEP INTERACTIVE DONATION PORTAL (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col">
            {/* Header / Step Indicators */}
            <div className="bg-nvc-green text-white p-6 md:p-8 flex justify-between items-center border-b border-nvc-green-dark">
              <div className="flex items-center gap-2.5">
                <Heart className="h-5 w-5 text-nvc-gold-light fill-current animate-pulse" />
                <h3 className="font-serif font-black text-base md:text-lg">Donation Processing Portal</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-200">
                <span className={`px-2 py-0.5 rounded ${step >= 1 ? "bg-nvc-gold-dark text-white font-bold" : ""}`}>1</span>
                <span>/</span>
                <span className={`px-2 py-0.5 rounded ${step >= 2 ? "bg-nvc-gold-dark text-white font-bold" : ""}`}>2</span>
                <span>/</span>
                <span className={`px-2 py-0.5 rounded ${step >= 3 ? "bg-nvc-gold-dark text-white font-bold" : ""}`}>3</span>
                <span>/</span>
                <span className={`px-2 py-0.5 rounded ${step >= 4 ? "bg-nvc-gold-dark text-white font-bold" : ""}`}>Receipt</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: QUANTITY & DESTINATION */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="p-6 md:p-8 flex flex-col gap-6"
                >
                  {/* Freq selection */}
                  <div className="flex gap-2 bg-stone-100 p-1 rounded-xl self-start text-xs font-display font-semibold">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, frequency: "one-time" }))}
                      className={`px-4 py-1.5 rounded-lg cursor-pointer ${
                        formData.frequency === "one-time" ? "bg-white text-stone-850 shadow-xs font-bold" : "text-stone-500"
                      }`}
                    >
                      Give One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, frequency: "monthly" }))}
                      className={`px-4 py-1.5 rounded-lg cursor-pointer ${
                        formData.frequency === "monthly" ? "bg-white text-stone-850 shadow-xs font-bold" : "text-stone-500"
                      }`}
                    >
                      Give Monthly
                    </button>
                  </div>

                  {/* Preset magnitudes bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {donationPresets.map((val) => {
                      const isActive = formData.amount === val && !formData.customAmount;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handlePresetSelect(val)}
                          className={`py-3.5 rounded-xl text-sm font-display font-black border tracking-wide transition-all ${
                            isActive
                              ? "bg-nvc-green border-nvc-green text-white shadow"
                              : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          ${val}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount inputs */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-display font-bold text-stone-700">Or contribution a Custom Amount ($USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 font-display font-bold text-stone-400">$</span>
                      <input
                        type="text"
                        placeholder="Other custom amount"
                        value={formData.customAmount}
                        onChange={handleCustomAmountChange}
                        className={`w-full bg-stone-50 border px-8 py-2.5 rounded-xl text-sm text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.amount ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                    </div>
                    {formErrors.amount && <span className="text-[10px] text-red-500">{formErrors.amount}</span>}
                  </div>

                  {/* designation Fund select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-display font-bold text-stone-700">Designation Portfolio / Program *</label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full bg-stone-50 border border-stone-200 px-3.5 py-3 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all"
                    >
                      {designationFunds.map((fund) => (
                        <option key={fund.id} value={fund.id}>
                          {fund.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* optional "In honor / memory of" */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-display font-bold text-stone-700">Dedicated in Honor / Memory of (Optional)</label>
                    <input
                      type="text"
                      name="honorOf"
                      value={formData.honorOf}
                      onChange={handleInputChange}
                      placeholder="e.g., Robert Mondavi, Dr. Toshio Campbell, family ancestor..."
                      className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all"
                    />
                  </div>

                  {/* Covering processing fees checkbox */}
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex justify-between items-start gap-4 transform duration-300">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={coverFees}
                        onChange={(e) => setCoverFees(e.target.checked)}
                        className="rounded accent-nvc-green h-4.5 w-4.5 mt-0.5 cursor-pointer"
                        id="coverFeesCheck"
                      />
                      <label htmlFor="coverFeesCheck" className="text-left cursor-pointer">
                        <span className="font-semibold text-xs block text-stone-800">Perfect-Match: Cover Bank Fees</span>
                        <span className="text-[10px] text-stone-400 leading-tight block mt-0.5">
                          I want to add ${(formData.amount * 0.029 + 0.30).toFixed(2)} to cover automated credit transaction fees so 100% of my net input reaches classrooms.
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-6 py-3.5 bg-nvc-green hover:bg-nvc-green-dark text-white rounded-xl text-sm font-display font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Proceed containing Amount (${coverFees ? (formData.amount + formData.amount * 0.029 + 0.30).toFixed(2) : formData.amount})
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: DONOR DEMOGRAPHICS */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="p-6 md:p-8 flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Legal Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        className={`w-full bg-stone-50 border px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.fullName ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {formErrors.fullName && <span className="text-[10px] text-red-500">{formErrors.fullName}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Donor Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                        className={`w-full bg-stone-50 border px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.email ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500">{formErrors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Contact Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(707) 555-0199"
                        className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Billing Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Oak St"
                        className={`w-full bg-stone-50 border px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.address ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {formErrors.address && <span className="text-[10px] text-red-500">{formErrors.address}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-display font-bold text-stone-700">Billing City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="St. Helena"
                        className={`w-full bg-stone-50 border px-3.5 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                          formErrors.city ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {formErrors.city && <span className="text-[10px] text-red-500">{formErrors.city}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-display font-bold text-stone-700">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs text-stone-700 text-center uppercase"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-display font-bold text-stone-700">Zip Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="94574"
                          className={`w-full bg-stone-50 border px-3.5 py-2.5 rounded-xl text-xs text-stone-700 text-center ${
                            formErrors.zipCode ? "border-red-400" : "border-stone-200"
                          }`}
                        />
                        {formErrors.zipCode && <span className="text-[10px] text-red-500">{formErrors.zipCode}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex gap-3 justify-end mt-6">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-display font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-nvc-green text-white font-display font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer hover:bg-nvc-green-dark transition-colors"
                    >
                      Payment Method
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TRANSACTION DETAILS & PROCESSING */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="p-6 md:p-8 flex flex-col gap-6"
                >
                  {/* Select Payment channels */}
                  <div className="flex gap-4 p-4 border border-stone-150 bg-stone-50/50 rounded-xl">
                    <label className="flex items-center gap-2 text-xs font-display font-semibold text-stone-700 cursor-pointer select-none">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === "card"}
                        onChange={() => setFormData(p => ({ ...p, paymentMethod: "card" }))}
                        className="accent-nvc-green"
                      />
                      Credit / Debit Card
                    </label>
                    <label className="flex items-center gap-2 text-xs font-display font-semibold text-stone-700 cursor-pointer select-none">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={() => setFormData(p => ({ ...p, paymentMethod: "paypal" }))}
                        className="accent-nvc-green"
                      />
                      PayPal
                    </label>
                    <label className="flex items-center gap-2 text-xs font-display font-semibold text-stone-700 cursor-pointer select-none">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === "check"}
                        onChange={() => setFormData(p => ({ ...p, paymentMethod: "check" }))}
                        className="accent-nvc-green"
                      />
                      Simulated Check/Wire
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="flex flex-col gap-4 border border-stone-150 p-5 rounded-xl bg-stone-50/20">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-display font-bold text-stone-700">Card Number *</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-3 h-4 w-4 text-stone-400" />
                          <input
                            type="text"
                            name="number"
                            placeholder="4111 2222 3333 4444"
                            value={cardInfo.number}
                            onChange={handleCardChange}
                            className={`w-full bg-stone-50 border pl-11 pr-4 py-2.5 rounded-xl text-xs text-stone-700 focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                              formErrors.cardNumber ? "border-red-400" : "border-stone-200"
                            }`}
                          />
                        </div>
                        {formErrors.cardNumber && <span className="text-[10px] text-red-500">{formErrors.cardNumber}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-display font-bold text-stone-700">Expiry MM/YY *</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="12/28"
                            value={cardInfo.expiry}
                            onChange={handleCardChange}
                            maxLength={5}
                            className={`w-full bg-stone-50 border py-2.5 rounded-xl text-xs text-stone-700 text-center focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                              formErrors.cardExpiry ? "border-red-400" : "border-stone-200"
                            }`}
                          />
                          {formErrors.cardExpiry && <span className="text-[10px] text-red-500">{formErrors.cardExpiry}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-display font-bold text-stone-700">Security CVV *</label>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="***"
                            value={cardInfo.cvv}
                            onChange={handleCardChange}
                            maxLength={4}
                            className={`w-full bg-stone-50 border py-2.5 rounded-xl text-xs text-stone-700 text-center focus:outline-none focus:border-nvc-green focus:bg-white transition-all ${
                              formErrors.cardCvv ? "border-red-400" : "border-stone-200"
                            }`}
                          />
                          {formErrors.cardCvv && <span className="text-[10px] text-red-500">{formErrors.cardCvv}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "paypal" && (
                    <div className="p-10 border border-stone-200 rounded-xl text-center bg-stone-50 flex flex-col items-center gap-3">
                      <span className="text-stone-400 font-bold italic tracking-tight uppercase text-lg">PayPal Express</span>
                      <p className="text-stone-500 text-[11px] leading-relaxed max-w-sm">
                        Simulating click-through authentication. Upon clicking Submit below, a secure PayPal staging validation frame opens automatically.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "check" && (
                    <div className="p-6 border border-stone-150 rounded-xl bg-stone-50/50 flex flex-col gap-2.5">
                      <strong className="text-xs block text-stone-800">Direct Bank Check Instructions:</strong>
                      <p className="text-stone-500 text-[11px] leading-relaxed">
                        Please issue personal or bank checks payable to: <strong>Napa Valley College Foundation, Inc.</strong> and dispatch with routing details to:
                      </p>
                      <div className="text-[10px] bg-white border border-stone-200 px-4 py-2.5 rounded-lg text-stone-500 italic mt-1 font-mono leading-relaxed self-start">
                        NVC Foundation Office, Building 1500, Room 1530<br />
                        2277 Napa-Vallejo Highway, Napa, CA 94558
                      </div>
                    </div>
                  )}

                  {/* Summary amount blocks before submit */}
                  <div className="border-t border-stone-100 pt-5 flex justify-between items-center text-xs text-stone-700">
                    <span className="font-semibold uppercase">Total Staging Credit:</span>
                    <span className="font-mono text-lg font-black text-nvc-green">
                      ${coverFees ? (formData.amount + formData.amount * 0.029 + 0.30).toFixed(2) : formData.amount}
                    </span>
                  </div>

                  {/* Action row */}
                  <div className="flex gap-3 justify-end mt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isProcessing}
                      className="px-6 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-display font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleProcessDonation}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-nvc-gold hover:bg-nvc-gold-dark text-stone-950 font-display font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md min-w-[160px]"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4.5 w-4.5" />
                          CONFIRM DONATION
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: TAX-DEDUCTIBLE RECEIPT SLATE (Craft Over Defaults) */}
              {step === 4 && receiptResult && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 md:p-12 text-center flex flex-col items-center gap-6"
                >
                  <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-150 flex items-center justify-center animate-bounce">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-serif font-black text-2xl tracking-tight leading-none leading-relaxed">
                      Thank You For Supporting Napa Students!
                    </h4>
                    <p className="text-stone-500 text-xs mt-1 max-w-md mx-auto leading-relaxed">
                      Your contribution has been successfully completed. An active accounting voucher has been generated and filed in physical archives.
                    </p>
                  </div>

                  {/* Aesthetic print receipt */}
                  <div id="nvc-receipt-plate" className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-left max-w-md w-full flex flex-col gap-4 font-mono text-[10px] shadow-sm relative overflow-hidden">
                    {/* Watermark detail */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nvc-green/3 opacity-5 pointer-events-none text-7xl font-sans font-bold select-none">
                      NVC
                    </div>

                    <div className="border-b border-dashed border-stone-200 pb-3 flex justify-between font-bold">
                      <span>NAPA VALLEY COLLEGE TRUST</span>
                      <span>TXN-DEDUCTIBLE</span>
                    </div>

                    <div className="flex flex-col gap-2 border-b border-dashed border-stone-200 pb-3">
                      <div className="flex justify-between">
                        <span>DONOR NAME:</span>
                        <span className="text-stone-850 font-bold">{formData.fullName.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EMAIL ADDRESS:</span>
                        <span className="text-stone-850 font-bold">{formData.email.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ALLOCATION:</span>
                        <span className="text-nvc-green-dark font-bold text-[9px] truncate max-w-[240px] align-right">
                          {activeFundLabel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>FREQUENCY:</span>
                        <span className="text-stone-850 font-bold uppercase">{formData.frequency}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pb-3 border-b border-dashed border-stone-200 text-stone-600">
                      <div className="flex justify-between">
                        <span>NET GIFT VALUE:</span>
                        <span>${receiptResult.net.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CARD PROCESSING FEES:</span>
                        <span>${receiptResult.feePart.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-150 pt-2 text-stone-800 text-xs font-bold">
                        <span>TOTAL CHARGED (USD):</span>
                        <span className="text-nvc-green">${receiptResult.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Standard IRS 501(c)(3) text */}
                    <p className="text-[10px] text-stone-400 leading-relaxed font-sans text-center">
                      The Napa Valley College Foundation warrants that no substantial tangible products, foods, or services were supplied to the donor in exchange for this contribution. Contributions are tax-deductible to the limits of active IRS criteria.
                    </p>

                    <div className="border-t border-dashed border-stone-200 pt-3 flex justify-between items-center text-[11px] font-bold">
                      <span>TRANSACTION VOUCHER:</span>
                      <span className="text-nvc-gold-dark">{receiptResult.id}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-2.5 border border-stone-200 hover:bg-stone-100 text-stone-600 font-display font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      Print Voucher
                    </button>
                    <button
                      onClick={resetAll}
                      className="px-6 py-2.5 bg-nvc-green text-white text-xs font-display font-semibold rounded-lg hover:bg-nvc-green-dark transition-colors cursor-pointer"
                    >
                      Donate again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
