import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { DestinationCountry, VisaCategory } from "../../types";

const leadFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number with country code"),
  visaCategory: z.enum(["Student Visa", "PR", "Work Permit"] as const),
  destinationCountry: z.string().min(1, "Please select a destination country"),
  timeline: z.enum(["ASAP", "3 months", "6 months", "Just exploring"] as const),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted to proceed",
  }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadCaptureSectionProps {
  initialVisaCategory?: string;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ initialVisaCategory }) => {
  const { addLead, addToast } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      visaCategory: (initialVisaCategory as any) || "Student Visa",
      destinationCountry: "Canada",
      timeline: "3 months",
      consent: true,
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    console.log("Proton Lead Capture Submission:", data);

    let mappedDest: DestinationCountry = "Canada";
    if (data.destinationCountry.includes("United States") || data.destinationCountry.includes("USA")) {
      mappedDest = "United States";
    } else if (data.destinationCountry.includes("United Kingdom") || data.destinationCountry.includes("UK")) {
      mappedDest = "United Kingdom";
    } else if (data.destinationCountry.includes("Australia")) {
      mappedDest = "Australia";
    } else if (data.destinationCountry.includes("Germany")) {
      mappedDest = "Germany";
    } else if (data.destinationCountry.includes("New Zealand")) {
      mappedDest = "New Zealand";
    }

    let mappedVisaCategory: VisaCategory = "Student Visa";
    if (data.visaCategory === "PR") mappedVisaCategory = "Permanent Residency (PR)";
    else if (data.visaCategory === "Work Permit") mappedVisaCategory = "Work Permit";

    addLead({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      visaInterest: mappedVisaCategory,
      destination: mappedDest,
      source: "Landing Page Form",
      stage: "New",
      assignedTo: "Elena Vance",
      notes: [
        `Timeline: ${data.timeline} | Target: ${data.destinationCountry} | Category: ${data.visaCategory}`,
        `Lead consented to email/WhatsApp/phone follow-up.`
      ],
    });

    addToast({
      title: "Consultation Request Received!",
      description: `Thank you, ${data.firstName}. Our senior immigration counsel will contact you within 2 hours.`,
      type: "success",
    });

    setIsSuccess(true);
    reset();
  };

  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Texture & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Reassurance & Value Props */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Priority Profile Assessment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Book Your Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-300">
                1-on-1 Legal Consultation
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Take the first definitive step toward your visa grant. Our licensed immigration consultants evaluate your profile, CRS score, and document eligibility at zero cost.
            </p>

            {/* Inclusions List */}
            <div className="space-y-3.5 pt-2">
              {[
                "Complimentary 30-minute strategic consultation with a licensed counsel",
                "CRS / Points score calculation and provincial nomination roadmap",
                "Full checklist of required civil, financial, and academic documents",
                "Pre-screening for fast-track embassy filing streams"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Confidentiality & Security Card */}
            <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-4 text-xs sm:text-sm text-slate-300 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block">100% Confidential Client Vault:</strong>
                <span>All documents protected by 256-bit AES encryption and attorney-client privilege.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent Lead Capture Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-11 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Free Consultation Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the details below to receive your personalized immigration assessment.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs shrink-0 border border-blue-100">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 sm:p-10 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-center space-y-5"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-extrabold text-slate-900">
                        Inquiry Submitted Successfully!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        A senior immigration counselor has been assigned to your case file and will reach out via WhatsApp / Call within 2 business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 text-xs font-bold text-blue-700 bg-white hover:bg-slate-50 border border-blue-300 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Submit Another Profile
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          First Name *
                        </label>
                        <input
                          {...register("firstName")}
                          type="text"
                          placeholder="e.g. Rohan"
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        {errors.firstName && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Last Name *
                        </label>
                        <input
                          {...register("lastName")}
                          type="text"
                          placeholder="e.g. Verma"
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        {errors.lastName && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="rohan@example.com"
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Mobile Number (with WhatsApp) *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Visa Category & Destination Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Visa Category *
                        </label>
                        <select
                          {...register("visaCategory")}
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 cursor-pointer"
                        >
                          <option value="Student Visa">Student Visa (University Admissions &amp; Permits)</option>
                          <option value="PR">Permanent Residency (Express Entry / Skilled)</option>
                          <option value="Work Permit">Work Permit (Employer Sponsored / LMIA / Global)</option>
                        </select>
                        {errors.visaCategory && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.visaCategory.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Preferred Destination Country *
                        </label>
                        <select
                          {...register("destinationCountry")}
                          className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 cursor-pointer"
                        >
                          <option value="Canada">Canada 🇨🇦</option>
                          <option value="Australia">Australia 🇦🇺</option>
                          <option value="United Kingdom">United Kingdom 🇬🇧</option>
                          <option value="United States">United States 🇺🇸</option>
                          <option value="Germany">Germany 🇩🇪</option>
                          <option value="New Zealand">New Zealand 🇳🇿</option>
                          <option value="Ireland">Ireland 🇮🇪</option>
                        </select>
                        {errors.destinationCountry && (
                          <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.destinationCountry.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Timeline */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Preferred Timeline *
                      </label>
                      <select
                        {...register("timeline")}
                        className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 cursor-pointer"
                      >
                        <option value="ASAP">ASAP (Immediate Intake / Priority)</option>
                        <option value="3 months">Within 3 Months</option>
                        <option value="6 months">Within 6 Months</option>
                        <option value="Just exploring">Just Exploring / Future Planning</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.timeline.message}</p>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          {...register("consent")}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer"
                        />
                        <span className="text-xs text-slate-500 leading-snug">
                          I agree to be contacted by Proton Consultancy via Call, WhatsApp, and Email regarding my free visa assessment.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.consent.message}</p>
                      )}
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-xl shadow-blue-600/25 rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Submitting Assessment..." : "Submit for Free Visa Assessment"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
