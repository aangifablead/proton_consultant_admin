import React from "react";
import { ShieldCheck, Award, Lock, CheckCircle2, Globe2, FileCheck } from "lucide-react";
import { motion } from "motion/react";

export const CERTIFICATIONS = [
  {
    name: "CICC Canada",
    role: "College of Immigration & Citizenship Consultants",
    regNo: "RCIC #R539821",
    icon: ShieldCheck
  },
  {
    name: "MARA Australia",
    role: "Migration Agents Registration Authority",
    regNo: "MARN #1804291",
    icon: Award
  },
  {
    name: "OISC United Kingdom",
    role: "Immigration Services Commissioner Level 2",
    regNo: "OISC #F20210084",
    icon: FileCheck
  },
  {
    name: "AIRC Certified",
    role: "American Int'l Recruitment Council",
    regNo: "Member Inst.",
    icon: Globe2
  },
  {
    name: "ISO 27001",
    role: "Information Security Management Standard",
    regNo: "Certified Vault",
    icon: Lock
  }
];

export const CertificationsStrip: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
            Official Industry Accreditations &amp; Global Legal Affiliations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {CERTIFICATIONS.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-2 hover:border-blue-500/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  {cert.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                  {cert.role}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {cert.regNo}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
