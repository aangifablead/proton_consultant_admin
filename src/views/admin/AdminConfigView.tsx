import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";
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
  CheckCircle2,
  Bell,
  Smartphone,
  Mail,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  X
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export const AdminConfigView: React.FC = () => {
  const { addToast } = useAuth();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = (tabParam && ["visa", "stages", "rules", "templates", "notifications"].includes(tabParam)) 
    ? (tabParam as any) 
    : "visa";
    
  const [activeTab, setActiveTab] = useState<"visa" | "stages" | "rules" | "templates" | "notifications">(initialTab);

  useEffect(() => {
    if (tabParam && ["visa", "stages", "rules", "templates", "notifications"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  // Notification Config State
  const [notificationConfig, setNotificationConfig] = useState([
    { event: "New lead assigned", inApp: true, email: true, sms: false, whatsapp: false, recipient: "Employee" },
    { event: "Client registers", inApp: true, email: true, sms: false, whatsapp: false, recipient: "Client & Employee" },
    { event: "Document uploaded", inApp: true, email: false, sms: false, whatsapp: false, recipient: "Employee" },
    { event: "Document rejected", inApp: true, email: true, sms: true, whatsapp: true, recipient: "Client" },
    { event: "Document approved", inApp: true, email: true, sms: false, whatsapp: true, recipient: "Client" },
    { event: "Task assigned", inApp: true, email: false, sms: false, whatsapp: false, recipient: "Employee" },
    { event: "Task overdue", inApp: true, email: true, sms: false, whatsapp: false, recipient: "Employee" },
    { event: "Appointment approaching", inApp: true, email: true, sms: true, whatsapp: true, recipient: "Client & Employee" },
    { event: "Payment received", inApp: true, email: true, sms: false, whatsapp: false, recipient: "Client & Admin" },
    { event: "Payment overdue", inApp: true, email: true, sms: true, whatsapp: true, recipient: "Client" },
    { event: "Case status changed", inApp: true, email: true, sms: false, whatsapp: true, recipient: "Client" },
    { event: "Client action required", inApp: true, email: true, sms: false, whatsapp: true, recipient: "Client" },
    { event: "Document approaching expiry", inApp: true, email: true, sms: true, whatsapp: false, recipient: "Client" },
  ]);

  // Visa Categories State
  const [categories, setCategories] = useState([
    { name: "Permanent Residency (PR)", code: "PR", active: true, fee: "$4,500" },
    { name: "Student Visa", code: "STU", active: true, fee: "$2,200" },
    { name: "Work Permit", code: "WP", active: true, fee: "$3,800" },
    { name: "Business & Investor", code: "INV", active: true, fee: "$8,500" },
    { name: "Visitor / Tourist", code: "VIS", active: true, fee: "$1,200" },
    { name: "Family Sponsorship", code: "FAM", active: true, fee: "$3,200" },
  ]);

  // Modal states
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [templates, setTemplates] = useState([
    {
      id: "payment_overdue",
      name: "Payment Overdue",
      channels: ["Email", "WhatsApp"],
      recipient: "Client",
      subject: "Action Required: Invoice {{invoiceNumber}} is Overdue",
      body: "Hi {{clientName}},\n\nThis is a gentle reminder that Invoice {{invoiceNumber}} for {{amount}} was due on {{dueDate}} and remains unpaid.\n\nTo ensure your case processing is not delayed, please process the payment using the secure link below:\n{{paymentLink}}\n\nIf you have already made the payment, please ignore this message.\n\nRegards,\nProton Consultancy Billing",
      description: "Edit the base template used for Emails and WhatsApp.",
      variables: "{{clientName}}, {{invoiceNumber}}, {{amount}}, {{dueDate}}, {{paymentLink}}"
    },
    {
      id: "appointment_approaching",
      name: "Appointment approaching",
      channels: ["In-App", "Email"],
      recipient: "Client & Employee",
      subject: "Reminder: Upcoming Appointment with {{employeeName}}",
      body: "Hi {{clientName}},\n\nYou have an upcoming appointment scheduled for {{appointmentDate}} at {{appointmentTime}}.\n\nPlease ensure you join 5 minutes early. Link: {{meetingLink}}\n\nRegards,\nProton Consultancy",
      description: "Sent to both client and assigned employee 24h before.",
      variables: "{{clientName}}, {{employeeName}}, {{appointmentDate}}, {{appointmentTime}}, {{meetingLink}}"
    },
    {
      id: "document_rejected",
      name: "Document rejected",
      channels: ["Email"],
      recipient: "Client",
      subject: "Action Required: Document Update Needed for {{caseId}}",
      body: "Hi {{clientName}},\n\nWe reviewed your uploaded document '{{documentName}}' for Case {{caseId}}, but unfortunately it does not meet the requirements.\n\nReason: {{rejectionReason}}\n\nPlease upload a new version at your earliest convenience.\n\nRegards,\nProton Consultancy",
      description: "Sent when a Case Manager rejects an uploaded document.",
      variables: "{{clientName}}, {{caseId}}, {{documentName}}, {{rejectionReason}}"
    }
  ]);
  const [activeTemplateId, setActiveTemplateId] = useState("payment_overdue");

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
      description: "Workflow parameters, checklist rules, and notification matrices updated.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
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
          { id: "notifications", label: "Notification Channels" },
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
              onClick={() => setIsAddCategoryOpen(true)}
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

      {/* Tab 4: Notifications Configuration */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Integration Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Email Gateway</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected (SendGrid)
                  </div>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Config &rarr;</button>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">WhatsApp Business</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected (Meta)
                  </div>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Config &rarr;</button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">SMS Provider</div>
                  <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    Not Configured
                  </div>
                </div>
              </div>
              <button className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors">Setup &rarr;</button>
            </div>
          </div>

          {/* Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900">Event-Channel Matrix</h3>
              <p className="text-xs text-slate-500 mt-1">Configure which events trigger notifications across specific communication channels.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-5">Trigger Event</th>
                    <th className="py-3 px-5">Target Audience</th>
                    <th className="py-3 px-5 text-center">In-App</th>
                    <th className="py-3 px-5 text-center">Email</th>
                    <th className="py-3 px-5 text-center">SMS</th>
                    <th className="py-3 px-5 text-center">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notificationConfig.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-5 font-bold text-slate-900">{item.event}</td>
                      <td className="py-3 px-5 text-xs font-semibold text-slate-500">
                        <span className="bg-slate-100 px-2 py-1 rounded-md">{item.recipient}</span>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <button 
                          onClick={() => {
                            const newConf = [...notificationConfig];
                            newConf[idx].inApp = !newConf[idx].inApp;
                            setNotificationConfig(newConf);
                          }}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
                            item.inApp ? "bg-blue-600" : "bg-slate-200"
                          )}
                        >
                          <span className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            item.inApp ? "translate-x-4" : "translate-x-0"
                          )} />
                        </button>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <button 
                          onClick={() => {
                            const newConf = [...notificationConfig];
                            newConf[idx].email = !newConf[idx].email;
                            setNotificationConfig(newConf);
                          }}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
                            item.email ? "bg-blue-600" : "bg-slate-200"
                          )}
                        >
                          <span className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            item.email ? "translate-x-4" : "translate-x-0"
                          )} />
                        </button>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <button 
                          onClick={() => {
                            const newConf = [...notificationConfig];
                            newConf[idx].sms = !newConf[idx].sms;
                            setNotificationConfig(newConf);
                          }}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
                            item.sms ? "bg-blue-600" : "bg-slate-200"
                          )}
                        >
                          <span className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            item.sms ? "translate-x-4" : "translate-x-0"
                          )} />
                        </button>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <button 
                          onClick={() => {
                            const newConf = [...notificationConfig];
                            newConf[idx].whatsapp = !newConf[idx].whatsapp;
                            setNotificationConfig(newConf);
                          }}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
                            item.whatsapp ? "bg-emerald-500" : "bg-slate-200"
                          )}
                        >
                          <span className={cn(
                            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            item.whatsapp ? "translate-x-4" : "translate-x-0"
                          )} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Templates Editor Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex overflow-hidden min-h-[400px]">
            {/* Sidebar list of templates */}
            <div className="w-1/3 border-r border-slate-200/80 bg-slate-50/50 flex flex-col">
              <div className="p-4 border-b border-slate-200/80">
                <h3 className="text-sm font-bold text-slate-900">Message Templates</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {templates.map(template => (
                  <div 
                    key={template.id}
                    onClick={() => setActiveTemplateId(template.id)}
                    className={cn(
                      "p-3 text-sm cursor-pointer transition-colors border-b border-slate-100",
                      activeTemplateId === template.id ? "bg-white border-l-2 border-l-blue-600 shadow-sm" : "hover:bg-slate-100/50 border-l-2 border-l-transparent"
                    )}
                  >
                    <div className={cn("font-bold", activeTemplateId === template.id ? "text-slate-900" : "text-slate-700")}>{template.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      {template.channels.includes("In-App") && <Bell className="w-3 h-3" />}
                      {template.channels.includes("Email") && <Mail className="w-3 h-3" />}
                      {template.channels.includes("WhatsApp") && <MessageCircle className="w-3 h-3" />}
                      {template.recipient}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Editor Pane */}
            <div className="w-2/3 flex flex-col">
              {(() => {
                const activeTemplate = templates.find(t => t.id === activeTemplateId)!;
                return (
                  <>
                    <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-white">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{activeTemplate.name} Template</h3>
                        <p className="text-xs text-slate-500">{activeTemplate.description}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                        Preview Mode
                      </button>
                    </div>
                    <div className="p-5 flex-1 bg-slate-50/30 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Subject (Email Only)</label>
                        <input 
                          type="text" 
                          value={activeTemplate.subject} 
                          onChange={(e) => {
                            const newTemplates = [...templates];
                            const idx = newTemplates.findIndex(t => t.id === activeTemplateId);
                            newTemplates[idx].subject = e.target.value;
                            setTemplates(newTemplates);
                          }}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-slate-700">Message Body</label>
                          <span className="text-xs text-slate-400">Available variables: {activeTemplate.variables}</span>
                        </div>
                        <textarea 
                          rows={8} 
                          value={activeTemplate.body}
                          onChange={(e) => {
                            const newTemplates = [...templates];
                            const idx = newTemplates.findIndex(t => t.id === activeTemplateId);
                            newTemplates[idx].body = e.target.value;
                            setTemplates(newTemplates);
                          }}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" 
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className={cn("text-[11px] font-bold", activeTemplate.body.length > 160 ? "text-amber-600" : "text-slate-500")}>
                            Length: {activeTemplate.body.length} characters
                          </span>
                          <button className="text-xs font-bold text-blue-600 hover:text-blue-800">Insert Variable</button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal for Adding Visa Category */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">New Visa Category</h3>
              <button 
                onClick={() => { setIsAddCategoryOpen(false); setNewCategoryName(""); }}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category Name</label>
              <input 
                type="text" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Express Entry"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newCategoryName.trim()) {
                    setCategories([...categories, { name: newCategoryName.trim(), code: "NEW", active: true, fee: "$3,000" }]);
                    setIsAddCategoryOpen(false);
                    setNewCategoryName("");
                  }
                }}
              />
            </div>
            <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 flex justify-end gap-2">
              <button 
                onClick={() => { setIsAddCategoryOpen(false); setNewCategoryName(""); }}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (newCategoryName.trim()) {
                    setCategories([...categories, { name: newCategoryName.trim(), code: "NEW", active: true, fee: "$3,000" }]);
                    setIsAddCategoryOpen(false);
                    setNewCategoryName("");
                  }
                }}
                disabled={!newCategoryName.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
