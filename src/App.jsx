import React, { useState } from 'react';
import { 
  Heart, ShieldCheck, MapPin, Smartphone, ArrowRight, CheckCircle2, 
  AlertTriangle, RefreshCw, Layers, DollarSign, Database, Activity, 
  Clock, Video, Send, FileText, ChevronRight, X, UserCheck, Sparkles, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticlesCanvas from './components/ParticlesCanvas';
import OutcomeChart from './components/OutcomeChart';

export default function App() {
  const [activeTab, setActiveTab] = useState('portal'); // 'portal' | 'caregiver' | 'whatsapp' | 'telehealth'
  const [sponsorCurrency, setSponsorCurrency] = useState('USD');
  const [parentCountry, setParentCountry] = useState('MX'); // Mexico, Colombia, Egypt, India
  const [carePlan, setCarePlan] = useState('CLINICAL'); // 'COMPANION' | 'CLINICAL' | 'INTENSIVE'

  // Caregiver check-in state
  const [clockedIn, setClockedIn] = useState(true);
  const [vitalsLogged, setVitalsLogged] = useState(false);
  const [bloodPressure, setBloodPressure] = useState('122/78');
  const [glucose, setGlucose] = useState('108');
  const [medsTaken, setMedsTaken] = useState(true);
  const [whatsappSent, setWhatsappSent] = useState(false);

  // CAB Modal
  const [cabModalOpen, setCabModalOpen] = useState(false);
  const [cabForm, setCabForm] = useState({ name: '', email: '', diasporaLocation: 'London, UK', parentCountry: 'Mexico' });
  const [cabSubmitted, setCabSubmitted] = useState(false);

  const countries = [
    { id: 'MX', name: 'Mexico (Mexico City / Guadalajara)', localCur: 'MXN', fxRate: 19.8, city: 'Coyoacán, CDMX' },
    { id: 'CO', name: 'Colombia (Bogotá / Medellín)', localCur: 'COP', fxRate: 4250, city: 'Poblado, Medellín' },
    { id: 'EG', name: 'Egypt (Cairo / Alexandria)', localCur: 'EGP', fxRate: 48.5, city: 'Zamalek, Cairo' },
    { id: 'IN', name: 'India (Kerala / Bangalore)', localCur: 'INR', fxRate: 83.9, city: 'Kochi, Kerala' }
  ];

  const selectedCountry = countries.find(c => c.id === parentCountry) || countries[0];

  const planPricingUSD = {
    COMPANION: 120, // $120/mo
    CLINICAL: 280,  // $280/mo (nurse 3x week + vitals)
    INTENSIVE: 540  // $540/mo (daily nursing + physician on-call)
  };

  const planName = {
    COMPANION: 'Companion & Weekly Vitals',
    CLINICAL: 'Vetted Registered Nurse (3x/Wk) & Daily Telemetry',
    INTENSIVE: 'Full Clinical Care & 24/7 Geriatrician Desk'
  };

  const priceUSD = planPricingUSD[carePlan];
  const localPayout = Math.round(priceUSD * selectedCountry.fxRate);

  const handleLogVitals = (e) => {
    e.preventDefault();
    setVitalsLogged(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
    } catch (e) {}
  };

  const sendWhatsAppStream = () => {
    setWhatsappSent(true);
    setTimeout(() => {
      setWhatsappSent(false);
      alert('WhatsApp daily update sent to sponsor in London (+44 7911 123456) with verified photos and vitals chart.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-teal-500 selection:text-black">
      {/* Top Notification */}
      <div className="border-b border-teal-500/20 bg-teal-950/40 px-4 py-2 text-center text-xs font-medium text-teal-300">
        🩺 <span className="font-semibold text-teal-200">FamCare Global V1:</span> Clinical elder-care monitoring for diaspora families in US, UK, and UAE.
        <button onClick={() => setCabModalOpen(true)} className="ml-2 underline hover:text-white">Design Partner Cohort (70% Expat Privilege)</button>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-teal-500/20">
              FC
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                FamCare Global
                <span className="text-[10px] uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full font-semibold">Diaspora OS</span>
              </span>
              <p className="text-[11px] text-slate-400">Cross-Border Clinical Elder Care</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('portal')} className={`hover:text-teal-400 transition ${activeTab === 'portal' ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''}`}>Family Portal</button>
            <button onClick={() => setActiveTab('caregiver')} className={`hover:text-teal-400 transition ${activeTab === 'caregiver' ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''}`}>GPS Shift & Vitals</button>
            <button onClick={() => setActiveTab('whatsapp')} className={`hover:text-teal-400 transition ${activeTab === 'whatsapp' ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''}`}>WhatsApp Intelligence</button>
            <button onClick={() => setActiveTab('telehealth')} className={`hover:text-teal-400 transition ${activeTab === 'telehealth' ? 'text-teal-400 border-b-2 border-teal-400 pb-1' : ''}`}>Tele-Geriatrician Desk</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCabModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs tracking-wide transition shadow-lg shadow-teal-500/25 flex items-center gap-1.5"
            >
              Diaspora Family Pilot
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Casberry-style Particles Canvas */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Interactive WebGL / Casberry Canvas Simulation */}
        <ParticlesCanvas color="20, 184, 166" particleCount={50} connectionDistance={120} />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-5">
          {/* Kokonut UI Shimmering Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/40 text-xs text-slate-200 shadow-lg shadow-teal-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="font-semibold text-teal-300">Live Clinical Escrow Infrastructure</span>
            <span className="text-slate-500">•</span>
            <span>Fund Care in USD / GBP ➔ Local Clinical Caregiver Paid in MXN / COP / EGP</span>
          </div>

          {/* EXACT H1 TAG */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Diaspora Elder-Care Management: Clinical Oversight & Peace of Mind for Parents Back Home
          </h1>

          <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto">
            Stop worrying from 5,000 miles away. Fund vetted home nurses, verify geofenced clock-ins, monitor blood pressure & glucose trends, and receive automated daily WhatsApp clinical digests.
          </p>

          {/* Larry Ellison Playbook: Confuse the Tenses & Sell Harder Than You Build */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span><strong className="text-white">Service-as-a-Software Clinical Escrow:</strong> Zero remittance leakage. Caregivers are paid strictly upon geofenced proof-of-visit.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('caregiver')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-sm hover:from-teal-400 hover:to-emerald-300 transition shadow-xl shadow-teal-500/25 flex items-center gap-2 group cursor-pointer"
            >
              <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Simulate Daily Nurse Visit & Vitals Check
            </button>
            <button 
              onClick={() => setActiveTab('whatsapp')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              Preview WhatsApp Daily Digest
            </button>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-teal-500/30 transition">
              <span className="text-slate-400 block">Caregiver Vetting</span>
              <span className="text-xl font-bold text-teal-400">100% Licensed</span>
              <span className="text-[10px] text-slate-500 block">Criminal & Clinical Check</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-teal-500/30 transition">
              <span className="text-slate-400 block">Shift Verification</span>
              <span className="text-xl font-bold text-white">GPS Geofence</span>
              <span className="text-[10px] text-slate-500 block">Clock-In Proof at Home</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-teal-500/30 transition">
              <span className="text-slate-400 block">Family Communication</span>
              <span className="text-xl font-bold text-emerald-400">WhatsApp Cloud</span>
              <span className="text-[10px] text-slate-500 block">Real-Time Daily Briefs</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs backdrop-blur-md hover:border-teal-500/30 transition">
              <span className="text-slate-400 block">Emergency Escalation</span>
              <span className="text-xl font-bold text-teal-300">24/7 Physician</span>
              <span className="text-[10px] text-slate-500 block">On-Call Tele-Geriatrician</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspaces */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Sequoia Framework Outcome Visualizer (Bklit UI + Julien Bek $1 vs $6 Ratio) */}
        <div className="mb-12">
          <OutcomeChart 
            serviceName="Diaspora Parent Care Escrow & Daily Clinical Oversight"
            defaultMonthlyStipend={700}
            onCtaClick={() => setCabModalOpen(true)}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('portal')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'portal' ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <DollarSign className="w-4 h-4" />
            Cross-Border Family Portal
          </button>
          <button 
            onClick={() => setActiveTab('caregiver')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'caregiver' ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <MapPin className="w-4 h-4" />
            Caregiver GPS & Vitals Log
          </button>
          <button 
            onClick={() => setActiveTab('whatsapp')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'whatsapp' ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Send className="w-4 h-4" />
            WhatsApp Intelligence Feed
          </button>
          <button 
            onClick={() => setActiveTab('telehealth')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'telehealth' ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Video className="w-4 h-4" />
            Tele-Geriatrician Escalation Desk
          </button>
        </div>

        {/* Tab 1: Portal & Billing */}
        {activeTab === 'portal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-teal-400" />
                  Dual-Currency Care Booking
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Parent's Home Country</label>
                    <select 
                      value={parentCountry}
                      onChange={(e) => setParentCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    >
                      {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Clinical Supervision Tier</label>
                    <div className="space-y-2">
                      {['COMPANION', 'CLINICAL', 'INTENSIVE'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setCarePlan(t)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition ${carePlan === t ? 'bg-teal-950/40 border-teal-500/60 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          <div className="flex justify-between font-bold">
                            <span>{planName[t]}</span>
                            <span className="font-mono">${planPricingUSD[t]}/mo</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Sponsor Card Charge:</span>
                      <span className="font-mono text-white font-bold">${priceUSD}.00 USD/month</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Caregiver & Clinic Payout:</span>
                      <span className="font-mono text-teal-400 font-bold">{localPayout.toLocaleString()} {selectedCountry.localCur}/month</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Assigned Clinic:</span>
                      <span className="text-slate-200 font-medium">{selectedCountry.city} Regional Care</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('caregiver')}
                    className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
                  >
                    Confirm Care Plan & View Active Shift
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Parent Profile Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-base">Elena R. (Age 74)</h3>
                    <p className="text-xs text-slate-400">Residence: {selectedCountry.city} • Sponsor: Carlos R. (London, UK)</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-medium border border-teal-500/30">
                    Active Care Shield
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Primary Nurse</span>
                    <span className="font-bold text-white">Nurse Sofia M., RN</span>
                    <span className="text-[10px] text-teal-400">Verified ID #MX-8812</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Last Blood Pressure</span>
                    <span className="font-bold text-white">{bloodPressure} mmHg</span>
                    <span className="text-[10px] text-emerald-400">Within Normal Range</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Medication Adherence</span>
                    <span className="font-bold text-emerald-400">98.5% Adherence</span>
                    <span className="text-[10px] text-slate-400">30-Day Verified</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-slate-200 block">Active Chronic Care Protocol:</span>
                  <p className="text-slate-400">Type 2 Diabetes & Hypertension monitoring. Prescribed Metformin 500mg BID and Losartan 50mg daily. Daily vitals logging required at 09:30 AM local time.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Caregiver GPS Shift */}
        {activeTab === 'caregiver' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Caregiver Verification & GPS Geofence Shift Proof</h2>
                <p className="text-xs text-slate-400">Registered nurses clock in via mobile geofence within 25 meters of the elder's home before clinical vitals can be submitted.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono text-emerald-300 font-semibold">GPS Verified On-Site</span>
              </div>
            </div>

            <form onSubmit={handleLogVitals} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block uppercase tracking-wider">Shift Verification</span>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nurse:</span>
                      <span className="font-medium">Sofia Morales (Lic. #99142)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Geofence Distance:</span>
                      <span className="text-emerald-400 font-mono font-bold">8.4 meters from home</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clock-in Time:</span>
                      <span className="font-mono">09:28 AM Local</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-teal-400 block uppercase tracking-wider">Clinical Vitals Intake</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Blood Pressure (mmHg)</label>
                      <input 
                        type="text" 
                        value={bloodPressure}
                        onChange={(e) => setBloodPressure(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Fasting Glucose (mg/dL)</label>
                      <input 
                        type="text" 
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="meds"
                    checked={medsTaken}
                    onChange={(e) => setMedsTaken(e.target.checked)}
                    className="w-4 h-4 accent-teal-500"
                  />
                  <label htmlFor="meds" className="text-slate-300">
                    Confirm prescribed morning medications witnessed (Metformin 500mg, Losartan 50mg)
                  </label>
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition"
                >
                  Submit Certified Clinical Log
                </button>
              </div>
            </form>

            {vitalsLogged && (
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 flex items-center justify-between text-xs">
                <div className="text-teal-200">
                  ✅ <strong>Vitals Certified:</strong> Blood Pressure {bloodPressure} & Glucose {glucose} mg/dL stored in encrypted HIPAA-compliant database.
                </div>
                <button 
                  onClick={sendWhatsAppStream}
                  className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch WhatsApp Update to Family
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: WhatsApp Stream */}
        {activeTab === 'whatsapp' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-2xl mx-auto shadow-2xl space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Automated WhatsApp Family Intelligence Stream</h2>
              <p className="text-xs text-slate-400">Adult children in London, New York, or Dubai receive frictionless daily updates on their existing WhatsApp.</p>
            </div>

            {/* WhatsApp Phone Mockup */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-md mx-auto">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black text-xs">
                  FC
                </div>
                <div>
                  <span className="font-bold text-white text-xs block">FamCare Clinical Digest</span>
                  <span className="text-[10px] text-emerald-400">Official WhatsApp Business Bot</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs text-slate-200">
                <div className="text-[11px] text-slate-400">Today at 09:42 AM</div>
                <p>👋 Good morning Carlos! Here is Elena's certified clinical update from Coyoacán, CDMX:</p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                  <div>🩺 <strong>Blood Pressure:</strong> {bloodPressure} mmHg (Optimal)</div>
                  <div>🩸 <strong>Fasting Glucose:</strong> {glucose} mg/dL (Target: &lt;120)</div>
                  <div>💊 <strong>Medications:</strong> Metformin & Losartan witnessed</div>
                  <div>📍 <strong>Nurse On-Site:</strong> Sofia M. (GPS Geofenced)</div>
                  <div>🥗 <strong>Meal:</strong> Oatmeal with papaya & chamomile tea</div>
                </div>
                <p className="text-[11px] text-slate-400">Dr. Morales reviewed today's trends. No medication adjustments required this week.</p>
              </div>

              <button 
                onClick={() => alert('Triggered test WhatsApp delivery to Carlos R. in London (+44 7911 123456).')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Trigger Test WhatsApp Notification
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Telehealth Desk */}
        {activeTab === 'telehealth' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">24/7 Tele-Geriatrician Escalation Desk</h2>
              <p className="text-xs text-slate-400">Licensed on-call geriatricians in the parent's home city supervise chronic medication regimens and coordinate emergency hospital admissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Video className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-sm">Monthly Geriatrician Video Review</h3>
                <p className="text-xs text-slate-400">Direct 3-way telehealth call between the expat sponsor in London/US, the parent at home, and the local attending physician.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Emergency Hospital Dispatch Protocol</h3>
                <p className="text-xs text-slate-400">If vitals breach critical bounds (e.g. systolic BP &gt; 180), private ambulance transport to accredited partner hospitals is dispatched instantly.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CAB Modal */}
      {cabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-teal-500/30 shadow-2xl relative">
            <button 
              onClick={() => setCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {cabSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Pilot Application Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our Clinical Care Coordinator will contact you within 6 hours to schedule an initial geriatric nurse assessment for your parents.
                </p>
                <button 
                  onClick={() => { setCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setCabSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Design Partner Cohort</span>
                  <h3 className="text-xl font-bold text-white">Join the FamCare 10-Family Pilot</h3>
                  <p className="text-xs text-slate-400">
                    We are launching a pilot cohort of 10 commercial partners & diaspora families for FamCare Global. Dedicated clinical onboarding and locked preferential pricing ($45/mo vs $150/mo).
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name (Sponsor)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Carlos Rodriguez"
                      value={cabForm.name}
                      onChange={(e) => setCabForm({ ...cabForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="carlos@london-firm.com"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Where do your parents live?</label>
                    <select 
                      value={cabForm.parentCountry}
                      onChange={(e) => setCabForm({ ...cabForm, parentCountry: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Mexico">Mexico (CDMX, Guadalajara, Monterrey)</option>
                      <option value="Colombia">Colombia (Bogotá, Medellín, Cali)</option>
                      <option value="Egypt">Egypt (Cairo, Alexandria)</option>
                      <option value="India">India (Kerala, Bangalore, Mumbai)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-500/30 text-[11px] text-teal-300">
                  🎁 <strong>Pilot Privilege:</strong> 70% lifetime platform fee discount, complimentary initial nurse in-home vitals evaluation, and dedicated WhatsApp clinical channel.
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-teal-500/25"
                >
                  Apply for Pilot Cohort (2 Slots Remaining)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FamCare Global Ltd. Cross-border elder-care operating infrastructure.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Canonical: /solutions/diaspora-elder-care-coordination</span>
            <span className="text-teal-500 font-semibold">HIPAA • GDPR Compliant • WhatsApp Cloud API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
