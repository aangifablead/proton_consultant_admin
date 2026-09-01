"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  UserRole, 
  Case, 
  Lead, 
  DocumentItem, 
  Appointment, 
  Invoice, 
  Message, 
  Task, 
  EmployeeRecord, 
  AuditLog, 
  SystemNotification 
} from "../types";
import { 
  MOCK_USERS, 
  MOCK_ALL_CASES, 
  MOCK_ALL_REVIEW_DOCUMENTS, 
  MOCK_LEADS, 
  MOCK_APPOINTMENTS, 
  MOCK_INVOICES, 
  MOCK_MESSAGES, 
  MOCK_TASKS, 
  MOCK_EMPLOYEES, 
  MOCK_AUDIT_LOGS, 
  MOCK_NOTIFICATIONS 
} from "../data/mockData";

export interface ToastNotification {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
}

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  
  // Data state
  cases: Case[];
  leads: Lead[];
  documents: DocumentItem[];
  appointments: Appointment[];
  invoices: Invoice[];
  messages: Message[];
  tasks: Task[];
  employees: EmployeeRecord[];
  auditLogs: AuditLog[];
  notifications: SystemNotification[];
  toasts: ToastNotification[];

  // Actions
  addToast: (toast: Omit<ToastNotification, "id">) => void;
  removeToast: (id: string) => void;
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "qualificationScore" | "lastActivity">) => void;
  updateLeadStage: (leadId: string, newStage: Lead["stage"]) => void;
  convertLeadToClient: (leadId: string) => void;
  updateDocumentStatus: (docId: string, status: DocumentItem["status"], notes?: string) => void;
  uploadDocument: (docData: { name: string; category: DocumentItem["category"]; fileSize: string }) => void;
  bookAppointment: (appointment: Omit<Appointment, "id" | "status">) => void;
  payInvoice: (invoiceId: string, method?: Invoice["paymentMethod"]) => void;
  sendMessage: (text: string) => void;
  createTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  addEmployee: (employee: Omit<EmployeeRecord, "id">) => void;
  updateCaseStage: (caseId: string, newStage: Case["stage"], percent: number) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS.admin);
  
  const [cases, setCases] = useState<Case[]>(MOCK_ALL_CASES);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_ALL_REVIEW_DOCUMENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [employees, setEmployees] = useState<EmployeeRecord[]>(MOCK_EMPLOYEES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(MOCK_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Update user when role changes
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(MOCK_USERS[role] || null);
    addToast({
      title: `Switched Role to ${role.replace("_", " ").toUpperCase()}`,
      description: `Now viewing workspace as ${MOCK_USERS[role]?.name || role}`,
      type: "info",
    });
  };

  const loginAs = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(MOCK_USERS[role] || null);
    addToast({
      title: "Authenticated Successfully",
      description: `Welcome back, ${MOCK_USERS[role]?.name}`,
      type: "success",
    });
  };

  const logout = () => {
    setCurrentUser(null);
    addToast({
      title: "Logged Out",
      description: "You have securely signed out of Proton Consultancy.",
      type: "info",
    });
  };

  const addToast = (toast: Omit<ToastNotification, "id">) => {
    const id = "tst_" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (action: string, entity: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: "aud_" + Date.now(),
      userId: currentUser?.id || "guest",
      userName: currentUser?.name || "Visitor",
      userRole: currentRole,
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      ipAddress: "192.168.1.105",
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addLead = (leadData: Omit<Lead, "id" | "createdAt" | "qualificationScore" | "lastActivity">) => {
    const newLead: Lead = {
      ...leadData,
      id: "lead_" + Date.now(),
      createdAt: new Date().toISOString(),
      qualificationScore: Math.floor(Math.random() * 20) + 80,
      lastActivity: "Just now",
    };
    setLeads((prev) => [newLead, ...prev]);
    logAudit("Lead Created", "Lead", newLead.id, `New prospective client inquiry from ${newLead.name} (${newLead.visaInterest} - ${newLead.destination})`);
    addToast({
      title: "Lead Captured Successfully",
      description: `Our advisors will contact ${newLead.name} within 24 hours.`,
      type: "success",
    });
  };

  const updateLeadStage = (leadId: string, newStage: Lead["stage"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, stage: newStage, lastActivity: "Just now" } : lead))
    );
    const lead = leads.find((l) => l.id === leadId);
    logAudit("Lead Stage Updated", "Lead", leadId, `Updated stage of ${lead?.name || leadId} to ${newStage}`);
    addToast({
      title: "Lead Stage Updated",
      description: `Lead moved to "${newStage}" stage.`,
      type: "info",
    });
  };

  const convertLeadToClient = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const newCaseId = `CASE-${lead.destination.substring(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: Case = {
      id: newCaseId,
      caseNumber: `PTN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: "usr_client_" + Date.now().toString().slice(-4),
      clientName: lead.name,
      clientEmail: lead.email,
      clientPhone: lead.phone,
      visaType: lead.visaInterest,
      destination: lead.destination,
      assignedEmployeeId: currentUser?.id || "emp_201",
      assignedEmployeeName: currentUser?.name || "Elena Vance",
      stage: "Profile Assessment",
      progressPercent: 15,
      startDate: new Date().toISOString().split("T")[0],
      targetLodgementDate: new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      documentsCount: { total: 6, approved: 0, pending: 6 },
      financialSummary: { totalFee: 3500, paidAmount: 0, pendingAmount: 3500 },
      timeline: [
        {
          id: "tl_" + Date.now(),
          date: new Date().toISOString().split("T")[0],
          title: "Lead Converted to Active Client File",
          description: `Retained for ${lead.visaInterest} to ${lead.destination}.`,
          status: "completed",
          actor: currentUser?.name || "Staff",
          category: "milestone",
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: "Converted", lastActivity: "Converted to Client" } : l))
    );

    logAudit("Lead Converted", "Case", newCaseId, `Successfully converted lead ${lead.name} into client case ${newCase.caseNumber}`);
    addToast({
      title: "Converted to Active Client",
      description: `New Case File #${newCase.caseNumber} generated for ${lead.name}.`,
      type: "success",
    });
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem["status"], notes?: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status,
              reviewNotes: notes || doc.reviewNotes,
              verifiedBy: currentUser?.name || "Review Officer",
            }
          : doc
      )
    );
    const doc = documents.find((d) => d.id === docId);
    logAudit("Document Status Updated", "Document", docId, `Status of '${doc?.name}' updated to '${status}'.`);
    addToast({
      title: `Document ${status}`,
      description: `'${doc?.name || "Document"}' is now marked as ${status}.`,
      type: status === "Approved" ? "success" : status === "Rejected" ? "error" : "warning",
    });
  };

  const uploadDocument = (docData: { name: string; category: DocumentItem["category"]; fileSize: string }) => {
    const newDoc: DocumentItem = {
      id: "doc_" + Date.now(),
      clientId: currentUser?.id || "usr_client_101",
      clientName: currentUser?.name || "Dr. Alistair Sterling",
      caseId: currentUser?.caseId || "CASE-CA-2026-8891",
      name: docData.name,
      category: docData.category,
      required: true,
      status: "Under Review",
      uploadedAt: new Date().toISOString().split("T")[0],
      fileSize: docData.fileSize || "2.4 MB",
      fileType: "PDF",
      reviewNotes: "Uploaded by client, queued for attorney verification.",
    };

    setDocuments((prev) => [newDoc, ...prev]);
    logAudit("Document Uploaded", "Document", newDoc.id, `Client uploaded document '${newDoc.name}' (${newDoc.fileSize})`);
    addToast({
      title: "Document Uploaded",
      description: `'${newDoc.name}' uploaded and sent to legal review.`,
      type: "success",
    });
  };

  const bookAppointment = (appointmentData: Omit<Appointment, "id" | "status">) => {
    const newApt: Appointment = {
      ...appointmentData,
      id: "apt_" + Date.now(),
      status: "Scheduled",
    };
    setAppointments((prev) => [newApt, ...prev]);
    logAudit("Appointment Scheduled", "Appointment", newApt.id, `Session booked for ${newApt.clientName} with ${newApt.staffName} on ${newApt.date}`);
    addToast({
      title: "Appointment Confirmed",
      description: `Scheduled for ${newApt.date} at ${newApt.time} (${newApt.location}).`,
      type: "success",
    });
  };

  const payInvoice = (invoiceId: string, method: Invoice["paymentMethod"] = "Credit Card") => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "Paid",
              paidDate: new Date().toISOString().split("T")[0],
              paymentMethod: method,
              receiptUrl: `#receipt-${invoiceId}`,
            }
          : inv
      )
    );
    const inv = invoices.find((i) => i.id === invoiceId);
    logAudit("Invoice Payment Settled", "Invoice", invoiceId, `Payment of $${inv?.amount.toLocaleString()} processed via ${method}`);
    addToast({
      title: "Payment Successful",
      description: `Invoice ${inv?.invoiceNumber || invoiceId} has been settled. Receipt issued.`,
      type: "success",
    });
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: "msg_" + Date.now(),
      senderId: currentUser?.id || "usr_client_101",
      senderName: currentUser?.name || "Dr. Alistair Sterling",
      senderRole: currentRole,
      text,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const createTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: "tsk_" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prev) => [newTask, ...prev]);
    logAudit("Task Created", "Task", newTask.id, `Created task: '${newTask.title}' assigned to ${newTask.assignedToName}`);
    addToast({
      title: "Task Assigned",
      description: `'${newTask.title}' added to sprint board.`,
      type: "info",
    });
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
    addToast({
      title: "Task Updated",
      description: `Task status changed to ${status}.`,
      type: "info",
    });
  };

  const addEmployee = (empData: Omit<EmployeeRecord, "id">) => {
    const newEmp: EmployeeRecord = {
      ...empData,
      id: "emp_" + Date.now(),
    };
    setEmployees((prev) => [...prev, newEmp]);
    logAudit("Employee Added", "Employee", newEmp.id, `Created new team record for ${newEmp.name} (${newEmp.role} - ${newEmp.branch})`);
    addToast({
      title: "Staff Member Added",
      description: `${newEmp.name} has been enrolled into ${newEmp.branch}.`,
      type: "success",
    });
  };

  const updateCaseStage = (caseId: string, newStage: Case["stage"], percent: number) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              stage: newStage,
              progressPercent: percent,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : c
      )
    );
    logAudit("Case Stage Escalation", "Case", caseId, `Escalated case stage to '${newStage}' (${percent}%)`);
    addToast({
      title: "Case Stage Advanced",
      description: `Case moved to '${newStage}'.`,
      type: "success",
    });
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
    logAudit("Profile Updated", "User", currentUser?.id || "user", `User settings & account profile details modified`);
    addToast({
      title: "Account Settings Saved",
      description: "Your profile information and preferences have been successfully updated.",
      type: "success",
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        loginAs,
        logout,
        cases,
        leads,
        documents,
        appointments,
        invoices,
        messages,
        tasks,
        employees,
        auditLogs,
        notifications,
        toasts,
        addToast,
        removeToast,
        addLead,
        updateLeadStage,
        convertLeadToClient,
        updateDocumentStatus,
        uploadDocument,
        bookAppointment,
        payInvoice,
        sendMessage,
        createTask,
        updateTaskStatus,
        addEmployee,
        updateCaseStage,
        updateUserProfile,
        markNotificationAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
