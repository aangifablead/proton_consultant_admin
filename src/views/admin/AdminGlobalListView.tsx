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
  ShieldCheck 
} from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/utils";

interface AdminGlobalListViewProps {
  type: "leads" | "cases" | "documents";
}

export const AdminGlobalListView: React.FC<AdminGlobalListViewProps> = ({ type }) => {
  const { leads, cases, documents } = useAuth();

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
          ],
        };
    }
  };

  const { title, description, data, columns } = getTitleAndData();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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
    </div>
  );
};
