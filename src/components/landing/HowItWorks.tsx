import React from "react";
import { 
  UserCheck, 
  FileText, 
  Send, 
  Award, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export const STEP_ITEMS = [
  {
    step: "01",
    title: "Initial Consultation & Profile Audit",
    icon: UserCheck,
    description: "Free comprehensive evaluation of your academic qualifications, work history, language scores, and immigration eligibility points.",
    badge: "Step 1 • Free"
  },
  {
    step: "02",
    title: "Documentation & Legal Drafting",
    icon: FileText,
    description: "Our legal editors refine your Statement of Purpose (SOP), Letters of Recommendation (LOR), ECA filings, and bank solvency files.",
    badge: "Step 2 • Precision"
  },
  {
    step: "03",
    title: "Embassy Filing & Case Processing",
    icon: Send,
    description: "Direct submission to IRCC, Home Office, MARA, or US Consulates with real-time biometric scheduling and priority processing tracking.",
    badge: "Step 3 • Compliance"
  },
  {
    step: "04",
    title: "Visa Decision & Pre-Departure",
    icon: Award,
    description: "Receive your passport stamp and official visa grant. We assist with forex transfer, student housing, health insurance, and landing.",
    badge: "Step 4 • 99.4% Approval"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 relative overflow-hidden">
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
            <span>Structured 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How Proton Works for You
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Our systematic 4-phase methodology guarantees complete legal transparency, prevents costly filing errors, and maximizes your visa approval probability.
          </p>
        </motion.div>

        {/* Horizontal Stepper on Desktop, Stacked on Mobile */}
        <div className="relative">
          {/* Connector Line on Desktop (lg screens) with animated gradient */}
          <div className="hidden lg:block absolute top-[76px] left-16 right-16 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-emerald-300 rounded-full z-0 opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEP_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Step Number + Icon Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs border border-blue-100 relative">
                        <Icon className="w-7 h-7" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-600 ring-2 ring-white" />
                      </div>
                      <span className="text-4xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 inline-block">
                        {item.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Regulated Protocol Guarantee</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
