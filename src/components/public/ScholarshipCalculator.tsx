import React, { useState } from "react";
import { 
  Calculator, 
  Sparkles, 
  GraduationCap, 
  DollarSign, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface ScholarshipResult {
  estimatedGrant: string;
  grantType: string;
  matchedUniversities: string[];
  visaChance: string;
  pswYears: string;
  keyRecommendation: string;
}

export const ScholarshipCalculator: React.FC<{ onApplyMatched?: (details: string) => void }> = ({ onApplyMatched }) => {
  const [country, setCountry] = useState<string>("USA");
  const [degreeLevel, setDegreeLevel] = useState<string>("Postgraduate (Master's / MS)");
  const [fieldOfStudy, setFieldOfStudy] = useState<string>("Computer Science & AI");
  const [academicScore, setAcademicScore] = useState<string>("80% - 90% (GPA 3.5+)");
  const [hasWorkExperience, setHasWorkExperience] = useState<boolean>(true);
  const [calculatedResult, setCalculatedResult] = useState<ScholarshipResult | null>({
    estimatedGrant: "$12,000 - $35,000",
    grantType: "Merit-Based Dean's Fellowship & Tuition Waiver",
    matchedUniversities: [
      "Northeastern University (Boston, MA)",
      "Arizona State University (Tempe, AZ)",
      "University of Texas at Dallas",
      "Stevens Institute of Technology"
    ],
    visaChance: "98.5% Strong Profile (STEM Category)",
    pswYears: "3 Years STEM OPT (F-1 Visa)",
    keyRecommendation: "Highlight open-source projects and GRE Quant score 165+ to qualify for full graduate teaching assistantship (GTA)."
  });

  const handleCalculate = () => {
    let grant = "$8,000 - $20,000";
    let unis = ["University of Bristol", "University of Leeds", "University of Birmingham"];
    let psw = "2 Years Graduate Route";
    let visa = "99.0% High Approval";
    let reco = "Apply before December priority deadline to secure maximum early bird fee discounts.";

    if (country === "USA") {
      grant = academicScore.includes("80") || academicScore.includes("90") 
        ? "$15,000 - $38,000" 
        : "$7,000 - $18,000";
      unis = ["Northeastern University", "Arizona State University", "NYU Tandon", "USC Viterbi"];
      psw = "3 Years STEM OPT";
      reco = "High demand in US tech market. Direct CPT internships permitted from 2nd semester.";
    } else if (country === "Canada") {
      grant = "CAD $5,000 - $18,000";
      unis = ["University of Waterloo", "University of Toronto", "McMaster University", "Concordia University"];
      psw = "Up to 3 Years PGWP";
      reco = "Target SDS category with IELTS 6.5+ band to ensure 20-day expedited visa turnaround.";
    } else if (country === "Australia") {
      grant = "AUD $8,000 - $25,000 (20-30% Tuition Waiver)";
      unis = ["University of Melbourne", "Monash University", "UNSW Sydney", "University of Queensland"];
      psw = "2 to 4 Years (Regional Option)";
      reco = "Group of Eight merit scholarships apply automatically upon early unconditional offer.";
    } else if (country === "Germany") {
      grant = "100% Tuition Waiver (Public Universities)";
      unis = ["TU Munich (TUM)", "RWTH Aachen", "Heidelberg University", "TU Berlin"];
      psw = "18-Month Jobseeker Visa";
      reco = "Zero tuition fees at state universities. Maintain blocked account (€11,904) for living costs.";
    } else if (country === "Ireland") {
      grant = "€3,000 - €10,000 Global Excellence Scholarship";
      unis = ["Trinity College Dublin", "University College Dublin", "University of Galway", "DCU"];
      psw = "2 Years Stay Back Option";
      reco = "Direct hiring pipeline to European HQs of Google, Meta, Pfizer, and Stripe.";
    }

    setCalculatedResult({
      estimatedGrant: grant,
      grantType: "Academic Merit & International Diversity Bursary",
      matchedUniversities: unis,
      visaChance: visa,
      pswYears: psw,
      keyRecommendation: reco
    });
  };

  return (
    <section id="scholarship-calculator" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3.5 py-1 rounded-full border border-blue-200">
            Interactive AI Eligibility Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Calculate Your Course &amp; Scholarship Match
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Get an instant evaluation of eligible partner universities, estimated scholarship grants, and post-study work rights based on your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Calculator className="w-4 h-4" />
              <span>Step 1: Enter Academic Profile Details</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="USA">United States (USA)</option>
                  <option value="UK">United Kingdom (UK)</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany (Tuition-Free)</option>
                  <option value="Ireland">Ireland</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Dubai">Dubai (UAE)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Degree Level *
                  </label>
                  <select
                    value={degreeLevel}
                    onChange={(e) => setDegreeLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="Postgraduate (Master's / MS)">Postgraduate (Master&apos;s / MS)</option>
                    <option value="Undergraduate (Bachelor's / BS)">Undergraduate (Bachelor&apos;s / BS)</option>
                    <option value="Global MBA / Executive">Global MBA / Executive</option>
                    <option value="Doctorate / PhD">Doctorate / PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Field of Study *
                  </label>
                  <select
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="Computer Science & AI">Computer Science &amp; AI</option>
                    <option value="Data Analytics & Big Data">Data Analytics &amp; Big Data</option>
                    <option value="Business Management & Finance">Business Management &amp; Finance</option>
                    <option value="Mechanical & Robotics">Mechanical &amp; Robotics Engineering</option>
                    <option value="Healthcare, Biotech & Nursing">Healthcare, Biotech &amp; Nursing</option>
                    <option value="International Law & Policy">International Law &amp; Policy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Academic Score / GPA *
                  </label>
                  <select
                    value={academicScore}
                    onChange={(e) => setAcademicScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="85% - 100% (GPA 3.8 - 4.0)">85% - 100% (First Class with Distinction)</option>
                    <option value="75% - 84% (GPA 3.3 - 3.7)">75% - 84% (First Class)</option>
                    <option value="65% - 74% (GPA 2.8 - 3.2)">65% - 74% (Second Class Upper)</option>
                    <option value="55% - 64% (GPA 2.4 - 2.7)">55% - 64% (Second Class)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasWorkExperience}
                      onChange={(e) => setHasWorkExperience(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-700">1+ Yr Work Experience</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-black"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulate Eligibility &amp; Match Scholarships</span>
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6">
            {calculatedResult && (
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Evaluation Breakdown
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    {calculatedResult.visaChance}
                  </span>
                </div>

                {/* Big Scholarship Highlight */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block">
                    Estimated Scholarship Grant:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {calculatedResult.estimatedGrant}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {calculatedResult.grantType}
                  </p>
                </div>

                {/* Matched Universities */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                    Top Recommended Universities:
                  </span>
                  <div className="space-y-2">
                    {calculatedResult.matchedUniversities.map((uni, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                        <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-semibold">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post Study & Strategy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <span className="text-slate-400 text-[10px] font-bold uppercase block">Post-Study Work</span>
                    <span className="text-blue-300 font-bold">{calculatedResult.pswYears}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <span className="text-slate-400 text-[10px] font-bold uppercase block">Admissions Advantage</span>
                    <span className="text-emerald-300 font-bold">Edwise Direct Fast-Track</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
                  <p className="text-[11px] leading-relaxed">
                    <strong>Counselor Advice:</strong> {calculatedResult.keyRecommendation}
                  </p>
                </div>

                <button
                  onClick={() => onApplyMatched ? onApplyMatched(`${country} - ${degreeLevel} - ${fieldOfStudy}`) : null}
                  className="w-full py-3 text-xs font-bold text-slate-950 bg-blue-400 hover:bg-blue-300 rounded-xl transition-all flex items-center justify-center gap-2 font-black shadow-lg"
                >
                  <span>Apply for These Matched Universities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
