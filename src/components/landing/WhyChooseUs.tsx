import React from "react";
import { 
  Award, 
  TrendingUp, 
  UserCheck, 
  Eye, 
  Lock, 
  Compass, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "motion/react";

export const TRUST_BADGES = [
  {
    icon: Award,
    title: "15+ Years of Legal Excellence",
    description: "Over a decade and a half of specialized international immigration practice with authorized CICC, MARA, and OISC practitioners."
  },
  {
    icon: TrendingUp,
    title: "99.4% Verified Success Rate",
    description: "Rigorous three-tier pre-submission legal vetting ensures your application meets stringent embassy criteria prior to filing."
  },
  {
    icon: UserCheck,
    title: "Dedicated 1-on-1 Case Manager",
    description: "Work directly with an assigned senior advisor who manages your files, deadlines, queries, and embassy communications."
  },
  {
    icon: Eye,
    title: "100% Transparent Milestone Process",
    description: "Real-time client portal status tracker with clearly defined timelines, itemized government fees, and no hidden costs."
  },
  {
    icon: Lock,
    title: "Bank-Grade Document Vault",
    description: "Your passports, tax records, and bank statements are safeguarded with 256-bit encryption and strict regulatory privacy standards."
  },
  {
    icon: Compass,
    title: "360° End-to-End Global Support",
    description: "Pastoral care extending beyond visa approvals to foreign exchange, GIC escrow, student housing, and airport reception."
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-24 sm:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
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
            <span>Why Choose Proton</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built on Trust, Precision, and Global Compliance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Immigration involves your most sensitive personal documents and life-changing career milestones. Here is why thousands of applicants trust Proton.
          </p>
        </motion.div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex items-start gap-5 group"
              >
                <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
