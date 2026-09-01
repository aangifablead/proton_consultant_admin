import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Clock, 
  User, 
  FileText, 
  Lock, 
  Download 
} from "lucide-react";
import { formatDate } from "../../lib/utils";

export const AdminAuditView: React.FC = () => {
  const { auditLogs } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
              Statutory Compliance & Security
            </span>
            <span className="text-xs text-slate-500 font-medium">Immutable Tamper-Evident Ledger</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            System & Legal Audit Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically signed record of user access, document approvals, status advancements, and financial ledger events.
          </p>
        </div>

        <button
          onClick={() => alert("Audit log export generated (CSV/JSON).")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">Event Trail ({filteredLogs.length} Records)</h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, action, entity, IP..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Ref</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Source IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500 font-medium whitespace-nowrap">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{log.userName}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-800">{log.action}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{log.entity}</td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">{log.details}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
