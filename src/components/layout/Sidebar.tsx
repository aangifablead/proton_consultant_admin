import React from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileEdit, 
  Files, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  UserCheck, 
  CheckSquare, 
  Users, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  Settings, 
  FolderKanban,
  Headphones,
  CheckCircle2,
  Server,
  PlusCircle,
  ExternalLink,
  Bell
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number | string;
  badge?: string;
}

interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, onCloseMobile }) => {
  const { currentRole, currentUser } = useAuth();
  const searchParams = useSearchParams();

  // Helper to handle link click
  const handleClick = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) onCloseMobile();
  };



  // Grouped Navigation for Admin & Super Admin
  const adminNavGroups: NavGroup[] = [
    {
      groupTitle: "Core Operations",
      items: [
        { label: "Overview & Funnel", path: "/admin", icon: LayoutDashboard },
        { label: "Global Leads", path: "/admin/leads", icon: UserCheck },
        { label: "Global Cases", path: "/admin/cases", icon: FolderKanban },
        { label: "Documents Queue", path: "/admin/documents", icon: Files },
        { label: "Appointment Oversight", path: "/admin/appointments", icon: Calendar },
      ],
    },
    {
      groupTitle: "Firm & Finance",
      items: [
        { label: "Finance & Invoices", path: "/admin/payments", icon: CreditCard },
        { label: "Staff & Branches", path: "/admin/employees", icon: Users },
      ],
    },
    {
      groupTitle: "Governance & Security",
      items: [
        { label: "System Config", path: "/admin/config", icon: Sliders },
        { label: "Notifications", path: "/admin/notifications", icon: Bell },
        { label: "Audit Logs", path: "/admin/audit", icon: Activity },
        ...(currentRole === "super_admin"
          ? [{ label: "RBAC & Security", path: "/admin/system", icon: ShieldCheck, badge: "Super Admin" }]
          : []),
      ],
    },
    {
      groupTitle: "Account",
      items: [
        { label: "Settings & Account", path: "/settings", icon: Settings },
      ],
    },
  ];

  const getActiveNavGroups = () => {
    return adminNavGroups;
  };

  const navGroups = getActiveNavGroups();

  const getWorkspaceTitle = () => {
    if (currentRole === "admin") return "Admin Operations";
    return "Executive Control";
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0 select-none border-r border-slate-800">
      {/* Workspace Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
              {getWorkspaceTitle()}
            </span>
            <p className="text-xs text-slate-300 font-semibold mt-0.5 truncate">
              {currentUser?.name || "Dr. Alistair Sterling"}
            </p>
          </div>
          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
            {currentRole.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Navigation Links with Grouped Headers */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-3 no-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-0.5">
            {group.groupTitle && (
              <div className="px-3 pt-1 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                {group.groupTitle}
              </div>
            )}

            {group.items.map((item) => {
              const itemBase = item.path.split('?')[0];
              const itemQuery = item.path.split('?')[1] || "";
              
              let isActive = false;
              if (currentPath === itemBase) {
                if (itemQuery) {
                  // Item requires specific query params
                  const itemParams = new URLSearchParams(itemQuery);
                  isActive = Array.from(itemParams.keys()).every(k => searchParams.get(k) === itemParams.get(k));
                } else {
                  // Item is base path. It should NOT be active if there's a tab param that another item uses (like tab=notifications)
                  // For a perfect fix specifically for the /admin/config clash:
                  if (itemBase === "/admin/config" && searchParams.get("tab") === "notifications") {
                    isActive = false;
                  } else {
                    isActive = true;
                  }
                }
              }

              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-150 group text-left",
                    isActive
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={cn(
                        "w-[18px] h-[18px] shrink-0 transition-colors",
                        isActive ? "text-white" : "text-slate-400 group-hover:text-sky-400"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.count !== undefined && (
                      <span
                        className={cn(
                          "px-1.5 py-0.2 text-[10px] font-bold rounded-md",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.badge && (
                      <span
                        className={cn(
                          "px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider rounded",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-blue-950 text-blue-400 border border-blue-800/60"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}


      </div>

      {/* Footer Branch & Compliance Indicator */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" title="Operational & Encrypted" />
            <span className="text-[11px] font-bold text-slate-300 truncate">
              {currentUser?.branch || "Toronto Central HQ"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 shrink-0">v2.4</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 truncate">
          CICC & MARA Statutory Regulatory Compliance
        </p>
      </div>
    </aside>
  );
};
