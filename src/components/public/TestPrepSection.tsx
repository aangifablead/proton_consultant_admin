import React, { useState } from "react";
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export interface TestCourse {
  id: string;
  name: string;
  badge: string;
  targetScore: string;
  duration: string;
  acceptedBy: string;
  mode: string;
  highlights: string[];
  mockTests: string;
  priceEstimate: string;
}

export const TEST_COURSES: TestCourse[] = [
  {
    id: "ielts",
    name: "IELTS Coaching (Academic & General)",
    badge: "Official Cambridge Partner",
    targetScore: "Band 7.5+ Guaranteed Strategy",
    duration: "4 to 8 Weeks Flexible Batches",
    acceptedBy: "11,500+ Institutions worldwide (UK, Canada, Australia, USA, NZ)",
    mode: "Live Interactive Online & Classroom Centers",
    highlights: [
      "Certified British Council & IDP master trainers",
      "One-on-one speaking mock interviews with audio analysis",
      "Extensive task 1 & 2 writing assessment with line-by-line feedback",
      "Free access to 25+ full-length authentic practice tests"
    ],
    mockTests: "30+ Adaptive Mock Tests with instant AI & human scoring",
    priceEstimate: "Free with Complete Admission Package"
  },
  {
    id: "pte",
    name: "PTE Academic Coaching",
    badge: "Pearson Official Preparation Partner",
    targetScore: "Score 79+ (Equivalent to Band 8.0)",
    duration: "3 to 6 Weeks Fast-Track",
    acceptedBy: "3,300+ Universities + 100% Australian, UK & New Zealand Visas",
    mode: "Live Online + Real Pearson Simulated Computer Lab",
    highlights: [
      "AI scoring engine algorithms deciphered by top trainers",
      "Templates & strategies for Read Aloud, Describe Image & Retell Lecture",
      "Repeat Sentence & Write From Dictation high-frequency bank",
      "Pronunciation & oral fluency acoustic tuning"
    ],
    mockTests: "20+ Official Pearson Scored Practice Tests included",
    priceEstimate: "Free with Complete Admission Package"
  },
  {
    id: "toefl",
    name: "TOEFL iBT Coaching",
    badge: "ETS Certified Master Educators",
    targetScore: "Score 100+ Benchmark",
    duration: "4 to 6 Weeks",
    acceptedBy: "12,000+ Universities in 160+ Countries (USA & Canada Top Pick)",
    mode: "Interactive Live Virtual Classes & Recorded Vault",
    highlights: [
      "Integrated speaking & writing timed response mastery",
      "Campus life listening dialect comprehension drills",
      "Academic reading inference & vocabulary building techniques",
      "Official ETS TPO diagnostic tests"
    ],
    mockTests: "15+ ETS Official Full-Length Computer Simulations",
    priceEstimate: "Free with Complete Admission Package"
  },
  {
    id: "gre",
    name: "GRE Comprehensive Masterclass",
    badge: "Ivy League & STEM Graduate Target",
    targetScore: "Target 320+ (Quant 168+ / Verbal 158+)",
    duration: "8 to 12 Weeks Exhaustive Prep",
    acceptedBy: "MS, Engineering, STEM & Top Global MBA Programs",
    mode: "Small Batch (Max 12 Students) + 1-on-1 Doubt Sessions",
    highlights: [
      "Advanced Quantitative problem solving shortcuts & traps",
      "Text Completion & Sentence Equivalence contextual roots",
      "Analytical Writing (AWA) scoring templates & essays",
      "Adaptive section-level test taking pacing strategies"
    ],
    mockTests: "10+ PowerPrep Style Full-Length Adaptive Tests",
    priceEstimate: "Merit Scholarship Discounts Available"
  },
  {
    id: "gmat",
    name: "GMAT Focus Edition Training",
    badge: "Top Global B-Schools (INSEAD, LBS, Wharton)",
    targetScore: "Target 685+ (97th Percentile)",
    duration: "8 to 10 Weeks",
    acceptedBy: "Global Top 100 Business Schools & Management Degrees",
    mode: "Weekend & Evening Professional Batches",
    highlights: [
      "Data Insights (DI) integrated multi-source reasoning",
      "Quantitative & Critical Reasoning logic deduction blueprints",
      "Time management matrix for 45-minute sprint sections",
      "Personalized mentorship by 750+ score alumni"
    ],
    mockTests: "8+ Official GMAT Focus Diagnostic Simulations",
    priceEstimate: "Merit Scholarship Discounts Available"
  },
  {
    id: "sat",
    name: "Digital SAT Prep (Undergraduate)",
    badge: "US College Board Official Structure",
    targetScore: "Target 1450+ Score",
    duration: "6 to 10 Weeks",
    acceptedBy: "US & Canadian Undergraduate Admissions & Merit Scholarships",
    mode: "Interactive Classroom & Digital Bluebook Platform",
    highlights: [
      "Digital SAT Bluebook Desmos calculator shortcuts",
      "Grammar conventions & rhetorical synthesis question patterns",
      "Algebra, Advanced Math & Problem Solving mastery",
      "Full high-school portfolio & Common App synchronization"
    ],
    mockTests: "12+ Bluebook Digital SAT Practice Tests",
    priceEstimate: "Comprehensive High School Package"
  }
];

interface TestPrepSectionProps {
  onBookDemo?: (testName: string) => void;
}

export const TestPrepSection: React.FC<TestPrepSectionProps> = ({ onBookDemo }) => {
  const [selectedTest, setSelectedTest] = useState<TestCourse>(TEST_COURSES[0]);

  return (
    <section id="test-prep" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3.5 py-1 rounded-full border border-blue-200">
            Edwise Test Preparation Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Guaranteed Score Mastery with Certified Master Trainers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our specialized test prep coaching has helped over 50,000+ students achieve top percentile scores in IELTS, PTE, TOEFL, GRE, GMAT, and SAT with official Cambridge, Pearson, and ETS material.
          </p>
        </div>

        {/* Test Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TEST_COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedTest(course)}
              className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                selectedTest.id === course.id
                  ? "bg-blue-700 text-white shadow-md shadow-blue-900/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {course.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Highlight Card for the Selected Test */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Panel */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {selectedTest.badge}
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                  {selectedTest.duration}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {selectedTest.name}
                </h3>
                <p className="text-sm font-semibold text-blue-700 mt-1">
                  {selectedTest.targetScore}
                </p>
              </div>

              {/* Acceptance info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Global Recognition:</strong> {selectedTest.acceptedBy}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Course Inclusions & Key Pedagogies:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTest.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock tests banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                <span><strong>Simulated Testing:</strong> {selectedTest.mockTests}</span>
              </div>
            </div>

            {/* Right Action Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Upcoming Batch Enrollment
                </div>

                <h4 className="text-xl font-bold text-white">
                  Reserve Your Free Diagnostic Mock Test &amp; Demo Session
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluate your baseline score and get a customized 30-day study plan from our certified faculty before starting your classes.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Batch Frequency:</span>
                    <span className="text-blue-300 font-bold">New Batches Every Monday</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Study Materials:</span>
                    <span className="text-blue-300 font-bold">Official Physical & Digital Books</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Score Guarantee:</span>
                    <span className="text-blue-300 font-bold">Unlimited Repeat Prep Access</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onBookDemo ? onBookDemo(selectedTest.name) : null}
                  className="w-full py-3.5 text-xs font-bold text-slate-950 bg-blue-400 hover:bg-blue-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-black"
                >
                  <span>Book Free 1-Hour Demo Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  No credit card required. Free diagnostic score assessment included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
