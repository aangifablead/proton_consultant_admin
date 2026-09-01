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
  Users, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "../../lib/utils";

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const onNavigate = (path: string) => router.push(path);
  const { loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("client");
  const [email, setEmail] = useState("alistair.sterling@example.com");
  const [password, setPassword] = useState("••••••••••••");

  const rolePresets: { role: UserRole; name: string; title: string; email: string; path: string; icon: React.ReactNode }[] = [
    {
      role: "client",
      name: "Dr. Alistair Sterling",
      title: "Active Applicant (Canada PR)",
      email: "alistair.sterling@example.com",
      path: "/portal",
      icon: <UserCheck />,
    },
    {
      role: "employee",
      name: "Elena Vance",
      title: "Senior Immigration Attorney",
      email: "elena.vance@protonconsultancy.com",
      path: "/staff",
      icon: <Briefcase />,
    },
    {
      role: "manager",
      name: "Marcus Thorne",
      title: "Operations & Case Review Manager",
      email: "marcus.thorne@protonconsultancy.com",
      path: "/staff/team",
      icon: <Users />,
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
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col md:flex-row font-sans w-full">
      {/* Left Panel: Branding & Role Selection */}
      <div className="w-full md:w-5/12 bg-slate-900 p-6 lg:p-10 flex flex-col justify-between relative overflow-hidden text-white border-r border-slate-800">
        {/* Decorative dynamic gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/10">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90">Proton</span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight leading-tight">
              Unified Access <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Gateway</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Select an account profile below to test distinct role-specific workspaces and permission matrices.
            </p>

            <div className="space-y-2.5">
              {rolePresets.map((preset) => {
                const isSelected = selectedRole === preset.role;
                return (
                  <button
                    key={preset.role}
                    onClick={() => handlePresetSelect(preset)}
                    className={cn(
                      "w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group",
                      isSelected 
                        ? "bg-slate-800/80 border-blue-500/50 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/20" 
                        : "bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600/50"
                    )}
                  >
                    {/* Hover glow effect */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      isSelected && "opacity-100"
                    )} />

                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 relative z-10",
                      isSelected ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-slate-800 text-slate-400"
                    )}>
                      {React.cloneElement(preset.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                    </div>
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-200">{preset.name}</p>
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                          isSelected ? "bg-blue-500/20 text-blue-300" : "bg-slate-800 text-slate-400"
                        )}>
                          {preset.role.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{preset.title}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 relative z-10 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="mt-8 text-xs text-slate-500/70 font-medium">
            &copy; {new Date().getFullYear()} Proton Consultancy. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full md:w-7/12 bg-slate-50/50 flex items-center justify-center relative p-6">
        {/* Decorative background blur for right side */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 mb-5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Encrypted Session
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-500 mt-1.5 text-xs font-medium">
              Authenticating as <span className="font-bold text-blue-600 uppercase tracking-wider">{selectedRole.replace("_", " ")}</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[15px] text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100 transition-colors">
                  Demo Mode Active
                </span>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[15px] text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 text-[14px] font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <p className="text-center text-[11px] text-slate-400 mt-5 font-medium">
              By signing in, you agree to our <a href="#" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">Terms</a> and <a href="#" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

