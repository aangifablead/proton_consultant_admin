import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  User as UserIcon, 
  Shield, 
  Bell, 
  Globe, 
  KeyRound, 
  Smartphone, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Laptop, 
  Building2, 
  Mail, 
  Phone, 
  Save, 
  Lock, 
  QrCode, 
  X, 
  Download, 
  FileText, 
  Calendar, 
  Video, 
  Sparkles,
  Eye,
  EyeOff,
  Briefcase
} from "lucide-react";
import { cn } from "../../lib/utils";

type SettingsTab = "profile" | "security" | "notifications" | "preferences" | "roleSpecific";

export const SettingsAccountView: React.FC = () => {
  const { currentUser, currentRole, updateUserProfile, addToast } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || "Dr. Alistair Sterling");
  const [email, setEmail] = useState(currentUser?.email || "sterling.applicant@gmail.com");
  const [phone, setPhone] = useState(currentUser?.phone || "+1 (416) 890-4421");
  const [whatsapp, setWhatsapp] = useState("+1 (416) 890-4421");
  const [branch, setBranch] = useState(currentUser?.branch || "Toronto Central (HQ)");
  const [title, setTitle] = useState(currentUser?.title || (
    currentRole === "admin" 
      ? "Practice Director & Compliance Lead" 
      : "Managing Partner & Super Administrator"
  ));
  const [bio, setBio] = useState(
    currentUser?.bio || 
    (currentRole === "admin"
      ? "Practice Director & Compliance Lead."
      : "Regulated immigration consultant specializing in Canadian Express Entry, Provincial Nominees, and Australian Skilled Migration.")
  );
  const [avatarBg, setAvatarBg] = useState("bg-blue-600");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentUser?.twoFactorEnabled ?? true);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState<number>(currentUser?.sessionTimeoutMinutes || 30);

  // Active Sessions
  const [sessions, setSessions] = useState([
    {
      id: "sess_1",
      device: "MacBook Pro (Chrome 128.0) - Current Session",
      location: "Toronto, ON, Canada",
      ip: "192.168.1.105",
      isCurrent: true,
      lastActive: "Active now",
    },
    {
      id: "sess_2",
      device: "iPhone 15 Pro (Safari Mobile iOS 18)",
      location: "Toronto, ON, Canada",
      ip: "174.92.118.24",
      isCurrent: false,
      lastActive: "3 hours ago",
    },
    {
      id: "sess_3",
      device: "Office Desktop (Windows 11 / Edge)",
      location: "Melbourne CBD Office, Australia",
      ip: "203.144.68.91",
      isCurrent: false,
      lastActive: "Yesterday at 18:45",
    },
  ]);
  const [sessionToDelete, setSessionToDelete] = useState<string | "ALL" | null>(null);

  // Notification Preferences
  const [emailCaseUpdates, setEmailCaseUpdates] = useState(true);
  const [emailDocApprovals, setEmailDocApprovals] = useState(true);
  const [emailMessages, setEmailMessages] = useState(true);
  const [emailInvoices, setEmailInvoices] = useState(true);
  const [smsUrgentDeadlines, setSmsUrgentDeadlines] = useState(true);
  const [smsBiometrics, setSmsBiometrics] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState<"instant" | "daily" | "weekly">("instant");

  // Regional & Preferences
  const [currency, setCurrency] = useState(currentUser?.currency || "CAD");
  const [timezone, setTimezone] = useState(currentUser?.timezone || "America/Toronto (EST - UTC-5)");
  const [language, setLanguage] = useState(currentUser?.language || "English (North American Standard)");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");

  // Role-Specific State
  // Client:
  const [emergencyContactName, setEmergencyContactName] = useState("Eleanor Sterling (Spouse)");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("+1 (416) 890-4422");
  const [passportExpiryNotice, setPassportExpiryNotice] = useState("2031-11-20");
  
  // Staff / Lawyer / Manager:
  const [consultationHours, setConsultationHours] = useState("Monday – Friday: 09:00 AM – 05:30 PM EST");
  const [meetingUrl, setMeetingUrl] = useState("https://meet.protonconsultancy.com/room/counsel-office-vance");
  const [outOfOffice, setOutOfOffice] = useState(false);
  const [autoReplyText, setAutoReplyText] = useState("Thank you for reaching out. I am currently reviewing active lodgements and will respond to client inquiries within 1 business day.");

  // Save changes handler
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      branch,
      title,
      bio,
      timezone,
      language,
      currency,
      twoFactorEnabled,
      sessionTimeoutMinutes: sessionTimeout,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      addToast({
        title: "Current Password Required",
        description: "Please enter your existing password to verify this update.",
        type: "error",
      });
      return;
    }
    if (newPassword.length < 8) {
      addToast({
        title: "Password Too Short",
        description: "Your new password must be at least 8 characters with numbers and symbols.",
        type: "error",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({
        title: "Passwords Do Not Match",
        description: "Please make sure your new password and confirm password match.",
        type: "error",
      });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    addToast({
      title: "Password Changed Successfully",
      description: "Your security credentials have been updated and encrypted.",
      type: "success",
    });
  };

  const handleRevokeSessions = () => {
    setSessionToDelete("ALL");
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setIs2FAModalOpen(true);
    } else {
      setTwoFactorEnabled(false);
      updateUserProfile({ twoFactorEnabled: false });
      addToast({
        title: "Two-Factor Authentication Disabled",
        description: "2FA protection has been deactivated for your account.",
        type: "warning",
      });
    }
  };

  const handleVerify2FASetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length < 6) {
      addToast({
        title: "Invalid Verification Code",
        description: "Please enter the 6-digit code from your authenticator app.",
        type: "error",
      });
      return;
    }
    setTwoFactorEnabled(true);
    updateUserProfile({ twoFactorEnabled: true });
    setIs2FAModalOpen(false);
    setTotpCode("");
    addToast({
      title: "2FA Activated & Enforced",
      description: "Your account is now protected by hardware-backed TOTP authentication.",
      type: "success",
    });
  };

  const handleExportDataDump = () => {
    addToast({
      title: "Audit & Account Archive Generated",
      description: "Your complete GDPR / PIPEDA compliance JSON export has started downloading.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className={cn("w-14 h-14 rounded-2xl text-white flex items-center justify-center text-xl font-bold shadow-xs shrink-0", avatarBg)}>
            {name ? name.charAt(0) : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {name || "Settings & Account"}
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {currentRole.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {email} • {branch}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveProfile}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto no-scrollbar whitespace-nowrap">
        {[
          { id: "profile", label: "Personal Profile", icon: UserIcon },
          { id: "security", label: "Security & 2FA", icon: Shield },
          { id: "notifications", label: "Alerts & Notifications", icon: Bell },
          { id: "preferences", label: "Regional & Formats", icon: Globe },
          {
            id: "roleSpecific",
            label: currentRole === "super_admin" ? "Data Governance" : "Practice & Office",
            icon: currentRole === "super_admin" ? Lock : Briefcase,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all shrink-0",
                isActive
                  ? "border-blue-600 text-blue-800 bg-white rounded-t-lg shadow-2xs font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-blue-600" : "text-slate-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Profile */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Personal & Counsel Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your contact credentials, professional title, and primary office location.
            </p>
          </div>

          {/* Avatar Color Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className={cn("w-12 h-12 rounded-xl text-white flex items-center justify-center text-lg font-bold shadow-xs", avatarBg)}>
                {name ? name.charAt(0) : "U"}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Avatar Badge Tone</p>
                <p className="text-[11px] text-slate-500">Choose your initials badge color theme</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { bg: "bg-blue-600", name: "Blue" },
                { bg: "bg-slate-900", name: "Navy Slate" },
                { bg: "bg-indigo-700", name: "Indigo" },
                { bg: "bg-purple-800", name: "Purple" },
                { bg: "bg-emerald-700", name: "Emerald" },
              ].map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setAvatarBg(color.bg)}
                  className={cn(
                    "w-7 h-7 rounded-full transition-transform",
                    color.bg,
                    avatarBg === color.bg ? "ring-2 ring-offset-2 ring-blue-600 scale-110" : "opacity-75 hover:opacity-100"
                  )}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Direct Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Priority Number
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Professional Title / Role Description
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Branch / Location
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  >
                    <option value="Toronto Central (HQ)">Toronto Central (HQ) - Canada</option>
                    <option value="Melbourne CBD Branch">Melbourne CBD Branch - Australia</option>
                    <option value="London Mayfair">London Mayfair - United Kingdom</option>
                    <option value="Singapore Marina Bay">Singapore Marina Bay - Asia Hub</option>
                    <option value="Dubai DIFC">Dubai DIFC - Middle East Hub</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bio / Case Background
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50/60 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Info</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Security & 2FA */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* 2FA Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA / TOTP)</h3>
                    {twoFactorEnabled ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active & Protected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Disabled
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Secure your account using Google Authenticator, Authy, or Apple Keychain TOTP codes on every sign-in.
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggle2FA}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0",
                  twoFactorEnabled
                    ? "bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA Protection"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Update Password</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Passwords must contain at least 8 characters, one number, and one special character.
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPw ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Devices & Sessions</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Devices currently authenticated into your Proton Consultancy account.
                </p>
              </div>
              <button
                onClick={handleRevokeSessions}
                className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              >
                Revoke All Other Sessions
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {sessions.map((sess) => (
                <div key={sess.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{sess.device}</p>
                      <p className="text-[11px] text-slate-400">
                        {sess.location} • IP: {sess.ip} • <span className="text-blue-600 font-semibold">{sess.lastActive}</span>
                      </p>
                    </div>
                  </div>

                  {sess.isCurrent ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-blue-800 border border-blue-200">
                      This Device
                    </span>
                  ) : (
                    <button
                      onClick={() => setSessionToDelete(sess.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 font-medium"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications & Alerts */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Communication & Alert Preferences</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize how and when you receive legal notices, document verifications, and milestone reminders.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {/* Email Channels */}
            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Notifications</h3>
              
              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Case Stage & Government Lodgement Milestones</p>
                  <p className="text-[11px] text-slate-500">Receive alerts when immigration authorities issue formal file updates.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailCaseUpdates}
                  onChange={(e) => setEmailCaseUpdates(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Document Verification & Review Outcomes</p>
                  <p className="text-[11px] text-slate-500">Instant notification when uploaded forms are approved or need re-upload.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDocApprovals}
                  onChange={(e) => setEmailDocApprovals(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Legal Counsel Direct Messages</p>
                  <p className="text-[11px] text-slate-500">Email copy when attorney sends questions or statutory replies.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailMessages}
                  onChange={(e) => setEmailMessages(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Retainer Invoices & Payment Receipts</p>
                  <p className="text-[11px] text-slate-500">Receive PDF invoices and settlement confirmation receipts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailInvoices}
                  onChange={(e) => setEmailInvoices(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* SMS Priority Channels */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">SMS / WhatsApp Priority Alerts</h3>
              
              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Urgent Statutory Deadlines (CRS & Visa Expiry)</p>
                  <p className="text-[11px] text-slate-500">High-priority SMS 7 days before government response deadlines.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsUrgentDeadlines}
                  onChange={(e) => setSmsUrgentDeadlines(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">Biometrics & Medical Appointment Reminders</p>
                  <p className="text-[11px] text-slate-500">SMS reminder 24 hours prior to booked VFS / clinic visits.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsBiometrics}
                  onChange={(e) => setSmsBiometrics(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Digest Cadence */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Summary Digest Frequency</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "instant", label: "Instant Delivery", desc: "Real-time as events occur" },
                  { id: "daily", label: "Daily Summary", desc: "Consolidated at 08:00 AM" },
                  { id: "weekly", label: "Weekly Briefing", desc: "Every Monday morning" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDigestFrequency(d.id as any)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all",
                      digestFrequency === d.id
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    )}
                  >
                    <p className="text-xs font-bold">{d.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{d.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Alert Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Regional & Preferences */}
      {activeTab === "preferences" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Regional & Localization Preferences</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Set your preferred reporting currency, working timezone, date layout, and language.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Accounting & Invoicing Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
              >
                <option value="CAD">CAD ($) - Canadian Dollar</option>
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="AUD">AUD ($) - Australian Dollar</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="EUR">EUR (€) - Euro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Working Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
              >
                <option value="America/Toronto (EST - UTC-5)">Eastern Time (Toronto / New York - UTC-5)</option>
                <option value="America/Vancouver (PST - UTC-8)">Pacific Time (Vancouver / LA - UTC-8)</option>
                <option value="Europe/London (GMT - UTC+0)">Greenwich Mean Time (London - UTC+0)</option>
                <option value="Australia/Melbourne (AEST - UTC+10)">Australian Eastern (Melbourne / Sydney - UTC+10)</option>
                <option value="Asia/Singapore (SGT - UTC+8)">Singapore / Hong Kong (UTC+8)</option>
                <option value="Asia/Dubai (GST - UTC+4)">Gulf Standard Time (Dubai - UTC+4)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Calendar & Date Format</label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
              >
                <option value="YYYY-MM-DD">ISO Standard (2026-08-31)</option>
                <option value="DD/MM/YYYY">Commonwealth Standard (31/08/2026)</option>
                <option value="MM/DD/YYYY">US Standard (08/31/2026)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Portal Display Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden"
              >
                <option value="English (North American Standard)">English (North American Standard)</option>
                <option value="Français (Canada)">Français (Canada - Langue officielle IRCC)</option>
                <option value="Español">Español (Latinoamérica)</option>
                <option value="Deutsch">Deutsch (Fachkräfteeinwanderungsgesetz)</option>
                <option value="Mandarin">中文 (简体中文)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Regional Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Role-Specific Extended Panel */}
      {activeTab === "roleSpecific" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          {currentRole === "super_admin" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Enterprise Data Governance & GDPR / PIPEDA</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Super Admin tools for automated compliance data exports and immutable audit archival.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900">Export Complete Caseload Archive</h3>
                  <p className="text-[11px] text-slate-500">
                    Generate an encrypted JSON dump of all client cases, lodgements, and financial ledgers.
                  </p>
                  <button
                    onClick={handleExportDataDump}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Compliance Archive</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900">Statutory Regulatory Accreditation</h3>
                  <p className="text-[11px] text-slate-500">
                    Firm is in full standing with CICC (Canada), MARA (Australia), and OISC Level 3 (UK).
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Audit Certified for 2026-2027
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Legal Practice & Operations Config</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure your designated booking links and out-of-office legal responders.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Standard Consultation Hours</label>
                  <input
                    type="text"
                    value={consultationHours}
                    onChange={(e) => setConsultationHours(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Permanent Secure Video Room URL</label>
                  <div className="relative">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="url"
                      value={meetingUrl}
                      onChange={(e) => setMeetingUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outOfOffice}
                      onChange={(e) => setOutOfOffice(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-800">Enable Out-of-Office Legal Auto-Responder</span>
                  </label>

                  {outOfOffice && (
                    <textarea
                      rows={2}
                      value={autoReplyText}
                      onChange={(e) => setAutoReplyText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Practice Config</span>
            </button>
          </div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Set Up 2-Factor Authentication</h3>
              </div>
              <button
                onClick={() => setIs2FAModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-center">
              <p className="text-xs text-slate-500">
                Scan this QR code with your Authenticator app (Google Authenticator, Microsoft Authenticator, or 1Password).
              </p>

              {/* QR Code graphic placeholder */}
              <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-2">
                <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center text-blue-400 p-3">
                  <div className="grid grid-cols-4 gap-1 w-full h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xs",
                          i % 2 === 0 || i % 5 === 0 ? "bg-blue-400" : "bg-slate-800"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Secret Key (Manual Entry)</p>
                <p className="text-xs font-mono font-bold text-slate-800 tracking-wider select-all">
                  PTN-IMM-7729-XK42-89BQ
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify2FASetup} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 6-Digit Code from App
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full text-center text-lg tracking-widest font-mono py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIs2FAModalOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Confirm & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200/80 flex items-center gap-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900">Confirm Action</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">
                {sessionToDelete === "ALL" 
                  ? "Are you sure you want to revoke ALL other sessions? Those devices will be logged out immediately." 
                  : "Are you sure you want to revoke this session? The device will be logged out immediately."}
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end gap-3">
              <button
                onClick={() => setSessionToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (sessionToDelete === "ALL") {
                    setSessions((prev) => prev.filter((s) => s.isCurrent));
                    addToast({
                      title: "Other Sessions Terminated",
                      description: "All other remote devices have been securely signed out.",
                      type: "info",
                    });
                  } else {
                    const sess = sessions.find((s) => s.id === sessionToDelete);
                    if (sess) {
                      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete));
                      addToast({
                        title: "Session Terminated",
                        description: `The session on ${sess.device} has been revoked.`,
                        type: "info"
                      });
                    }
                  }
                  setSessionToDelete(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
              >
                Yes, Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
