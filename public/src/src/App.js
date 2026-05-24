import { useState } from "react";

// ── THEME ──
const C = {
  bg: "#09090f",
  surface: "#12121c",
  surface2: "#1c1c2a",
  border: "rgba(255,255,255,0.07)",
  accent: "#c8f05a",
  accent2: "#7c5cfc",
  accent3: "#ff6b6b",
  text: "#f0f0f5",
  muted: "#6e6e82",
};

const font = { display: "'Syne', sans-serif", body: "'DM Sans', sans-serif" };

// ── SHARED STYLES ──
const base = {
  page: { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: font.body, position: "relative", overflowX: "hidden" },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32 },
  input: { width: "100%", padding: "13px 16px", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontFamily: font.body, fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
  label: { fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 6, display: "block", letterSpacing: 0.3 },
  accentBtn: (disabled) => ({ width: "100%", padding: "14px", borderRadius: 12, background: C.accent, color: "#09090f", fontFamily: font.display, fontSize: 15, fontWeight: 700, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.35 : 1, transition: "all 0.2s" }),
  ghostBtn: { width: "100%", padding: "14px", borderRadius: 12, background: C.surface2, color: C.text, fontFamily: font.body, fontSize: 14, fontWeight: 500, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" },
  linkBtn: { background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: font.body, textDecoration: "underline" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", background: "rgba(9,9,15,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, zIndex: 100 },
  logo: { fontFamily: font.display, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: C.text, cursor: "pointer" },
  progressBar: { height: 3, background: C.surface2, borderRadius: 3, marginBottom: 40, overflow: "hidden" },
};

function Blobs() {
  return (
    <>
      <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", background: C.accent2, filter: "blur(130px)", opacity: 0.09, top: -250, right: -200, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: C.accent, filter: "blur(130px)", opacity: 0.06, bottom: -150, left: -150, pointerEvents: "none", zIndex: 0 }} />
    </>
  );
}

function Divider({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <span style={{ fontSize: 12, color: C.muted }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

function AuthScreen({ mode, role, onSuccess, onSwitch, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isSignup = mode === "signup";
  const roleLabel = role === "freelancer" ? "Freelancer" : "Client";

  const validate = () => {
    if (isSignup && !name.trim()) return "Please enter your name.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleEmail = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: name || email.split("@")[0], email, method: "email" });
    }, 1200);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      onSuccess({ name: "Google User", email: "user@gmail.com", method: "google" });
    }, 1500);
  };

  return (
    <div style={{ ...base.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px" }}>
      <Blobs />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
            Match<span style={{ color: C.accent }}>r</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.surface2, border: `1px solid ${C.border}`, padding: "4px 12px", borderRadius: 100, fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
            {roleLabel} Account
          </div>
        </div>

        <div style={base.card}>
          <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
            {isSignup ? "Create your account" : "Welcome back"}
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, lineHeight: 1.6 }}>
            {isSignup
              ? `Join as a ${roleLabel.toLowerCase()} and ${role === "freelancer" ? "let clients find you" : "find perfect freelancers"}.`
              : `Sign in to your ${roleLabel.toLowerCase()} account.`}
          </div>

          <button onClick={handleGoogle} style={base.ghostBtn} disabled={googleLoading}>
            {googleLoading ? (
              <span style={{ fontSize: 13, color: C.muted }}>Connecting to Google...</span>
            ) : (
              <>
                <GoogleIcon />
                <span style={{ fontSize: 14 }}>{isSignup ? "Sign up" : "Sign in"} with Google</span>
              </>
            )}
          </button>

          <Divider text="or continue with email" />

          {isSignup && (
            <div style={{ marginBottom: 14 }}>
              <label style={base.label}>Full Name</label>
              <input style={base.input} placeholder="e.g. Alex Rivera" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style style={base.label}>Email Address</label>
            <input style={base.input} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div style={{ marginBottom: 6 }}>
            <label style={base.label}>Password</label>
            <input style={base.input} type="password" placeholder={isSignup ? "Min. 6 characters" : "Your password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleEmail()} />
          </div>

          {!isSignup && (
            <div style={{ textAlign: "right", marginBottom: 18 }}>
              <button style={{ ...base.linkBtn, fontSize: 12 }}>Forgot password?</button>
            </div>
          )}

          {error && (
            <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.25)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.accent3, marginBottom: 14 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleEmail} style={base.accentBtn(loading)} disabled={loading}>
            {loading ? "Please wait..." : isSignup ? `Create Account →` : `Sign In →`}
          </button>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.muted }}>
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button style={{ ...base.linkBtn, color: C.accent }} onClick={onSwitch}>
              {isSignup ? "Sign in" : "Sign up free"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button style={base.linkBtn} onClick={onBack}>← Back to home</button>
        </div>
      </div>
    </div>
  );
}

const FL_TAGS = [
  { val: "fast", icon: "⚡", label: "Fast Delivery" },
  { val: "quality", icon: "💎", label: "High Quality" },
  { val: "aesthetic", icon: "🎨", label: "Aesthetic & Beautiful" },
  { val: "research", icon: "🔬", label: "Deep Research" },
  { val: "detail", icon: "🔍", label: "Attention to Detail" },
  { val: "creative", icon: "💡", label: "Creative Thinking" },
  { val: "communication", icon: "💬", label: "Clear Communication" },
  { val: "reliable", icon: "🤝", label: "Always Reliable" },
];

function TagSelector({ options, selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 28 }}>
      {options.map((t) => {
        const active = selected.includes(t.val);
        return (
          <button key={t.val} onClick={() => onToggle(t.val)} style={{ padding: "10px 16px", borderRadius: 100, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? "rgba(200,240,90,0.1)" : C.surface2, color: active ? C.accent : C.text, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: font.body, opacity: (!active && selected.length >= 3) ? 0.35 : 1 }}>
            <span style={{ fontSize: 15 }}>{t.icon}</span>{t.label}
          </button>
        );
      })}
    </div>
  );
}

const INITIAL_FREELANCERS = [
  { id: 1, name: "Jordan Kim", title: "UI/UX Designer", avatar: "👩‍🎨", tags: ["aesthetic", "quality", "detail"], rate: 65 },
  { id: 2, name: "Marcus Osei", title: "Full-stack Developer", avatar: "👨‍💻", tags: ["fast", "reliable", "quality"], rate: 55 },
  { id: 3, name: "Priya Sharma", title: "Brand Designer", avatar: "👩‍💻", tags: ["aesthetic", "creative", "quality"], rate: 80 },
  { id: 4, name: "Leo Santos", title: "Frontend Developer", avatar: "🧑‍💻", tags: ["fast", "detail", "reliable"], rate: 45 },
  { id: 5, name: "Nina Chen", title: "Content Strategist", avatar: "👩‍🏫", tags: ["research", "quality", "communication"], rate: 50 },
  { id: 6, name: "Amir Hassan", title: "Motion Designer", avatar: "🎬", tags: ["aesthetic", "creative", "fast"], rate: 70 },
];

function Landing({ user, onFreelancer, onClient, onLogout }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <nav style={base.nav}>
        <div style={base.logo}>Match<span style={{ color: C.accent }}>r</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <div style={{ fontSize: 13, color: C.muted }}>Hi, <span style={{ color: C.text, fontWeight: 500 }}>{user.name}</span></div>
              <button onClick={onLogout} style={{ padding: "8px 16px", borderRadius: 100, background: "transparent", color: C.muted, border: `1px solid ${C.border}`, fontFamily: font.body, fontSize: 13, cursor: "pointer" }}>Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => onFreelancer("login")} style={{ padding: "9px 18px", borderRadius: 100, background: "transparent", color: C.text, border: `1px solid ${C.border}`, fontFamily: font.body, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Sign In</button>
              <button onClick={() => onFreelancer("signup")} style={{ padding: "9px 18px", borderRadius: 100, background: C.accent, color: "#09090f", border: "none", fontFamily: font.body, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Join Free</button>
            </>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "130px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.surface2, border: `1px solid ${C.border}`, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600, color: C.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 28 }}>
          <span>●</span> The future of freelancing
        </div>

        <div style={{ fontFamily: font.display, fontSize: "clamp(44px,7vw,82px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, marginBottom: 24 }}>
          Clients find <span style={{ color: C.accent }}>you.</span>
          <div style={{ color: C.muted, fontSize: "clamp(34px,5vw,60px)", marginTop: 6 }}>Not the other way.</div>
        </div>

        <p style={{ maxWidth: 480, margin: "0 auto 36px", fontSize: 16, lineHeight: 1.7, color: C.muted, fontWeight: 300 }}>
          Stop hunting for clients. Tell us your strengths and we match you with clients who need exactly what you offer.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onFreelancer("signup")} style={{ padding: "14px 28px", borderRadius: 100, background: C.accent, color: "#09090f", fontFamily: font.display, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
            I'm a Freelancer →
          </button>
          <button onClick={() => onClient("signup")} style={{ padding: "14px 28px", borderRadius: 100, background: C.surface2, color: C.text, fontFamily: font.body, fontSize: 15, fontWeight: 500, border: `1px solid ${C.border}`, cursor: "pointer" }}>
            I Need Talent
          </button>
        </div>

        <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", marginTop: 72, paddingTop: 40, borderTop: `1px solid ${C.border}` }}>
          {

