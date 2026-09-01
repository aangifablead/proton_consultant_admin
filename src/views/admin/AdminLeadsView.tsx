import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { DataTable } from "../../components/shared/DataTable";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Lead } from "../../types";
import { 
  Users, 
  Search, 
  Filter, 
  X,
  AlertTriangle,
  CalendarCheck,
  CheckCircle,
  XCircle,
  MessageSquare,
  Globe,
  Share2,
  Megaphone,
  Eye
} from "lucide-react";
import { formatDate, cn } from "../../lib/utils";

export const AdminLeadsView: React.FC = () => {
  const { 
    leads, 
    employees, 
    reassignLead, 
    updateLeadStage, 
    convertLeadToClient, 
    rejectLead, 
    addLeadNote 
  } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modals state
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
  // Modal forms state
  const [selectedCounsel, setSelectedCounsel] = useState("");
  const [selectedStage, setSelectedStage] = useState<Lead["stage"] | "">("");
  const [rejectReason, setRejectReason] = useState("");
  const [newNote, setNewNote] = useState("");

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: "Lead Name", accessorKey: "name", sortable: true, cell: (row: any) => (
      <div>
        <div className="font-bold text-slate-900">{row.name}</div>
        <div className="text-[10px] text-slate-500 flex items-center gap-1">
          {row.priority === "High" && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
          {row.priority === "Medium" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
          {row.priority === "Low" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
          {row.priority || "Standard"} Priority
        </div>
      </div>
    )},
    { header: "Contact", accessorKey: "contact", cell: (row: any) => (
      <div>
        <div className="text-xs text-slate-900">{row.email}</div>
        <div className="text-xs text-slate-500">{row.phone}</div>
      </div>
    )},
    { header: "Source", accessorKey: "source", sortable: true, cell: (row: any) => (
      <div className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md inline-block">
        {row.source}
      </div>
    )},
    { header: "Visa / Dest", accessorKey: "visaInterest", sortable: true, cell: (row: any) => (
      <div>
        <div className="font-bold text-slate-900 text-xs">{row.visaInterest}</div>
        <div className="text-[10px] text-slate-500">{row.destination}</div>
      </div>
    )},
    { header: "Stage", accessorKey: "stage", sortable: true, cell: (row: any) => (
      <StatusBadge status={row.stage} size="sm" />
    )},
    { header: "Counsel", accessorKey: "assignedTo", sortable: true },
    { header: "Last Activity", accessorKey: "lastActivity", sortable: true, cell: (row: any) => (
      <div className="text-xs text-slate-500">{row.lastActivity}</div>
    )},
    { header: "Actions", accessorKey: "actions", cell: (row: any) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => { setSelectedLead(row); setIsProfileOpen(true); }}
          className="p-1.5 hover:bg-slate-200 rounded-md text-slate-700 transition-colors mr-1"
          title="View Details"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={() => { setSelectedLead(row); setIsReassignModalOpen(true); }}
          className="p-1.5 hover:bg-slate-200 rounded-md text-blue-600 transition-colors"
          title="Reassign"
        ><Users className="w-3.5 h-3.5" /></button>
        <button 
          onClick={() => { setSelectedLead(row); setIsOverrideModalOpen(true); }}
          className="p-1.5 hover:bg-slate-200 rounded-md text-amber-600 transition-colors"
          title="Override Stage"
        ><AlertTriangle className="w-3.5 h-3.5" /></button>
        <button 
          onClick={() => { setSelectedLead(row); setIsConvertModalOpen(true); }}
          className="p-1.5 hover:bg-slate-200 rounded-md text-emerald-600 transition-colors"
          title="Convert to Client"
        ><CheckCircle className="w-3.5 h-3.5" /></button>
        <button 
          onClick={() => { setSelectedLead(row); setIsRejectModalOpen(true); }}
          className="p-1.5 hover:bg-slate-200 rounded-md text-rose-600 transition-colors"
          title="Reject / Close"
        ><XCircle className="w-3.5 h-3.5" /></button>
      </div>
    )}
  ];

  // KPI Calculations
  const activeLeads = leads.filter(l => l.stage !== "Lost" && l.stage !== "Converted");
  const getSourceStats = (sourceName: string) => {
    const sourceLeads = leads.filter(l => l.source === sourceName);
    const converted = sourceLeads.filter(l => l.stage === "Converted").length;
    const rate = sourceLeads.length > 0 ? Math.round((converted / sourceLeads.length) * 100) : 0;
    return { count: sourceLeads.length, rate };
  };

  const websiteStats = getSourceStats("Website Form");
  const metaStats = getSourceStats("Meta Ads");
  const referralStats = getSourceStats("Referral");

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedLead) return;
    addLeadNote(selectedLead.id, newNote);
    setNewNote("");
    // Optimistic update of local state for the drawer
    setSelectedLead({ ...selectedLead, notes: [...selectedLead.notes, newNote], lastActivity: "Note added" });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col h-full relative">
      {!isProfileOpen || !selectedLead ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Firm-Wide Leads Oversight</h1>
          <p className="text-xs text-slate-500 mt-0.5">Global master registry with intervention and override capabilities.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Pipeline</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{activeLeads.length}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Leads currently in progress</div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => setSearchQuery("Website")}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Website Form</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{websiteStats.count}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1">{websiteStats.rate}% conversion rate</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => setSearchQuery("Meta Ads")}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Meta Ads</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
              <Megaphone className="w-3.5 h-3.5 text-purple-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{metaStats.count}</div>
            <div className="text-xs font-semibold text-purple-600 mt-1">{metaStats.rate}% conversion rate</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => setSearchQuery("Referral")}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Referrals</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <Share2 className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{referralStats.count}</div>
            <div className="text-xs font-semibold text-amber-600 mt-1">{referralStats.rate}% conversion rate</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, emails, source, or counsel..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <button 
            onClick={() => setSearchQuery("")}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Clear Filters</span>
          </button>
        </div>

        {/* Table View */}
        <div className="flex-1 overflow-auto no-scrollbar bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          {filteredLeads.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">No leads found</h3>
              <p className="text-xs text-slate-500 mt-1">Adjust filters or search query.</p>
            </div>
          ) : (
            <DataTable 
              data={filteredLeads}
              columns={columns}
              hideSearch={true}
            />
          )}
        </div>
        </div>
        </>
      ) : (
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Lead Profile
            </h2>
            <button 
              onClick={() => setIsProfileOpen(false)} 
              className="px-3 py-1.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Close Profile
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 space-y-6 pr-2">
            {/* Profile Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</div>
                <StatusBadge status={selectedLead.stage} size="sm" />
              </div>
              <div className="text-2xl font-black text-slate-900">{selectedLead.name}</div>
              <div className="text-sm text-slate-500 mt-1">{selectedLead.email} &bull; {selectedLead.phone}</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Source</div>
                <div className="text-sm font-bold text-slate-900">{selectedLead.source}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Interest</div>
                <div className="text-sm font-bold text-slate-900">{selectedLead.visaInterest}</div>
                <div className="text-[10px] text-slate-500">{selectedLead.destination}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 col-span-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Assigned To</div>
                <div className="flex items-center justify-between p-2 bg-white border border-slate-200/80 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {selectedLead.assignedTo.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{selectedLead.assignedTo}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsReassignModalOpen(true)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Activity & Notes</div>
              <div className="space-y-4 max-w-3xl">
                {selectedLead.notes.map((note, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl rounded-tl-none border border-slate-100 text-sm text-slate-700 flex-1">
                      {note}
                    </div>
                  </div>
                ))}
                
                {selectedLead.notes.length === 0 && (
                  <div className="text-sm text-slate-400 italic">No notes recorded yet.</div>
                )}

                <div className="flex gap-2 mt-4">
                  <input 
                    type="text" 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add an internal note..."
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex gap-3 shrink-0">
            <button 
              onClick={() => setIsOverrideModalOpen(true)}
              className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Override Stage
            </button>
            <button 
              onClick={() => setIsConvertModalOpen(true)}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Convert to Client
            </button>
            <button 
              onClick={() => setIsRejectModalOpen(true)}
              className="px-4 py-2 text-sm font-bold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 rounded-lg transition-colors ml-auto"
            >
              Reject / Close Lead
            </button>
          </div>
        </div>
      )}

      {/* --- Modals --- */}
      
      {/* 1. Reassign Modal */}
      {isReassignModalOpen && selectedLead && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => { setIsReassignModalOpen(false); setSelectedCounsel(""); }}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">Reassign Lead</h3>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              <p className="text-sm text-slate-600 mb-2">
                Select a new owner for <strong>{selectedLead.name}</strong>:
              </p>
              {employees.map(emp => (
                <div 
                  key={emp.id} 
                  onClick={() => setSelectedCounsel(emp.name)}
                  className={cn(
                    "p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors",
                    selectedCounsel === emp.name ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {emp.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{emp.name}</div>
                    </div>
                  </div>
                  {selectedCounsel === emp.name && <CalendarCheck className="w-4 h-4 text-blue-600" />}
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => {
                  setIsReassignModalOpen(false);
                  setSelectedCounsel("");
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!selectedCounsel}
                onClick={() => {
                  reassignLead(selectedLead.id, selectedCounsel);
                  setIsReassignModalOpen(false);
                  setSelectedCounsel("");
                  setSelectedLead({ ...selectedLead, assignedTo: selectedCounsel });
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Override Stage Modal */}
      {isOverrideModalOpen && selectedLead && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => { setIsOverrideModalOpen(false); setSelectedStage(""); }}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900">Override Pipeline Stage</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-600">
                Manually moving a lead stage bypasses standard validation rules.
              </p>
              <select 
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value as any)}
                className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="" disabled>Select new stage...</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOverrideModalOpen(false);
                  setSelectedStage("");
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!selectedStage}
                onClick={() => {
                  if (selectedStage) {
                    updateLeadStage(selectedLead.id, selectedStage as any);
                    setIsOverrideModalOpen(false);
                    setSelectedStage("");
                    setSelectedLead({ ...selectedLead, stage: selectedStage as any });
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Force Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reject / Close Modal */}
      {isRejectModalOpen && selectedLead && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => { setIsRejectModalOpen(false); setRejectReason(""); }}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900">Close Lead</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-600">
                Closing a lead removes it from the active pipeline. A reason is required.
              </p>
              <textarea 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for closing (e.g., Unresponsive, Doesn't qualify)..."
                rows={3}
                className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setRejectReason("");
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={rejectReason.trim().length === 0}
                onClick={() => {
                  rejectLead(selectedLead.id, rejectReason);
                  setIsRejectModalOpen(false);
                  setRejectReason("");
                  setIsProfileOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Confirm Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Convert Modal */}
      {isConvertModalOpen && selectedLead && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => setIsConvertModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900">Convert to Client</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">
                This will create a new Case File for <strong>{selectedLead.name}</strong> and migrate their data to the active caseload.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => setIsConvertModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  convertLeadToClient(selectedLead.id);
                  setIsConvertModalOpen(false);
                  setIsProfileOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
