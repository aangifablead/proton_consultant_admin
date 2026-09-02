import React, { useState } from "react";
import { DocumentItem } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Download, 
  FileText, 
  User, 
  Calendar, 
  Eye, 
  AlertTriangle 
} from "lucide-react";
import { formatDate } from "../../lib/utils";

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (docId: string, notes?: string) => void;
  onReject: (docId: string, notes: string) => void;
  onRequestReupload: (docId: string, reason: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestReupload,
}) => {
  const [reviewNote, setReviewNote] = useState("");
  const [actionType, setActionType] = useState<"none" | "reupload" | "reject">("none");

  if (!isOpen || !document) return null;

  const handleApprove = () => {
    onApprove(document.id, reviewNote || "Document verified and approved according to immigration criteria.");
    onClose();
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewNote.trim()) return;

    if (actionType === "reupload") {
      onRequestReupload(document.id, reviewNote.trim());
    } else if (actionType === "reject") {
      onReject(document.id, reviewNote.trim());
    }
    setActionType("none");
    setReviewNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{document.name}</h3>
                <StatusBadge status={document.status} size="sm" />
              </div>
              <p className="text-xs text-slate-500">
                Case #{document.caseId} • {document.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Applicant</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {document.clientName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Uploaded Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {document.uploadedAt ? formatDate(document.uploadedAt) : "Pending"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">File Size</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{document.fileSize || "N/A"}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Requirement</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {document.required ? "Mandatory Checklist" : "Optional Affidavit"}
              </span>
            </div>
          </div>

          {/* Simulated Document Viewer Pane */}
          <div className="border border-slate-200 rounded-xl p-4 sm:p-8 bg-slate-50 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] text-center relative overflow-hidden shadow-inner">
            {/* Subtle paper texture effect */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            
            <div className="relative z-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{document.name}</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                  Document verified with cryptographic SHA-256 seal. Ready for formal submission to visa adjudication portal.
                </p>
              </div>
              <div className="pt-3 flex items-center justify-center gap-2 w-full">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // download placeholder
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 shadow-xs transition-colors w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  Download Original ({document.fileType || "PDF"})
                </button>
              </div>
            </div>
          </div>

          {/* Existing Notes / Reasons */}
          {document.rejectionReason && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Prior Rejection / Re-upload Request: </span>
                <span>{document.rejectionReason}</span>
              </div>
            </div>
          )}

          {document.reviewNotes && !document.rejectionReason && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Review Notes: </span>
              {document.reviewNotes}
            </div>
          )}

          {/* Action Decision Form for Reupload/Reject */}
          {actionType !== "none" && (
            <form onSubmit={handleActionSubmit} className="space-y-3 p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
              <label className="block text-xs font-bold text-amber-950">
                {actionType === "reupload" ? "Specify Reason for Re-upload Request *" : "Specify Rejection Reason *"}
              </label>
              <textarea
                required
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder={
                  actionType === "reupload"
                    ? "e.g. Please provide bank statement with official seal and 6-month average balance calculation."
                    : "e.g. Ineligible document format or expired passport."
                }
                className="w-full p-2.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActionType("none")}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs"
                >
                  Confirm & Notify Client
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {actionType === "none" && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={() => setActionType("reupload")}
                className="inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Request Re-upload
              </button>
              <button
                type="button"
                onClick={() => setActionType("reject")}
                className="inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-800 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors w-full sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="inline-flex justify-center items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors w-full sm:w-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
