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
  Trash2
} from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/utils";
import { VerticalTimeline } from "../../components/shared/VerticalTimeline";
import { DocumentViewerModal } from "../../components/shared/DocumentViewerModal";
import { Case, DocumentItem } from "../../types";

interface AdminGlobalListViewProps {
  type: "leads" | "cases" | "documents";
}

export const AdminGlobalListView: React.FC<AdminGlobalListViewProps> = ({ type }) => {
  const { leads, cases, documents } = useAuth();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [viewingDocument, setViewingDocument] = useState<DocumentItem | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<DocumentItem | null>(null);

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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCase(row as Case);
                  }}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Case Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              ),
              className: "text-right",
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
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingDocument(row as DocumentItem);
                    }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDocumentToDelete(row as DocumentItem);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
              className: "text-right w-24",
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
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
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
    </div>
  );
};
