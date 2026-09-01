import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NotificationDropdown } from "../shared/NotificationDropdown";
import { RoleSwitcherBadge } from "./RoleSwitcherBadge";
import { 
  Globe2, 
  Menu, 
  X, 
  Compass, 
  LogOut, 
  ChevronDown, 
  User, 
  Settings, 
  Layers, 
  ExternalLink 
} from "lucide-react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onToggleSidebar,
  sidebarOpen,
}) => {
  const { currentUser, currentRole, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isPublicPage = currentPath === "/" || currentPath === "/login";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Left Brand & Sidebar Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {!isPublicPage && (
              <button
                onClick={onToggleSidebar}
                className="p-2 -ml-1 sm:-ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors shrink-0"
                aria-label="Toggle Navigation Sidebar"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {/* Logo */}
            <div
              onClick={() => onNavigate("/")}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-1 truncate">
                  PROTON <span className="text-blue-600 font-semibold hidden xs:inline sm:inline">CONSULTANCY</span>
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase truncate">
                  Immigration & Mobility
                </span>
              </div>
            </div>
          </div>

          {/* Center / Role Switcher for preview & testing (Desktop & Tablet) */}
          <div className="hidden lg:flex items-center justify-center max-w-xl mx-2">
            <RoleSwitcherBadge onNavigate={onNavigate} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Public nav links if on public site */}
            {isPublicPage ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onNavigate("/")}
                  className={cn(
                    "hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors",
                    currentPath === "/" ? "text-blue-700 bg-blue-50" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    if (currentRole === "super_admin") onNavigate("/admin/system");
                    else onNavigate("/admin");
                  }}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Go to App ({currentRole.toUpperCase()})</span>
                  <span className="inline sm:hidden">App</span>
                </button>
                <button
                  onClick={() => onNavigate("/login")}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                >
                  Login
                </button>
              </div>
            ) : (
              <>
                {/* Notification Dropdown */}
                <NotificationDropdown onNavigate={onNavigate} />

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left focus:outline-hidden"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {currentUser?.name ? currentUser.name.charAt(0) : "U"}
                    </div>
                    <div className="hidden md:block text-left pr-1">
                      <p className="text-xs font-bold text-slate-800 leading-tight line-clamp-1 max-w-[120px]">
                        {currentUser?.name || "Dr. Alistair Sterling"}
                      </p>
                      <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                        {currentRole.replace("_", " ")}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                        <span className="mt-1 inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          Role: {currentRole.replace("_", " ")}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            onNavigate("/");
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                          View Public Site
                        </button>
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            onNavigate("/settings");
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          Settings & Account
                        </button>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            logout();
                            onNavigate("/login");
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile & Tablet role switcher bar */}
        <div className="lg:hidden py-2 border-t border-slate-100 w-full overflow-x-auto no-scrollbar flex justify-start sm:justify-center">
          <RoleSwitcherBadge onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
};
