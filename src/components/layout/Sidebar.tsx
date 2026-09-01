import React from "react";
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
  Lock
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
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 scrollbar-thin">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {group.groupTitle && (
              <div className="px-3 pt-1 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                {group.groupTitle}
              </div>
            )}

            {group.items.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group text-left",
                    isActive
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
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

        {/* Role-Specific Contextual Card to eliminate dead void */}
        <div className="pt-2">
            <div className="p-3 bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl border border-slate-700/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-sky-400 tracking-wider">Enterprise Security</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <Lock className="w-3 h-3 text-emerald-400" /> SSL 256-Bit
                </span>
              </div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>Global Branches</span>
                  <span className="text-white font-bold">5 Online</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>MFA / TOTP Policy</span>
                  <span className="text-emerald-400 font-bold">Enforced</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>Audit Trail</span>
                  <span className="text-slate-300 font-mono">Immutable</span>
                </div>
              </div>
              <button
                onClick={() => handleClick("/admin/system")}
                className="w-full py-1.5 text-[11px] font-bold text-center text-blue-300 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security Matrix</span>
              </button>
            </div>
        </div>
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
