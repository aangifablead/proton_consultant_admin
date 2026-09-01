import React from "react";
import { Building2, Award, Globe, ShieldCheck } from "lucide-react";

export const PARTNER_UNIS = [
  { name: "University of Waterloo", country: "Canada", rank: "Top 20 Computer Science Global", logoCode: "UW" },
  { name: "University of Manchester", country: "United Kingdom", rank: "Russell Group Flagship", logoCode: "UoM" },
  { name: "University of Melbourne", country: "Australia", rank: "Group of Eight #1 in AU", logoCode: "UniMelb" },
  { name: "Northeastern University", country: "United States", rank: "#1 Co-op & Internships", logoCode: "NEU" },
  { name: "Technical University of Munich", country: "Germany", rank: "Top Technical University Europe", logoCode: "TUM" },
  { name: "Trinity College Dublin", country: "Ireland", rank: "#1 University in Ireland", logoCode: "TCD" },
  { name: "University of Bristol", country: "United Kingdom", rank: "Top 10 UK Research", logoCode: "UoB" },
  { name: "Monash University", country: "Australia", rank: "Global Top 50 University", logoCode: "Monash" },
  { name: "Arizona State University", country: "United States", rank: "#1 for Innovation in US", logoCode: "ASU" },
  { name: "University of Auckland", country: "New Zealand", rank: "#1 in New Zealand", logoCode: "UoA" },
  { name: "RWTH Aachen University", country: "Germany", rank: "Excellence in Mechanical Eng", logoCode: "RWTH" },
  { name: "King's College London", country: "United Kingdom", rank: "World Top 40 University", logoCode: "KCL" },
];

export const ACCREDITATIONS = [
  { name: "AIRC Certified", desc: "American International Recruitment Council", badge: "Gold Standard" },
  { name: "British Council", desc: "Certified Advanced Education Agent", badge: "Official Partner" },
  { name: "PIER Australia", desc: "Qualified Education Agent Counselor (QEAC)", badge: "Authorized" },
  { name: "ICEF Global", desc: "Screened & Verified Education Agency", badge: "Global Member" },
  { name: "ETS Certified", desc: "Official TOEFL & GRE Preparation Provider", badge: "Master Center" },
  { name: "Pearson PTE", desc: "Official PTE Academic Testing Partner", badge: "Platinum Tier" },
];

export const PartnerUniversities: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            Global University Representation
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Official Direct Representation for 1,000+ Universities
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Direct institutional partnerships across 30+ countries ensure expedited application processing, priority admission consideration, and on-spot scholarship grants.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {PARTNER_UNIS.map((uni, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/80 hover:bg-slate-800 transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-900 text-blue-400 font-black text-xs flex items-center justify-center border border-slate-700 group-hover:border-blue-500 group-hover:scale-105 transition-all">
                {uni.logoCode}
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {uni.name}
              </h4>
              <p className="text-[10px] text-blue-400 font-medium truncate">
                {uni.country}
              </p>
              <p className="text-[9px] text-slate-400 truncate">
                {uni.rank}
              </p>
            </div>
          ))}
        </div>

        {/* Accreditations Bar */}
        <div className="pt-10 border-t border-slate-800">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Recognized &amp; Certified by International Education Regulators
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ACCREDITATIONS.map((acc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1"
              >
                <span className="text-[9px] font-bold uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800/60">
                  {acc.badge}
                </span>
                <h5 className="text-xs font-bold text-white mt-1.5">{acc.name}</h5>
                <p className="text-[10px] text-slate-400 line-clamp-1">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
