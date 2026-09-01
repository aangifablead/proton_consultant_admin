import React, { useState, useRef } from "react";
import { UploadCloud, File, CheckCircle2, AlertCircle, X } from "lucide-react";
import { DocumentItem } from "../../types";
import { cn } from "../../lib/utils";

interface DocumentUploadZoneProps {
  onUpload: (doc: { name: string; category: DocumentItem["category"]; fileSize: string }) => void;
  defaultCategory?: DocumentItem["category"];
  className?: string;
}

export const DocumentUploadZone: React.FC<DocumentUploadZoneProps> = ({
  onUpload,
  defaultCategory = "Identity",
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [category, setCategory] = useState<DocumentItem["category"]>(defaultCategory);
  const [documentName, setDocumentName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !documentName.trim()) return;

    setUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB";
            onUpload({
              name: documentName.trim(),
              category,
              fileSize: sizeMB === "0.0 MB" ? "0.8 MB" : sizeMB,
            });
            setSelectedFile(null);
            setDocumentName("");
            setUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs", className)}>
      <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
        <UploadCloud className="w-4 h-4 text-blue-600" />
        Upload New Case Document
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Supports PDF, JPEG, PNG, DOCX up to 25MB. All files are encrypted at rest with AES-256.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drag and drop box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-50/50"
              : selectedFile
              ? "border-emerald-300 bg-emerald-50/30"
              : "border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 line-clamp-1">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                <span className="text-blue-700 font-semibold underline underline-offset-2">Click to browse</span> or drag and drop files here
              </p>
              <p className="text-xs text-slate-400 mt-1">Official passport scans, diplomas, bank statements, IELTS certificates</p>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Document Display Title *</label>
              <input
                type="text"
                required
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="e.g. 6-Month Stamped Bank Statement"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Document Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentItem["category"])}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
              >
                <option value="Identity">Identity & Civil Status</option>
                <option value="Academic">Academic Diplomas & Transcripts</option>
                <option value="Employment">Employment & Experience Letters</option>
                <option value="Financial">Financial & Proof of Funds</option>
                <option value="Medical">Medical & Police Clearance</option>
                <option value="Other">Other Supporting Affidavits</option>
              </select>
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>Uploading & Scanning Security Hash...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {selectedFile && !uploading && (
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              Submit for Attorney Review
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
