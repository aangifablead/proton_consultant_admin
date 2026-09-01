import React, { useState } from "react";
import { DataTable } from "../../components/shared/DataTable";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { 
  Calendar, 
  List, 
  Search, 
  Filter,
  X,
  Clock,
  Video,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UserX,
  Users,
  AlertTriangle,
  CalendarCheck
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { Appointment } from "../../types";

// Mock Data
const MOCK_APPOINTMENTS = [
  { id: "APT-100", client: "Dr. Alistair Sterling", caseRef: "CAS-PR-4421", assignedTo: "Elena Vance", date: "2026-09-02", time: "10:00 AM", type: "Video", status: "Confirmed" },
  { id: "APT-101", client: "Priya Sharma", caseRef: "CAS-STU-8821", assignedTo: "Marcus Chen", date: "2026-09-02", time: "02:30 PM", type: "Office", status: "Pending" },
  { id: "APT-102", client: "Mateo Rodriguez", caseRef: "CAS-WP-9922", assignedTo: "Elena Vance", date: "2026-09-03", time: "11:00 AM", type: "Video", status: "Rescheduled" },
  { id: "APT-103", client: "Zhang Wei", caseRef: "CAS-EU-1102", assignedTo: "Liam Gallagher", date: "2026-09-04", time: "09:00 AM", type: "Office", status: "Confirmed" },
  { id: "APT-104", client: "Sarah Jenkins", caseRef: "CAS-FAM-3341", assignedTo: "Marcus Chen", date: "2026-09-01", time: "03:00 PM", type: "Video", status: "Completed" },
  { id: "APT-105", client: "Ahmed Hassan", caseRef: "CAS-INV-7711", assignedTo: "Liam Gallagher", date: "2026-09-01", time: "10:30 AM", type: "Office", status: "No-Show" },
];

export const AdminAppointmentsView: React.FC = () => {
  const { appointments, employees, cancelAppointment, reassignAppointment } = useAuth();
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  // Modals
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedCounsel, setSelectedCounsel] = useState("");

  const filteredApts = appointments.filter(a => 
    a.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: "ID", accessorKey: "id", sortable: true, className: "font-mono font-bold text-slate-500" },
    { header: "Client", accessorKey: "clientName", sortable: true, cell: (row: any) => (
      <div>
        <div className="font-bold text-slate-900">{row.clientName}</div>
      </div>
    )},
    { header: "Counsel", accessorKey: "staffName", sortable: true },
    { header: "Date & Time", accessorKey: "date", sortable: true, cell: (row: any) => (
      <div>
        <div className="font-medium text-slate-700">{row.date}</div>
        <div className="text-xs text-slate-500">{row.time}</div>
      </div>
    )},
    { header: "Type / Location", accessorKey: "type", cell: (row: any) => (
      <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
        {row.location.includes("Online") || row.location.includes("Zoom") ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
        {row.type}
      </span>
    )},
    { header: "Status", accessorKey: "status", sortable: true, cell: (row: any) => (
      <StatusBadge status={row.status} size="sm" />
    )},
  ];

  const [weekOffset, setWeekOffset] = useState(0);

  // Stats calculation (assuming today is 2026-09-01 based on mock data dates)
  const todayCount = appointments.filter(a => a.date === "2026-09-01").length;
  const next7Days = appointments.filter(a => a.date >= "2026-09-01" && a.date <= "2026-09-08").length;
  const noShowCount = appointments.filter(a => a.status === "Cancelled" || a.status === "Rescheduled").length;
  const noShowRate = appointments.length > 0 ? ((noShowCount / appointments.length) * 100).toFixed(1) : "0.0";
  const activeCounselCount = new Set(appointments.filter(a => a.date >= "2026-09-01" && a.date <= "2026-09-08").map(a => a.staffName)).size;

  // Calendar render helper (true time-grid for 5-day week)
  const renderCalendar = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    // Calculate dynamic dates based on weekOffset (Base: Sep 1, 2026)
    const baseDate = new Date(2026, 8, 1);
    baseDate.setDate(baseDate.getDate() + (weekOffset * 7));
    
    const dates: string[] = [];
    const dateStrs: string[] = [];
    for(let i=0; i<5; i++) {
       const d = new Date(baseDate);
       d.setDate(baseDate.getDate() + i);
       dates.push(`${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`);
       dateStrs.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    }

    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM to 5 PM
    
    // 1 hour = 60px height
    const HOUR_HEIGHT = 60;
    
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs flex flex-col">
        {/* Calendar Header */}
        <div className="flex items-center justify-between py-2 px-4 border-b border-slate-200/80 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setWeekOffset(prev => prev - 1)}
              className="p-1 hover:bg-slate-200 rounded transition-colors active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <span className="text-sm font-bold text-slate-700 px-1">
              {dates[0].split(" ")[0]} {dates[0].split(" ")[1]} - {dates[4].split(" ")[1]}, {baseDate.getFullYear()}
            </span>
            <button 
              onClick={() => setWeekOffset(prev => prev + 1)}
              className="p-1 hover:bg-slate-200 rounded transition-colors active:scale-95"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="text-xs font-medium text-slate-500">Toronto Central / GMT-4</div>
        </div>
        
        {/* Days Header */}
        <div className="flex border-b border-slate-200/80 bg-slate-50 shrink-0">
          <div className="w-16 border-r border-slate-200/80 shrink-0 bg-slate-100/50"></div>
          <div className="flex-1 grid grid-cols-5 divide-x divide-slate-200/80">
            {days.map((day, idx) => (
              <div key={day} className="p-3 text-center bg-white">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{day}</div>
                <div className="text-lg font-extrabold text-slate-800">{dates[idx].split(" ")[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Grid Body */}
        <div className="relative">
          <div className="flex min-w-full">
            {/* Time Axis */}
            <div className="w-16 shrink-0 border-r border-slate-200/80 bg-slate-50/50">
              {hours.map((hour) => (
                <div 
                  key={hour} 
                  className="w-full flex justify-center items-center border-b border-slate-200/50 last:border-0" 
                  style={{ height: `${HOUR_HEIGHT}px` }}
                >
                  <span className="text-[10px] font-bold text-slate-400">
                    {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                  </span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1 grid grid-cols-5 divide-x divide-slate-200/80 relative">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 pointer-events-none">
                {hours.map((_, idx) => (
                  <div key={idx} className="border-t border-slate-100/80 w-full" style={{ height: `${HOUR_HEIGHT}px` }}></div>
                ))}
              </div>

              {filteredApts.length === 0 && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px]">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">No appointments scheduled</h3>
                  <p className="text-xs text-slate-500 mt-1">Adjust filters or select a different week.</p>
                </div>
              )}

              {/* Day Columns */}
              {days.map((_, dayIdx) => {
                const dateStr = dateStrs[dayIdx];
                const dayApts = filteredApts.filter(a => a.date === dateStr);
                
                return (
                  <div key={dayIdx} className="relative w-full h-[540px]">
                    {dayApts.map(apt => {
                      // Calculate offset
                      const [time, period] = apt.time.split(" ");
                      let [h, m] = time.split(":").map(Number);
                      if (period === "PM" && h !== 12) h += 12;
                      if (period === "AM" && h === 12) h = 0;
                      
                      const minutesFromStart = ((h - 9) * 60) + m;
                      const topPx = (minutesFromStart / 60) * HOUR_HEIGHT;
                      
                      return (
                        <div 
                          key={apt.id} 
                          onClick={() => setSelectedApt(apt)}
                          style={{ top: `${topPx}px`, height: '58px' }}
                          className={cn(
                            "absolute left-1 right-1 p-2 rounded-lg border cursor-pointer transition-colors shadow-sm overflow-hidden z-10 flex flex-col justify-center",
                            apt.status === "Scheduled" ? "bg-emerald-50/90 border-emerald-200 hover:bg-emerald-100" :
                            apt.status === "Rescheduled" ? "bg-blue-50/90 border-blue-200 hover:bg-blue-100" :
                            apt.status === "Completed" ? "bg-slate-50 border-slate-200 hover:bg-slate-100 opacity-70" :
                            "bg-red-50/90 border-red-200 hover:bg-red-100" // Cancelled
                          )}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="font-bold text-[11px] text-slate-900 truncate leading-tight">{apt.clientName}</div>
                            <div className="font-bold text-[10px] text-slate-500 shrink-0">{apt.time}</div>
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                            <Users className="w-3 h-3" /> {apt.staffName.split(" ")[0]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col h-full relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Appointment Oversight</h1>
          <p className="text-xs text-slate-500 mt-0.5">Firm-wide scheduling, conflicts, and consultation coverage.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5",
              viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <List className="w-3.5 h-3.5" /> List
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5",
              viewMode === "calendar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Calendar className="w-3.5 h-3.5" /> Calendar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{todayCount}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Consultations scheduled</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Week</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{next7Days}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              Active schedule
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">No-Show Rate</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <UserX className="w-3.5 h-3.5 text-red-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{noShowRate}%</div>
            <div className="text-xs font-semibold text-red-600 mt-1">
              {Number(noShowRate) > 3 ? "Warning: Above 3% SLA" : "Within acceptable range"}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Coverage</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-purple-600" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{activeCounselCount}/{employees.length}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Counsel members active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients or counsel..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex-1 overflow-auto no-scrollbar">
          {viewMode === "calendar" ? renderCalendar() : (
            <DataTable 
              data={filteredApts}
              columns={columns}
              onRowClick={(apt) => setSelectedApt(apt)}
            />
          )}
        </div>
      </div>

      {/* Side Drawer for Appointment Details */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedApt(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-200 flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Appointment Details</h2>
              <button onClick={() => setSelectedApt(null)} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Client Information</div>
                  <div className="text-lg font-black text-slate-900">{selectedApt.clientName}</div>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-800 mt-1">View Full Case Record &rarr;</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</div>
                    <div className="text-sm font-bold text-slate-900">{selectedApt.date}</div>
                  </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</div>
                  <div className="text-sm font-bold text-slate-900">{selectedApt.time}</div>
                </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      {selectedApt.location.includes("Online") || selectedApt.location.includes("Zoom") ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                      {selectedApt.location}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                    <StatusBadge status={selectedApt.status} size="sm" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assigned Counsel</div>
                  <div className="flex items-center gap-3 p-3 border border-slate-200/80 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      {selectedApt.staffName.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{selectedApt.staffName}</div>
                      <div className="text-xs text-slate-500">Immigration Counsel</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button 
                  onClick={() => setIsCancelModalOpen(true)}
                  className="flex-1 py-2.5 text-sm font-bold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Cancel Appt
                </button>
                <button 
                  onClick={() => setIsReassignModalOpen(true)}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Reassign
                </button>
              </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {isCancelModalOpen && selectedApt && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => setIsCancelModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900">Cancel Appointment</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">
                Are you sure you want to cancel the appointment with <strong>{selectedApt.clientName}</strong>? This will notify the client.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  cancelAppointment(selectedApt.id);
                  setIsCancelModalOpen(false);
                  setSelectedApt(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isReassignModalOpen && selectedApt && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => { setIsReassignModalOpen(false); setSelectedCounsel(""); }}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">Reassign Counsel</h3>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              <p className="text-sm text-slate-600 mb-2">
                Select a new counsel for <strong>{selectedApt.clientName}</strong>'s appointment:
              </p>
              {employees.map(emp => (
                <div 
                  key={emp.id} 
                  onClick={() => setSelectedCounsel(emp.name)}
                  className={cn(
                    "p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors",
                    selectedCounsel === emp.name ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {emp.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{emp.name}</div>
                      <div className="text-[10px] text-slate-500">{emp.role}</div>
                    </div>
                  </div>
                  {selectedCounsel === emp.name && <CalendarCheck className="w-4 h-4 text-blue-600" />}
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => {
                  setIsReassignModalOpen(false);
                  setSelectedCounsel("");
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!selectedCounsel}
                onClick={() => {
                  reassignAppointment(selectedApt.id, selectedCounsel);
                  setIsReassignModalOpen(false);
                  setSelectedCounsel("");
                  setSelectedApt(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
