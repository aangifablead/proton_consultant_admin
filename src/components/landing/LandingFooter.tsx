import React, { useState } from "react";
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  X, 
  Send, 
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LandingFooterProps {
  onNavigate: (path: string) => void;
  onBookConsultation: () => void;
  onOpenWhatsApp: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onNavigate,
  onBookConsultation,
  onOpenWhatsApp
}) => {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [waMessage, setWaMessage] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      waMessage || "Hello Proton Consultancy team, I would like to schedule a free visa consultation."
    );
    window.open(`https://wa.me/18005550199?text=${encoded}`, "_blank");
    setShowWhatsAppModal(false);
    setWaMessage("");
  };

  return (
    <>
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-20 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-800/80">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-5">
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 cursor-pointer group w-fit"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight block">
                    PROTON
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block -mt-1">
                    Consultancy
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
                Proton Consultancy is a licensed international immigration and education advisory firm guiding individuals, families, and professionals toward overseas success.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Licensed CICC &amp; MARA Registered</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("why-choose-us")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate("/login")}
                    className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Client &amp; Staff Login</span>
                    <span>→</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Visa Categories */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Visa Pathways
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Student Visas (Canada/UK/US/AU)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Permanent Residency (Express Entry)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Skilled Migration (Australia 189/190)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Global Talent &amp; Work Permits
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Spousal Open Work Permits
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Global Offices */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Global Offices
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-200">Toronto:</strong> 250 Yonge St, Suite 1400, ON, Canada</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-200">London:</strong> 30 St Mary Axe, City of London, UK</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-200">Sydney:</strong> 100 Barangaroo Ave, NSW 2000, Australia</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>admissions@protonconsultancy.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Proton Visa Consultancy Inc. All rights reserved. Registered Immigration &amp; Global Mobility Practitioners.
            </p>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => scrollToSection("faq")}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms of Representation
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Floating WhatsApp Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWhatsAppModal(true)}
          className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-4 sm:px-5 sm:py-4 rounded-full shadow-2xl shadow-emerald-600/30 transition-all cursor-pointer"
          aria-label="Chat on WhatsApp with Visa Counselor"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Chat with Counsel
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
          </span>
        </motion.button>
      </div>

      {/* WhatsApp Quick Chat Modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/50 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm sm:max-w-md p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Proton WhatsApp Desk
                    </h4>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      Advisor Online (Instant Reply)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Connect directly with an assigned immigration counselor on WhatsApp. Please leave a brief note with your preferred visa stream:
              </p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <textarea
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Hi, I am interested in Canadian PR / UK Student Visa..."
                  rows={3}
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 transition-all"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Start WhatsApp Chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWhatsAppModal(false)}
                    className="px-4 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
