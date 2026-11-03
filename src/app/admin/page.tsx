"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  Users,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Search,
  FileSpreadsheet,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Lock,
  LogOut,
  AlertCircle,
  KeyRound,
} from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  city: string;
  series: string;
  message?: string;
  createdAt: string;
  status: string;
}

interface BrochureDownload {
  id: string;
  name?: string;
  email: string;
  phone: string;
  seriesInterest?: string;
  brochureName: string;
  downloadedAt: string;
}

function sanitizeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  // Prevent CSV formula injection by prepending apostrophe if cell starts with =, +, -, @
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  // Escape inner double quotes
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"enquiries" | "downloads">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [downloads, setDownloads] = useState<BrochureDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Authentication State
  const [tokenInput, setTokenInput] = useState("");
  const [authToken, setAuthToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function checkExistingSession() {
      const savedToken = sessionStorage.getItem("nissi_admin_token");
      if (savedToken) {
        try {
          const [enqRes, dlRes] = await Promise.all([
            fetch("/api/enquiries", { headers: { Authorization: `Bearer ${savedToken}` } }),
            fetch("/api/brochure-download", { headers: { Authorization: `Bearer ${savedToken}` } }),
          ]);

          if (enqRes.ok && dlRes.ok) {
            const enqJson = await enqRes.json();
            const dlJson = await dlRes.json();
            if (isMounted) {
              setEnquiries(enqJson.data || []);
              setDownloads(dlJson.data || []);
              setAuthToken(savedToken);
              setIsAuthenticated(true);
            }
          } else {
            sessionStorage.removeItem("nissi_admin_token");
          }
        } catch (err) {
          console.error("Session check error:", err);
          sessionStorage.removeItem("nissi_admin_token");
        }
      }
      if (isMounted) setLoading(false);
    }

    checkExistingSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    try {
      const cleanToken = tokenInput.trim();
      const [enqRes, dlRes] = await Promise.all([
        fetch("/api/enquiries", { headers: { Authorization: `Bearer ${cleanToken}` } }),
        fetch("/api/brochure-download", { headers: { Authorization: `Bearer ${cleanToken}` } }),
      ]);

      if (!enqRes.ok || !dlRes.ok) {
        throw new Error("Invalid Administrator Passkey. Please verify your token.");
      }

      const enqJson = await enqRes.json();
      const dlJson = await dlRes.json();

      sessionStorage.setItem("nissi_admin_token", cleanToken);
      setAuthToken(cleanToken);
      setEnquiries(enqJson.data || []);
      setDownloads(dlJson.data || []);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nissi_admin_token");
    setAuthToken("");
    setIsAuthenticated(false);
    setEnquiries([]);
    setDownloads([]);
  };

  const refreshData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const [enqRes, dlRes] = await Promise.all([
        fetch("/api/enquiries", { headers: { Authorization: `Bearer ${authToken}` } }),
        fetch("/api/brochure-download", { headers: { Authorization: `Bearer ${authToken}` } }),
      ]);

      const enqJson = await enqRes.json();
      const dlJson = await dlRes.json();

      if (enqJson.success) setEnquiries(enqJson.data || []);
      if (dlJson.success) setDownloads(dlJson.data || []);
    } catch (error) {
      console.error("Failed to reload data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDownloads = downloads.filter(
    (d) =>
      (d.name && d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      d.phone.includes(searchTerm) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.seriesInterest && d.seriesInterest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportEnquiriesCsv = () => {
    if (enquiries.length === 0) return;
    const headers = ["ID", "Date", "Name", "Phone", "Email", "Role", "City", "Series", "Message", "Status"];
    const rows = enquiries.map((e) => [
      sanitizeCsvCell(e.id),
      sanitizeCsvCell(new Date(e.createdAt).toLocaleString()),
      sanitizeCsvCell(e.name),
      sanitizeCsvCell(e.phone),
      sanitizeCsvCell(e.email),
      sanitizeCsvCell(e.role),
      sanitizeCsvCell(e.city),
      sanitizeCsvCell(e.series),
      sanitizeCsvCell(e.message || ""),
      sanitizeCsvCell(e.status),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nissi_Enquiries_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportDownloadsCsv = () => {
    if (downloads.length === 0) return;
    const headers = ["ID", "Download Date", "Name", "Phone", "Email", "Series Interest", "Brochure Name"];
    const rows = downloads.map((d) => [
      sanitizeCsvCell(d.id),
      sanitizeCsvCell(new Date(d.downloadedAt).toLocaleString()),
      sanitizeCsvCell(d.name || ""),
      sanitizeCsvCell(d.phone),
      sanitizeCsvCell(d.email),
      sanitizeCsvCell(d.seriesInterest || ""),
      sanitizeCsvCell(d.brochureName),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nissi_Brochure_Leads_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If not authenticated, render Login Wall
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Nissi Leads Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted area for authorized Nissi sales and administrative teams.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin_passkey" className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Administrator Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin_passkey"
                  type="password"
                  required
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Enter secret admin token..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-600 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </Link>
            <div className="h-5 w-px bg-slate-800" />
            <Logo variant="light" size="sm" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Metrics */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Lead Management & Database Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time inquiries and brochure downloads collected from www.nissiupvcgroups.com
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Total Enquiries</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {enquiries.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Direct from contact forms</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Brochure Downloads</span>
              <Download className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {downloads.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Verified PDF requests</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Combined Leads</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {enquiries.length + downloads.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Ready for sales follow-up</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Database Backend</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {process.env.NEXT_PUBLIC_DB_TYPE || "Connected"}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Enterprise secure lead storage</div>
          </div>
        </div>

        {/* Tab Navigation & Search & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "enquiries"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Dealer & Fabricator Enquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "downloads"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Brochure Download Leads ({downloads.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {activeTab === "enquiries" ? (
              <button
                onClick={exportEnquiriesCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>
            ) : (
              <button
                onClick={exportDownloadsCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {activeTab === "enquiries" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Date & Ref ID</th>
                    <th className="py-3.5 px-4">Contact Person</th>
                    <th className="py-3.5 px-4">Contact Numbers</th>
                    <th className="py-3.5 px-4">Role & Location</th>
                    <th className="py-3.5 px-4">Series Requested</th>
                    <th className="py-3.5 px-4">Message / Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        {loading ? "Loading enquiries from database..." : "No enquiry records found in the database yet."}
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-orange-400 font-bold">{e.id}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {new Date(e.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          {e.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                            <Phone className="w-3 h-3 text-orange-400" />
                            <a href={`tel:${e.phone}`} className="hover:underline">
                              {e.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <a href={`mailto:${e.email}`} className="hover:underline">
                              {e.email}
                            </a>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200">{e.role}</div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{e.city}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-orange-300">
                          {e.series}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-400 truncate" title={e.message}>
                          {e.message || "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Download Time & ID</th>
                    <th className="py-3.5 px-4">Lead Name</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Series of Interest</th>
                    <th className="py-3.5 px-4">Manual Delivered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredDownloads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        {loading ? "Loading download leads from database..." : "No brochure download logs recorded yet."}
                      </td>
                    </tr>
                  ) : (
                    filteredDownloads.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-blue-400 font-bold">{d.id}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {new Date(d.downloadedAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          {d.name || "Prospective Client"}
                        </td>
                        <td className="py-3.5 px-4">
                          <a href={`mailto:${d.email}`} className="text-slate-200 hover:underline">
                            {d.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-orange-400">
                          <a href={`tel:${d.phone}`} className="hover:underline">
                            {d.phone}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-300">
                          {d.seriesInterest || "All Profiles"}
                        </td>
                        <td className="py-3.5 px-4 text-emerald-400 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Delivered</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
