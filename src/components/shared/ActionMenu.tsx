import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  danger?: boolean;
}

export const ActionMenu = ({ items }: { items: ActionItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-xl shadow-lg bg-white border border-slate-200/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  setIsOpen(false);
                  item.onClick(e);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors",
                  item.danger 
                    ? "text-red-600 hover:bg-red-50" 
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
