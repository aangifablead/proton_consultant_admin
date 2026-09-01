import React from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Plane, 
  FileCheck2, 
  Globe2, 
  Lock,
  MessageCircle,
  GraduationCap,
  Building2,
  Briefcase,
  Star,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

interface LandingHeroProps {
  onBookConsultation: () => void;
  onOpenWhatsApp: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onBookConsultation,
  onOpenWhatsApp
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-slate-200/80">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 -mt-24 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-28 w-[450px] h-[450px] rounded-full bg-sky-300/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Licensed Global Immigration &amp; Visa Advisory</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              Your Trusted Partner for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
                Visa Success
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
            >
              Proton Consultancy delivers end-to-end legal immigration solutions for Student Visas, Permanent Residency, and Global Work Permits with a verified <span className="font-semibold text-slate-900">99.4% approval rate</span>.
            </motion.p>

            {/* Two Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookConsultation}
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-lg shadow-blue-600/25 rounded-2xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-7 py-4 text-sm font-bold text-slate-800 hover:text-emerald-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Chat on WhatsApp</span>
              </motion.button>
            </motion.div>

            {/* 3 Trust Checkmarks */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs font-semibold text-slate-600"
            >
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Initial Assessment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Licensed CICC &amp; MARA Counsel</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Filing Fees</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual / Interactive Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-200/90 relative z-10 space-y-6">
                {/* Header within card */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Proton Visa Passport Track</h2>
                      <p className="text-xs text-slate-500">Global Mobility &amp; Legal Processing</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold uppercase tracking-wide">
                    Active Case
                  </span>
                </div>

                {/* Simulated Visa Categories Pill Preview */}
                <div className="grid grid-cols-3 gap-2.5">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center space-y-1 hover:border-blue-300 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600 mx-auto" />
                    <span className="text-[11px] font-bold text-slate-900 block">Student</span>
                    <span className="text-[9px] text-slate-500 block">Top Tier Unis</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center space-y-1 hover:border-blue-300 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-blue-600 mx-auto" />
                    <span className="text-[11px] font-bold text-slate-900 block">PR Express</span>
                    <span className="text-[9px] text-slate-500 block">Permanent Stay</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center space-y-1 hover:border-blue-300 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-blue-600 mx-auto" />
                    <span className="text-[11px] font-bold text-slate-900 block">Work Permit</span>
                    <span className="text-[9px] text-slate-500 block">LMIA / Global</span>
                  </motion.div>
                </div>

                {/* Progress Status Bar within card */}
                <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-blue-600" />
                      Embassy Audit &amp; Clearance
                    </span>
                    <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Approved 99.4%
                    </span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden p-0.5 border border-blue-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full" 
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Bank escrow verification, biometric submission, and legal petition drafted.
                  </p>
                </div>

                {/* Bottom Trust Row */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>256-Bit Vault Security</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0 Rating (45k+ Cases)</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 (Top Left) with subtle float animation */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-5 bg-white border border-slate-200/90 shadow-xl rounded-2xl py-2.5 px-4 flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Visa Decision</span>
                  <span className="text-xs font-bold text-slate-900">Granted in 18 Days</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom Right) with subtle float animation */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-5 bg-white border border-slate-200/90 shadow-xl rounded-2xl py-2.5 px-4 flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Destinations</span>
                  <span className="text-xs font-bold text-slate-900">Canada, UK, US, AU</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
