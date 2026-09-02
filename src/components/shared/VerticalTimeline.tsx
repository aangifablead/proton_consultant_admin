import React from "react";
import { CaseTimelineEvent } from "../../types";
import { cn, formatDate } from "../../lib/utils";
import { 
  CheckCircle2, 
  CircleDot, 
  Clock, 
  FileText, 
  CreditCard, 
  Landmark, 
  MessageSquareQuote, 
  Award 
} from "lucide-react";

interface VerticalTimelineProps {
  events: CaseTimelineEvent[];
  className?: string;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ events, className }) => {
  const getIcon = (category: CaseTimelineEvent["category"], status: CaseTimelineEvent["status"]) => {
    if (status === "completed") {
      return <CheckCircle2 className="w-5 h-5 text-white" />;
    }
    if (status === "current") {
      return <CircleDot className="w-5 h-5 text-white animate-pulse" />;
    }

    switch (category) {
      case "document":
        return <FileText className="w-4 h-4 text-slate-400" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-slate-400" />;
      case "government":
        return <Landmark className="w-4 h-4 text-slate-400" />;
      case "communication":
        return <MessageSquareQuote className="w-4 h-4 text-slate-400" />;
      case "milestone":
      default:
        return <Award className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: CaseTimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-600 border-emerald-600 shadow-emerald-200 shadow-sm";
      case "current":
        return "bg-blue-600 border-blue-600 ring-4 ring-blue-100 shadow-sm";
      case "upcoming":
      default:
        return "bg-white border-slate-300 text-slate-400";
    }
  };

  return (
    <div className={cn("relative pl-8 sm:pl-12 space-y-8", className)}>
      {/* Central continuous track line */}
      <div className="absolute left-4 sm:left-6 top-3 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2" />

      {events.map((event, index) => {
        const isCompleted = event.status === "completed";
        const isCurrent = event.status === "current";

        return (
          <div key={event.id || index} className="relative group">
            {/* Timeline node icon */}
            <div
              className={cn(
                "absolute -left-4 sm:-left-6 top-0.5 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all -translate-x-1/2",
                getStatusColor(event.status)
              )}
            >
              {getIcon(event.category, event.status)}
            </div>

            {/* Event content box */}
            <div
              className={cn(
                "p-4 sm:p-5 rounded-xl border transition-all duration-200",
                isCurrent
                  ? "bg-blue-50/50 border-blue-200 shadow-sm"
                  : isCompleted
                  ? "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
                  : "bg-slate-50/70 border-dashed border-slate-200 opacity-80"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded",
                      isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : isCurrent
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-200 text-slate-700"
                    )}
                  >
                    {event.status === "completed"
                      ? "Completed"
                      : event.status === "current"
                      ? "Action Required / In Progress"
                      : "Pending Next Stage"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    By {event.actor}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {formatDate(event.date)}
                </div>
              </div>

              <h4 className={cn("text-base font-bold", isCurrent ? "text-blue-950" : "text-slate-900")}>
                {event.title}
              </h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
