"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "./ToastContainer";
import { useAuth } from "../../context/AuthContext";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const currentPath = usePathname() || "/";
  const router = useRouter();
  const onNavigate = (path: string) => router.push(path);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isPublicPage = currentPath === "/" || currentPath === "/login";

  // Build breadcrumbs from path
  const pathParts = currentPath.split("/").filter(Boolean);

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 w-full max-w-full overflow-hidden">
      {/* Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        sidebarOpen={mobileSidebarOpen}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Workspace Area */}
      {isPublicPage ? (
        <main className="flex-1 flex flex-col w-full max-w-full overflow-y-auto">{children}</main>
      ) : (
        <div className="flex-1 flex w-full max-w-full overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block shrink-0 h-full">
            <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
                <Sidebar
                  currentPath={currentPath}
                  onNavigate={onNavigate}
                  onCloseMobile={() => setMobileSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main content body */}
          <main className="flex-1 min-w-0 flex flex-col overflow-y-auto bg-slate-50/50">
            {/* Breadcrumb & quick status bar */}
            <div className="w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-white border-b border-slate-200/80 flex items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
                <button
                  onClick={() => onNavigate("/")}
                  className="hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                {pathParts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span
                      className={cn(
                        "capitalize font-medium",
                        idx === pathParts.length - 1 ? "text-slate-900 font-bold" : "hover:text-blue-700 cursor-pointer"
                      )}
                      onClick={() => {
                        if (idx < pathParts.length - 1) {
                          onNavigate("/" + pathParts.slice(0, idx + 1).join("/"));
                        }
                      }}
                    >
                      {part.replace("-", " ")}
                    </span>
                  </React.Fragment>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Live Encrypted Session</span>
              </div>
            </div>

            {/* Page View Children */}
            <div className="flex-1 p-3 sm:p-5 lg:p-8 w-full max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      )}

      {/* Global Toast Notifications container */}
      <ToastContainer />
    </div>
  );
};
