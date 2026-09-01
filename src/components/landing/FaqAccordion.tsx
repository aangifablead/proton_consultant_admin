import React, { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "What visa categories does Proton Consultancy handle?",
    answer: "Proton specializes strictly in three core immigration streams: (1) Student Visas & Admissions for university degrees in Canada, UK, US, Australia & Europe; (2) Permanent Residency (PR) including Canada Express Entry / PNP and Australia Skilled Migration (Subclass 189/190/491); and (3) Global Work Permits including LMIA employer-sponsored permits, UK Skilled Worker & Global Talent routes."
  },
  {
    id: "faq-2",
    question: "Is the initial profile assessment and consultation free?",
    answer: "Yes, 100%. Your initial 30-minute consultation and profile audit are completely complimentary. Our senior advisors evaluate your credentials, calculate your immigration points / CRS score, and provide an honest feasibility breakdown before any contractual agreement."
  },
  {
    id: "faq-3",
    question: "How long does the visa application process typically take?",
    answer: "Timelines depend on the chosen stream and destination government processing queues. Generally: Student Visas take 2 to 6 weeks; Work Permits take 4 to 12 weeks; and Permanent Residency pathways range between 6 to 12 months. Your Proton client dashboard gives real-time milestone tracking."
  },
  {
    id: "faq-4",
    question: "What critical documents do I need to prepare?",
    answer: "Typically you will need: a valid international passport (minimum 6 months validity), academic transcripts & degree certificates, official language test results (IELTS / PTE / TOEFL / Duolingo), bank statements proving required maintenance funds, and employment verification letters. Our team supplies tailored document checklists and templates."
  },
  {
    id: "faq-5",
    question: "How do you achieve and ensure a 99.4% visa approval rate?",
    answer: "We maintain our industry-leading 99.4% success rate through a strict 3-tier legal verification system. Every application is reviewed by a dedicated case officer, an SOP/LOR specialist editor, and finally an authorized licensed immigration attorney before official submission to the embassy."
  },
  {
    id: "faq-6",
    question: "Can you assist with family sponsorship or spouse open work permits?",
    answer: "Yes. We handle spousal open work permits (SOWP), dependent child visas, parent super visas, and family reunification sponsorships in Canada, the United Kingdom, Australia, and New Zealand."
  },
  {
    id: "faq-7",
    question: "How are my personal documents and financial statements protected?",
    answer: "All personal identifiers, passports, tax transcripts, and banking records are uploaded directly into our 256-bit AES encrypted Client Vault. We strictly adhere to global data privacy laws and attorney-client confidentiality rules."
  }
];

interface FaqAccordionProps {
  onOpenWhatsApp?: () => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onOpenWhatsApp }) => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Everything you need to know about our legal representation, fee transparency, and application processing.
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-slate-50/90 border-blue-500/40 shadow-sm ring-1 ring-blue-500/10" 
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? "text-blue-600" : "text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? "bg-blue-600 text-white rotate-180 shadow-xs" 
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-50/80 to-sky-50/50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Support</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Have a specific question about your profile?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Speak directly with an active visa counselor in our direct messaging desk.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenWhatsApp}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center gap-2.5 shrink-0 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Counsel</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
