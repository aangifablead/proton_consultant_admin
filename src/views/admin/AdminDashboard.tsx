"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building, 
  Globe2, 
  PieChart, 
  Layers,
  Sparkles
} from "lucide-react";
import { formatCurrency } from "../../lib/utils";

export const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const onNavigate = (path: string) => router.push(path);
  const { leads, cases, invoices, employees } = useAuth();

  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingRevenue = invoices
    .filter((i) => i.status === "Pending")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const convertedLeads = leads.filter((l) => l.stage === "Converted").length;
  const conversionRate = Math.round((convertedLeads / Math.max(leads.length, 1)) * 100);

  const funnelSteps = [
    { label: "Total Inquiries", count: leads.length, color: "bg-blue-600", width: "100%" },
    { label: "Qualified Leads", count: leads.filter((l) => ["Qualified", "Consultation", "Converted"].includes(l.stage)).length, color: "bg-blue-600", width: "75%" },
    { label: "Consultation Booked", count: leads.filter((l) => ["Consultation", "Converted"].includes(l.stage)).length, color: "bg-indigo-600", width: "50%" },
    { label: "Retainer Converted", count: convertedLeads, color: "bg-emerald-600", width: "35%" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
              Executive Governance
            </span>
            <span className="text-xs text-slate-500 font-medium">Enterprise Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Global Operations & Financial Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Firm-wide revenue metrics, intake conversion funnels, and counsel utilization rates.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => onNavigate("/admin/payments")}
            className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Invoices & P&L
          </button>
          <button
            onClick={() => onNavigate("/admin/config")}
            className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors"
          >
            System Config
          </button>
        </div>
      </div>

      {/* Top 4 Financial & Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Collected Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pipeline Invoices</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{formatCurrency(pendingRevenue)}</div>
            <div className="text-xs text-slate-500 mt-1">Milestone disbursements pending</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Retainers</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{cases.length} Files</div>
            <div className="text-xs text-slate-500 mt-1">98.4% statutory approval rate</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lead Conversion</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{conversionRate}% Avg</div>
            <div className="text-xs text-slate-500 mt-1">{convertedLeads} converted retainers</div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel & Global Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Lead Conversion Funnel */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Intake-to-Retainer Funnel</h3>
              <p className="text-xs text-slate-500">Lead drop-off analysis across intake stages</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800">
              Q3 Benchmark
            </span>
          </div>

          <div className="space-y-4">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">{step.label}</span>
                  <span className="text-slate-900 font-bold">{step.count} Applicants</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${step.color} rounded-full transition-all duration-500`} style={{ width: step.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counsel Performance Leaderboard */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Senior Counsel Performance</h3>
              <p className="text-xs text-slate-500">Case volume & client satisfaction quotas</p>
            </div>
            <button
              onClick={() => onNavigate("/admin/employees")}
              className="text-xs font-bold text-blue-700 hover:text-blue-900"
            >
              All Staff
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <div key={emp.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-blue-400 font-bold flex items-center justify-center text-xs">
                    {emp.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{emp.name}</h4>
                    <p className="text-[11px] text-slate-400">{emp.branch}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-bold text-slate-900">{emp.activeCasesCount} Active Files</span>
                  <span className="text-[11px] text-emerald-600 block font-semibold">{emp.conversionRate}% Conversion</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
