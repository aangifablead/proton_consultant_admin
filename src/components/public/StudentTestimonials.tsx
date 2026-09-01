import React from "react";
import { Star, CheckCircle2, Quote, Award, Building2 } from "lucide-react";

export interface StudentStory {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  admittedUniversity: string;
  program: string;
  country: string;
  scholarshipSecured: string;
  visaStatus: string;
  intake: string;
  quote: string;
}

export const STUDENT_STORIES: StudentStory[] = [
  {
    id: "s1",
    name: "Aarav Sharma",
    avatarText: "AS",
    avatarBg: "bg-blue-600",
    admittedUniversity: "University of Waterloo, Canada",
    program: "Master of Mathematics in Computer Science",
    country: "Canada",
    scholarshipSecured: "CAD $15,000 Graduate Entrance Scholarship",
    visaStatus: "SDS Visa Approved in 18 Days",
    intake: "Fall 2026",
    quote: "Edwise handled my entire application from SOP refinement to tuition GIC escrow setup. Their counselor Elena made sure my Statement of Purpose stood out for Waterloo's competitive CS intake!"
  },
  {
    id: "s2",
    name: "Rhea Deshmukh",
    avatarText: "RD",
    avatarBg: "bg-blue-600",
    admittedUniversity: "Imperial College London, UK",
    program: "MSc in Advanced Computing & AI",
    country: "United Kingdom",
    scholarshipSecured: "£8,000 Faculty Dean's Award",
    visaStatus: "UK Student Visa Approved (Priority)",
    intake: "September 2026",
    quote: "The 1-year master's program in the UK combined with the 2-year Graduate Route visa was my dream. Edwise conducted mock visa interviews that gave me 100% confidence."
  },
  {
    id: "s3",
    name: "Karan Patel",
    avatarText: "KP",
    avatarBg: "bg-emerald-600",
    admittedUniversity: "University of Melbourne, Australia",
    program: "Master of Information Technology",
    country: "Australia",
    scholarshipSecured: "25% Global Academic Merit Scholarship",
    visaStatus: "Subclass 500 Visa Granted",
    intake: "Semester 2 (July)",
    quote: "I met the Melbourne university international delegate in person at the Edwise World Education Fair and received an on-spot assessment with application fee waiver. Truly top tier service!"
  },
  {
    id: "s4",
    name: "Meera Krishnan",
    avatarText: "MK",
    avatarBg: "bg-purple-600",
    admittedUniversity: "Technical University of Munich (TUM), Germany",
    program: "MSc in Robotics, Cognition, Intelligence",
    country: "Germany",
    scholarshipSecured: "100% Tuition-Free Public University",
    visaStatus: "German National Student Visa Granted",
    intake: "Winter Intake",
    quote: "Securing admission into TUM with zero tuition fees felt daunting, but Edwise guided me through the APS certificate, blocked account setup, and German embassy paperwork seamlessly."
  },
  {
    id: "s5",
    name: "Siddharth Rao",
    avatarText: "SR",
    avatarBg: "bg-amber-600",
    admittedUniversity: "Northeastern University, Boston USA",
    program: "MS in Data Science (STEM Designated)",
    country: "United States",
    scholarshipSecured: "$22,000 Merit Fellowship",
    visaStatus: "F-1 Visa Approved (1st Attempt)",
    intake: "Fall 2026",
    quote: "The Edwise test prep team helped me boost my GRE score to 324 (Quant 169). The F-1 visa mock interviews with retired visa officers were invaluable."
  },
  {
    id: "s6",
    name: "Ananya Mukherjee",
    avatarText: "AM",
    avatarBg: "bg-rose-600",
    admittedUniversity: "Trinity College Dublin, Ireland",
    program: "MSc in Pharmaceutical Sciences",
    country: "Ireland",
    scholarshipSecured: "€5,000 Global Excellence Award",
    visaStatus: "Stamp 2 Visa Granted",
    intake: "Autumn 2026",
    quote: "Studying in Dublin puts me right next to European pharma giants. Edwise assisted with accommodation bookings, student health insurance, and pre-departure briefings."
  }
];

export const StudentTestimonials: React.FC = () => {
  return (
    <section id="student-success" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Real Student Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            150,000+ Global Dreams Realized
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Read inspiring testimonials from our students now thriving across Ivy League, Russell Group, and Go8 universities worldwide.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_STORIES.map((student) => (
            <div
              key={student.id}
              className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-500/80 hover:bg-white hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Rating + Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Verified Grant
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{student.quote}&rdquo;
                </p>

                {/* University & Program */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{student.admittedUniversity}</span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-semibold truncate">
                    {student.program}
                  </p>
                  <p className="text-[10px] text-amber-700 font-bold">
                    🏆 {student.scholarshipSecured}
                  </p>
                </div>
              </div>

              {/* Student Footer Profile */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${student.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                    {student.avatarText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{student.name}</h4>
                    <p className="text-[10px] text-slate-500">{student.intake} • {student.country}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 block">
                    ✓ {student.visaStatus.split(" ")[0]} {student.visaStatus.split(" ")[1]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
