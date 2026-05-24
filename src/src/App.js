import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  X, 
  MessageSquare, 
  Sparkles, 
  User, 
  Search, 
  SlidersHorizontal,
  Code2,
  Lock,
  Globe2,
  Cpu,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

// --- THEME & STYLES ---
const C = {
  bg: "#09090b",
  surface: "#12121c",
  surface2: "#1c1c2a",
  border: "rgba(255,255,255,0.07)",
  accent: "#cbf05a",
  accent2: "#f7c5fc",
  accent3: "#eff6ff",
  text: "#fafafa",
  muted: "#a1a1aa",
};

const font = { display: "Syne, sans-serif", body: "DM Sans, sans-serif" };

const base = {
  page: { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: font.body, position: "relative", overflowX: "hidden" },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32 },
  input: { width: "100%", padding: "13px 16px", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontFamily: font.body, fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
  label: { fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 6, display: "block", letterSpacing: 0.3 },
  accentBtn: (disabled) => ({ width: "100%", padding: "14px", borderRadius: 12, background: C.accent, color: "#09090f", fontFamily: font.display, fontSize: 15, fontWeight: 700, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.35 : 1, transition: "all 0.2s" }),
  ghostBtn: { width: "100%", padding: "14px", borderRadius: 12, background: "transparent", color: C.text, fontFamily: font.body, fontSize: 14, fontWeight: 500, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" },
  linkBtn: { background: "none", border: "none", color: C.muted


