"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   COOLFIXHUB — COMPLETE HVAC MARKETPLACE
   React / JSX — Full conversion from HTML version
   ============================================================ */

// ── GOOGLE FONTS INJECTION ──────────────────────────────────────
const FONT_LINK = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap";

// ── GLOBAL CSS ──────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('${FONT_LINK}');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg:#EEF3FA; --bg2:#E4ECF5; --card:#FFFFFF; --card2:#F8FAFD;
  --cyan:#00C9C8; --cyan2:#00A3A2; --cyan3:#007F7E;
  --blue:#1E6FDB; --blue2:#1557B0;
  --orange:#FF6B35; --orange2:#D4512A;
  --green:#22C55E; --green2:#16A34A;
  --red:#EF4444; --red2:#DC2626;
  --yellow:#F59E0B; --purple:#8B5CF6;
  --text:#0D1B2A; --text2:#3D5166; --text3:#6A849C; --text4:#9BB0C4;
  --border:#D0DCEA; --border2:#B8CCE0;
  --sh1:0 1px 4px rgba(13,27,42,0.06);
  --sh2:0 4px 16px rgba(13,27,42,0.08);
  --sh3:0 8px 32px rgba(13,27,42,0.12);
  --r-sm:6px; --r:10px; --r-md:14px; --r-lg:18px; --r-xl:24px;
  --ease:cubic-bezier(0.25,0.46,0.45,0.94);
}

[data-theme="dark"] {
  --bg:#080F1A; --bg2:#0C1625; --card:#111E2E; --card2:#162538;
  --text:#E8F2FF; --text2:#8EAACB; --text3:#567090; --text4:#3A5470;
  --border:#1C3050; --border2:#243D5C;
  --sh1:0 1px 4px rgba(0,0,0,0.3);
  --sh2:0 4px 16px rgba(0,0,0,0.4);
  --sh3:0 8px 32px rgba(0,0,0,0.5);
}

body {
  font-family:'DM Sans',-apple-system,sans-serif;
  background:var(--bg); color:var(--text);
  min-height:100vh; overflow-x:hidden;
  font-size:15px; line-height:1.5;
  transition:background .3s var(--ease),color .3s var(--ease);
}
h1,h2,h3,h4,h5 { font-family:'Space Grotesk',sans-serif; line-height:1.2; }
button,input,select,textarea { font-family:'DM Sans',sans-serif; }
a { text-decoration:none; color:inherit; }

::-webkit-scrollbar { width:5px; height:5px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:var(--border2); border-radius:99px; }
::-webkit-scrollbar-thumb:hover { background:var(--text3); }

/* ── LAYOUT ── */
.cfh-shell { display:flex; flex-direction:column; height:100vh; overflow:hidden; }

/* ── TOPBAR ── */
.cfh-topbar {
  background:var(--card); border-bottom:1px solid var(--border);
  padding:0 20px; height:60px;
  display:flex; align-items:center; gap:14px;
  flex-shrink:0; box-shadow:var(--sh2);
  position:relative; z-index:200;
}
.cfh-logo { display:flex; align-items:center; gap:9px; cursor:pointer; flex-shrink:0; }
.cfh-logo-mark {
  width:36px; height:36px; border-radius:10px;
  background:linear-gradient(135deg,var(--cyan),var(--blue));
  display:flex; align-items:center; justify-content:center;
  font-size:20px; box-shadow:0 2px 10px rgba(0,201,200,0.35); flex-shrink:0;
}
.cfh-logo-text { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:18px; color:var(--text); letter-spacing:-0.02em; }
.cfh-logo-text em { color:var(--cyan); font-style:normal; }

.cfh-search-wrap { flex:1; max-width:520px; }
.cfh-search-bar {
  width:100%; display:flex; align-items:center;
  background:var(--bg); border:1.5px solid var(--border);
  border-radius:var(--r-md); height:40px; padding:0 14px; gap:10px;
  transition:border-color .2s,box-shadow .2s;
}
.cfh-search-bar:focus-within { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(0,201,200,0.12); }
.cfh-search-bar input { flex:1; border:none; background:none; outline:none; font-size:14px; color:var(--text); }
.cfh-search-bar input::placeholder { color:var(--text4); }
.cfh-search-icon { color:var(--text3); font-size:17px; flex-shrink:0; }
.cfh-voice-btn { cursor:pointer; font-size:17px; opacity:0.6; transition:opacity .2s; flex-shrink:0; background:none; border:none; }
.cfh-voice-btn:hover { opacity:1; }

.cfh-topbar-right { display:flex; align-items:center; gap:8px; margin-left:auto; }
.cfh-icon-btn {
  width:38px; height:38px; border-radius:var(--r);
  border:1.5px solid var(--border); background:var(--bg);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:var(--text2); font-size:17px;
  transition:all .2s; position:relative;
}
.cfh-icon-btn:hover { background:var(--cyan); color:#fff; border-color:var(--cyan); transform:translateY(-1px); }
.cfh-notif-badge {
  position:absolute; top:-4px; right:-4px;
  background:var(--red); color:#fff; font-size:10px; font-weight:700;
  width:18px; height:18px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:2px solid var(--card);
}
.cfh-theme-btn {
  display:flex; align-items:center; gap:7px; padding:8px 14px;
  background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  cursor:pointer; font-size:13px; font-weight:600; color:var(--text2);
  transition:all .2s; white-space:nowrap;
}
.cfh-theme-btn:hover { border-color:var(--cyan); color:var(--cyan); }
.cfh-user-avatar {
  width:38px; height:38px; border-radius:var(--r);
  background:linear-gradient(135deg,var(--cyan),var(--blue));
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-weight:700; font-size:14px;
  cursor:pointer; border:2px solid transparent; transition:all .2s;
}
.cfh-user-avatar:hover { border-color:var(--cyan); transform:scale(1.05); }

/* ── MAIN BODY ── */
.cfh-main { display:flex; flex:1; overflow:hidden; }

/* ── SIDEBAR ── */
.cfh-sidebar {
  width:228px; background:var(--card); border-right:1px solid var(--border);
  display:flex; flex-direction:column; overflow-y:auto; flex-shrink:0;
  transition:width .25s var(--ease);
}
.cfh-sidebar-section { padding:16px 12px 6px; }
.cfh-sidebar-label {
  font-size:10.5px; font-weight:700; color:var(--text4);
  text-transform:uppercase; letter-spacing:0.1em;
  padding:0 10px; margin-bottom:6px;
}
.cfh-nav-item {
  display:flex; align-items:center; gap:10px;
  padding:9px 12px; border-radius:var(--r);
  cursor:pointer; color:var(--text2); font-size:14px; font-weight:500;
  transition:all .18s; margin-bottom:2px; user-select:none; border:none;
  background:none; width:100%; text-align:left;
}
.cfh-nav-item:hover { background:var(--bg); color:var(--text); }
.cfh-nav-item.active {
  background:linear-gradient(135deg,rgba(0,201,200,0.14),rgba(30,111,219,0.08));
  color:var(--cyan2); font-weight:600;
}
.cfh-nav-item.active .cfh-nav-icon { color:var(--cyan); }
.cfh-nav-icon { font-size:18px; width:22px; text-align:center; flex-shrink:0; }
.cfh-nav-label { flex:1; }
.cfh-nav-badge {
  background:var(--orange); color:#fff; font-size:11px; font-weight:700;
  padding:1px 7px; border-radius:20px;
}
.cfh-divider { height:1px; background:var(--border); margin:8px 16px; }

/* ── CONTENT ── */
.cfh-content { flex:1; overflow-y:auto; scroll-behavior:smooth; }

/* ── PAGES ── */
.cfh-page { padding:28px 28px 60px; animation:pageFade .25s var(--ease); }
@keyframes pageFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ── BUTTONS ── */
.cfh-btn {
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  border:none; border-radius:var(--r); font-weight:600; font-size:14px;
  cursor:pointer; transition:all .2s var(--ease); padding:10px 20px;
  white-space:nowrap; font-family:'DM Sans',sans-serif;
}
.cfh-btn:hover { transform:translateY(-1px); }
.cfh-btn:active { transform:translateY(0); }
.btn-primary { background:var(--cyan); color:#fff; }
.btn-primary:hover { background:var(--cyan2); box-shadow:0 4px 14px rgba(0,201,200,0.4); }
.btn-ghost { background:var(--bg); border:1.5px solid var(--border); color:var(--text); }
.btn-ghost:hover { border-color:var(--cyan); color:var(--cyan); }
.btn-outline-white { background:transparent; border:1.5px solid rgba(255,255,255,0.25); color:#fff; }
.btn-outline-white:hover { background:rgba(255,255,255,0.1); }
.btn-sm { padding:7px 14px; font-size:13px; border-radius:var(--r-sm); }
.btn-lg { padding:14px 28px; font-size:16px; border-radius:var(--r-md); }
.btn-full { width:100%; }

/* ── SECTION HEADER ── */
.cfh-section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
.cfh-section-title { font-size:19px; font-weight:700; display:flex; align-items:center; gap:8px; }
.cfh-see-all { font-size:13px; color:var(--cyan); cursor:pointer; font-weight:600; transition:opacity .2s; }
.cfh-see-all:hover { opacity:0.75; }

/* ── PAGE HEADER ── */
.cfh-page-header { margin-bottom:26px; }
.cfh-page-title { font-size:24px; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.cfh-page-subtitle { color:var(--text2); font-size:14px; }

/* ── HERO ── */
.cfh-hero {
  background: url('/worldcool.png') center/contain no-repeat;
  border-radius: var(--r-xl);
  padding: 44px 48px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}
  .cfh-hero-content {
  position: relative;
  z-index: 1;
}
  .cfh-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75); /* opacity control */
  border-radius: var(--r-xl);
}
.cfh-hero-glow { position:absolute; border-radius:50%; pointer-events:none; }
.cfh-hero-content { position:relative; z-index:1; }
.cfh-hero-tag {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(0,201,200,0.14); border:1px solid rgba(0,201,200,0.3);
  color:var(--cyan); font-size:12px; font-weight:600;
  padding:5px 14px; border-radius:20px; margin-bottom:18px; letter-spacing:0.02em;
}
.cfh-hero h1 { font-size:36px; font-weight:700; color:#fff; line-height:1.18; margin-bottom:14px; letter-spacing:-0.02em; }
.cfh-gradient-text { background:linear-gradient(90deg,var(--cyan),#5B9BFF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.cfh-hero p { color:#7A9BB8; font-size:15px; max-width:500px; line-height:1.65; margin-bottom:28px; }
.cfh-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
.cfh-hero-stats { display:flex; gap:36px; margin-top:34px; padding-top:28px; border-top:1px solid rgba(255,255,255,0.07); }
.cfh-hero-stat-num { font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:700; color:#fff; }
.cfh-hero-stat-lbl { font-size:12px; color:#5A7A96; margin-top:3px; }

/* ── CAT CHIPS ── */
.cfh-cat-chips { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:26px; }
.cfh-cat-chip {
  display:flex; align-items:center; gap:7px; padding:8px 16px;
  background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-xl);
  cursor:pointer; font-size:13px; font-weight:600; color:var(--text2);
  transition:all .2s; user-select:none;
}
.cfh-cat-chip:hover { border-color:var(--cyan); color:var(--cyan); }
.cfh-cat-chip.active { background:var(--cyan); color:#fff; border-color:var(--cyan); box-shadow:0 2px 10px rgba(0,201,200,0.3); }

/* ── AI CARD ── */
.cfh-ai-card {
  background:linear-gradient(135deg,rgba(0,201,200,0.06),rgba(30,111,219,0.04));
  border:1.5px solid rgba(0,201,200,0.2); border-radius:var(--r-lg);
  padding:20px 24px; margin-bottom:28px;
}
.cfh-ai-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.cfh-ai-icon {
  width:42px; height:42px; border-radius:12px;
  background:linear-gradient(135deg,rgba(0,201,200,0.2),rgba(30,111,219,0.15));
  display:flex; align-items:center; justify-content:center; font-size:22px;
}
.cfh-ai-title { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; background:linear-gradient(90deg,var(--cyan),var(--blue)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.cfh-ai-sub { font-size:12px; color:var(--text3); margin-top:2px; }
.cfh-ai-chips { display:flex; gap:8px; flex-wrap:wrap; }
.cfh-ai-chip {
  display:flex; align-items:center; gap:8px; padding:9px 14px;
  background:var(--card); border:1.5px solid var(--border); border-radius:var(--r);
  font-size:13px; font-weight:500; cursor:pointer; transition:all .2s; color:var(--text);
}
.cfh-ai-chip:hover { border-color:var(--cyan); color:var(--cyan); transform:translateY(-1px); }
.cfh-ai-chip-score { font-size:11px; font-weight:700; color:var(--green); margin-left:4px; }

/* ── PRODUCT CARDS ── */
.cfh-products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:16px; margin-bottom:36px; }
.cfh-product-card {
  background:var(--card); border-radius:var(--r-md); border:1.5px solid var(--border);
  overflow:hidden; cursor:pointer; transition:all .22s var(--ease); position:relative;
}
.cfh-product-card:hover { transform:translateY(-4px); box-shadow:var(--sh3); border-color:rgba(0,201,200,0.4); }
.cfh-product-img {
  height:165px; display:flex; align-items:center; justify-content:center;
  font-size:76px; background:var(--bg2); position:relative;
}
.cfh-product-badge {
  position:absolute; top:10px; left:10px; font-size:11px; font-weight:700;
  padding:3px 9px; border-radius:var(--r-sm); letter-spacing:0.02em;
}
.badge-hot { background:var(--orange); color:#fff; }
.badge-new { background:var(--green); color:#fff; }
.badge-sale { background:var(--red); color:#fff; }
.cfh-wishlist-btn {
  position:absolute; top:10px; right:10px; width:32px; height:32px; border-radius:50%;
  background:var(--card); border:1.5px solid var(--border);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; font-size:15px; color:var(--text3); transition:all .2s;
}
.cfh-wishlist-btn:hover, .cfh-wishlist-btn.active { color:var(--red); border-color:var(--red); background:rgba(239,68,68,0.06); }
.cfh-product-body { padding:14px 16px; }
.cfh-product-brand { font-size:11px; font-weight:700; color:var(--cyan2); text-transform:uppercase; letter-spacing:0.06em; }
.cfh-product-name { font-size:14px; font-weight:600; margin:4px 0 3px; line-height:1.35; }
.cfh-product-model { font-size:12px; color:var(--text3); margin-bottom:10px; }
.cfh-product-price { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.cfh-price-now { font-size:18px; font-weight:700; }
.cfh-price-old { font-size:13px; color:var(--text4); text-decoration:line-through; }
.cfh-price-off { font-size:11px; color:var(--green); font-weight:700; background:rgba(34,197,94,0.1); padding:1px 6px; border-radius:4px; }
.cfh-product-meta { display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
.cfh-stars { color:var(--yellow); font-size:12px; }
.cfh-review-count { font-size:12px; color:var(--text3); }
.cfh-stock-pill { font-size:11px; font-weight:600; padding:2px 8px; border-radius:5px; }
.stock-in { background:rgba(34,197,94,0.12); color:var(--green2); }
.stock-low { background:rgba(245,158,11,0.12); color:#B45309; }
.stock-out { background:rgba(239,68,68,0.12); color:var(--red2); }
.cfh-product-actions { display:flex; gap:8px; }
.cfh-btn-add-cart {
  flex:1; padding:9px 0; background:var(--cyan); color:#fff; border:none;
  border-radius:var(--r); font-size:13px; font-weight:600; cursor:pointer; transition:all .2s;
}
.cfh-btn-add-cart:hover { background:var(--cyan2); transform:translateY(-1px); }
.cfh-btn-buy-now {
  padding:9px 12px; background:var(--bg); border:1.5px solid var(--border);
  border-radius:var(--r); font-size:13px; font-weight:600; cursor:pointer; color:var(--text); transition:all .2s;
}
.cfh-btn-buy-now:hover { border-color:var(--cyan); color:var(--cyan); }

/* ── SERVICE CARDS ── */
.cfh-services-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:16px; margin-bottom:32px; }
.cfh-service-card {
  background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md);
  padding:22px; cursor:pointer; transition:all .22s var(--ease); position:relative; overflow:hidden;
}
.cfh-service-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--cyan),var(--blue)); }
.cfh-service-card:hover { transform:translateY(-4px); box-shadow:var(--sh3); border-color:rgba(0,201,200,0.3); }
.cfh-service-icon {
  width:52px; height:52px; border-radius:14px;
  background:linear-gradient(135deg,rgba(0,201,200,0.12),rgba(30,111,219,0.08));
  display:flex; align-items:center; justify-content:center; font-size:28px; margin-bottom:14px;
}
.cfh-service-name { font-size:16px; font-weight:700; margin-bottom:7px; }
.cfh-service-desc { font-size:13px; color:var(--text2); line-height:1.55; margin-bottom:16px; }
.cfh-service-footer { display:flex; align-items:center; justify-content:space-between; }
.cfh-service-price { font-size:17px; font-weight:700; color:var(--cyan2); }
.cfh-service-eta { font-size:12px; color:var(--text3); }

/* ── TECH CARDS ── */
.cfh-tech-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:16px; margin-bottom:32px; }
.cfh-tech-card {
  background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md);
  padding:22px; cursor:pointer; transition:all .22s var(--ease); text-align:center;
}
.cfh-tech-card:hover { transform:translateY(-4px); box-shadow:var(--sh3); border-color:rgba(0,201,200,0.3); }
.cfh-tech-avatar {
  width:68px; height:68px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:24px; font-weight:700; color:#fff; margin:0 auto 14px; position:relative;
}
.cfh-online-ring { position:absolute; bottom:2px; right:2px; width:14px; height:14px; border-radius:50%; border:2px solid var(--card); }
.online-ring-on { background:var(--green); }
.online-ring-off { background:var(--text4); }
.cfh-tech-name { font-size:15px; font-weight:700; margin-bottom:4px; }
.cfh-tech-role { font-size:12px; color:var(--cyan2); font-weight:600; margin-bottom:10px; }
.cfh-tech-tags { display:flex; gap:5px; justify-content:center; flex-wrap:wrap; margin-bottom:12px; }
.cfh-tech-tag { font-size:11px; padding:3px 9px; background:var(--bg); border:1px solid var(--border); border-radius:6px; color:var(--text2); }
.cfh-tech-stats { display:flex; padding:12px 0; border-top:1px solid var(--border); margin-bottom:14px; }
.cfh-tech-stat { flex:1; text-align:center; }
.cfh-tech-stat:not(:last-child) { border-right:1px solid var(--border); }
.cfh-tech-stat-val { font-size:16px; font-weight:700; }
.cfh-tech-stat-lbl { font-size:11px; color:var(--text3); margin-top:2px; }

/* ── CARD ── */
.cfh-card { background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md); overflow:hidden; }
.cfh-card-header { padding:16px 20px; border-bottom:1px solid var(--border); font-weight:700; font-size:15px; display:flex; align-items:center; justify-content:space-between; }
.cfh-card-body { padding:18px 20px; }

/* ── STAT CARDS ── */
.cfh-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:22px; }
.cfh-stat-card { background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md); padding:18px 20px; transition:box-shadow .2s; }
.cfh-stat-card:hover { box-shadow:var(--sh2); }
.cfh-stat-icon-wrap { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:12px; }
.ic-cyan { background:rgba(0,201,200,0.12); }
.ic-blue { background:rgba(30,111,219,0.12); }
.ic-orange { background:rgba(255,107,53,0.12); }
.ic-green { background:rgba(34,197,94,0.12); }
.cfh-stat-value { font-family:'Space Grotesk',sans-serif; font-size:26px; font-weight:700; line-height:1; margin-bottom:4px; }
.cfh-stat-label { font-size:13px; color:var(--text2); }
.cfh-stat-change { font-size:12px; font-weight:600; margin-top:6px; }
.change-up { color:var(--green); }
.change-neu { color:var(--text3); }

/* ── MINI CHART ── */
.cfh-mini-chart { display:flex; align-items:flex-end; gap:5px; height:90px; margin:8px 0 4px; }
.cfh-chart-bar { flex:1; background:linear-gradient(to top,var(--cyan),var(--blue)); border-radius:4px 4px 0 0; cursor:pointer; transition:filter .2s,height .6s var(--ease); min-height:6px; }
.cfh-chart-bar:hover { filter:brightness(1.2); }
.cfh-chart-x { display:flex; gap:5px; margin-top:5px; }
.cfh-chart-x-lbl { flex:1; text-align:center; font-size:10px; color:var(--text4); }

/* ── ORDER ROWS ── */
.cfh-order-rows { padding:0 20px; }
.cfh-order-row { display:flex; align-items:center; gap:14px; padding:11px 0; border-bottom:1px solid var(--border); }
.cfh-order-row:last-child { border-bottom:none; }
.cfh-order-icon { width:40px; height:40px; border-radius:10px; background:var(--bg); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
.cfh-order-info { flex:1; min-width:0; }
.cfh-order-name { font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cfh-order-sub { font-size:12px; color:var(--text3); margin-top:2px; }
.cfh-status-pill { font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; white-space:nowrap; flex-shrink:0; }
.s-processing { background:rgba(245,158,11,0.12); color:#B45309; }
.s-shipped { background:rgba(30,111,219,0.12); color:var(--blue); }
.s-delivered { background:rgba(34,197,94,0.12); color:var(--green2); }
.s-cancelled { background:rgba(239,68,68,0.12); color:var(--red2); }
.s-upcoming { background:rgba(139,92,246,0.12); color:var(--purple); }
.s-completed { background:rgba(0,201,200,0.12); color:var(--cyan2); }
.s-pending { background:rgba(245,158,11,0.12); color:#B45309; }

/* ── FORM ── */
.cfh-form-group { margin-bottom:16px; }
.cfh-form-label { display:block; font-size:13px; font-weight:600; color:var(--text2); margin-bottom:7px; }
.cfh-form-input, .cfh-form-select, .cfh-form-textarea {
  width:100%; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  padding:10px 14px; font-size:14px; color:var(--text); outline:none;
  transition:border-color .2s,box-shadow .2s; font-family:'DM Sans',sans-serif;
}
.cfh-form-input:focus, .cfh-form-select:focus, .cfh-form-textarea:focus { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(0,201,200,0.1); }
.cfh-form-textarea { resize:vertical; min-height:88px; }
.cfh-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.cfh-upload-zone { border:2px dashed var(--border2); border-radius:var(--r); padding:22px; text-align:center; cursor:pointer; transition:border-color .2s; color:var(--text3); font-size:14px; }
.cfh-upload-zone:hover { border-color:var(--cyan); color:var(--cyan); }

/* ── BOOKING ── */
.cfh-booking-wrap { display:grid; grid-template-columns:1fr 1fr; gap:22px; max-width:960px; }
.cfh-booking-card { background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-lg); padding:26px; }
.cfh-stype-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:18px; }
.cfh-stype-btn {
  padding:10px 12px; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  cursor:pointer; font-size:13px; font-weight:600; color:var(--text2); transition:all .2s; text-align:center;
}
.cfh-stype-btn:hover { border-color:var(--cyan); color:var(--cyan); }
.cfh-stype-btn.active { background:var(--cyan); color:#fff; border-color:var(--cyan); }
.cfh-booking-summary { background:var(--bg); border-radius:var(--r); padding:16px; margin-bottom:18px; }
.cfh-sum-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; font-size:14px; border-bottom:1px solid var(--border); }
.cfh-sum-row:last-child { border-bottom:none; }
.cfh-sum-total { font-weight:700; color:var(--cyan2); font-size:16px; }

/* ── PAY CHIPS ── */
.cfh-pay-methods { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
.cfh-pay-chip {
  display:flex; align-items:center; gap:7px; padding:8px 14px;
  background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  cursor:pointer; font-size:13px; font-weight:600; color:var(--text2); transition:all .2s;
}
.cfh-pay-chip:hover { border-color:var(--cyan); color:var(--cyan); }
.cfh-pay-chip.active { border-color:var(--cyan); color:var(--cyan); background:rgba(0,201,200,0.06); }

/* ── CART ── */
.cfh-cart-wrap { display:grid; grid-template-columns:1fr 370px; gap:22px; max-width:1040px; }
.cfh-cart-item { display:flex; align-items:center; gap:16px; padding:16px 20px; border-bottom:1px solid var(--border); transition:background .15s; }
.cfh-cart-item:hover { background:var(--bg2); }
.cfh-cart-item:last-child { border-bottom:none; }
.cfh-cart-thumb { width:72px; height:72px; border-radius:12px; background:var(--bg2); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:38px; flex-shrink:0; }
.cfh-cart-item-info { flex:1; min-width:0; }
.cfh-cart-item-name { font-size:14px; font-weight:600; margin-bottom:3px; }
.cfh-cart-item-meta { font-size:12px; color:var(--text3); }
.cfh-cart-item-price { font-size:16px; font-weight:700; margin-top:7px; }
.cfh-cart-item-right { display:flex; flex-direction:column; align-items:flex-end; gap:10px; }
.cfh-qty-ctrl { display:flex; align-items:center; gap:10px; }
.cfh-qty-btn {
  width:28px; height:28px; border-radius:7px; background:var(--bg); border:1.5px solid var(--border);
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  font-size:16px; font-weight:700; color:var(--text); transition:all .2s;
}
.cfh-qty-btn:hover { background:var(--cyan); color:#fff; border-color:var(--cyan); }
.cfh-qty-num { font-size:14px; font-weight:700; min-width:22px; text-align:center; }
.cfh-remove-item { background:none; border:none; cursor:pointer; color:var(--text3); font-size:18px; padding:4px 6px; border-radius:6px; transition:all .2s; }
.cfh-remove-item:hover { color:var(--red); background:rgba(239,68,68,0.08); }
.cfh-order-sum-card { background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-lg); padding:22px; height:fit-content; }
.cfh-order-sum-title { font-size:17px; font-weight:700; margin-bottom:18px; }
.cfh-promo-row { display:flex; gap:8px; margin-bottom:18px; }
.cfh-promo-row input { flex:1; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r); padding:9px 14px; font-size:13px; color:var(--text); outline:none; font-family:'DM Sans',sans-serif; }
.cfh-promo-row input:focus { border-color:var(--cyan); }

/* ── TRACKING ── */
.cfh-track-progress { position:relative; margin:26px 0 8px; }
.cfh-track-line-bg { height:4px; background:var(--border); border-radius:2px; position:relative; }
.cfh-track-line-fill { height:100%; background:linear-gradient(90deg,var(--cyan),var(--blue)); border-radius:2px; }
.cfh-track-dots { display:flex; justify-content:space-between; margin-top:-10px; position:relative; }
.cfh-track-dot-wrap { display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; }
.cfh-track-dot {
  width:20px; height:20px; border-radius:50%; border:2.5px solid var(--border);
  background:var(--card); display:flex; align-items:center; justify-content:center;
  font-size:9px; font-weight:700; color:transparent; z-index:1;
}
.cfh-track-dot.done { background:var(--cyan); border-color:var(--cyan); color:#fff; }
.cfh-track-dot-label { font-size:11px; font-weight:600; color:var(--text3); text-align:center; line-height:1.3; }
.cfh-track-dot-wrap.done .cfh-track-dot-label { color:var(--text); }

/* ── NOTIF ── */
.cfh-notif-list { max-width:640px; display:flex; flex-direction:column; gap:10px; }
.cfh-notif-item {
  display:flex; align-items:flex-start; gap:14px; padding:16px 20px;
  background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md);
  cursor:pointer; transition:all .2s;
}
.cfh-notif-item:hover { box-shadow:var(--sh2); border-color:rgba(0,201,200,0.3); }
.cfh-notif-item.unread { border-left:3px solid var(--cyan); }
.cfh-notif-icon { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
.cfh-notif-content { flex:1; }
.cfh-notif-title { font-size:14px; font-weight:700; margin-bottom:4px; }
.cfh-notif-msg { font-size:13px; color:var(--text2); line-height:1.5; }
.cfh-notif-time { font-size:12px; color:var(--text3); margin-top:5px; }

/* ── ADMIN TABLE ── */
.cfh-admin-table { background:var(--card); border:1.5px solid var(--border); border-radius:var(--r-md); overflow:hidden; margin-bottom:22px; }
.cfh-admin-table-header { padding:14px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; font-weight:700; font-size:15px; }
table { width:100%; border-collapse:collapse; }
th { padding:10px 16px; text-align:left; font-size:11.5px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:0.07em; border-bottom:1px solid var(--border); background:var(--bg); }
td { padding:12px 16px; font-size:13px; border-bottom:1px solid var(--border); }
tr:last-child td { border-bottom:none; }
tbody tr:hover td { background:var(--bg2); }
.cfh-user-cell { display:flex; align-items:center; gap:10px; }
.cfh-user-mini-av { width:32px; height:32px; border-radius:8px; background:linear-gradient(135deg,var(--cyan),var(--blue)); display:flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:700; flex-shrink:0; }
.cfh-action-btns { display:flex; gap:6px; }
.cfh-action-btn { padding:4px 11px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; border:none; transition:all .2s; }
.ab-view { background:rgba(0,201,200,0.12); color:var(--cyan2); }
.ab-view:hover { background:rgba(0,201,200,0.22); }
.ab-approve { background:rgba(34,197,94,0.12); color:var(--green2); }
.ab-approve:hover { background:rgba(34,197,94,0.22); }
.ab-reject { background:rgba(239,68,68,0.1); color:var(--red2); }
.ab-reject:hover { background:rgba(239,68,68,0.2); }
.ab-edit { background:rgba(30,111,219,0.1); color:var(--blue); }
.ab-edit:hover { background:rgba(30,111,219,0.2); }

/* ── TECH SELECT ── */
.cfh-tech-select-item {
  display:flex; align-items:center; gap:12px; padding:12px 14px;
  background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  margin-bottom:8px; cursor:pointer; transition:all .2s;
}
.cfh-tech-select-item:hover, .cfh-tech-select-item.active { border-color:var(--cyan); background:rgba(0,201,200,0.04); }
.cfh-tech-select-item.active { box-shadow:0 0 0 2px rgba(0,201,200,0.15); }

/* ── PILL ── */
.cfh-pill { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; }
.pill-cyan { background:rgba(0,201,200,0.12); color:var(--cyan2); }
.pill-orange { background:rgba(255,107,53,0.12); color:var(--orange2); }
.pill-green { background:rgba(34,197,94,0.12); color:var(--green2); }
.pill-blue { background:rgba(30,111,219,0.12); color:var(--blue2); }

/* ── CHAT FAB ── */
.cfh-chat-fab {
  position:fixed; bottom:26px; right:26px; width:54px; height:54px;
  background:linear-gradient(135deg,var(--cyan),var(--blue)); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; box-shadow:0 4px 20px rgba(0,201,200,0.45);
  font-size:24px; z-index:300; transition:transform .2s var(--ease),box-shadow .2s; border:none;
}
.cfh-chat-fab:hover { transform:scale(1.1); box-shadow:0 6px 28px rgba(0,201,200,0.55); }

/* ── TOAST ── */
.cfh-toast {
  position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
  background:#0D1B2A; color:#fff; padding:12px 24px; border-radius:14px;
  font-size:14px; font-weight:600; z-index:999;
  box-shadow:0 6px 24px rgba(0,0,0,0.4); pointer-events:none;
  transition:opacity .3s; white-space:nowrap;
}
[data-theme="dark"] .cfh-toast { background:#E8F2FF; color:#0D1B2A; }

/* ── TWO COL ── */
.cfh-two-col { display:grid; grid-template-columns:1fr 1fr; gap:18px; }

/* ── RESPONSIVE ── */
@media(max-width:800px){
  .cfh-sidebar { width:58px; }
  .cfh-nav-label,.cfh-sidebar-label,.cfh-nav-badge,.cfh-divider { display:none; }
  .cfh-stats-grid { grid-template-columns:1fr 1fr; }
  .cfh-booking-wrap { grid-template-columns:1fr; }
  .cfh-cart-wrap { grid-template-columns:1fr; }
  .cfh-two-col { grid-template-columns:1fr; }
  .cfh-hero { padding:28px 24px; }
  .cfh-hero h1 { font-size:26px; }
  .cfh-hero-stats { gap:20px; }
  .cfh-form-row { grid-template-columns:1fr; }
}
@media(max-width:600px){
  .cfh-topbar { padding:0 12px; gap:10px; }
  .cfh-page { padding:16px 14px 50px; }
  .cfh-stats-grid { grid-template-columns:1fr; }
  .cfh-products-grid { grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); }
  .cfh-services-grid { grid-template-columns:1fr; }
  .cfh-tech-grid { grid-template-columns:1fr; }
}
`;

// ── DATA ──────────────────────────────────────────────────────

const PRODUCTS = [
  { emoji:'🔧', name:'LG Rotary Compressor R410A',        brand:'LG',        model:'CS10AWU',       price:12500, old:15000, rating:4.8, reviews:234, cat:'compressor', badge:'hot',  stock:'in',  warranty:'2 years' },
  { emoji:'🌀', name:'Samsung HEPA Air Filter',            brand:'Samsung',   model:'DA-99',         price:1100,  old:1400,  rating:4.6, reviews:89,  cat:'filter',     badge:'sale', stock:'in',  warranty:'6 months' },
  { emoji:'🌡️', name:'Digital Smart Thermostat WiFi',      brand:'Honeywell', model:'T6-PRO',        price:1800,  old:2200,  rating:4.7, reviews:156, cat:'thermostat', badge:'new',  stock:'in',  warranty:'1 year' },
  { emoji:'⚙️', name:'Daikin Fan Motor Assembly',          brand:'Daikin',    model:'FDM-15',        price:3200,  old:3800,  rating:4.5, reviews:67,  cat:'ac',         badge:'',     stock:'low', warranty:'1 year' },
  { emoji:'🔌', name:'Universal PCB Control Board',        brand:'Generic',   model:'PCB-UC3',       price:2800,  old:3500,  rating:4.3, reviews:45,  cat:'pcb',        badge:'sale', stock:'in',  warranty:'6 months' },
  { emoji:'💨', name:'R32 Refrigerant Gas Kit 1kg',        brand:'Honeywell', model:'R32-1KG',       price:2400,  old:2800,  rating:4.9, reviews:312, cat:'gas',        badge:'hot',  stock:'in',  warranty:'N/A' },
  { emoji:'🔩', name:'ACR Copper Pipe Set (3m)',           brand:'Mueller',   model:'CP-ACR3',       price:850,   old:1000,  rating:4.4, reviews:28,  cat:'copper',     badge:'',     stock:'in',  warranty:'N/A' },
  { emoji:'❄️', name:'Daikin Inverter Split AC 1.5T',      brand:'Daikin',    model:'FTKF50TV',      price:58000, old:68000, rating:4.9, reviews:412, cat:'unit',       badge:'hot',  stock:'in',  warranty:'5 years' },
  { emoji:'🧊', name:'Samsung Double Door Fridge 253L',    brand:'Samsung',   model:'RT28T3932S8',   price:42000, old:48000, rating:4.8, reviews:189, cat:'fridge',     badge:'new',  stock:'in',  warranty:'1 year' },
  { emoji:'🔧', name:'Mitsubishi Scroll Compressor',       brand:'Mitsubishi',model:'MZ-YR09NA',     price:18500, old:22000, rating:4.7, reviews:78,  cat:'compressor', badge:'',     stock:'low', warranty:'2 years' },
  { emoji:'🌀', name:'Panasonic HEPA + Carbon Filter',     brand:'Panasonic', model:'F-ZXHD55Z',     price:1600,  old:1900,  rating:4.5, reviews:54,  cat:'filter',     badge:'',     stock:'in',  warranty:'6 months' },
  { emoji:'🔌', name:'LG Inverter PCB Board',              brand:'LG',        model:'EBR80905202',   price:4200,  old:5000,  rating:4.4, reviews:38,  cat:'pcb',        badge:'sale', stock:'in',  warranty:'6 months' },
];

const SERVICES = [
  { emoji:'❄️', name:'AC Installation',           desc:'Professional split, window & cassette AC installation with copper piping and testing.',     price:'from Rs. 800',   eta:'2–3 hrs' },
  { emoji:'🔧', name:'AC Maintenance & Service',  desc:'Full service: filter cleaning, coil wash, cooling check and performance report.',           price:'from Rs. 500',   eta:'1–2 hrs' },
  { emoji:'💨', name:'Gas Refill (R32 / R410A)',  desc:'Refrigerant top-up with leak testing and pressure verification by certified engineers.',    price:'from Rs. 1,200', eta:'1–2 hrs' },
  { emoji:'🧊', name:'Refrigerator Repair',       desc:'Full diagnosis and repair of cooling faults, compressor, thermostat, and seals.',          price:'from Rs. 600',   eta:'1–3 hrs' },
  { emoji:'🔌', name:'PCB & Electrical Repair',   desc:'Diagnose and replace faulty PCB boards, capacitors, wiring and sensors.',                  price:'from Rs. 900',   eta:'2–4 hrs' },
  { emoji:'🚨', name:'Emergency Visit (24/7)',    desc:'Priority same-day service. Available 24 hours a day, 7 days a week.',                      price:'from Rs. 1,500', eta:'ASAP' },
  { emoji:'🏠', name:'Duct & Ventilation Cleaning',desc:'Complete duct sanitization using industrial-grade equipment. Improves air quality.',      price:'from Rs. 2,000', eta:'3–5 hrs' },
  { emoji:'🌡️', name:'Thermostat Replacement',    desc:'Upgrade to smart WiFi thermostat with professional installation and calibration.',         price:'from Rs. 400',   eta:'30–60 min' },
];

const TECHNICIANS = [
  { initials:'RK', name:'Ram Kumar Shrestha', role:'AC Installation Expert',  phone: '9812342238',  tags:['LG','Samsung'],                 rating:4.9, jobs:310, exp:'8 yrs', online:true,  grad:'linear-gradient(135deg,#00C9C8,#1E6FDB)' },
  { initials:'ST', name:'Guru Tamang',         role:'Gas Refill Specialist',  phone: '9812347898',   tags:['R32','R410A','R22'],            rating:4.8, jobs:187, exp:'5 yrs', online:true,  grad:'linear-gradient(135deg,#F59E0B,#EF4444)' },
  { initials:'PG', name:'Prabin Gurung',        role:'Refrigeration Engineer',  phone: '9812300378',  tags:['Fridge','Freezer','Cold Room'],rating:4.7, jobs:264, exp:'7 yrs', online:false, grad:'linear-gradient(135deg,#22C55E,#16A34A)' },
  { initials:'AM', name:'Anit Maharjan',       role:'PCB & Electronics Tech',  phone: '9812120678',  tags:['PCB','Inverter','Smart AC'],   rating:4.9, jobs:98,  exp:'4 yrs', online:true,  grad:'linear-gradient(135deg,#8B5CF6,#EC4899)' },
  { initials:'BT', name:'Bikash Thapa',         role:'AC & Fridge All-rounder',  phone: '9812229678', tags:['All Brands','Emergency'],      rating:4.6, jobs:445, exp:'10 yrs',online:false, grad:'linear-gradient(135deg,#FF6B35,#D4512A)' },
  { initials:'DS', name:'Deep Shrestha',       role:'HVAC System Technician',  phone: '9813495678', tags:['Central AC','Duct','VRF'],     rating:4.8, jobs:156, exp:'6 yrs', online:true,  grad:'linear-gradient(135deg,#06B6D4,#0284C7)' },
];

const CHART_DATA   = [6200, 8400, 5800, 9200, 12400, 9100];
const CHART_MONTHS = ['Dec','Jan','Feb','Mar','Apr','May'];

// ── SMALL REUSABLE COMPONENTS ──────────────────────────────────

function StatusPill({ status }) {
  const map = {
    Shipped:'s-shipped', Delivered:'s-delivered', Processing:'s-processing',
    Cancelled:'s-cancelled', Upcoming:'s-upcoming', Completed:'s-completed', Pending:'s-pending'
  };
  return <span className={`cfh-status-pill ${map[status]||'s-pending'}`}>{status}</span>;
}

function ProductCard({ p, onAddToCart, onBuyNow }) {
  const [wishlisted, setWishlisted] = useState(false);
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const stockClass = p.stock === 'in' ? 'stock-in' : p.stock === 'low' ? 'stock-low' : 'stock-out';
  const stockLabel = p.stock === 'in' ? '✓ In Stock' : p.stock === 'low' ? '⚠ Low Stock' : '✗ Out of Stock';

  return (
    <div className="cfh-product-card">
      <div className="cfh-product-img">
        <span style={{fontSize:72}}>{p.emoji}</span>
        {p.badge && (
          <span className={`cfh-product-badge badge-${p.badge}`}>
            {p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ New' : '💥 Sale'}
          </span>
        )}
        <button
          className={`cfh-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => { setWishlisted(w => !w); onAddToCart(wishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist!', true); }}
        >
          {wishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="cfh-product-body">
        <div className="cfh-product-brand">{p.brand}</div>
        <div className="cfh-product-name">{p.name}</div>
        <div className="cfh-product-model">Model: {p.model} · Warranty: {p.warranty}</div>
        <div className="cfh-product-price">
          <span className="cfh-price-now">Rs. {p.price.toLocaleString()}</span>
          {p.old && <span className="cfh-price-old">Rs. {p.old.toLocaleString()}</span>}
          {disc > 0 && <span className="cfh-price-off">−{disc}%</span>}
        </div>
        <div className="cfh-product-meta">
          <span className="cfh-stars">{'★'.repeat(Math.floor(p.rating))}</span>
          <span className="cfh-review-count">({p.reviews})</span>
          <span className={`cfh-stock-pill ${stockClass}`}>{stockLabel}</span>
        </div>
        <div className="cfh-product-actions">
          <button className="cfh-btn-add-cart" onClick={() => onAddToCart(`🛒 ${p.name.slice(0,28)}${p.name.length>28?'…':''} added to cart!`)}>
            🛒 Add to Cart
          </button>
          <button className="cfh-btn-buy-now" onClick={onBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s, onClick }) {
  return (
    <div className="cfh-service-card" onClick={onClick}>
      <div className="cfh-service-icon">{s.emoji}</div>
      <div className="cfh-service-name">{s.name}</div>
      <div className="cfh-service-desc">{s.desc}</div>
      <div className="cfh-service-footer">
        <span className="cfh-service-price">{s.price}</span>
        <span className="cfh-service-eta">⏱ {s.eta}</span>
      </div>
    </div>
  );
}

function TechCard({ t, onBook }) {
  return (
    <div className="cfh-tech-card">
      <div className="cfh-tech-avatar" style={{background:t.grad}}>
        {t.initials}
        <div className={`cfh-online-ring ${t.online ? 'online-ring-on' : 'online-ring-off'}`} />
      </div>
      <div className="cfh-tech-name">{t.name}</div>
      <div className="cfh-tech-role">{t.role}</div>
      <div className="cfh-tech-phone">
       📞 {t.phone}</div>
      <div className="cfh-tech-tags">{t.tags.map(g => <span key={g} className="cfh-tech-tag">{g}</span>)}</div>
      <button className="cfh-btn cfh-btn-full btn-primary btn-sm" style={{marginBottom:12,width:'100%'}} onClick={onBook}>📅 Book Now</button>
      <div className="cfh-tech-stats">
        <div className="cfh-tech-stat"><div className="cfh-tech-stat-val">{t.rating}⭐</div><div className="cfh-tech-stat-lbl">Rating</div></div>
        <div className="cfh-tech-stat"><div className="cfh-tech-stat-val">{t.jobs}</div><div className="cfh-tech-stat-lbl">Jobs Done</div></div>
        <div className="cfh-tech-stat"><div className="cfh-tech-stat-val">{t.exp}</div><div className="cfh-tech-stat-lbl">Experience</div></div>
      </div>
    </div>
  );
}

function MiniChart() {
  const max = Math.max(...CHART_DATA);
  return (
    <div>
      <div className="cfh-mini-chart">
        {CHART_DATA.map((v,i) => (
          <div key={i} className="cfh-chart-bar" style={{height:Math.round((v/max)*88)}} title={`Rs. ${v.toLocaleString()}`} />
        ))}
      </div>
      <div className="cfh-chart-x">
        {CHART_MONTHS.map(m => <div key={m} className="cfh-chart-x-lbl">{m}</div>)}
      </div>
    </div>
  );
}

function OrderRow({ icon, name, sub, status }) {
  return (
    <div className="cfh-order-row">
      <div className="cfh-order-icon">{icon}</div>
      <div className="cfh-order-info">
        <div className="cfh-order-name">{name}</div>
        <div className="cfh-order-sub">{sub}</div>
      </div>
      <StatusPill status={status} />
    </div>
  );
}

function PayMethods({ selected, onSelect }) {
  const methods = [
    { icon:'💜', label:'Khalti' },
    { icon:'💚', label:'eSewa' },
    { icon:'💳', label:'Stripe' },
    { icon:'💵', label:'Cash' },
  ];
  return (
    <div className="cfh-pay-methods">
      {methods.map(m => (
        <div key={m.label} className={`cfh-pay-chip ${selected === m.label ? 'active' : ''}`} onClick={() => onSelect(m.label)}>
          <span style={{fontSize:18}}>{m.icon}</span>{m.label}
        </div>
      ))}
    </div>
  );
}

function TrackingBar({ steps, doneCount }) {
  const pct = Math.round((doneCount / (steps.length - 1)) * 100);
  return (
    <div className="cfh-track-progress">
      <div className="cfh-track-line-bg">
        <div className="cfh-track-line-fill" style={{width:`${pct}%`}} />
      </div>
      <div className="cfh-track-dots">
        {steps.map((s, i) => (
          <div key={s} className={`cfh-track-dot-wrap ${i < doneCount ? 'done' : ''}`}>
            <div className={`cfh-track-dot ${i < doneCount ? 'done' : ''}`}>{i < doneCount ? '✓' : ''}</div>
            <div className="cfh-track-dot-label">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAGES ─────────────────────────────────────────────────────

function HomePage({ nav, showToast }) {
  const [activeCat, setActiveCat] = useState('all');
  const cats = [
    {id:'all',label:'⚡ All Products'},{id:'ac',label:'❄️ AC Units'},{id:'fridge',label:'🧊 Refrigerators'},
    {id:'compressor',label:'⚙️ Compressors'},{id:'filter',label:'🌀 Filters'},{id:'pcb',label:'🔌 PCB Boards'},
    {id:'gas',label:'💨 Gas Refill'},{id:'thermostat',label:'🌡️ Thermostats'},{id:'copper',label:'🔩 Copper Pipes'},
  ];
  const aiRecs = [
    {label:'🔧 LG Compressor R410A', score:'98% match', page:'marketplace'},
    {label:'🌀 HEPA Filter (Universal)', score:'91%', page:'marketplace'},
    {label:'💨 Gas Refill Service', score:'87%', page:'services'},
    {label:'🌡️ Digital Thermostat', score:'82%', page:'marketplace'},
    {label:'👷 AC Maintenance Due', score:'Overdue 3mo', page:'technicians'},
  ];

  return (
    <div className="cfh-page">
      {/* Hero */}
      <div className="cfh-hero">
        <div className="cfh-hero-glow" style={{top:'-80px',right:'-80px',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(0,201,200,0.18) 0%,transparent 65%)'}} />
        <div className="cfh-hero-glow" style={{bottom:'-100px',left:'25%',width:'350px',height:'350px',background:'radial-gradient(circle,rgba(30,111,219,0.12) 0%,transparent 65%)'}} />
        <div className="cfh-hero-content">
          <div className="cfh-hero-tag">⚡ World Cool Refrigeration</div>
          <h1>Your Complete<br /><span className="cfh-gradient-text">Cooling Solutions</span><br />Platform</h1>
          <p>Buy genuine spare parts, book certified technicians, and shop complete cooling systems — all in one place. Fast delivery across Nepal with verified service professionals.</p>
          <p>📍 Location: Biratnagar, Morang, Nepal</p>
          <p>💬 Fast & Reliable HVAC Service</p>
          <p>📞 Contact: +977-9845673456</p>
          
          <div className="cfh-hero-btns">
            <button className="cfh-btn btn-primary btn-lg" onClick={() => nav('marketplace')}>🛍️ Shop Parts & Units</button>
            <button className="cfh-btn btn-outline-white btn-lg" onClick={() => nav('services')}>🔧 Book a Service</button>
          </div>
          <div className="cfh-hero-stats">
            {[['12K+','Products Listed'],['480+','Certified Technicians'],['38K','Happy Customers'],['4.8★','Average Rating']].map(([n,l]) => (
              <div key={l}><div className="cfh-hero-stat-num">{n}</div><div className="cfh-hero-stat-lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="cfh-cat-chips">
        {cats.map(c => (
          <div key={c.id} className={`cfh-cat-chip ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => { setActiveCat(c.id); if (c.id !== 'all') nav('marketplace'); }}>
            {c.label}
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="cfh-ai-card">
        <div className="cfh-ai-header">
          <div className="cfh-ai-icon">🤖</div>
          <div>
            <div className="cfh-ai-title">AI Smart Recommendations</div>
            <div className="cfh-ai-sub">Based on your LG AC model CS10AWU &amp; usage history</div>
          </div>
        </div>
        <div className="cfh-ai-chips">
          {aiRecs.map(r => (
            <div key={r.label} className="cfh-ai-chip" onClick={() => nav(r.page)}>
              {r.label}<span className="cfh-ai-chip-score">{r.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="cfh-section-head">
        <div className="cfh-section-title">🔥 Featured Products</div>
        <span className="cfh-see-all" onClick={() => nav('marketplace')}>View all products →</span>
      </div>
      <div className="cfh-products-grid">
        {PRODUCTS.slice(0,4).map((p,i) => <ProductCard key={i} p={p} onAddToCart={showToast} onBuyNow={() => nav('cart')} />)}
      </div>

      {/* Popular Services */}
      <div className="cfh-section-head">
        <div className="cfh-section-title">🔧 Popular Services</div>
        <span className="cfh-see-all" onClick={() => nav('services')}>View all services →</span>
      </div>
      <div className="cfh-services-grid">
        {SERVICES.slice(0,4).map((s,i) => <ServiceCard key={i} s={s} onClick={() => nav('services')} />)}
      </div>

      {/* Top Technicians */}
      <div className="cfh-section-head">
        <div className="cfh-section-title">👷 Top Technicians</div>
        <span className="cfh-see-all" onClick={() => nav('technicians')}>Find technicians →</span>
      </div>
      <div className="cfh-tech-grid">
        {TECHNICIANS.slice(0,4).map((t,i) => <TechCard key={i} t={t} onBook={() => nav('services')} />)}
      </div>
    </div>
  );
}

function MarketplacePage({ showToast, nav }) {
  const [activeCat, setActiveCat] = useState('all');
  const [sortVal, setSortVal] = useState('');
  const [brand, setBrand] = useState('');

  const cats = [
    {id:'all',label:'⚡ All'},{id:'ac',label:'❄️ AC Parts'},{id:'fridge',label:'🧊 Fridge Parts'},
    {id:'compressor',label:'⚙️ Compressors'},{id:'gas',label:'💨 Gas & Kits'},{id:'pcb',label:'🔌 PCB/Electronics'},
    {id:'thermostat',label:'🌡️ Thermostats'},{id:'copper',label:'🔩 Copper/Pipes'},{id:'unit',label:'🏠 Complete Units'},
  ];

  let filtered = activeCat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === activeCat);
  if (brand) filtered = filtered.filter(p => p.brand === brand);
  if (sortVal === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
  if (sortVal === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sortVal === 'rating')     filtered.sort((a,b) => b.rating - a.rating);
  if (sortVal === 'new')        filtered.sort((a,b) => (b.badge === 'new') - (a.badge === 'new'));

  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:20}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700}}>🛍️ Product Marketplace</h2>
          <p style={{color:'var(--text2)',fontSize:14,marginTop:4}}>12,840 verified products across Nepal</p>
        </div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <select className="cfh-form-select" style={{width:'auto'}} value={sortVal} onChange={e => setSortVal(e.target.value)}>
            <option value="">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Best Rated</option>
            <option value="new">Newest</option>
          </select>
          <select className="cfh-form-select" style={{width:'auto'}} value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            {['LG','Samsung','Daikin','Mitsubishi','Panasonic','Honeywell'].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="cfh-cat-chips">
        {cats.map(c => (
          <div key={c.id} className={`cfh-cat-chip ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>{c.label}</div>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="cfh-products-grid">
          {filtered.map((p,i) => <ProductCard key={i} p={p} onAddToCart={showToast} onBuyNow={() => nav('cart')} />)}
        </div>
      ) : (
        <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text3)'}}>
          😔 No products found<br /><br />
          <button className="cfh-btn btn-ghost btn-sm" onClick={() => { setActiveCat('all'); setBrand(''); }}>View All Products</button>
        </div>
      )}
    </div>
  );
}

function ServicesPage({ nav, showToast }) {
  const [selSType, setSelSType] = useState({name:'AC Installation', price:'800'});
  const [selPay, setSelPay] = useState('Khalti');
  const [selTech, setSelTech] = useState(null);

  const stypes = [
    {label:'❄️ AC Installation', name:'AC Installation', price:'800'},
    {label:'🔧 AC Maintenance',   name:'AC Maintenance',  price:'500'},
    {label:'💨 Gas Refill',       name:'Gas Refill',      price:'1200'},
    {label:'🧊 Fridge Repair',    name:'Fridge Repair',   price:'600'},
    {label:'🔌 PCB Replace',      name:'PCB Replacement', price:'900'},
    {label:'🚨 Emergency',        name:'Emergency Visit', price:'1500'},
  ];

  const total = parseInt(selSType.price) + 50;

  return (
    <div className="cfh-page">
      <div style={{marginBottom:24}}>
        <div className="cfh-page-title">🔧 Book a Service</div>
        <div className="cfh-page-subtitle">Professional HVAC services at your doorstep • 480+ verified technicians</div>
      </div>

      <div className="cfh-section-head"><div className="cfh-section-title">Available Services</div></div>
      <div className="cfh-services-grid">
        {SERVICES.map((s,i) => <ServiceCard key={i} s={s} onClick={() => {}} />)}
      </div>

      <div className="cfh-section-head" style={{marginTop:10}}><div className="cfh-section-title">📅 Book an Appointment</div></div>
      <div className="cfh-booking-wrap">
        {/* Left */}
        <div className="cfh-booking-card">
          <div style={{fontSize:17,fontWeight:700,marginBottom:20}}>🔧 Service Details</div>
          <div className="cfh-sidebar-label" style={{marginBottom:10}}>Select Service Type</div>
          <div className="cfh-stype-grid">
            {stypes.map(st => (
              <button key={st.name} className={`cfh-stype-btn ${selSType.name === st.name ? 'active' : ''}`}
                onClick={() => setSelSType(st)}>{st.label}</button>
            ))}
          </div>
          <div className="cfh-form-group">
            <label className="cfh-form-label">📋 Issue Description</label>
            <textarea className="cfh-form-textarea" placeholder="Describe your cooling issue in detail..." />
          </div>
          <div className="cfh-form-group">
            <label className="cfh-form-label">📍 Service Address</label>
            <input className="cfh-form-input" placeholder="Enter your full address in Kathmandu..." />
          </div>
          <div className="cfh-form-row">
            <div className="cfh-form-group">
              <label className="cfh-form-label">📅 Preferred Date</label>
              <input className="cfh-form-input" type="date" />
            </div>
            <div className="cfh-form-group">
              <label className="cfh-form-label">🕐 Time Slot</label>
              <select className="cfh-form-select">
                <option>9:00 AM – 11:00 AM</option>
                <option>11:00 AM – 1:00 PM</option>
                <option>2:00 PM – 4:00 PM</option>
                <option>4:00 PM – 6:00 PM</option>
              </select>
            </div>
          </div>
          <div className="cfh-form-group">
            <label className="cfh-form-label">📸 Upload Issue Photos / Videos</label>
            <div className="cfh-upload-zone" onClick={() => showToast('📷 File picker opened!')}>
              📸 Click or drag & drop photos/videos of the issue here
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="cfh-booking-card">
          <div style={{fontSize:17,fontWeight:700,marginBottom:16}}>👷 Select Technician</div>
          {TECHNICIANS.filter(t => t.online).slice(0,3).map((t,i) => (
            <div key={i} className={`cfh-tech-select-item ${selTech === t.name ? 'active' : ''}`} onClick={() => setSelTech(t.name)}>
              <div style={{width:38,height:38,borderRadius:'50%',background:t.grad,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:700,flexShrink:0}}>{t.initials}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600}}>{t.name}</div>
                <div style={{fontSize:12,color:'var(--text3)'}}>{t.role} · ⭐ {t.rating} · {t.jobs} jobs</div>
              </div>
              <span style={{fontSize:12,fontWeight:600,color:'var(--green)'}}>🟢 Available</span>
            </div>
          ))}

          <div style={{marginTop:22,paddingTop:22,borderTop:'1px solid var(--border)'}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>💳 Booking Summary</div>
            <div className="cfh-booking-summary">
              {[
                ['Service', selSType.name],
                ['Technician', selTech || 'Not selected'],
                ['Date & Time', 'Today, 2:00 PM'],
                ['Base Price', `Rs. ${parseInt(selSType.price).toLocaleString()}`],
                ['Platform Fee', 'Rs. 50'],
              ].map(([k,v]) => (
                <div key={k} className="cfh-sum-row"><span>{k}</span><span>{v}</span></div>
              ))}
              <div className="cfh-sum-row">
                <span className="cfh-sum-total" style={{fontWeight:700}}>Total</span>
                <span className="cfh-sum-total">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <div className="cfh-sidebar-label" style={{marginBottom:10}}>Payment Method</div>
            <PayMethods selected={selPay} onSelect={setSelPay} />
            <button className="cfh-btn btn-primary btn-full btn-lg"
              onClick={() => { showToast('✅ Booking confirmed! Check your email & SMS.'); setTimeout(() => nav('dashboard'), 1200); }}>
              ✅ Confirm Booking — Rs. {total.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechniciansPage({ nav }) {
  const cats = ['⚡ All Specialists','❄️ AC Expert','🧊 Refrigeration','💨 Gas Expert','🔌 Electrical/PCB','🚨 Emergency'];
  const [active, setActive] = useState(0);
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:26}}>
        <div>
          <div className="cfh-page-title">👷 Certified Technicians</div>
          <div className="cfh-page-subtitle">Book from 480+ verified HVAC professionals across Nepal</div>
        </div>
        <button className="cfh-btn btn-ghost">🗺️ Map View</button>
      </div>
      <div className="cfh-cat-chips">
        {cats.map((c,i) => <div key={c} className={`cfh-cat-chip ${active===i?'active':''}`} onClick={() => setActive(i)}>{c}</div>)}
      </div>
      <div className="cfh-tech-grid">
        {TECHNICIANS.map((t,i) => <TechCard key={i} t={t} onBook={() => nav('services')} />)}
      </div>
    </div>
  );
}

function CartPage({ nav, showToast }) {
  const [items, setItems] = useState([
    { emoji:'🔧', name:'LG Rotary Compressor R410A',       meta:'LG Electronics · Model: CS10AWU · In Stock', price:'Rs. 12,500', qty:1 },
    { emoji:'🌀', name:'Samsung HEPA Air Filter (Twin Pack)',meta:'Samsung · Model: DA-99 · Universal Fit',     price:'Rs. 2,200',  qty:2 },
    { emoji:'🌡️', name:'Honeywell Digital Smart Thermostat',meta:'Honeywell · Model: T6-PRO · WiFi enabled',  price:'Rs. 1,800',  qty:1 },
  ]);
  const [selPay, setSelPay] = useState('Khalti');

  function changeQty(i, d) { setItems(prev => prev.map((it,idx) => idx===i ? {...it, qty:Math.max(1,it.qty+d)} : it)); }
  function removeItem(i) { setItems(prev => prev.filter((_,idx) => idx !== i)); showToast('Item removed from cart'); }

  return (
    <div className="cfh-page">
      <div style={{marginBottom:24}}>
        <div className="cfh-page-title">🛒 Shopping Cart</div>
        <div className="cfh-page-subtitle">Review your items before checkout</div>
      </div>
      <div className="cfh-cart-wrap">
        <div>
          <div className="cfh-card" style={{marginBottom:18}}>
            <div className="cfh-card-header">Cart Items <span style={{fontWeight:400,fontSize:14,color:'var(--text3)'}}>{items.length} items</span></div>
            {items.map((it,i) => (
              <div key={i} className="cfh-cart-item">
                <div className="cfh-cart-thumb">{it.emoji}</div>
                <div className="cfh-cart-item-info">
                  <div className="cfh-cart-item-name">{it.name}</div>
                  <div className="cfh-cart-item-meta">{it.meta}</div>
                  <div className="cfh-cart-item-price">{it.price}</div>
                </div>
                <div className="cfh-cart-item-right">
                  <button className="cfh-remove-item" onClick={() => removeItem(i)}>✕</button>
                  <div className="cfh-qty-ctrl">
                    <button className="cfh-qty-btn" onClick={() => changeQty(i,-1)}>−</button>
                    <span className="cfh-qty-num">{it.qty}</span>
                    <button className="cfh-qty-btn" onClick={() => changeQty(i,1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cfh-card">
            <div className="cfh-card-header">📦 Live Order Tracking</div>
            <div className="cfh-card-body">
              <div style={{fontSize:13,color:'var(--text3)',marginBottom:8}}>Order #CFH-2841 · LG Compressor</div>
              <TrackingBar steps={['Ordered','Confirmed','Packed','Shipped','Delivered']} doneCount={3} />
              <div style={{fontSize:13,color:'var(--text2)',marginTop:6}}>📍 Expected delivery: <strong>May 17, 2026</strong></div>
            </div>
          </div>
        </div>
        <div className="cfh-order-sum-card">
          <div className="cfh-order-sum-title">Order Summary</div>
          <div className="cfh-promo-row">
            <input placeholder="Enter promo code" />
            <button className="cfh-btn btn-primary btn-sm" onClick={() => showToast('✅ Code COOL10 applied! 10% off')}>Apply</button>
          </div>
          <div className="cfh-booking-summary">
            {[['Subtotal (4 items)','Rs. 18,700'],['Shipping','Free ✓'],['Promo (COOL10)','−Rs. 1,870'],['VAT (13%)','Rs. 2,186']].map(([k,v]) => (
              <div key={k} className="cfh-sum-row"><span>{k}</span><span style={k==='Shipping'||k.startsWith('Promo')?{color:'var(--green)'}:{}}>{v}</span></div>
            ))}
            <div className="cfh-sum-row"><span className="cfh-sum-total" style={{fontWeight:700}}>Total</span><span className="cfh-sum-total">Rs. 19,016</span></div>
          </div>
          <div className="cfh-sidebar-label" style={{marginBottom:10}}>Payment Method</div>
          <PayMethods selected={selPay} onSelect={setSelPay} />
          <button className="cfh-btn btn-primary btn-full btn-lg" style={{marginBottom:10}} onClick={() => showToast('🎉 Order placed! Check your email.')}>
            🔒 Checkout — Rs. 19,016
          </button>
          <button className="cfh-btn btn-ghost btn-full" onClick={() => nav('marketplace')}>← Continue Shopping</button>
          <div style={{marginTop:18,padding:12,background:'var(--bg)',borderRadius:'var(--r)',fontSize:12,color:'var(--text3)',textAlign:'center',lineHeight:1.6}}>
            🔒 Secure checkout · 🚚 Free delivery on orders Rs. 5,000+ · 🔄 7-day returns
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ nav }) {
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:24}}>
        <div>
          <div className="cfh-page-title">👋 Welcome back, Rajesh!</div>
          <div className="cfh-page-subtitle">Here's your CoolFix Hub account overview</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="cfh-btn btn-ghost btn-sm" onClick={() => nav('orders')}>📦 My Orders</button>
          <button className="cfh-btn btn-primary btn-sm" onClick={() => nav('marketplace')}>🛍️ Shop Now</button>
        </div>
      </div>

      <div className="cfh-stats-grid">
        {[
          {icon:'📦',cls:'ic-cyan',val:'12',label:'Total Orders',change:'↑ 3 new this month',up:true},
          {icon:'🔧',cls:'ic-blue',val:'5', label:'Service Bookings',change:'↑ 2 new this month',up:true},
          {icon:'❤️',cls:'ic-orange',val:'24',label:'Wishlist Items',change:'Across 8 brands',up:false},
          {icon:'⭐',cls:'ic-green',val:'4.9',label:'Reviews Given',change:'Top reviewer!',up:true},
        ].map(s => (
          <div key={s.label} className="cfh-stat-card">
            <div className={`cfh-stat-icon-wrap ${s.cls}`}>{s.icon}</div>
            <div className="cfh-stat-value">{s.val}</div>
            <div className="cfh-stat-label">{s.label}</div>
            <div className={`cfh-stat-change ${s.up ? 'change-up' : 'change-neu'}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="cfh-two-col" style={{marginBottom:18}}>
        <div className="cfh-card">
          <div className="cfh-card-header">Recent Orders <span className="cfh-see-all" onClick={() => nav('orders')}>View all →</span></div>
          <div className="cfh-order-rows">
            <OrderRow icon="🔧" name="LG Compressor R410A"  sub="3 days ago · Rs. 12,500" status="Shipped" />
            <OrderRow icon="🌀" name="HEPA Filter Pack ×2"  sub="1 week ago · Rs. 4,400"  status="Delivered" />
            <OrderRow icon="🌡️" name="Digital Thermostat"   sub="2 weeks ago · Rs. 1,800" status="Delivered" />
            <OrderRow icon="⚙️" name="Daikin Fan Motor"     sub="1 month ago · Rs. 3,200" status="Delivered" />
          </div>
        </div>
        <div className="cfh-card">
          <div className="cfh-card-header">Spending (Last 6 Months)</div>
          <div className="cfh-card-body">
            <MiniChart />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)'}}>
              <span style={{color:'var(--text2)'}}>Total Spent (6mo)</span>
              <span style={{fontWeight:700}}>Rs. 48,200</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cfh-card">
        <div className="cfh-card-header">🔧 Service Bookings</div>
        <div className="cfh-order-rows">
          <OrderRow icon="❄️" name="AC Installation — Daikin 1.5 Ton" sub="Tomorrow 2:00 PM · Ram Kumar Shrestha" status="Upcoming" />
          <OrderRow icon="💨" name="Gas Refill Service R32"            sub="Last week · Sita Tamang · Rs. 1,200"   status="Completed" />
          <OrderRow icon="🧊" name="Refrigerator Repair — Samsung"     sub="2 months ago · Prabin Gurung · Rs. 600" status="Completed" />
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ nav }) {
  const orders = [
    {id:'#CFH-2841',emoji:'🔧',product:'LG Compressor R410A',   date:'May 13, 2026',amount:'Rs. 12,500',status:'Shipped'},
    {id:'#CFH-2830',emoji:'🌀',product:'HEPA Filter ×2',         date:'May 9, 2026', amount:'Rs. 4,400', status:'Delivered'},
    {id:'#CFH-2801',emoji:'🌡️',product:'Digital Thermostat',     date:'May 2, 2026', amount:'Rs. 1,800', status:'Delivered'},
    {id:'#CFH-2788',emoji:'⚙️',product:'Daikin Fan Motor',       date:'Apr 28, 2026',amount:'Rs. 3,200', status:'Delivered'},
    {id:'#CFH-2740',emoji:'❄️',product:'Daikin Split AC 1.5T',   date:'Apr 10, 2026',amount:'Rs. 58,000',status:'Delivered'},
    {id:'#CFH-2710',emoji:'💨',product:'R32 Gas Refill Kit',      date:'Mar 22, 2026',amount:'Rs. 2,400', status:'Cancelled'},
  ];
  const tabs = ['All Orders (12)','Processing (1)','Shipped (1)','Delivered (9)','Cancelled (1)'];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:24}}>
        <div>
          <div className="cfh-page-title">📦 My Orders</div>
          <div className="cfh-page-subtitle">Track and manage all your purchases</div>
        </div>
        <button className="cfh-btn btn-primary btn-sm" onClick={() => nav('marketplace')}>+ New Order</button>
      </div>
      <div className="cfh-cat-chips">
        {tabs.map((t,i) => <div key={t} className={`cfh-cat-chip ${activeTab===i?'active':''}`} onClick={() => setActiveTab(i)}>{t}</div>)}
      </div>
      <div className="cfh-admin-table">
        <div className="cfh-admin-table-header">Order History <button className="cfh-btn btn-ghost btn-sm">Export CSV</button></div>
        <table>
          <thead><tr><th>Order ID</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td><div className="cfh-user-cell">{o.emoji} {o.product}</div></td>
                <td>{o.date}</td>
                <td><strong>{o.amount}</strong></td>
                <td><StatusPill status={o.status} /></td>
                <td><div className="cfh-action-btns">
                  <button className="cfh-action-btn ab-view">Invoice</button>
                  {o.status === 'Delivered' && <button className="cfh-action-btn ab-approve">Reorder</button>}
                  {o.status === 'Shipped'   && <button className="cfh-action-btn ab-view">Track</button>}
                  {o.status === 'Delivered' && <button className="cfh-action-btn ab-reject">Return</button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WishlistPage({ nav, showToast }) {
  return (
    <div className="cfh-page">
      <div style={{marginBottom:24}}>
        <div className="cfh-page-title">❤️ My Wishlist</div>
        <div className="cfh-page-subtitle">24 saved items across 8 brands</div>
      </div>
      <div className="cfh-products-grid">
        {[PRODUCTS[0],PRODUCTS[2],PRODUCTS[5],PRODUCTS[7]].map((p,i) => (
          <ProductCard key={i} p={p} onAddToCart={showToast} onBuyNow={() => nav('cart')} />
        ))}
      </div>
    </div>
  );
}

function NotificationsPage({ showToast }) {
  const [unread, setUnread] = useState([0,1,2]);
  const notifs = [
    {icon:'🚚',bg:'rgba(0,201,200,0.12)',title:'Your order is on the way!',msg:'LG Compressor R410A (Order #CFH-2841) has been dispatched. Expected delivery: May 17, 2026.',time:'2 hours ago'},
    {icon:'✅',bg:'rgba(34,197,94,0.12)', title:'Service Booking Confirmed!', msg:'AC Installation booked for tomorrow at 2:00 PM with Ram Kumar Shrestha.',time:'5 hours ago'},
    {icon:'🤖',bg:'rgba(139,92,246,0.12)',title:'AI Recommendation Alert',msg:'Based on your AC model, a gas refill service is recommended every 2 years.',time:'1 day ago'},
    {icon:'🔥',bg:'rgba(255,107,53,0.12)',title:'Flash Sale — 30% Off All Filters!',msg:'Limited time offer on all AC and refrigerator filters. Offer valid for 6 more hours.',time:'2 days ago'},
    {icon:'⭐',bg:'rgba(30,111,219,0.12)', title:'Rate Your Recent Service',msg:'How was your Gas Refill service with Sita Tamang? Your review helps other customers.',time:'3 days ago'},
    {icon:'📦',bg:'rgba(0,201,200,0.12)', title:'Order #CFH-2830 Delivered',msg:'Your Samsung HEPA Filter Pack has been delivered. Enjoy clean air!',time:'1 week ago'},
  ];
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:24}}>
        <div>
          <div className="cfh-page-title">🔔 Notifications</div>
          <div className="cfh-page-subtitle">{unread.length} unread notifications</div>
        </div>
        <button className="cfh-btn btn-ghost btn-sm" onClick={() => { setUnread([]); showToast('✓ All marked as read'); }}>Mark all read</button>
      </div>
      <div className="cfh-notif-list">
        {notifs.map((n,i) => (
          <div key={i} className={`cfh-notif-item ${unread.includes(i) ? 'unread' : ''}`} onClick={() => setUnread(u => u.filter(x => x !== i))}>
            <div className="cfh-notif-icon" style={{background:n.bg}}>{n.icon}</div>
            <div className="cfh-notif-content">
              <div className="cfh-notif-title">{n.title}</div>
              <div className="cfh-notif-msg">{n.msg}</div>
              <div className="cfh-notif-time">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SellerPage({ showToast }) {
  const products = [
    {emoji:'🔧',name:'LG Compressor R410A',  cat:'Compressor',      price:'Rs. 12,500',stock:'in',  stockN:8,  sold:42,rating:4.8},
    {emoji:'🌀',name:'HEPA Filter Universal', cat:'Filter',          price:'Rs. 1,100', stock:'low', stockN:3,  sold:89,rating:4.6},
    {emoji:'🌡️',name:'Digital Thermostat',    cat:'Controls',        price:'Rs. 1,800', stock:'in',  stockN:15, sold:67,rating:4.7},
    {emoji:'💨',name:'R32 Gas Refill Kit 1kg',cat:'Gas/Refrigerant', price:'Rs. 2,400', stock:'in',  stockN:22, sold:134,rating:4.9},
  ];
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:24}}>
        <div>
          <div className="cfh-page-title">💼 Seller Hub</div>
          <div className="cfh-page-subtitle">Manage your store, products, and earnings</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('📊 Analytics opened!')}>📊 Analytics</button>
          <button className="cfh-btn btn-primary btn-sm" onClick={() => showToast('📦 Add Product form ready!')}>+ Add Product</button>
        </div>
      </div>
      <div className="cfh-stats-grid">
        {[{icon:'📦',cls:'ic-cyan',val:'48',label:'Products Listed',change:'↑ 6 this month'},{icon:'🛒',cls:'ic-blue',val:'312',label:'Total Sales',change:'↑ 28 this month'},{icon:'💰',cls:'ic-orange',val:'Rs.184K',label:'Monthly Revenue',change:'↑ 22% vs last month'},{icon:'⭐',cls:'ic-green',val:'4.8',label:'Store Rating',change:'Based on 312 reviews'}].map(s => (
          <div key={s.label} className="cfh-stat-card">
            <div className={`cfh-stat-icon-wrap ${s.cls}`}>{s.icon}</div>
            <div className="cfh-stat-value">{s.val}</div>
            <div className="cfh-stat-label">{s.label}</div>
            <div className="cfh-stat-change change-up">{s.change}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
        <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('💵 Withdrawal initiated!')}>💵 Withdraw Earnings</button>
        <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('🚚 Shipping settings!')}>🚚 Shipping</button>
        <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('💬 Messages opened!')}>💬 Messages</button>
      </div>
      <div className="cfh-admin-table">
        <div className="cfh-admin-table-header">My Products (48 active)</div>
        <table>
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sales</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((p,i) => (
              <tr key={i}>
                <td><div className="cfh-user-cell">{p.emoji} {p.name}</div></td>
                <td>{p.cat}</td>
                <td>{p.price}</td>
                <td><span className={`cfh-stock-pill ${p.stock === 'in' ? 'stock-in' : 'stock-low'}`}>{p.stock === 'in' ? `In Stock (${p.stockN})` : `Low Stock (${p.stockN})`}</span></td>
                <td>{p.sold} sold</td>
                <td>⭐ {p.rating}</td>
                <td><div className="cfh-action-btns"><button className="cfh-action-btn ab-edit">Edit</button><button className="cfh-action-btn ab-reject">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPage({ showToast }) {
  const techs = [
    {initials:'RK',name:'Ram Kumar Shrestha',role:'AC Installation',location:'Lalitpur',exp:'5 years',docs:'Verified',grad:'linear-gradient(135deg,#00C9C8,#1E6FDB)'},
    {initials:'ST',name:'Sita Tamang',        role:'Gas Refill Expert',location:'Bhaktapur',exp:'3 years',docs:'Pending',grad:'linear-gradient(135deg,#F59E0B,#EF4444)'},
    {initials:'PG',name:'Prabin Gurung',       role:'Refrigeration Eng.',location:'Kathmandu',exp:'7 years',docs:'Verified',grad:'linear-gradient(135deg,#22C55E,#16A34A)'},
  ];
  const orders = [
    {id:'#CFH-2841',customer:'Rajesh K.',product:'LG Compressor',  amount:'Rs. 12,500',pay:'Khalti',payClass:'pill-cyan',status:'Shipped'},
    {id:'#CFH-2840',customer:'Anita S.', product:'Daikin AC 1.5T', amount:'Rs. 68,000',pay:'eSewa', payClass:'pill-green',status:'Processing'},
    {id:'#CFH-2839',customer:'Bikash T.',product:'HEPA Filter ×2', amount:'Rs. 4,400', pay:'Stripe',payClass:'pill-blue',status:'Delivered'},
    {id:'#CFH-2838',customer:'Maya P.',  product:'R32 Gas Refill',  amount:'Rs. 2,400', pay:'Cash',  payClass:'pill-orange',status:'Delivered'},
  ];
  return (
    <div className="cfh-page">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:24}}>
        <div>
          <div className="cfh-page-title">⚙️ Admin Dashboard</div>
          <div className="cfh-page-subtitle">CoolFix Hub Control Center • May 16, 2026</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('📩 Sending bulk notification...')}>📩 Notify Users</button>
          <button className="cfh-btn btn-primary btn-sm" onClick={() => showToast('📊 Report generating...')}>📊 Export Report</button>
        </div>
      </div>
      <div className="cfh-stats-grid">
        {[{icon:'👥',cls:'ic-cyan',val:'38,241',label:'Total Users',change:'↑ 842 this month'},{icon:'📦',cls:'ic-blue',val:'12,840',label:'Products Listed',change:'↑ 340 new'},{icon:'💰',cls:'ic-orange',val:'Rs. 2.4M',label:'Monthly Revenue',change:'↑ 18% vs last'},{icon:'🔧',cls:'ic-green',val:'480',label:'Active Technicians',change:'↑ 24 new this month'}].map(s => (
          <div key={s.label} className="cfh-stat-card">
            <div className={`cfh-stat-icon-wrap ${s.cls}`}>{s.icon}</div>
            <div className="cfh-stat-value">{s.val}</div>
            <div className="cfh-stat-label">{s.label}</div>
            <div className="cfh-stat-change change-up">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="cfh-admin-table">
        <div className="cfh-admin-table-header">⏳ Pending Technician Approvals <span className="cfh-pill pill-orange">5 pending</span></div>
        <table>
          <thead><tr><th>Technician</th><th>Specialty</th><th>Location</th><th>Experience</th><th>Docs</th><th>Actions</th></tr></thead>
          <tbody>
            {techs.map((t,i) => (
              <tr key={i}>
                <td><div className="cfh-user-cell"><div className="cfh-user-mini-av" style={{background:t.grad}}>{t.initials}</div>{t.name}</div></td>
                <td>{t.role}</td><td>{t.location}</td><td>{t.exp}</td>
                <td><StatusPill status={t.docs === 'Verified' ? 'Completed' : 'Pending'} /></td>
                <td><div className="cfh-action-btns">
                  <button className="cfh-action-btn ab-view">Profile</button>
                  <button className="cfh-action-btn ab-approve" onClick={() => showToast(`✅ ${t.name} approved!`)}>Approve</button>
                  <button className="cfh-action-btn ab-reject" onClick={() => showToast('❌ Rejected')}>Reject</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cfh-admin-table">
        <div className="cfh-admin-table-header">📦 Recent Orders <button className="cfh-btn btn-ghost btn-sm" onClick={() => showToast('📄 CSV exported!')}>Export CSV</button></div>
        <table>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td><strong>{o.amount}</strong></td>
                <td><span className={`cfh-pill ${o.payClass}`}>{o.pay}</span></td>
                <td><StatusPill status={o.status} /></td>
                <td><div className="cfh-action-btns"><button className="cfh-action-btn ab-view">View</button>{o.status === 'Processing' && <button className="cfh-action-btn ab-approve">Confirm</button>}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── NAV CONFIG ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:'home',          icon:'🏠', label:'Home' },
  { id:'marketplace',   icon:'🛍️', label:'Marketplace' },
  { id:'services',      icon:'🔧', label:'Services' },
  { id:'technicians',   icon:'👷', label:'Technicians' },
  { divider: true },
  { id:'dashboard',     icon:'📊', label:'Dashboard' },
  { id:'orders',        icon:'📦', label:'My Orders', badge:'2' },
  { id:'cart',          icon:'🛒', label:'Cart' },
  { id:'wishlist',      icon:'❤️', label:'Wishlist' },
  { id:'notifications', icon:'🔔', label:'Notifications' },
  { divider: true },
  { id:'seller',        icon:'💼', label:'Seller Hub' },
  { id:'admin',         icon:'⚙️', label:'Admin Panel' },
];

// ── ROOT APP ──────────────────────────────────────────────────

export default function CoolFixHub() {
  const [page, setPage]       = useState('home');
  const [dark, setDark]       = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [notifCount]          = useState(3);
  const [searchVal, setSearchVal] = useState('');
  const [toast, setToast]     = useState({ msg:'', visible:false });
  const toastRef              = useRef(null);
  const searchTimer           = useRef(null);

  // Inject CSS once
  useEffect(() => {
    const id = 'cfh-styles';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
    return () => {};
  }, []);

  // Apply dark mode to root element
  useEffect(() => {
    const root = document.getElementById('cfh-root');
    if (root) root.setAttribute('data-theme', dark ? 'dark' : '');
  }, [dark]);

  function nav(p) { setPage(p); setSearchVal(''); }

  function showToast(msg, noCart) {
    if (!noCart && msg.includes('added to cart')) {
      setCartCount(c => c + 1);
    }
    setToast({ msg, visible: true });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(t => ({...t, visible:false})), 3000);
  }

  function handleSearch(val) {
    setSearchVal(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      if (val.length >= 2) setPage('marketplace');
    }, 300);
  }

  const pageMap = {
    home:          <HomePage          nav={nav} showToast={showToast} />,
    marketplace:   <MarketplacePage   showToast={showToast} nav={nav} />,
    services:      <ServicesPage      nav={nav} showToast={showToast} />,
    technicians:   <TechniciansPage   nav={nav} />,
    dashboard:     <DashboardPage     nav={nav} />,
    orders:        <OrdersPage        nav={nav} />,
    cart:          <CartPage          nav={nav} showToast={showToast} />,
    wishlist:      <WishlistPage      nav={nav} showToast={showToast} />,
    notifications: <NotificationsPage showToast={showToast} />,
    seller:        <SellerPage        showToast={showToast} />,
    admin:         <AdminPage         showToast={showToast} />,
  };

  return (
    <div id="cfh-root" data-theme={dark ? 'dark' : ''} className="cfh-shell">

      {/* ── TOPBAR ── */}
      <div className="cfh-topbar">
        <div className="cfh-logo" onClick={() => nav('home')}>
          <div className="cfh-logo-mark">❄️</div>
          <div className="cfh-logo-text">WORLD<em>COOL</em>REFRIGERATION</div>
        </div>

        <div className="cfh-search-wrap">
          <div className="cfh-search-bar">
            <span className="cfh-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search ACs, spare parts, refrigerators..."
              value={searchVal}
              onChange={e => handleSearch(e.target.value)}
            />
            <button className="cfh-voice-btn" onClick={() => showToast('🎤 Voice search activated!')}>🎤</button>
          </div>
        </div>

        <div className="cfh-topbar-right">
          <div className="cfh-icon-btn" onClick={() => nav('notifications')} title="Notifications">
            🔔<span className="cfh-notif-badge">{notifCount}</span>
          </div>
          <div className="cfh-icon-btn" onClick={() => nav('cart')} title="Cart">
            🛒<span className="cfh-notif-badge">{cartCount}</span>
          </div>
          <div className="cfh-icon-btn" onClick={() => nav('wishlist')} title="Wishlist">❤️</div>
          <button className="cfh-theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <div className="cfh-user-avatar" onClick={() => nav('dashboard')} title="My Profile">RK</div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="cfh-main">

        {/* ── SIDEBAR ── */}
        <nav className="cfh-sidebar">
          <div className="cfh-sidebar-section">
            <div className="cfh-sidebar-label">Discover</div>
            {NAV_ITEMS.map((item, i) => {
              if (item.divider) return <div key={`d${i}`} className="cfh-divider" />;
              if (i === 5) return (
                <div key="discover-label">
                  <div className="cfh-sidebar-label">Account</div>
                  <button className={`cfh-nav-item ${page === item.id ? 'active' : ''}`} onClick={() => nav(item.id)}>
                    <span className="cfh-nav-icon">{item.icon}</span>
                    <span className="cfh-nav-label">{item.label}</span>
                    {item.badge && <span className="cfh-nav-badge">{item.badge}</span>}
                  </button>
                </div>
              );
              if (i === 11) return (
                <div key="mgmt-label">
                  <div className="cfh-sidebar-label">Management</div>
                  <button className={`cfh-nav-item ${page === item.id ? 'active' : ''}`} onClick={() => nav(item.id)}>
                    <span className="cfh-nav-icon">{item.icon}</span>
                    <span className="cfh-nav-label">{item.label}</span>
                  </button>
                </div>
              );
              return (
                <button key={item.id} className={`cfh-nav-item ${page === item.id ? 'active' : ''}`} onClick={() => nav(item.id)}>
                  <span className="cfh-nav-icon">{item.icon}</span>
                  <span className="cfh-nav-label">{item.label}</span>
                  {item.badge && <span className="cfh-nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── CONTENT ── */}
        <div className="cfh-content">
          {pageMap[page] || pageMap['home']}
        </div>
      </div>

      {/* ── CHAT FAB ── */}
      <button className="cfh-chat-fab" onClick={() => showToast('💬 Connecting to live support agent...')} title="Live Chat Support">
        💬
      </button>

      {/* ── TOAST ── */}
      <div className="cfh-toast" style={{ opacity: toast.visible ? 1 : 0 }}>
        {toast.msg}
      </div>
    </div>
  );
}
