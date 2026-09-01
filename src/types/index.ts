export type UserRole = "client" | "employee" | "manager" | "admin" | "super_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  branch?: string;
  assignedAdvisorId?: string;
  assignedAdvisorName?: string;
  caseId?: string;
  title?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  twoFactorEnabled?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingNotifications?: boolean;
  sessionTimeoutMinutes?: number;
}

export type VisaCategory = "Student Visa" | "Permanent Residency (PR)" | "Work Permit" | "Visitor / Tourist" | "Business & Investor" | "Family Sponsorship";

export type DestinationCountry = "Canada" | "Australia" | "United Kingdom" | "United States" | "Germany" | "New Zealand";

export type CaseStage = 
  | "Profile Assessment"
  | "Intake & Document Prep"
  | "Authority Lodgement"
  | "Biometrics & Medicals"
  | "Security Screening"
  | "Decision & Visa Granted"
  | "Post-Landing Assistance";

export type DocumentStatus = "Pending Upload" | "Submitted" | "Under Review" | "Approved" | "Rejected" | "Re-upload Requested";

export interface DocumentItem {
  id: string;
  clientId: string;
  clientName: string;
  caseId: string;
  name: string;
  category: "Identity" | "Financial" | "Academic" | "Employment" | "Medical" | "Other";
  required: boolean;
  status: DocumentStatus;
  uploadedAt?: string;
  fileSize?: string;
  fileType?: string;
  rejectionReason?: string;
  reviewNotes?: string;
  verifiedBy?: string;
}

export interface CaseTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  actor: string;
  category: "milestone" | "document" | "payment" | "communication" | "government";
}

export interface Case {
  id: string;
  caseNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  visaType: VisaCategory;
  destination: DestinationCountry;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  stage: CaseStage;
  progressPercent: number;
  startDate: string;
  targetLodgementDate: string;
  lastUpdated: string;
  documentsCount: { total: number; approved: number; pending: number };
  financialSummary: { totalFee: number; paidAmount: number; pendingAmount: number };
  timeline: CaseTimelineEvent[];
}

export type LeadStage = "New" | "Contacted" | "Qualified" | "Consultation" | "Converted" | "Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  visaInterest: VisaCategory;
  destination: DestinationCountry;
  source: "Website Form" | "Referral" | "Walk-in" | "Meta Ads" | "Education Fair";
  stage: LeadStage;
  assignedTo: string;
  createdAt: string;
  notes: string[];
  qualificationScore: number; // 0 - 100
  lastActivity: string;
}

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  title: string;
  type: "Consultation" | "Document Review" | "Mock Visa Interview" | "Pre-departure Briefing";
  date: string;
  time: string;
  location: "Zoom Online" | "Headquarters (Room 304)" | "Branch Office" | "Phone Call";
  meetingLink?: string;
  status: AppointmentStatus;
  notes?: string;
}

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  caseId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  paidDate?: string;
  paymentMethod?: "Credit Card" | "Bank Wire" | "Stripe" | "Cash Deposit";
  receiptUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
  };
}

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "Todo" | "In Progress" | "Review" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  relatedCaseId?: string;
  relatedClientName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export type CaseItem = Case;
export type TaskItem = Task;
export type Employee = EmployeeRecord;

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch: string;
  department: string;
  activeCasesCount: number;
  leadsAssigned: number;
  conversionRate: number; // e.g. 78%
  avatar: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  targetRoute?: string;
}
