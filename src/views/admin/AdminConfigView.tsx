import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  Settings, 
  Sliders, 
  Layers, 
  Files, 
  CheckSquare, 
  Plus, 
  Save, 
  Trash2, 
  GripVertical, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const AdminConfigView: React.FC = () => {
  const { addToast } = useAuth();
  const [activeTab, setActiveTab] = useState<"visa" | "stages" | "rules" | "templates">("visa");

  // Visa Categories State
  const [categories, setCategories] = useState([
    { name: "Permanent Residency (PR)", code: "PR", active: true, fee: "$4,500" },
    { name: "Student Visa", code: "STU", active: true, fee: "$2,200" },
    { name: "Work Permit", code: "WP", active: true, fee: "$3,800" },
    { name: "Business & Investor", code: "INV", active: true, fee: "$8,500" },
    { name: "Visitor / Tourist", code: "VIS", active: true, fee: "$1,200" },
    { name: "Family Sponsorship", code: "FAM", active: true, fee: "$3,200" },
  ]);

  // Workflow stages
  const [stages, setStages] = useState([
    { order: 1, name: "Consultation & Retainer", autoTask: "Generate Retainer Agreement" },
    { order: 2, name: "Intake & Document Prep", autoTask: "Send Checklist & Form Link" },
    { order: 3, name: "Application Review", autoTask: "Senior Counsel Quality Audit" },
    { order: 4, name: "Government Lodgement", autoTask: "File with IRCC / ImmiAccount" },
    { order: 5, name: "Biometrics & Medicals", autoTask: "Issue Clinic Referral Form" },
    { order: 6, name: "Decision Pending", autoTask: "Monitor Processing Time API" },
    { order: 7, name: "Approved / Visa Issued", autoTask: "Send Congratulations & Onboarding" },
  ]);

  // Document Rules
  const [docRules, setDocRules] = useState([
    { docName: "Passport Scan (All Pages)", category: "Civil Documents", required: true, maxFileSize: "10 MB" },
    { docName: "Educational Credential Assessment (ECA)", category: "Academic Proof", required: true, maxFileSize: "15 MB" },
    { docName: "Language Test Result Report (IELTS/PTE)", category: "Language Scorecard", required: true, maxFileSize: "5 MB" },
    { docName: "6-Month Bank Balance Certificate", category: "Proof of Funds", required: true, maxFileSize: "10 MB" },
    { docName: "Police Clearance Certificate", category: "Statutory Clearances", required: true, maxFileSize: "10 MB" },
  ]);

  const handleSave = () => {
    addToast({
      title: "Configuration Saved",
      description: "Workflow parameters and checklist rules updated firm-wide.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
              System Orchestration
            </span>
            <span className="text-xs text-slate-500 font-medium">Global Workflow Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Immigration Program & Stage Rules
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure visa streams, statutory progression stages, automated checklist templates, and SLA rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-2">
        {[
          { id: "visa", label: "Visa Categories & Fees" },
          { id: "stages", label: "Workflow Stages & Auto-Tasks" },
          { id: "rules", label: "Checklist Matrix Rules" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-2.5 px-3 -mb-px border-b-2 transition-colors ${
              activeTab === t.id
                ? "border-blue-700 text-blue-900"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Visa Categories */}
      {activeTab === "visa" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Supported Visa Streams</h3>
            <button
              onClick={() => {
                const name = prompt("Enter new visa category name:");
                if (name) {
                  setCategories([...categories, { name, code: "NEW", active: true, fee: "$3,000" }]);
                }
              }}
              className="px-3 py-1.5 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg"
            >
              + Add Category
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {categories.map((cat, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {cat.code}
                  </span>
                  <span className="font-bold text-slate-900">{cat.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-700">Standard Retainer: {cat.fee}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase text-[10px]">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Workflow Stages */}
      {activeTab === "stages" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Statutory Progression Pipeline</h3>
            <span className="text-xs text-slate-500">7 Core Sequential Stages</span>
          </div>

          <div className="space-y-2.5">
            {stages.map((st) => (
              <div
                key={st.order}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-400 w-5">0{st.order}</span>
                  <span className="font-bold text-slate-900">{st.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Auto Task:</span>
                  <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {st.autoTask}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Document Checklist Rules */}
      {activeTab === "rules" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Mandatory Document Requirements</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {docRules.map((rule, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{rule.docName}</span>
                  <span className="text-[11px] text-slate-400">{rule.category} • Max {rule.maxFileSize}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold uppercase text-[10px]">
                  {rule.required ? "Mandatory" : "Optional"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
