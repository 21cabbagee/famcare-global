import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, HeartPulse, Send } from 'lucide-react';

/**
 * OutcomeChart for FamCare Global (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares unmonitored raw cash remittances & $4k emergency room panics ($6 leakage & crisis care) with Autonomous Geofenced Clinical Escrow ($1 software).
 */
export default function OutcomeChart({
  serviceName = "Diaspora Parent Care Escrow & Daily Clinical Oversight",
  defaultMonthlyStipend = 650,
  onCtaClick
}) {
  const [stipend, setStipend] = useState(defaultMonthlyStipend);

  // Financial breakdown
  // Traditional unmanaged cash: 62% wasted on remittance fees, non-medical diversion & preventable ER visits
  const legacyAnnualWaste = Math.round(stipend * 12 * 0.62) + 2400; // includes amortized preventable ER flare-up
  // FamCare closed-loop software fee is $49/mo flat with guaranteed clinical verification
  const famCareAnnualSoftwareFee = 49 * 12;
  const netFamilySavings = legacyAnnualWaste - famCareAnnualSoftwareFee;
  const savingsPercent = Math.round(((legacyAnnualWaste - famCareAnnualSoftwareFee) / legacyAnnualWaste) * 100);

  const maxCost = Math.max(legacyAnnualWaste, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((famCareAnnualSoftwareFee / maxCost) * 100), 12);

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-teal-500/30 text-teal-400">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Unmonitored Remittance Waste ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Diaspora Capital Protection: <span className="text-teal-400">{savingsPercent}% Health Dollar Efficiency</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Sending raw cash home leads to diverted funds, missed blood pressure spikes, and catastrophic emergency hospital bills. We replace raw remittances with closed-loop clinical escrow and daily WhatsApp proof-of-care.
          </p>
        </div>

        <div className="text-right bg-slate-950/60 border border-slate-800 rounded-xl p-3 px-4 min-w-[190px]">
          <span className="text-[11px] text-slate-400 block font-medium">Annual Capital Safeguarded</span>
          <span className="text-2xl md:text-3xl font-black text-teal-400">
            ${netFamilySavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-teal-400/80 flex items-center justify-end gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> 0% Fund Diversion
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-slate-800">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-400" />
            Monthly Healthcare Remittance Sent to Parents:
          </label>
          <span className="text-base font-bold text-white bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            ${stipend.toLocaleString()} / mo (${(stipend * 12).toLocaleString()} / yr)
          </span>
        </div>
        <input 
          type="range" 
          min={250} 
          max={2000} 
          step={50}
          value={stipend}
          onChange={(e) => setStipend(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>$250 / mo (Maintenance & Meds)</span>
          <span>$650 / mo (Daily Home Nurse Visit)</span>
          <span>$2,000+ / mo (24/7 Assisted Intensive Care)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Annual Family Health Cost Risk</span>
            <span className="text-[10px] text-slate-500">Unmanaged Cash vs Escrow</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Unmonitored Cash + Crisis Hospital Admissions ($6)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyAnnualWaste.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-teal-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  FamCare Programmatic Clinical Escrow ($1)
                </span>
                <span className="font-mono font-bold text-teal-300">${famCareAnnualSoftwareFee.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-teal-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 rounded-lg shadow-lg shadow-teal-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Capital Retained for Family Security:</span>
            <span className="text-sm font-bold text-teal-400 font-mono">+${netFamilySavings.toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Geofenced GPS Check-In Escrow</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Nurses and clinicians are only paid once their verified GPS coordinates match the parent's home and shift duration is completed.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Automated WhatsApp Clinical Digests</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every evening at 8:00 PM, family members in the US/UK receive an automated bilingual WhatsApp summary with verified blood pressure, pulse, and medication compliance photos.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Pharmacy & Clinic Settlement</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Insulin, hypertensive meds, and diagnostic lab tests are settled directly with accredited healthcare partners — zero raw cash in middle hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
