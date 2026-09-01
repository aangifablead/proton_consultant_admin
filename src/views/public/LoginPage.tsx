"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { UserRole } from "../../types";
import { 
  Compass, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  Crown, 
  Users, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "../../lib/utils";

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const onNavigate = (path: string) => router.push(path);
  const { loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("samantha.reed@protonconsultancy.com");
  const [password, setPassword] = useState("••••••••••••");

  const rolePresets: { role: UserRole; name: string; title: string; email: string; path: string; icon: React.ReactNode }[] = [
    {
      role: "admin",
      name: "Samantha Reed",
      title: "System & Compliance Administrator",
      email: "samantha.reed@protonconsultancy.com",
      path: "/admin",
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    },
    {
      role: "super_admin",
      name: "David Sterling, Esq.",
      title: "Senior Partner & Global Super Admin",
      email: "david.sterling@protonconsultancy.com",
      path: "/admin/system",
      icon: <Crown className="w-5 h-5 text-purple-600" />,
    },
  ];

  const handlePresetSelect = (preset: typeof rolePresets[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
    const target = rolePresets.find((r) => r.role === selectedRole)?.path || "/portal";
    onNavigate(target);
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Role Quick-Select Grid for testing */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-400">
            <Compass className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white tracking-tight">Proton Unified Access Portal</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Role-based authentication gateway. Select an account profile below to test distinct role-specific workspaces and permission matrices.
          </p>

          <div className="space-y-2.5 pt-2">
            {rolePresets.map((preset) => {
              const isSelected = selectedRole === preset.role;
              return (
                <div
                  key={preset.role}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                    isSelected
                      ? "bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                      : "bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      {preset.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{preset.name}</span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                          {preset.role.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{preset.title}</p>
                    </div>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Credential Form */}
        <div className="md:col-span-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                Encrypted Session
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Sign In to Workspace</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authenticating as: <strong className="text-slate-800 uppercase">{selectedRole.replace("_", " ")}</strong>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate / Client Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password / Token</label>
                  <span className="text-[11px] text-blue-700 font-semibold cursor-pointer hover:underline">
                    Demo Mode (Any PW)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Role will be auto-detected upon sign in. You can also switch roles anytime via the top bar banner.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
