import React, { useState } from "react";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Testimonial {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  visaType: string;
  destination: string;
  flag: string;
  categoryIcon: "student" | "pr" | "work";
  outcome: string;
  quote: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun Mehta",
    avatarText: "AM",
    avatarBg: "bg-blue-600",
    visaType: "Student Visa (SDS Category)",
    destination: "University of Waterloo, Canada",
    flag: "🇨🇦",
    categoryIcon: "student",
    outcome: "Study Permit Approved in 19 Days",
    quote: "Proton's team audited my Statement of Purpose and handled my entire GIC and tuition proof file with surgical precision. Their mock visa interview gave me total peace of mind!"
  },
  {
    id: "t2",
    name: "Dr. Sunita Rao & Family",
    avatarText: "SR",
    avatarBg: "bg-slate-900",
    visaType: "Permanent Residency (Express Entry FSW)",
    destination: "Toronto, Ontario, Canada",
    flag: "🇨🇦",
    categoryIcon: "pr",
    outcome: "COPR Issued in 5 Months",
    quote: "Securing Canadian PR for our entire family seemed overwhelming given the shifting CRS score cutoffs. Proton's licensed advisors optimized our ECA and provincial nomination strategy flawlessly."
  },
  {
    id: "t3",
    name: "Vikram Singhania",
    avatarText: "VS",
    avatarBg: "bg-sky-500",
    visaType: "Skilled Independent PR (Subclass 189)",
    destination: "Sydney, Australia",
    flag: "🇦🇺",
    categoryIcon: "pr",
    outcome: "Permanent Visa Granted",
    quote: "From ACS IT skills assessment to state nomination filing, my case manager Elena kept me updated at every milestone. Proton's transparent client portal was a game changer."
  },
  {
    id: "t4",
    name: "Pooja Deshmukh",
    avatarText: "PD",
    avatarBg: "bg-emerald-600",
    visaType: "Global Talent & Work Permit",
    destination: "London, United Kingdom",
    flag: "🇬🇧",
    categoryIcon: "work",
    outcome: "Endorsement & Tier 2 Visa in 3 Weeks",
    quote: "Proton assisted my tech endorsement submission for the UK Global Talent route. Their legal knowledge on tech immigration criteria saved me months of trial and error."
  }
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Verified Client Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by Over 45,000+ Global Applicants
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Read real experiences from students, professionals, and families who achieved their global mobility goals with Proton.
          </p>
        </motion.div>

        {/* Featured Testimonial Spotlight Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative min-h-[360px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-900 ml-2">5.0 Star Verified Review</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {current.outcome}
                  </span>
                </div>

                {/* Quote */}
                <div className="relative pt-2">
                  <Quote className="w-12 h-12 text-blue-600/10 absolute -top-5 -left-2 -z-0 pointer-events-none" />
                  <p className="text-lg sm:text-2xl text-slate-900 font-medium italic leading-relaxed relative z-10 pl-5 border-l-4 border-blue-600">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </div>

                {/* Client Profile Info & Destination */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-13 h-13 rounded-2xl ${current.avatarBg} text-white font-black text-base flex items-center justify-center shadow-md`}>
                      {current.avatarText}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">{current.name}</h4>
                      <p className="text-xs font-semibold text-blue-600">{current.visaType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-base">{current.flag}</span>
                    <span>{current.destination}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Pagination Dots */}
          <div className="flex items-center justify-between mt-8 px-2">
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? "w-9 bg-blue-600" 
                      : "w-3 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Smaller Preview Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {TESTIMONIALS_DATA.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setCurrentIndex(idx)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                currentIndex === idx
                  ? "bg-blue-50/80 border-blue-600/80 shadow-md ring-1 ring-blue-600/20"
                  : "bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{item.name}</span>
                <span className="text-base">{item.flag}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item.outcome}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
