import React from "react";
import { 
  Compass, 
  Building2, 
  FileCheck2, 
  BookOpen, 
  DollarSign, 
  ShieldCheck, 
  Plane, 
  Home, 
  Users, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const SERVICES_STEPS = [
  {
    step: "01",
    title: "Free Career Counseling & Profile Assessment",
    icon: Compass,
    description: "In-depth aptitude evaluation, academic background audit, and professional goal alignment to map out the ideal countries and courses for your career aspirations.",
    tag: "Free 1-on-1 Session"
  },
  {
    step: "02",
    title: "University & Course Shortlisting",
    icon: Building2,
    description: "Access over 1,000+ top-ranked partner universities across 30+ countries. Filter by budget, ranking, scholarship availability, and post-study work rights.",
    tag: "1000+ Partner Unis"
  },
  {
    step: "03",
    title: "Admission, SOP & LOR Vetting",
    icon: FileCheck2,
    description: "Professional editing and drafting assistance for Statements of Purpose, Letters of Recommendation, CVs, and portfolios to ensure maximum admission acceptance.",
    tag: "Certified Editors"
  },
  {
    step: "04",
    title: "Standardized Test Preparation",
    icon: BookOpen,
    description: "Rigorous coaching for IELTS, PTE Academic, TOEFL iBT, GRE, GMAT, and SAT with certified British Council, Pearson, and ETS master trainers.",
    tag: "Score Guarantee"
  },
  {
    step: "05",
    title: "Scholarships & Education Loans",
    icon: DollarSign,
    description: "Assistance in securing international merit scholarships (up to $50,000) and collateral-free education loans through partner global banking institutions.",
    tag: "Up to $50k Grants"
  },
  {
    step: "06",
    title: "Visa Processing & Mock Embassy Interviews",
    icon: ShieldCheck,
    description: "Flawless visa filing compliant with IRCC, MARA, Home Office, and US Consulates. Intensive 1-on-1 mock interviews boasting a 99% visa success rate.",
    tag: "99% Success Rate"
  },
  {
    step: "07",
    title: "Forex, Travel & International Banking",
    icon: Plane,
    description: "Student GIC accounts, blocked accounts (Germany), tuition fee telegraphic transfers (TT), foreign exchange cards, and international student health insurance.",
    tag: "Zero TT Surcharges"
  },
  {
    step: "08",
    title: "Pre-Departure Briefing & Student Housing",
    icon: Home,
    description: "Verified on-campus and private student accommodations near universities, flight ticketing discounts, airport pickup, and alumni network connections.",
    tag: "Complete Pastoral Care"
  }
];

interface ServicesJourneyProps {
  onInquireService?: (serviceName: string) => void;
}

export const ServicesJourney: React.FC<ServicesJourneyProps> = ({ onInquireService }) => {
  return (
    <section id="services-journey" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            360° End-to-End Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your Complete Study Abroad Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From your very first counseling session to your flight touchdown and campus orientation, Edwise guides you through every single milestone.
          </p>
        </div>

        {/* 8-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/80 hover:bg-white hover:shadow-xl transition-all duration-200 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-blue-400/60 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {step.tag}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-blue-900 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => onInquireService ? onInquireService(step.title) : null}
                    className="w-full text-left text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-between group/btn"
                  >
                    <span>Get Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
