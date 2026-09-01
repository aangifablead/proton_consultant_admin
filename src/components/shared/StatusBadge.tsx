import React from "react";
import { cn } from "../../lib/utils";
import { CaseStage, DocumentStatus, LeadStage, InvoiceStatus, TaskPriority, TaskStatus } from "../../types";

interface StatusBadgeProps {
  status: CaseStage | DocumentStatus | LeadStage | InvoiceStatus | TaskPriority | TaskStatus | string;
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  className,
  dot = true,
}) => {
  const getColors = (val: string): { bg: string; text: string; border: string; dot: string } => {
    switch (val) {
      // Document Statuses
      case "Approved":
      case "Paid":
      case "Done":
      case "Converted":
      case "Decision & Visa Granted":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          text: "text-emerald-700",
          border: "border-emerald-200",
          dot: "bg-emerald-500",
        };

      case "Under Review":
      case "In Progress":
      case "Qualified":
      case "Consultation":
      case "Authority Lodgement":
      case "Biometrics & Medicals":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          text: "text-blue-700",
          border: "border-blue-200",
          dot: "bg-blue-500",
        };

      case "Submitted":
      case "Review":
      case "Intake & Document Prep":
      case "Medium":
      case "Contacted":
        return {
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          text: "text-indigo-700",
          border: "border-indigo-200",
          dot: "bg-indigo-500",
        };

      case "Pending":
      case "Pending Upload":
      case "Profile Assessment":
      case "New":
      case "Todo":
      case "Low":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-500",
        };

      case "Rejected":
      case "Re-upload Requested":
      case "Overdue":
      case "Urgent":
      case "High":
      case "Lost":
      case "Cancelled":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          text: "text-rose-700",
          border: "border-rose-200",
          dot: "bg-rose-500",
        };

      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          text: "text-slate-700",
          border: "border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  const colors = getColors(status);
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-semibold",
    lg: "text-sm px-3 py-1.5 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap transition-colors",
        colors.bg,
        sizeClasses[size],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", colors.dot)} />}
      {status}
    </span>
  );
};
