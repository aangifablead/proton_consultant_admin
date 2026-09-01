import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  ShieldCheck, 
  Crown, 
  Lock, 
  Key, 
  Building, 
  Check, 
  X, 
  Save, 
  Sparkles,
  Server
} from "lucide-react";

export const AdminSystemView: React.FC = () => {
  const { addToast } = useAuth();

  const permissionsMatrix = [
    { feature: "View Public Site & Submit Inquiry", client: true, employee: true, manager: true, admin: true, super_admin: true },
    { feature: "Access Client Portal & Document Vault", client: true, employee: false, manager: false, admin: false, super_admin: true },
    { feature: "Manage Assigned Caseload & Tasks", client: false, employee: true, manager: true, admin: true, super_admin: true },
    { feature: "Approve / Reject Client Documents", client: false, employee: true, manager: true, admin: true, super_admin: true },
    { feature: "View Team Workload & Escalation Queue", client: false, employee: false, manager: true, admin: true, super_admin: true },
    { feature: "Access Global Master Tables & Export", client: false, employee: false, manager: false, admin: true, super_admin: true },
    { feature: "Issue Invoices & Manage Financials", client: false, employee: false, manager: false, admin: true, super_admin: true },
    { feature: "Configure Visa Categories & Stage Rules", client: false, employee: false, manager: false, admin: true, super_admin: true },
    { feature: "System Roles, Security & Global Branches", client: false, employee: false, manager: false, admin: false, super_admin: true },
  ];

  const handleSaveSecurity = () => {
    addToast({
      title: "System Parameters Saved",
      description: "MFA enforcement and role access matrix updated successfully.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
              Super Admin Control Plane
            </span>
            <span className="text-xs text-slate-500 font-medium">Enterprise Security Tier</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Role Permission Matrix & Global Security
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage granular RBAC authorization, multi-factor authentication, firm-wide branches, and encryption policies.
          </p>
        </div>

        <button
          onClick={handleSaveSecurity}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Security Config</span>
        </button>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h3>
          <span className="text-xs text-slate-500 font-medium">5 Defined Security Levels</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Feature / Capability</th>
                <th className="py-3.5 px-4 text-center w-28">Client</th>
                <th className="py-3.5 px-4 text-center w-28">Employee</th>
                <th className="py-3.5 px-4 text-center w-28">Manager</th>
                <th className="py-3.5 px-4 text-center w-28">Admin</th>
                <th className="py-3.5 px-4 text-center w-32 text-purple-700 bg-purple-50/40">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{row.feature}</td>
                  <td className="py-3.5 px-4 text-center">
                    {row.client ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.employee ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.manager ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.admin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-purple-50/30">
                    <Check className="w-4 h-4 text-purple-600 mx-auto font-bold" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Lock className="w-4 h-4 text-blue-700" />
            <span>Firm Authentication & MFA</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Enforce 2-Factor Authentication (TOTP)</span>
                <span className="text-slate-500 text-[11px]">Require staff & admin accounts to authenticate via Authenticator app.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Session Inactivity Lock (15 Minutes)</span>
                <span className="text-slate-500 text-[11px]">Auto-terminate staff sessions upon inactivity to protect client PII.</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Building className="w-4 h-4 text-blue-700" />
            <span>Global Office Branches</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: "Toronto Central HQ", addr: "Bay Street Financial District, Toronto, ON, Canada" },
              { name: "London UK Office", addr: "Mayfair Legal Chambers, London, United Kingdom" },
              { name: "Sydney AU Branch", addr: "George St, Sydney NSW, Australia" },
              { name: "Dubai UAE Representative", addr: "DIFC Gate Precinct, Dubai, UAE" },
            ].map((br, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">{br.name}</span>
                <span className="text-[11px] text-slate-400">{br.addr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
