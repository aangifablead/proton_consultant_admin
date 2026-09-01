import React from "react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";
import { ShieldCheck, UserCheck, Briefcase, Crown, Users } from "lucide-react";
import { cn } from "../../lib/utils";

interface RoleSwitcherBadgeProps {
  onNavigate?: (route: string) => void;
}

export const RoleSwitcherBadge: React.FC<RoleSwitcherBadgeProps> = ({ onNavigate }) => {
  const { currentRole, switchRole } = useAuth();

  const roles: { role: UserRole; label: string; shortLabel: string; desc: string; icon: React.ReactNode; defaultPath: string }[] = [
    {
      role: "admin",
      label: "Admin",
      shortLabel: "Admin",
      desc: "Samantha Reed (Executive)",
      icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0" />,
      defaultPath: "/admin",
    },
    {
      role: "super_admin",
      label: "Super Admin",
      shortLabel: "Super Admin",
      desc: "David Sterling, Esq. (Partner)",
      icon: <Crown className="w-3.5 h-3.5 shrink-0" />,
      defaultPath: "/admin/system",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-auto no-scrollbar scrollbar-none">
      <div className="inline-flex items-center gap-1 p-1 bg-slate-900/90 text-white rounded-xl shadow-md border border-slate-700/50 backdrop-blur-md shrink-0">
        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 items-center gap-1 shrink-0 hidden xl:flex">
          <span>Role:</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {roles.map((r) => {
            const isActive = currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => {
                  switchRole(r.role);
                  if (onNavigate) {
                    onNavigate(r.defaultPath);
                  }
                }}
                title={`${r.label} — ${r.desc}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-blue-600 text-white shadow-xs font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                {r.icon}
                <span className="hidden sm:inline">{r.label}</span>
                <span className="inline sm:hidden">{r.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
