# FamCare Global — Diaspora-Funded Elder-Care Coordination & Clinical Monitoring

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/21cabbagee/famcare-global/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/famcare-global/actions/workflows/deploy.yml)

> **Cross-border elder-care operating system enabling high-earning diaspora children to book, verify, and clinically monitor vetted care for aging parents back home.**

---

## 1. Executive Summary & Problem Thesis
- **System Name:** FamCare Global
- **Market Sizing (TAM):** 4,000,000 affluent diaspora families funding home-country elder care × $150/month clinical oversight fee ($1,800/yr) = **$7.20 Billion TAM**.
- **The Problem:** Millions of expatriates and diaspora professionals (in London, Dubai, New York, Madrid) have aging parents in Mexico, Colombia, Egypt, and India. Domestic elder care in these regions is trapped in the untaxed informal economy: unvetted domestic cleaners paid cash with zero clinical accountability. Long-distance children live in constant panic over emergency falls, missed chronic medications, and exploitation.
- **The Solution:** Dual-currency portal (sponsor pays USD/EUR/GBP; vetted local nurses and clinics paid in local currency). Features GPS geofenced clock-in proof, daily vital signs verification (blood pressure, glucose), automated daily WhatsApp family digest summaries, and a 24/7 on-call tele-geriatrician escalation desk.

---

## 2. Technical Architecture & Agent Build Stack
- **Frontend:** React 18, Vite, TailwindCSS, Lucide Icons.
- **Engine Architecture:**
  1. **Dual-Currency Billing:** Stripe subscription billing with automated FX conversion to local banking rails.
  2. **GPS Geofence Clock-in:** Mobile browser geolocation validating nurse presence within 25 meters of the residence.
  3. **WhatsApp Cloud API Stream:** Automated webhook generating certified daily clinical digests with photo confirmation.
  4. **Tele-Geriatrician Video:** Daily.co WebRTC integration for three-way clinical consultation between expat child, parent, and physician.

---

## 3. SEO & Canonical Setup
- **H1:** `Diaspora Elder-Care Management: Clinical Oversight & Peace of Mind for Parents Back Home`
- **Canonical Slug:** `/solutions/diaspora-elder-care-coordination`
- **Keywords:** `diaspora elder care coordination platform`, `fund aging parents healthcare from abroad`, `vetted home nursing care latam gulf`, `cross border elderly clinical monitoring app`

---

## 4. Local Development
```bash
npm install
npm run dev
# Or preview production bundle:
npm run build
python3 -m http.server 8123 --directory dist
```
Navigate to `http://localhost:8123`.
