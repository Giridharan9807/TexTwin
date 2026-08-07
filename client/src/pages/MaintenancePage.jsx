import React, { useState, useEffect } from 'react';
import { maintenanceApi, machineApi } from '../api/client';
import {
  Wrench,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Calendar,
  Search,
  Filter,
  Package,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Brain,
  DollarSign,
  ArrowRight,
  Cpu,
  ShoppingCart,
  Zap,
} from 'lucide-react';

const MaintenancePage = () => {
  const [loading, setLoading] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0); // Active step in timeline flow
  const [currency, setCurrency] = useState('INR'); // INR (₹) | USD ($) | EUR (€)

  // Timeline Flow Steps
  const timelineSteps = [
    { title: '🧠 AI Prediction', desc: 'XGBoost ML detects 82% failure probability on LOOM-201 bearing', status: 'Active Trigger' },
    { title: '📋 Work Order Created', desc: 'Auto-generated Work Order #WO-8041 dispatched to queue', status: 'Logged in DB' },
    { title: '👷 Engineer Assigned', desc: 'Assigned Shift Engineer: Anita Desai (SLA: 15 mins)', status: 'Dispatched' },
    { title: '🛠️ Repair', desc: 'Bearing replacement & shaft laser alignment underway in Bay B', status: 'In Progress' },
    { title: '🔍 Verification', desc: 'Vibration & thermal telemetry post-repair validation', status: 'Pending' },
    { title: '🟢 Machine Back Online', desc: 'LOOM-201 restored to peak 1,080 RPM production rate', status: 'Complete' },
  ];

  // 1. AI Maintenance Priority Table Data
  const aiPriorityList = [
    { machine: 'LOOM-201', priority: 'High', failureRisk: '82%', engineer: 'Anita Desai', eta: '4 Hours', cost: '₹14,500' },
    { machine: 'LOOM-501', priority: 'High', failureRisk: '64%', engineer: 'Karthik N', eta: '12 Hours', cost: '₹8,200' },
    { machine: 'LOOM-703', priority: 'Medium', failureRisk: '56%', engineer: 'Sanjay Shah', eta: '24 Hours', cost: '₹11,000' },
    { machine: 'LOOM-104', priority: 'Medium', failureRisk: '42%', engineer: 'Karthik N', eta: '48 Hours', cost: '₹4,200' },
    { machine: 'LOOM-101', priority: 'Low', failureRisk: '4%', engineer: 'Anita Desai', eta: '72 Hours', cost: '₹2,800' },
  ];

  // 2. Remaining Useful Life (RUL) Widget Data
  const [rulWidgetData, setRulWidgetData] = useState([
    { machine: 'LOOM-201', component: 'Bearing', rulHours: '142 Hours', status: 'Critical', color: '#EF4444' },
    { machine: 'LOOM-104', component: 'Motor Drive', rulHours: '318 Hours', status: 'Warning', color: '#F59E0B' },
    { machine: 'LOOM-501', component: 'Cooling Fan', rulHours: '210 Hours', status: 'Warning', color: '#F59E0B' },
    { machine: 'LOOM-703', component: 'Projectile Guide', rulHours: '420 Hours', status: 'Optimal', color: '#16A34A' },
  ]);

  // 3. Predicted Spare Requirement
  const [predictedSpares, setPredictedSpares] = useState([
    { item: 'Bearing Unit', req: '5 Units', timing: 'Next Week', alert: 'High Demand', cost: '₹18,500' },
    { item: 'Pneumatic Nozzle', req: '3 Units', timing: 'In 2 Weeks', alert: 'Normal Stock', cost: '₹4,200' },
    { item: 'Synthetic Lubricant', req: '2 Liters', timing: 'Immediate', alert: 'Critical Re-order', cost: '₹2,800' },
  ]);

  // 4. Weekly Maintenance Schedule Calendar Grid
  const weeklySchedule = [
    { day: 'Mon', date: 'Jul 27', task: 'LOOM-201 Bearing Overhaul', engineer: 'Anita Desai', status: 'Completed' },
    { day: 'Tue', date: 'Jul 28', task: 'LOOM-301 Heald Frame Calib.', engineer: 'Rajesh Kumar', status: 'Completed' },
    { day: 'Wed', date: 'Jul 29', task: 'LOOM-104 Nozzle Pressure Flush', engineer: 'Karthik N', status: 'In Progress' },
    { day: 'Thu', date: 'Jul 30', task: 'LOOM-501 Drive Belt Tensioning', engineer: 'Suresh Mehta', status: 'Scheduled' },
    { day: 'Fri', date: 'Jul 31', task: 'LOOM-101 Gear Lube & Tension Sync', engineer: 'Anita Desai', status: 'Scheduled' },
    { day: 'Sat', date: 'Aug 01', task: 'LOOM-703 Projectile Guide Check', engineer: 'Sanjay Shah', status: 'Scheduled' },
    { day: 'Sun', date: 'Aug 02', task: 'Weekly Plant PM Audit & Calibration', engineer: 'Team Lead', status: 'Scheduled' },
  ];

  // 5. Work Orders
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-8041',
      loom: 'LOOM-201',
      task: 'Main Drive Shaft Bearing Overhaul & Alignment',
      type: 'Predictive (AI Driven)',
      engineer: 'Anita Desai (Shift Engineer)',
      date: '2026-08-02',
      priority: 'High',
      status: 'In Progress',
      costINR: '₹14,500',
    },
    {
      id: 'WO-8042',
      loom: 'LOOM-104',
      task: 'Nozzle Pressure Flush & Scale Filter Calibration',
      type: 'Preventive (Scheduled)',
      engineer: 'Karthik N (Maintenance Tech)',
      date: '2026-08-05',
      priority: 'Medium',
      status: 'Scheduled',
      costINR: '₹4,200',
    },
    {
      id: 'WO-8043',
      loom: 'LOOM-101',
      task: 'Shedding Motion Gear Lube & Tension Sync',
      type: 'Preventive (Scheduled)',
      engineer: 'Anita Desai (Shift Engineer)',
      date: '2026-08-12',
      priority: 'Low',
      status: 'Scheduled',
      costINR: '₹2,800',
    },
    {
      id: 'WO-8040',
      loom: 'LOOM-301',
      task: 'Heald Frame Inspection & Thread Tension Calibration',
      type: 'Corrective (Emergency)',
      engineer: 'Rajesh Kumar (Supervisor)',
      date: '2026-07-28',
      priority: 'High',
      status: 'Completed',
      costINR: '₹8,900',
    },
  ]);

  // Form State
  const [newLoom, setNewLoom] = useState('LOOM-201');
  const [newTask, setNewTask] = useState('');
  const [newType, setNewType] = useState('Predictive (AI Driven)');
  const [newEngineer, setNewEngineer] = useState('Anita Desai (Shift Engineer)');
  const [newPriority, setNewPriority] = useState('High');

  const handleCreateWO = (e) => {
    e.preventDefault();
    if (!newTask) return;

    const newWo = {
      id: `WO-${Math.floor(Math.random() * 9000 + 1000)}`,
      loom: newLoom,
      task: newTask,
      type: newType,
      engineer: newEngineer,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      priority: newPriority,
      status: 'Scheduled',
      costINR: '₹8,500',
    };

    setWorkOrders([newWo, ...workOrders]);
    setShowNewModal(false);
    setNewTask('');
    setSuccessMsg(`Work Order ${newWo.id} dispatched & logged into MySQL asset DB!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleAutoWOForRul = (loomId, component) => {
    const newWo = {
      id: `WO-${Math.floor(Math.random() * 9000 + 1000)}`,
      loom: loomId,
      task: `Auto-dispatched AI servicing for ${component}`,
      type: 'Predictive (AI Driven)',
      engineer: 'Anita Desai (Shift Engineer)',
      date: new Date().toISOString().split('T')[0],
      priority: 'High',
      status: 'In Progress',
      costINR: '₹12,400',
    };

    setWorkOrders([newWo, ...workOrders]);
    setSuccessMsg(`Auto-dispatched AI Work Order ${newWo.id} for ${loomId} (${component})!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleReorderSpare = (item) => {
    setSuccessMsg(`Purchase Order dispatched for ${item}! Supplier notified.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const toggleStatus = (id) => {
    setWorkOrders(
      workOrders.map((wo) => {
        if (wo.id === id) {
          const nextStatus = wo.status === 'Scheduled' ? 'In Progress' : wo.status === 'In Progress' ? 'Completed' : 'Scheduled';
          return { ...wo, status: nextStatus };
        }
        return wo;
      })
    );
  };

  // Currency Converter helper
  const formatCost = (inrValStr) => {
    const rawVal = parseInt(inrValStr.replace(/[^0-9]/g, '')) || 0;
    if (currency === 'USD') {
      return `$${Math.round(rawVal / 83).toLocaleString()}`;
    }
    if (currency === 'EUR') {
      return `€${Math.round(rawVal / 90).toLocaleString()}`;
    }
    return `₹${rawVal.toLocaleString()}`;
  };

  return (
    <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>🔧 AI Maintenance Center</h1>
            <span className="badge" style={{ background: '#2563EB', color: '#ffffff', fontWeight: '800' }}>
              XGBoost ML Predictive Servicing
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            AI Maintenance Priorities, Remaining Useful Life (RUL) Tracking, Predicted Spare Parts & Cost Forecasts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.35rem', background: '#ffffff', padding: '0.25rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
            {['INR', 'USD', 'EUR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  borderRadius: '6px',
                  border: 'none',
                  background: currency === curr ? '#2563EB' : 'transparent',
                  color: currency === curr ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                }}
              >
                {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : '€ EUR'}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={() => setShowNewModal(true)} style={{ background: '#2563EB', fontWeight: '800' }}>
            <Plus size={16} /> Dispatch AI Work Order
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '8px', color: '#166534', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} /> {successMsg}
        </div>
      )}

      {/* 2. INTERACTIVE AI MAINTENANCE TIMELINE FLOW WIDGET */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1.5px solid #2563EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#2563EB', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Brain size={16} /> AI MAINTENANCE TIMELINE FLOW (Click any step to inspect details)
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>
            Step {activeTimelineStep + 1} of 6: {timelineSteps[activeTimelineStep].status}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem', fontSize: '0.85rem', fontWeight: '800' }}>
          {timelineSteps.map((step, idx) => {
            const isCurrent = activeTimelineStep === idx;

            return (
              <React.Fragment key={idx}>
                <div
                  onClick={() => setActiveTimelineStep(idx)}
                  style={{
                    padding: '0.55rem 0.95rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${isCurrent ? '#2563EB' : '#E2E8F0'}`,
                    background: isCurrent ? '#EFF6FF' : '#F8FAFC',
                    color: isCurrent ? '#2563EB' : '#0F172A',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isCurrent ? '0 4px 12px rgba(37,99,235,0.15)' : 'none',
                  }}
                >
                  {step.title}
                </div>
                {idx < timelineSteps.length - 1 && <ArrowRight size={16} style={{ color: '#94A3B8' }} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Step Detail Box */}
        <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>
          ℹ️ <strong>Stage Details:</strong> {timelineSteps[activeTimelineStep].desc}
        </div>
      </div>

      {/* 3. MAINTENANCE COST PREDICTION CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>MAINTENANCE COST (TODAY)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>{formatCost('₹12,400')}</div>
          <div style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: '800', marginTop: '2px' }}>● 1 Scheduled Servicing</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>MAINTENANCE COST (WEEK)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2563EB', marginTop: '2px' }}>{formatCost('₹81,000')}</div>
          <div style={{ fontSize: '0.72rem', color: '#2563EB', fontWeight: '800', marginTop: '2px' }}>● 5 Servicing Tasks</div>
        </div>

        <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800' }}>MAINTENANCE COST (MONTH)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#7C3AED', marginTop: '2px' }}>{formatCost('₹3,45,000')}</div>
          <div style={{ fontSize: '0.72rem', color: '#7C3AED', fontWeight: '800', marginTop: '2px' }}>● Projected Monthly Budget</div>
        </div>
      </div>

      {/* 4. RUL & PREDICTED SPARES ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* Remaining Useful Life (RUL) Widget */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} style={{ color: '#2563EB' }} /> Remaining Useful Life (RUL) Tracker
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {rulWidgetData.map((r) => (
              <div key={r.machine} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#0F172A' }}>{r.machine} — {r.component}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Component Lifetime Tracking</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: r.color }}>{r.rulHours}</div>
                    <span className="badge" style={{ background: `${r.color}15`, color: r.color, fontSize: '0.65rem', fontWeight: '800' }}>{r.status}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAutoWOForRul(r.machine, r.component)}
                    style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem', background: '#2563EB', fontWeight: '800' }}
                  >
                    Auto-WO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Spare Requirement Widget */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={18} style={{ color: '#059669' }} /> Predicted Spare Requirement
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {predictedSpares.map((p) => (
              <div key={p.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#0F172A' }}>{p.item}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Needed: {p.timing} ({formatCost(p.cost)})</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#059669' }}>{p.req}</div>
                    <span className="badge" style={{ background: '#DCFCE7', color: '#166534', fontSize: '0.65rem', fontWeight: '800' }}>{p.alert}</span>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleReorderSpare(p.item)}
                    style={{ fontSize: '0.7rem', padding: '0.3rem 0.55rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <ShoppingCart size={12} /> Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. WEEKLY AI MAINTENANCE CALENDAR GRID */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} style={{ color: '#2563EB' }} /> AI Weekly Servicing Schedule & Calendar
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {weeklySchedule.map((ws) => (
            <div
              key={ws.day}
              style={{
                padding: '0.85rem',
                borderRadius: '8px',
                background: ws.status === 'Completed' ? '#F0FDF4' : ws.status === 'In Progress' ? '#EFF6FF' : '#F8FAFC',
                border: `1.5px solid ${ws.status === 'Completed' ? '#16A34A' : ws.status === 'In Progress' ? '#2563EB' : '#CBD5E1'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#0F172A' }}>{ws.day}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700' }}>{ws.date}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px', lineHeight: '1.3' }}>
                {ws.task}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700' }}>
                👷 {ws.engineer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. AI MAINTENANCE PRIORITY TABLE */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1.5px solid #2563EB' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={18} style={{ color: '#2563EB' }} /> AI Maintenance Priority Matrix
        </h3>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Machine ID</th>
                <th>Priority</th>
                <th>Failure Risk</th>
                <th>Assigned Engineer</th>
                <th>ETA to Service</th>
                <th>Est Servicing Cost</th>
              </tr>
            </thead>
            <tbody>
              {aiPriorityList.map((row) => (
                <tr key={row.machine}>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#2563EB', fontWeight: '900' }}>{row.machine}</td>
                  <td>
                    <span className="badge" style={{ background: row.priority === 'High' ? '#FEE2E2' : '#FEF3C7', color: row.priority === 'High' ? '#991B1B' : '#92400E', fontWeight: '800' }}>
                      {row.priority}
                    </span>
                  </td>
                  <td style={{ fontWeight: '900', color: parseFloat(row.failureRisk) > 50 ? '#EF4444' : '#16A34A' }}>{row.failureRisk}</td>
                  <td style={{ fontWeight: '800' }}>{row.engineer}</td>
                  <td style={{ fontWeight: '800', color: '#0F172A' }}>{row.eta}</td>
                  <td style={{ fontWeight: '900', color: '#0F172A' }}>{formatCost(row.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. DISPATCH NEW WORK ORDER MODAL */}
      {showNewModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 2600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '520px', padding: '1.75rem', background: '#ffffff', borderRadius: '14px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', border: '2px solid #2563EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={20} style={{ color: '#2563EB' }} /> Dispatch Maintenance Work Order
              </h3>
              <button onClick={() => setShowNewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateWO} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Select Machine Loom</label>
                <select className="form-control" value={newLoom} onChange={(e) => setNewLoom(e.target.value)} style={{ fontWeight: '800' }}>
                  <option value="LOOM-201">LOOM-201 (Dornier Heavy Shuttleless)</option>
                  <option value="LOOM-104">LOOM-104 (Tsudakoma Water Jet)</option>
                  <option value="LOOM-501">LOOM-501 (Picanol OmniPlus i)</option>
                  <option value="LOOM-101">LOOM-101 (Toyota Air Jet Alpha)</option>
                  <option value="LOOM-301">LOOM-301 (Itema A9500 Denim)</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Maintenance Task Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Replace drive shaft bearing & calibrate lube pump"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  style={{ fontWeight: '700' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Maintenance Category</label>
                  <select className="form-control" value={newType} onChange={(e) => setNewType(e.target.value)} style={{ fontWeight: '700' }}>
                    <option value="Predictive (AI Driven)">Predictive (AI Driven)</option>
                    <option value="Preventive (Scheduled)">Preventive (Scheduled)</option>
                    <option value="Corrective (Emergency)">Corrective (Emergency)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Priority Level</label>
                  <select className="form-control" value={newPriority} onChange={(e) => setNewPriority(e.target.value)} style={{ fontWeight: '800' }}>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569' }}>Assigned Engineer</label>
                <select className="form-control" value={newEngineer} onChange={(e) => setNewEngineer(e.target.value)} style={{ fontWeight: '700' }}>
                  <option value="Anita Desai (Shift Engineer)">Anita Desai (Shift Engineer)</option>
                  <option value="Suresh Mehta (Plant Manager)">Suresh Mehta (Plant Manager)</option>
                  <option value="Karthik N (Maintenance Tech)">Karthik N (Maintenance Tech)</option>
                  <option value="Rajesh Kumar (Supervisor)">Rajesh Kumar (Supervisor)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, fontWeight: '800' }} onClick={() => setShowNewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#2563EB', fontWeight: '800' }}>
                  Dispatch Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
