import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Calendar, Sparkles, CheckCircle2, Filter, RefreshCw, Clock, Mail, ShieldAlert, FileCode } from 'lucide-react';

const ReportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const reports = [
    { title: 'Daily Factory OEE & Production Summary', category: 'Production', date: '2026-07-31', size: '1.4 MB', fmt: 'PDF / CSV', status: 'Ready', desc: 'Complete breakdown of 14,250 meters fabric yield, OEE (96.4%), and shift efficiency across 6 plants.' },
    { title: 'AI Predictive RUL & Failure Anomaly Briefing', category: 'AI Intelligence', date: '2026-07-30', size: '2.8 MB', fmt: 'PDF', status: 'Ready', desc: 'Predictive Remaining Useful Life matrix, bearing fatigue warnings, and ML failure probability scores.' },
    { title: 'Weekly Weaving Loom Energy & Carbon Audit', category: 'Energy', date: '2026-07-28', size: '3.1 MB', fmt: 'CSV / Excel', status: 'Ready', desc: '1,245 kWh power usage, peak load curves, carbon footprint metrics, and cost per meter of fabric.' },
    { title: 'Monthly Machine Downtime & Incident Summary', category: 'Maintenance', date: '2026-07-01', size: '5.2 MB', fmt: 'PDF', status: 'Archived', desc: 'Historical record of 5 maintenance work orders, mean time to repair (MTTR), and engineer logs.' },
    { title: 'IoT Transducer Sensor Calibration Log', category: 'Telemetry', date: '2026-07-29', size: '4.6 MB', fmt: 'CSV / JSON', status: 'Ready', desc: 'Full calibration status and telemetry signal drift logs for all 136 IoT transducer channels.' },
    { title: 'Shift Operations & Operator Performance Report', category: 'Production', date: '2026-07-27', size: '1.9 MB', fmt: 'PDF', status: 'Ready', desc: 'Operator shift logs, weave speed indexes, yarn break counts, and shift output meters.' },
    { title: 'Quality Control & Fabric Defect Analysis', category: 'Quality', date: '2026-07-25', size: '2.3 MB', fmt: 'PDF / Excel', status: 'Ready', desc: 'Grade A+ fabric ratio (99.1%), warp thread tension diagnostics, and rejected fabric root causes.' },
    { title: 'Executive Plant Manager Hybrid Briefing', category: 'Executive', date: '2026-07-20', size: '6.4 MB', fmt: 'PDF', status: 'Archived', desc: 'High-level multi-hub ROI performance, capital expense audit, and MySQL asset inventory report.' },
  ];

  const scheduledReports = [
    { name: 'Daily Morning Production Briefing', schedule: 'Every Day at 06:00 AM', recipients: 'plant.manager@textwin.com, director@textwin.com', format: 'PDF & CSV' },
    { name: 'Weekly AI Predictive RUL Health Report', schedule: 'Every Monday at 08:00 AM', recipients: 'maintenance.team@textwin.com', format: 'PDF' },
    { name: 'Monthly Energy & Sustainability Audit', schedule: '1st of Every Month', recipients: 'energy.audit@textwin.com', format: 'Excel' },
  ];

  const filteredReports = selectedCategory === 'All' ? reports : reports.filter(r => r.category === selectedCategory);

  const triggerDownload = (title, fmt) => {
    const csvContent = 'data:text/csv;charset=utf-8,ReportTitle,Date,Category,Status\n"' + title + '","' + new Date().toISOString().split('T')[0] + '","' + selectedCategory + '","Downloaded"';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_${fmt.toLowerCase()}.${fmt.toLowerCase() === 'excel' ? 'xlsx' : fmt.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(`Successfully exported "${title}" in ${fmt} format!`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div style={{ background: '#ECFDF5', padding: '1.5rem', borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ color: '#0F172A' }}>📄 Operational Reports & Export Center</h1>
            <span className="badge" style={{ background: '#10B981', color: '#ffffff', fontWeight: '800' }}>MySQL + MongoDB Merged</span>
          </div>
          <p style={{ color: '#047857' }}>Generate, Schedule, and Export Executive Performance Briefings & Telemetry Audits</p>
        </div>

        <button className="btn" onClick={() => triggerDownload('TexTwin_Executive_Report', exportFormat)} style={{ background: '#10B981', color: '#ffffff', borderColor: '#10B981' }}>
          <Download size={16} /> Export Executive Briefing ({exportFormat})
        </button>
      </div>

      {downloadSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'var(--status-running-bg)', color: 'var(--status-running)', border: '1px solid rgba(8, 131, 149, 0.3)', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {downloadSuccess}
        </div>
      )}

      {/* Filter & Custom Report Generator Control Bar */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--accent-primary)' }} /> Custom Report Generator Options
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Report Category</label>
            <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories (8 Reports)</option>
              <option value="Production">Production & OEE</option>
              <option value="AI Intelligence">AI Predictive RUL</option>
              <option value="Energy">Energy & Carbon</option>
              <option value="Maintenance">Maintenance & Downtime</option>
              <option value="Telemetry">IoT Sensor Telemetry</option>
              <option value="Quality">Quality & Fabric Grade</option>
              <option value="Executive">Executive Management</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Time Window</label>
            <select className="form-control" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="Today">Today (Live 24h)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month (July 2026)</option>
              <option value="Year-to-Date">Year-to-Date (YTD)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Export Format</label>
            <select className="form-control" value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="PDF">PDF Document (.pdf)</option>
              <option value="CSV">CSV Data File (.csv)</option>
              <option value="Excel">Excel Sheet (.xlsx)</option>
              <option value="JSON">JSON Stream (.json)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Reports Grid */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FileText size={20} style={{ color: 'var(--accent-primary)' }} /> Available Operational Reports ({filteredReports.length})
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {filteredReports.map((r, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-low" style={{ fontSize: '0.72rem', fontWeight: '800' }}>{r.category}</span>
                <span className="badge badge-running" style={{ fontSize: '0.68rem', fontWeight: '700' }}>{r.status}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>{r.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.45', fontWeight: '600' }}>{r.desc}</p>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.85rem', fontWeight: '700', display: 'flex', gap: '0.75rem' }}>
                <span>📅 {r.date}</span>
                <span>•</span>
                <span>📦 {r.size}</span>
                <span>•</span>
                <span>📄 {r.fmt}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => triggerDownload(r.title, 'CSV')}>
                <FileSpreadsheet size={14} /> Preview
              </button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => triggerDownload(r.title, exportFormat)}>
                <Download size={14} /> Download ({exportFormat})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Automated Reports Section */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} style={{ color: 'var(--accent-primary)' }} /> Automated Email Delivery Schedule
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1.25rem' }}>
          Configured cron jobs automatically compile MySQL and MongoDB data into PDF reports and dispatch them via email.
        </p>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Delivery Schedule</th>
                <th>Recipients</th>
                <th>Format</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((sr, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{sr.name}</td>
                  <td style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>{sr.schedule}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{sr.recipients}</td>
                  <td><span className="badge badge-low" style={{ fontSize: '0.72rem' }}>{sr.format}</span></td>
                  <td><span className="badge badge-running" style={{ fontSize: '0.72rem' }}>Active Cron</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
