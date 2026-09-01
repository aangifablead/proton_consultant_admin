import React, { useState } from "react";
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export interface DestinationInfo {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  region: "North America" | "Europe" | "Oceania" | "Asia & Middle East";
  pswDuration: string;
  avgTuition: string;
  avgLiving: string;
  intakes: string[];
  workRights: string;
  popularCourses: string[];
  topUniversities: string[];
  visaCategory: string;
  popularBadge?: string;
  description: string;
}

export const DESTINATIONS_DATA: DestinationInfo[] = [
  {
    id: "usa",
    name: "United States (USA)",
    flag: "🇺🇸",
    tagline: "World's Top R&D Hub & Up to 3-Year STEM OPT",
    region: "North America",
    pswDuration: "1 to 3 Years (STEM OPT)",
    avgTuition: "$20,000 - $55,000 / yr",
    avgLiving: "$12,000 - $18,000 / yr",
    intakes: ["Fall (Aug/Sep)", "Spring (Jan/Feb)", "Summer (May)"],
    workRights: "20 hrs/wk on-campus during semester, full-time in breaks",
    popularCourses: ["Computer Science & AI", "Data Science", "MBA & Finance", "Biomedical Engineering", "Cybersecurity"],
    topUniversities: ["Northeastern University", "Arizona State University", "NYU", "University of Illinois", "USC"],
    visaCategory: "F-1 Student Visa",
    popularBadge: "Top Pick for STEM",
    description: "Home to the world's most prestigious Ivy League and state flagship research universities with unprecedented career opportunities and Silicon Valley tech integration."
  },
  {
    id: "uk",
    name: "United Kingdom (UK)",
    flag: "🇬🇧",
    tagline: "1-Year Master's Programs & 2-Year Graduate Route PSW",
    region: "Europe",
    pswDuration: "2 Years (3 Years for PhD)",
    avgTuition: "£13,000 - £30,000 / yr",
    avgLiving: "£9,000 - £13,000 / yr",
    intakes: ["September/October (Major)", "January/February", "May"],
    workRights: "20 hrs/wk during term, 40 hrs/wk during vacations",
    popularCourses: ["Business Analytics", "FinTech & Banking", "Data Science", "International Law", "Digital Marketing"],
    topUniversities: ["University of Manchester", "University of Bristol", "King's College London", "University of Leeds", "University of Birmingham"],
    visaCategory: "Student Visa (Tier 4)",
    popularBadge: "Fast-Track 1-Yr Master's",
    description: "World-class Russell Group institutions delivering globally renowned education, shorter course durations saving living costs, and post-study graduate employment routes."
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Up to 3-Year PGWP & Seamless PR Migration Pathways",
    region: "North America",
    pswDuration: "Up to 3 Years (PGWP)",
    avgTuition: "CAD $18,000 - $38,000 / yr",
    avgLiving: "CAD $12,000 - $16,000 / yr",
    intakes: ["Fall (September)", "Winter (January)", "Spring (May)"],
    workRights: "20-24 hrs/wk off-campus during studies, full-time during breaks",
    popularCourses: ["Software Engineering", "Supply Chain Management", "Cloud Computing", "Health Informatics", "Project Management"],
    topUniversities: ["University of Toronto", "UBC", "University of Waterloo", "McGill University", "McMaster University"],
    visaCategory: "Study Permit (SDS / Non-SDS)",
    popularBadge: "Top PR Pathway",
    description: "Affordable high-quality education, multicultural welcoming society, and high post-graduation work permit conversion rates into Permanent Residency (Express Entry & PNP)."
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Group of Eight Excellence & 2 to 4-Year Post-Study Work",
    region: "Oceania",
    pswDuration: "2 to 4 Years (Regional Bonus)",
    avgTuition: "AUD $24,000 - $45,000 / yr",
    avgLiving: "AUD $20,000 - $25,000 / yr",
    intakes: ["Semester 1 (Feb/March)", "Semester 2 (July/August)", "November"],
    workRights: "48 hours per fortnight during study terms, unlimited in holidays",
    popularCourses: ["Information Technology", "Accounting & Finance", "Nursing & Public Health", "Civil Engineering", "Biotechnology"],
    topUniversities: ["University of Melbourne", "University of Sydney", "UNSW Sydney", "Monash University", "University of Queensland"],
    visaCategory: "Student Visa (Subclass 500)",
    popularBadge: "High Standard of Living",
    description: "High quality of life, internationally ranked Go8 institutions, generous regional study migration incentives, and high starting graduate salaries."
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "Tuition-Free Public Universities & 18-Month Jobseeker Visa",
    region: "Europe",
    pswDuration: "18 Months (EU Blue Card Path)",
    avgTuition: "€0 - €3,000 / yr (Public) | €10k-20k (Private)",
    avgLiving: "€10,500 - €12,000 / yr (Blocked Account)",
    intakes: ["Winter (September/October)", "Summer (March/April)"],
    workRights: "140 full days or 280 half days per calendar year",
    popularCourses: ["Mechanical & Automotive Engineering", "Robotics & AI", "Renewable Energy", "Computer Science", "Industrial Management"],
    topUniversities: ["TU Munich (TUM)", "RWTH Aachen", "Heidelberg University", "TU Berlin", "KIT Karlsruhe"],
    visaCategory: "National Visa (Type D / Student)",
    popularBadge: "Free / Low Tuition",
    description: "Europe's economic powerhouse offering world-leading engineering and tech degrees with zero tuition at public universities and rapid EU Blue Card pathways."
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    tagline: "Silicon Valley of Europe & 2-Year Third Level Graduate Scheme",
    region: "Europe",
    pswDuration: "2 Years (Stay Back Visa)",
    avgTuition: "€11,000 - €25,000 / yr",
    avgLiving: "€10,000 - €14,000 / yr",
    intakes: ["Autumn (September)", "Spring (January)"],
    workRights: "20 hrs/wk during semester, 40 hrs/wk during holidays",
    popularCourses: ["Data Science & Analytics", "Pharmaceutical Sciences", "FinTech", "Cloud Systems", "Digital Marketing"],
    topUniversities: ["Trinity College Dublin (TCD)", "University College Dublin (UCD)", "University of Galway", "DCU", "UCC"],
    visaCategory: "Stamp 2 Student Visa",
    popularBadge: "European Tech HQ",
    description: "European headquarters for Google, Apple, Meta, Pfizer, and Microsoft offering high employment rates, English-speaking environment, and direct tech industry placements."
  },
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Green List Fast-Track Residency & Safe Peaceful Living",
    region: "Oceania",
    pswDuration: "1 to 3 Years (Post-Study Work)",
    avgTuition: "NZD $22,000 - $38,000 / yr",
    avgLiving: "NZD $16,000 - $20,000 / yr",
    intakes: ["Semester 1 (February)", "Semester 2 (July)", "October"],
    workRights: "20 hrs/wk during studies, full-time during vacations",
    popularCourses: ["Agri-Tech & Environmental Science", "Information Systems", "Construction Management", "Hospitality & Tourism"],
    topUniversities: ["University of Auckland", "University of Otago", "Victoria University of Wellington", "University of Canterbury"],
    visaCategory: "Fee Paying Student Visa",
    description: "Top-tier safety, world-leading student pastoral care, practical hands-on research degrees, and clear Green List skilled migration routes."
  },
  {
    id: "dubai",
    name: "Dubai (UAE)",
    flag: "🇦🇪",
    tagline: "Global Business Hub with Branch Campuses of Top Western Unis",
    region: "Asia & Middle East",
    pswDuration: "1 to 2 Years (Green Visa / Golden Visa)",
    avgTuition: "AED 40,000 - 85,000 / yr",
    avgLiving: "AED 30,000 - 45,000 / yr",
    intakes: ["September", "January", "May"],
    workRights: "Part-time internships permitted with university NOC",
    popularCourses: ["International Business & Luxury Brand Management", "Artificial Intelligence", "Aviation", "Hospitality Management"],
    topUniversities: ["University of Birmingham Dubai", "Middlesex University Dubai", "Heriot-Watt Dubai", "Rochester Institute of Tech Dubai"],
    visaCategory: "UAE Student Residence Visa",
    description: "Tax-free international lifestyle, simple and rapid visa processing, and world-class branch campuses awarding original UK, Australian, and US degrees."
  }
];

interface StudyDestinationsProps {
  onSelectDestination?: (country: string) => void;
  onOpenCounselingModal?: (country: string) => void;
}

export const StudyDestinations: React.FC<StudyDestinationsProps> = ({ 
  onSelectDestination, 
  onOpenCounselingModal 
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<DestinationInfo>(DESTINATIONS_DATA[0]);

  const regions = ["All", "North America", "Europe", "Oceania", "Asia & Middle East"];

  const filteredDestinations = selectedRegion === "All"
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter(d => d.region === selectedRegion);

  return (
    <section id="study-destinations" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            Global Study Destinations (30+ Countries)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Top Overseas Education Hubs
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From Ivy League campuses in the USA and 1-year Master&apos;s in the UK to tuition-free universities in Germany and high PR opportunities in Canada &amp; Australia.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedRegion === region
                  ? "bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Interactive Master Grid + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Countries Selector Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {filteredDestinations.map((country) => {
              const isSelected = selectedCountry.id === country.id;
              return (
                <div
                  key={country.id}
                  onClick={() => {
                    setSelectedCountry(country);
                    if (onSelectDestination) onSelectDestination(country.name);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex items-center justify-between group ${
                    isSelected
                      ? "bg-gradient-to-r from-slate-800 to-slate-800/90 border-blue-500/80 ring-1 ring-blue-500/30 shadow-lg"
                      : "bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-3xl shrink-0">{country.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                          {country.name}
                        </h4>
                        {country.popularBadge && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 shrink-0">
                            {country.popularBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        PSW: <span className="text-slate-300 font-medium">{country.pswDuration}</span>
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"}`} />
                </div>
              );
            })}
          </div>

          {/* Country Detailed Factsheet */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-3.5">
                  <span className="text-4xl">{selectedCountry.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white">{selectedCountry.name}</h3>
                      <span className="text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 rounded-full">
                        {selectedCountry.region}
                      </span>
                    </div>
                    <p className="text-xs text-blue-300 font-semibold mt-1">
                      {selectedCountry.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCounselingModal ? onOpenCounselingModal(selectedCountry.name) : null}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Free {selectedCountry.name.split(" ")[0]} Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedCountry.description}
              </p>

              {/* Key Vital Facts 4-Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Post-Study Work</span>
                  </div>
                  <div className="text-xs font-extrabold text-white">{selectedCountry.pswDuration}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Avg Tuition</span>
                  </div>
                  <div className="text-xs font-extrabold text-white">{selectedCountry.avgTuition}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Living Costs</span>
                  </div>
                  <div className="text-xs font-extrabold text-white">{selectedCountry.avgLiving}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Visa Type</span>
                  </div>
                  <div className="text-xs font-extrabold text-white">{selectedCountry.visaCategory}</div>
                </div>
              </div>

              {/* Work Rights & Intakes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                    Part-Time Work Allowance
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {selectedCountry.workRights}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                    Upcoming Intakes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountry.intakes.map((intake, idx) => (
                      <span key={idx} className="text-[11px] font-bold px-2.5 py-1 bg-slate-800 text-blue-300 rounded-lg border border-slate-700">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Partner Universities & Popular Courses */}
              <div className="space-y-4 pt-2 border-t border-slate-700/60">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                    Popular In-Demand Courses:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountry.popularCourses.map((c, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 bg-blue-950/60 text-blue-200 rounded-lg border border-blue-800/50">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                    Top Represented Universities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCountry.topUniversities.map((uni, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
