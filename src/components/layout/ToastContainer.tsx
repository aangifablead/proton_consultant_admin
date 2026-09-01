import React from "react";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "../../lib/utils";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  const getIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto p-4 rounded-xl bg-white border border-slate-200/90 shadow-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0",
            toast.type === "success" && "border-l-4 border-l-emerald-500",
            toast.type === "error" && "border-l-4 border-l-rose-500",
            toast.type === "warning" && "border-l-4 border-l-amber-500",
            (!toast.type || toast.type === "info") && "border-l-4 border-l-blue-600"
          )}
        >
          {getIcon(toast.type)}
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-bold text-slate-900 leading-snug">{toast.title}</h5>
            {toast.description && (
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
