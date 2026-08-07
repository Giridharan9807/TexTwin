import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  Camera,
  Activity,
  Zap,
  TrendingDown,
  Play,
  RotateCcw,
  Sliders,
  Terminal,
  ChevronRight,
  MessageSquare,
  Bot,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SparklineCurve = ({ points = [98, 92, 85, 78, 68], color = '#EF4444' }) => {
  const width = 120;
  const height = 36;
  const min = 50;
  const max = 100;
  const pts = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / (max - min)) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
};

const AIIntelligencePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('RUL'); // RUL | Vision | Energy | Tension
  const [executingAi, setExecutingAi] = useState(false);
  const [aiExecutionSuccess, setAiExecutionSuccess] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [aiChatResponse, setAiChatResponse] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  const aiInsights = [
    { loom: 'LOOM-201', model: 'RUL-XGBoost-v4', prob: '78%', rul: '34 Hrs', health: 68, cause: 'Drive Shaft Bearing Fatigue', recommendation: 'Schedule bearing replacement within 14 hours.', curve: [98, 91, 84, 76, 68] },
    { loom: 'LOOM-501', model: 'Thermal-Anomaly-v2', prob: '64%', rul: '58 Hrs', health: 72, cause: 'Motor Thermal Overheat (>82°C)', recommendation: 'Inspect motor cooling fan and apply gear lubricant.', curve: [99, 95, 88, 80, 72] },
    { loom: 'LOOM-703', model: 'Projectile-Wear-v1', prob: '56%', rul: '72 Hrs', health: 79, cause: 'Shuttle Projectile Friction Wear', recommendation: 'Calibrate projectile guide rail and replace oil wick.', curve: [98, 93, 89, 83, 79] },
    { loom: 'LOOM-104', model: 'Nozzle-Clog-Predictor', prob: '42%', rul: '120 Hrs', health: 88, cause: 'Water Jet Pressure Scale Build-up', recommendation: 'Initiate automated nozzle flush cycle during next shift.', curve: [99, 96, 92, 90, 88] },
    { loom: 'LOOM-101', model: 'Tension-Optimal-v1', prob: '4%', rul: '1,450 Hrs', health: 96, cause: 'Nominal Operations', recommendation: 'No action needed. Machine operating at peak efficiency.', curve: [99, 98, 97, 96, 96] },
  ];

  const visionDefects = [
    { id: 'DEF-901', loom: 'LOOM-201', type: 'Oil Stain Spot', confidence: '98.6%', size: '14.2 mm²', time: '2 mins ago', severity: 'Critical', imagePlaceholder: '🛢️ Fabric Oil Stain' },
    { id: 'DEF-902', loom: 'LOOM-102', type: 'Broken Weft Thread', confidence: '99.1%', size: '8.5 mm', time: '14 mins ago', severity: 'Warning', imagePlaceholder: '🧵 Weft Thread Snap' },
    { id: 'DEF-903', loom: 'LOOM-301', type: 'Missing Pick Defect', confidence: '97.4%', size: '22.0 mm', time: '45 mins ago', severity: 'Warning', imagePlaceholder: '🔍 Missing Pick Line' },
    { id: 'DEF-904', loom: 'LOOM-603', type: 'Selvage Fringe Tear', confidence: '99.5%', size: '5.1 mm²', time: '1 hr ago', severity: 'Low Risk', imagePlaceholder: '📐 Selvage Edge Tear' },
  ];

  const handleExecuteAiOptimizer = () => {
    setExecutingAi(true);
    setTimeout(() => {
      setExecutingAi(false);
      setAiExecutionSuccess('AI Closed-Loop Optimizer successfully tuned Loom speeds (-4% RPM) & re-balanced air nozzle pressure across 20 looms!');
      setTimeout(() => setAiExecutionSuccess(null), 5000);
    }, 1200);
  };

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!userQuery) return;

    setChatLoading(true);
    setTimeout(() => {
      setChatLoading(false);
      setAiChatResponse({
        query: userQuery,
        answer: `TexTwin AI Diagnostic Report: Based on live 10 Hz vibration FFT & thermal telemetry on LOOM-201, drive shaft bearing fatigue is causing elevated temperatures (82.4°C). Recommended action: Replace bearing unit #1 and apply high-temp synthetic lubricant to prevent sudden shaft seizure.`,
      });
      setUserQuery('');
    }, 900);
  };

  return (
    <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: '900' }}>🤖 AI Intelligence & Computer Vision Hub</h1>
            <span className="badge" style={{ background: '#8B5CF6', color: '#ffffff', fontWeight: '800' }}>
              AI Model Accuracy 99.4%
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>
            Deep Learning Neural Networks for Remaining Useful Life (RUL), Vision Fabric Defect Detection, and Closed-Loop Optimization
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn" onClick={handleExecuteAiOptimizer} disabled={executingAi} style={{ background: '#2563EB', color: '#ffffff', fontWeight: '800', border: 'none' }}>
            <Zap size={16} className={executingAi ? 'spin' : ''} /> {executingAi ? 'Tuning Plant...' : 'Run Closed-Loop AI Optimizer'}
          </button>
          <button className="btn" onClick={() => navigate('/what-if')} style={{ background: '#8B5CF6', color: '#ffffff', fontWeight: '800', border: 'none' }}>
            <Sparkles size={16} /> Open What-If AI Simulator
          </button>
        </div>
      </div>

      {aiExecutionSuccess && (
        <div style={{ padding: '0.9rem 1.25rem', background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '10px', color: '#166534', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {aiExecutionSuccess}
        </div>
      )}

      {/* 2. AI MODEL SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>AI RUL MODEL ACCURACY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#8B5CF6', marginTop: '4px' }}>99.4%</div>
          <div style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '4px', fontWeight: '800' }}>Evaluated on 500,000+ IoT Telemetry Records</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>AVG FLEET RUL ESTIMATE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>842 Hrs</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px', fontWeight: '700' }}>35 Days Continuous Peak Production</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>VISION FABRIC DEFECT RATE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#F59E0B', marginTop: '4px' }}>0.42 / hr</div>
          <div style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '4px', fontWeight: '800' }}>Below 1.0 Threshold Limit</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '800' }}>HIGH-RISK LOOMS FLAGGED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#EF4444', marginTop: '4px' }}>3 Looms</div>
          <div style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '4px', fontWeight: '800' }}>LOOM-201, LOOM-501 & LOOM-703</div>
        </div>
      </div>

      {/* 3. AI NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'RUL', label: '🧠 Predictive RUL & Diagnostics', icon: Brain },
          { key: 'Vision', label: '📷 Computer Vision Defect Detection', icon: Camera },
          { key: 'Energy', label: '⚡ Power & Energy AI Optimizer', icon: Zap },
          { key: 'Chat', label: '💬 AI Diagnostic Assistant', icon: Bot },
        ].map((t) => {
          const TabIcon = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                background: isActive ? '#8B5CF6' : '#ffffff',
                color: isActive ? '#ffffff' : '#0F172A',
                border: `1.5px solid ${isActive ? '#8B5CF6' : '#CBD5E1'}`,
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <TabIcon size={16} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* TAB 1: PREDICTIVE RUL & DIAGNOSTICS */}
      {/* ==================================================== */}
      {activeTab === 'RUL' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={20} style={{ color: '#8B5CF6' }} /> AI Failure Probability & Health Degradation Trajectory Matrix
          </h3>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Loom ID</th>
                  <th>AI Model Version</th>
                  <th>Failure Prob.</th>
                  <th>Estimated RUL</th>
                  <th>Health Score</th>
                  <th>Degradation Trend</th>
                  <th>Predicted Root Cause</th>
                  <th>AI Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {aiInsights.map((insight) => (
                  <tr key={insight.loom}>
                    <td style={{ fontFamily: 'JetBrains Mono', color: '#8B5CF6', fontWeight: '900' }}>{insight.loom}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700' }}>{insight.model}</td>
                    <td style={{ fontWeight: '900', color: parseFloat(insight.prob) > 50 ? '#EF4444' : '#16A34A' }}>{insight.prob}</td>
                    <td style={{ fontWeight: '800' }}>{insight.rul}</td>
                    <td>
                      <span className="badge" style={{ background: insight.health > 80 ? '#DCFCE7' : '#FEE2E2', color: insight.health > 80 ? '#166534' : '#991B1B', fontWeight: '800' }}>
                        {insight.health}%
                      </span>
                    </td>
                    <td>
                      <SparklineCurve points={insight.curve} color={insight.health < 80 ? '#EF4444' : '#16A34A'} />
                    </td>
                    <td style={{ fontWeight: '800', color: '#0F172A' }}>{insight.cause}</td>
                    <td style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>{insight.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: COMPUTER VISION FABRIC DEFECT DETECTION */}
      {/* ==================================================== */}
      {activeTab === 'Vision' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={20} style={{ color: '#7C3AED' }} /> Cognex High-Speed Camera Fabric Defect Inspector
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>
                Real-time optical fabric anomaly detection using YOLOv8 Machine Vision AI
              </p>
            </div>
            <span className="badge" style={{ background: '#EFF6FF', color: '#2563EB', fontWeight: '800' }}>
              4 Defect Frames Flagged Today
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {visionDefects.map((def) => (
              <div key={def.id} style={{ padding: '1.1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: '900', fontFamily: 'JetBrains Mono' }}>{def.id}</span>
                  <span className="badge" style={{ background: def.severity === 'Critical' ? '#FEE2E2' : '#FEF3C7', color: def.severity === 'Critical' ? '#991B1B' : '#92400E', fontWeight: '800' }}>
                    {def.severity}
                  </span>
                </div>

                <div style={{ height: '110px', background: '#0F172A', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '0.85rem', position: 'relative' }}>
                  <div style={{ fontSize: '1.8rem' }}>{def.imagePlaceholder.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#F8FAFC', marginTop: '4px' }}>{def.type}</div>
                  <div style={{ position: 'absolute', bottom: '6px', right: '8px', fontSize: '0.68rem', color: '#38BDF8', fontWeight: '800' }}>
                    {def.confidence} Confidence
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: '800' }}>Loom: {def.loom}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>Defect Size: {def.size} • {def.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: POWER & ENERGY AI OPTIMIZER */}
      {/* ==================================================== */}
      {activeTab === 'Energy' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} style={{ color: '#D97706' }} /> Reinforcement Learning Wattage & Air Consumption Optimizer
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: '#FEF3C7', borderRadius: '12px', border: '1px solid #F59E0B' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#92400E' }}>POTENTIAL POWER SAVINGS</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>-12.4% kW</div>
              <p style={{ fontSize: '0.78rem', color: '#78350F', fontWeight: '600', marginTop: '4px' }}>
                AI Recommendation: Reduce Air Jet relay nozzle pressure from 6.2 Bar to 5.8 Bar during off-peak shifts.
              </p>
            </div>

            <div style={{ padding: '1.25rem', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #3B82F6' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#1E40AF' }}>ANNUAL COST REDUCTION</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#2563EB', marginTop: '4px' }}>$34,500 / yr</div>
              <p style={{ fontSize: '0.78rem', color: '#1E3A8A', fontWeight: '600', marginTop: '4px' }}>
                Estimated reduction in factory power grid draw across 30 active looms.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 4: AI DIAGNOSTIC ASSISTANT */}
      {/* ==================================================== */}
      {activeTab === 'Chat' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={20} style={{ color: '#8B5CF6' }} /> Ask TexTwin AI Diagnostic Copilot
          </h3>

          <form onSubmit={handleAskAi} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Why is LOOM-201 bearing overheating? What is the recommended fix?"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: '600' }}
            />
            <button className="btn btn-primary" type="submit" disabled={chatLoading} style={{ background: '#8B5CF6', fontWeight: '800' }}>
              {chatLoading ? 'Analyzing...' : 'Ask AI'}
            </button>
          </form>

          {aiChatResponse && (
            <div style={{ padding: '1.25rem', background: '#F5F3FF', border: '1.5px solid #C4B5FD', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#8B5CF6', marginBottom: '4px' }}>USER PROMPT: "{aiChatResponse.query}"</div>
              <div style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: '700', lineHeight: '1.6' }}>
                {aiChatResponse.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIIntelligencePage;
