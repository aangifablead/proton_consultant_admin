import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { DataTable } from "../../components/shared/DataTable";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { 
  Users, 
  Briefcase, 
  Files, 
  Download, 
  Filter, 
  Search, 
  ShieldCheck,
  X,
  Clock,
  Eye,
  ArrowLeft,
  Trash2,
  UserPlus,
  RefreshCw,
  XCircle,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/utils";
import { VerticalTimeline } from "../../components/shared/VerticalTimeline";
import { DocumentViewerModal } from "../../components/shared/DocumentViewerModal";
import { ActionMenu } from "../../components/shared/ActionMenu";
import { Case, DocumentItem } from "../../types";

interface AdminGlobalListViewProps {
  type: "leads" | "cases" | "documents";
}

export const AdminGlobalListView: React.FC<AdminGlobalListViewProps> = ({ type }) => {
  const { leads, cases, documents } = useAuth();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [viewingDocument, setViewingDocument] = useState<DocumentItem | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<DocumentItem | null>(null);

  // Modal States
  const [reassignTarget, setReassignTarget] = useState<any | null>(null);
  const [overrideTarget, setOverrideTarget] = useState<any | null>(null);
  const [closeTarget, setCloseTarget] = useState<any | null>(null);
  const [convertTarget, setConvertTarget] = useState<any | null>(null);
  const { addToast } = useAuth();

  const getTitleAndData = () => {
    switch (type) {
      case "leads":
        return {
          title: "Firm-Wide Leads Master Registry",
          description: "Complete database of client inquiries across all channels and global offices.",
          data: leads,
          columns: [
            { header: "Lead Name", accessorKey: "name", sortable: true },
            { header: "Email", accessorKey: "email", sortable: true },
            { header: "Phone", accessorKey: "phone" },
            { header: "Visa Stream", accessorKey: "visaInterest", sortable: true },
            { header: "Destination", accessorKey: "destination", sortable: true },
            {
              header: "Pipeline Stage",
              accessorKey: "stage",
              sortable: true,
              cell: (row: any) => <StatusBadge status={row.stage} size="sm" />,
            },
            {
              header: "Acquired Date",
              accessorKey: "createdAt",
              sortable: true,
              cell: (row: any) => formatDate(row.createdAt),
            },
            {
              header: "Actions",
              cell: (row: any) => (
                <ActionMenu
                  items={[
                    {
                      label: "View Lead Details",
                      icon: <Eye className="w-3.5 h-3.5 text-slate-500" />,
                      onClick: (e) => { e.stopPropagation(); console.log("View Lead", row.id); }
                    },
                    {
                      label: "Reassign",
                      icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" />,
                      onClick: (e) => { e.stopPropagation(); setReassignTarget(row); }
                    },
                    {
                      label: "Override Stage",
                      icon: <RefreshCw className="w-3.5 h-3.5 text-amber-600" />,
                      onClick: (e) => { e.stopPropagation(); setOverrideTarget(row); }
                    },
                    {
                      label: "Convert to Client",
                      icon: <FileCheck className="w-3.5 h-3.5 text-emerald-600" />,
                      onClick: (e) => { e.stopPropagation(); setConvertTarget(row); }
                    },
                    {
                      label: "Close/Reject Lead",
                      icon: <XCircle className="w-3.5 h-3.5" />,
                      danger: true,
                      onClick: (e) => { e.stopPropagation(); setCloseTarget(row); }
                    }
                  ]}
                />
              ),
              className: "text-right w-16",
            },
          ],
        };
      case "cases":
        return {
          title: "Firm-Wide Caseload Master Registry",
          description: "Full repository of active legal retainers, lodgements, and statutory files.",
          data: cases,
          columns: [
            { header: "Case ID", accessorKey: "caseNumber", sortable: true },
            { header: "Primary Applicant", accessorKey: "clientName", sortable: true },
            { header: "Visa Stream", accessorKey: "visaType", sortable: true },
            { header: "Destination", accessorKey: "destination", sortable: true },
            {
              header: "Workflow Stage",
              accessorKey: "stage",
              sortable: true,
              cell: (row: any) => <StatusBadge status={row.stage} size="sm" />,
            },
            { header: "Assigned Counsel", accessorKey: "assignedEmployeeName", sortable: true },
            {
              header: "Target Lodgement",
              accessorKey: "targetLodgementDate",
              sortable: true,
              cell: (row: any) => formatDate(row.targetLodgementDate),
            },
            {
              header: "Actions",
              cell: (row: any) => (
                <ActionMenu
                  items={[
                    {
                      label: "View Case Details",
                      icon: <Eye className="w-3.5 h-3.5 text-slate-500" />,
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedCase(row as Case);
                      }
                    },
                    {
                      label: "Reassign",
                      icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" />,
                      onClick: (e) => { e.stopPropagation(); setReassignTarget(row); }
                    },
                    {
                      label: "Override Stage",
                      icon: <RefreshCw className="w-3.5 h-3.5 text-amber-600" />,
                      onClick: (e) => { e.stopPropagation(); setOverrideTarget(row); }
                    }
                  ]}
                />
              ),
              className: "text-right w-16",
            },
          ],
        };
      case "documents":
        return {
          title: "Firm-Wide Document Audit Archive",
          description: "Central catalog of all client identity proofs, police checks, and credential evaluations.",
          data: documents,
          columns: [
            { header: "Document Name", accessorKey: "name", sortable: true },
            { header: "Applicant Name", accessorKey: "clientName", sortable: true },
            { header: "Category", accessorKey: "category", sortable: true },
            {
              header: "Audit Status",
              accessorKey: "status",
              sortable: true,
              cell: (row: any) => <StatusBadge status={row.status} size="sm" />,
            },
            {
              header: "Upload Date",
              accessorKey: "uploadedAt",
              sortable: true,
              cell: (row: any) => (row.uploadedAt ? formatDate(row.uploadedAt) : "—"),
            },
            {
              header: "Actions",
              cell: (row: any) => (
                <ActionMenu
                  items={[
                    {
                      label: "View Document",
                      icon: <Eye className="w-3.5 h-3.5 text-slate-500" />,
                      onClick: (e) => {
                        e.stopPropagation();
                        setViewingDocument(row as DocumentItem);
                      }
                    },
                    {
                      label: "Delete Document",
                      icon: <Trash2 className="w-3.5 h-3.5" />,
                      danger: true,
                      onClick: (e) => {
                        e.stopPropagation();
                        setDocumentToDelete(row as DocumentItem);
                      }
                    }
                  ]}
                />
              ),
              className: "text-right w-16",
            },
          ],
        };
    }
  };

  const { title, description, data, columns } = getTitleAndData();

  if (selectedCase) {
    return (
      <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto px-4 sm:px-0 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Case Hero Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="bg-slate-900 p-5 sm:px-6 sm:py-8 text-white flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {selectedCase.caseNumber}
                </span>
                <span className="text-xs font-bold bg-blue-500/30 text-blue-100 border border-blue-400/30 px-2.5 py-1 rounded-md">
                  {selectedCase.stage}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">{selectedCase.clientName}</h2>
              <p className="text-slate-300 mt-1.5 flex items-center gap-2 text-sm font-medium">
                {selectedCase.visaType} <span className="text-slate-500">•</span> {selectedCase.destination}
              </p>
            </div>
            <button
              onClick={() => setSelectedCase(null)}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-slate-700 transition-all shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Global Cases
            </button>
          </div>
        </div>

        {/* Case Timeline Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 md:p-10">
          <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Complete Case History
            </h3>
            <p className="text-sm text-slate-500 mt-1">A chronological audit of all case activities, milestones, and updates.</p>
          </div>

          <div className="w-full">
            {selectedCase.timeline && selectedCase.timeline.length > 0 ? (
              <VerticalTimeline events={selectedCase.timeline} />
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">No timeline events recorded yet for this case.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto flex flex-col h-full relative animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Global Data Table with built-in export & search */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder={`Search within ${type}...`}
          exportFileName={`Proton_${type}_registry_${new Date().toISOString().slice(0, 10)}.csv`}
        />
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={viewingDocument}
        isOpen={!!viewingDocument}
        onClose={() => setViewingDocument(null)}
        onApprove={(id) => console.log("Approved", id)}
        onReject={(id, notes) => console.log("Rejected", id, notes)}
        onRequestReupload={(id, reason) => console.log("Reupload", id, reason)}
      />

      {/* Custom Delete Confirmation Modal */}
      {documentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Document</h3>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete <strong>{documentToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setDocumentToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Deleted", documentToDelete.id);
                  setDocumentToDelete(null);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
              >
                Delete Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {reassignTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Reassign {type === "leads" ? "Lead" : "Case"}</h3>
            <p className="text-sm text-slate-500">
              Select an employee to reassign this {type === "leads" ? "lead" : "case"} to. They will be notified immediately.
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Select Employee</label>
              <select className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option>Jane Doe (Senior Counsel)</option>
                <option>John Smith (Case Manager)</option>
                <option>Michael Chen (Sales Associate)</option>
              </select>
            </div>
            <div className="pt-4 flex items-center justify-end gap-3">
              <button onClick={() => setReassignTarget(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                addToast({ title: "Reassigned Successfully", description: `Reassigned to selected employee.`, type: "success" });
                setReassignTarget(null);
              }} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors">
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Override Stage Modal */}
      {overrideTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Override Stage</h3>
            <p className="text-sm text-slate-500">
              Manually overriding the stage skips standard workflow checks. This action will be audited.
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">New Stage</label>
              <select className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                {type === "leads" ? (
                  <>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Consultation</option>
                  </>
                ) : (
                  <>
                    <option>Profile Assessment</option>
                    <option>Intake & Document Prep</option>
                    <option>Authority Lodgement</option>
                    <option>Biometrics & Medicals</option>
                    <option>Decision & Visa Granted</option>
                  </>
                )}
              </select>
            </div>
            <div className="pt-4 flex items-center justify-end gap-3">
              <button onClick={() => setOverrideTarget(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                addToast({ title: "Stage Overridden", description: `Stage manually updated.`, type: "success" });
                setOverrideTarget(null);
              }} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors">
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert to Client Modal */}
      {convertTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Convert Lead to Client</h3>
            <p className="text-sm text-slate-500">
              This will move <strong>{convertTarget?.name || "the lead"}</strong> to the active Caseload Registry with a status of "New". They will receive an onboarding email.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button onClick={() => setConvertTarget(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                addToast({ title: "Lead Converted", description: "Lead has been successfully moved to active cases.", type: "success" });
                setConvertTarget(null);
              }} className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors">
                Convert to Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close/Reject Lead Modal */}
      {closeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Close / Reject Lead</h3>
            <p className="text-sm text-slate-500">
              Mark this lead as Lost. You must provide a reason for the audit log.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              addToast({ title: "Lead Closed", description: "Lead has been marked as Lost.", type: "success" });
              setCloseTarget(null);
            }}>
              <div className="space-y-1.5 mb-4">
                <label className="text-xs font-bold text-slate-700">Rejection Reason *</label>
                <textarea required rows={3} placeholder="e.g. Unresponsive, unqualified, budget constraints..." className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setCloseTarget(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors">
                  Close Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
