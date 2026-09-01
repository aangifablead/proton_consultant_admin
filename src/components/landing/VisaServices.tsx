import React from "react";
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Clock, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "motion/react";

export const VISA_SERVICES = [
  {
    id: "student-visa",
    category: "Student Visa",
    title: "Global Higher Education & Study Permits",
    icon: GraduationCap,
    badge: "1,000+ Partner Universities",
    description: "Fast-track admissions and study permits for top-ranked universities in Canada (SDS), UK, USA (F-1), Australia, and Europe.",
    features: [
      "University course selection & offer letters",
      "SOP & LOR drafting with certified academic editors",
      "Post-Graduation Work Permit (PGWP / OPT / Graduate Route)",
      "Student GIC, blocked accounts & scholarship aid"
    ],
    processingTime: "2 to 6 Weeks Processing",
    popularDestinations: "Canada • UK • USA • Australia • Germany"
  },
  {
    id: "permanent-residency",
    category: "Permanent Residency (PR)",
    title: "Skilled Migration & Express Entry Pathways",
    icon: Building2,
    badge: "CRS Score Maximization",
    description: "Direct Permanent Residency pathways for skilled professionals and families seeking permanent settlement with universal healthcare and work rights.",
    features: [
      "Canada Express Entry (FSW / CEC) & PNP nominations",
      "Australia Subclass 189, 190 & 491 points-tested visas",
      "Educational Credential Assessment (ECA) & Skill Assessments",
      "Family sponsorship & dependent child immigration"
    ],
    processingTime: "6 to 12 Months Average",
    popularDestinations: "Canada (PR) • Australia (PR) • New Zealand"
  },
  {
    id: "work-permit",
    category: "Work Permit",
    title: "Global Talent, Employer Sponsorship & Intra-Company Transfers",
    icon: Briefcase,
    badge: "Employer LMIA & Tier 2 Support",
    description: "Legal work authorization and employer-sponsored visa filing for professionals, corporate transferees, tech talent, and specialized trades.",
    features: [
      "LMIA compliance & Canadian employer work permits",
      "UK Skilled Worker Visa & Global Talent endorsements",
      "US H-1B, L-1 Intra-Company & O-1 Extraordinary Ability",
      "Spousal open work permit processing & extensions"
    ],
    processingTime: "4 to 12 Weeks Expedited",
    popularDestinations: "Canada • UK • USA • Germany • Dubai"
  }
];

interface VisaServicesProps {
  onSelectCategory?: (category: string) => void;
}

export const VisaServices: React.FC<VisaServicesProps> = ({ onSelectCategory }) => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Specialized Immigration Streams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Core Visa Categories
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether your goal is studying at a world-class university, securing permanent settlement, or expanding your career globally, Proton provides licensed legal execution.
          </p>
        </motion.div>

        {/* 3 Equal Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {VISA_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-6">
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-blue-100">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 tracking-wide">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-extrabold uppercase text-slate-900 tracking-wider block">
                      Key Inclusions:
                    </span>
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Processing & Destinations Meta */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Timeline:</strong> {service.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Top Corridors:</strong> {service.popularDestinations}</span>
                    </div>
                  </div>
                </div>

                {/* Learn More Action */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectCategory ? onSelectCategory(service.category) : null}
                    className="w-full py-3 text-xs sm:text-sm font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs"
                  >
                    <span>Check Eligibility &amp; Apply</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
