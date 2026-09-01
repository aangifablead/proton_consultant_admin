"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Clock, 
  Calendar,
  CreditCard,
  FileText,
  Trash2
} from "lucide-react";
import { cn } from "../../lib/utils";

export const AdminNotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications, deleteNotification, deleteAllNotifications } = useAuth();
  const [itemToDelete, setItemToDelete] = useState<string | "ALL" | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "info": return <Info className="w-5 h-5 text-blue-500" />;
      case "meeting": return <Calendar className="w-5 h-5 text-purple-500" />;
      case "payment": return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case "document": return <FileText className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Notifications Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">View and manage all system alerts, updates, and messages.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearAllNotifications}
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors shadow-xs"
          >
            Mark all as read
          </button>
          <button
            onClick={() => setItemToDelete("ALL")}
            className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete All
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-slate-400">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium text-sm">No notifications to display</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={cn(
                    "p-5 flex items-start gap-4 transition-colors cursor-pointer",
                    !notif.read ? "bg-blue-50/40 hover:bg-blue-50/60" : "hover:bg-slate-50"
                  )}
                >
                  <div className="mt-1 bg-white p-2 rounded-full shadow-xs border border-slate-100 shrink-0 flex items-center justify-center">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className={cn("text-sm font-bold", !notif.read ? "text-slate-900" : "text-slate-700")}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{notif.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 pt-2">
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete(notif.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900">Confirm Deletion</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">
                {itemToDelete === "ALL" 
                  ? "Are you sure you want to delete ALL notifications? This action cannot be undone." 
                  : "Are you sure you want to delete this notification? This action cannot be undone."}
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (itemToDelete === "ALL") {
                    deleteAllNotifications();
                  } else {
                    deleteNotification(itemToDelete);
                  }
                  setItemToDelete(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
