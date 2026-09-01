import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building2, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from "lucide-react";

export interface EducationEvent {
  id: string;
  title: string;
  badge: string;
  date: string;
  time: string;
  cityOrMode: string;
  venue: string;
  universitiesCount: string;
  perks: string[];
  featured?: boolean;
}

export const UPCOMING_EVENTS: EducationEvent[] = [
  {
    id: "world-fair-spring",
    title: "Edwise World Education Fair 2026",
    badge: "Flagship Event • 100+ Unis",
    date: "Saturday, September 19, 2026",
    time: "10:30 AM - 5:30 PM",
    cityOrMode: "In-Person & Virtual Hybrid",
    venue: "Grand Ballroom & Virtual Webcast",
    universitiesCount: "120+ International Universities",
    perks: [
      "Spot application fee waivers (Save up to $250)",
      "Direct 1-on-1 interaction with University Deans",
      "On-spot eligibility and scholarship assessments",
      "Free comprehensive visa counseling booth"
    ],
    featured: true
  },
  {
    id: "usa-canada-conclave",
    title: "USA & Canada Fall 2026 Spot Admissions Conclave",
    badge: "Direct Spot Offers",
    date: "Thursday, October 1, 2026",
    time: "2:00 PM - 7:00 PM",
    cityOrMode: "Live Online & Multi-Branch",
    venue: "All Edwise Centers + Zoom Live",
    universitiesCount: "45+ Top US & Canadian Universities",
    perks: [
      "STEM OPT & PGWP transition masterclass",
      "GRE / GMAT waiver evaluations",
      "Merit scholarship grants up to $30,000",
      "Priority document pre-screening"
    ]
  },
  {
    id: "uk-ireland-fasttrack",
    title: "UK & Ireland 1-Year Master's Application Day",
    badge: "2-Yr Graduate Route Focus",
    date: "Wednesday, October 14, 2026",
    time: "1:00 PM - 6:30 PM",
    cityOrMode: "Major Metro Branches",
    venue: "Toronto, London & Mumbai Flagships",
    universitiesCount: "35+ Russell Group & Irish Tech Unis",
    perks: [
      "Same-day conditional offer letters",
      "IELTS waiver for 70%+ high school English scores",
      "Exclusive £2,000 - £6,000 chancellor bursaries",
      "Post-study stay-back visa walkthrough"
    ]
  },
  {
    id: "australia-nz-seminar",
    title: "Australia & New Zealand Direct Entry & PR Pathway Forum",
    badge: "Group of Eight Focus",
    date: "Saturday, November 7, 2026",
    time: "11:00 AM - 4:00 PM",
    cityOrMode: "Virtual Conference",
    venue: "Interactive High-Definition Studio",
    universitiesCount: "25+ Top Australian & NZ Universities",
    perks: [
      "Regional study points & 4-year PSW roadmap",
      "MARA registered migration agent Q&A session",
      "GTE / GST financial matrix audit",
      "Partner accommodation discounts"
    ]
  }
];

interface EventsFairSectionProps {
  onRegisterEvent?: (eventTitle: string) => void;
}

export const EventsFairSection: React.FC<EventsFairSectionProps> = ({ onRegisterEvent }) => {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const handleRegister = (id: string, title: string) => {
    if (!registeredIds.includes(id)) {
      setRegisteredIds([...registeredIds, id]);
    }
    if (onRegisterEvent) onRegisterEvent(title);
  };

  return (
    <section id="education-fairs" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            World Education Fairs &amp; Spot Assessments
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Meet University Deans &amp; Secure Spot Offers
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Attend India and the world&apos;s most prestigious education fairs. Connect directly with official international admissions officers, waive application fees, and secure on-spot scholarships.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {UPCOMING_EVENTS.map((event) => {
            const isRegistered = registeredIds.includes(event.id);
            return (
              <div
                key={event.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 border ${
                  event.featured
                    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-2xl"
                    : "bg-slate-800/80 border-slate-700/80 hover:border-slate-600"
                }`}
              >
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                      {event.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      Free Registration &amp; Spot Waivers
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{event.universitiesCount}</span>
                    </p>
                  </div>

                  {/* Date, Time & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-700/60 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Date</span>
                        <span className="font-bold text-white">{event.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Timing</span>
                        <span className="font-bold text-white">{event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-300 sm:col-span-2 pt-2 border-t border-slate-800">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Format &amp; Venue</span>
                        <span className="font-semibold text-white">{event.cityOrMode} • {event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Perks list */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      Attendee Benefits:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {event.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60">
                  <button
                    onClick={() => handleRegister(event.id, event.title)}
                    className={`w-full py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-md ${
                      isRegistered
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-blue-400 hover:bg-blue-300 text-slate-950"
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>VIP Pass Confirmed! We will email your ticket</span>
                      </>
                    ) : (
                      <>
                        <span>Register for Free VIP Entry Pass</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
