import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight, 
  Compass, 
  Lock,
  PhoneCall
} from "lucide-react";

interface LandingHeaderProps {
  onNavigate: (path: string) => void;
  onBookConsultation: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ 
  onNavigate, 
  onBookConsultation 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]" 
          : "bg-white border-b border-[#E2E8F0]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Left) */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D4ED8] via-[#2563EB] to-[#00D4FF] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#0F172A] tracking-tight block">
                PROTON
              </span>
              <span className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase block -mt-1">
                Consultancy
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("lead-form")}
              className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Actions: Login & Book Free Consultation (Right) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate("/login")}
              className="px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] bg-[#EFF6FF] hover:bg-[#EFF6FF]/80 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Login</span>
            </button>

            <button
              onClick={onBookConsultation}
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:opacity-95 shadow-md shadow-[#2563EB]/25 rounded-xl transition-all flex items-center gap-2"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate("/login")}
              className="px-3 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection("services")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              Services (Student Visa, PR, Work Permit)
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              Why Choose Us / About
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("lead-form")}
              className="px-3 py-2 text-left text-sm font-semibold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg"
            >
              Contact
            </button>
          </nav>

          <div className="pt-2 border-t border-[#E2E8F0]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookConsultation();
              }}
              className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
