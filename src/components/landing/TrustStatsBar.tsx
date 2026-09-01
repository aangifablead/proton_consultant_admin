import React from "react";
import { 
  Calendar, 
  Briefcase, 
  Award, 
  Users2 
} from "lucide-react";
import { motion } from "motion/react";

export const STATS_DATA = [
  {
    icon: Calendar,
    value: "15+ Years",
    label: "Industry Experience",
    sublabel: "Trusted immigration leadership since 2011"
  },
  {
    icon: Briefcase,
    value: "45,000+",
    label: "Cases Handled",
    sublabel: "Across Student, PR & Work streams"
  },
  {
    icon: Award,
    value: "99.4%",
    label: "Visa Success Rate",
    sublabel: "Rigorous pre-embassy filing audits"
  },
  {
    icon: Users2,
    value: "80+ Counselors",
    label: "Licensed Legal Advisors",
    sublabel: "Regulated CICC, MARA & OISC practitioners"
  }
];

export const TrustStatsBar: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/60 to-white py-14 sm:py-16 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all flex flex-col items-center sm:items-start text-center sm:text-left space-y-4"
              >
                {/* Icon above */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Big Number */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                    {stat.value}
                  </div>
                  {/* Label */}
                  <h3 className="text-sm font-bold text-slate-900">
                    {stat.label}
                  </h3>
                  {/* Sublabel */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {stat.sublabel}
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
