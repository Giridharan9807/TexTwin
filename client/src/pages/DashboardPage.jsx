import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi, machineApi } from '../api/client';

import SystemStatusBar from '../components/SystemStatusBar';
import OperationsOverviewChart from '../components/OperationsOverviewChart';
import FactoryDigitalTwinGrid from '../components/FactoryDigitalTwinGrid';
import ProductionMonitoringCard from '../components/ProductionMonitoringCard';
import LiveSensorWidgets from '../components/LiveSensorWidgets';
import EnergyDashboardCard from '../components/EnergyDashboardCard';
import AIIntelligenceCard from '../components/AIIntelligenceCard';

import StatusChart from '../components/StatusChart';
import ActivityFeed from '../components/ActivityFeed';
import CriticalityChart from '../components/CriticalityChart';
import ProductionChart from '../components/ProductionChart';
import HealthTrendChart from '../components/HealthTrendChart';
import AlertsPanel from '../components/AlertsPanel';
import MachineDetailsModal from '../components/MachineDetailsModal';

import { Radio, ArrowRight, Sparkles } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [fleetStatus, setFleetStatus] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [machinesList, setMachinesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Detail View State
  const [selectedMachineDetail, setSelectedMachineDetail] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [sumRes, fleetRes, actRes, machRes] = await Promise.allSettled([
        dashboardApi.getSummary(),
        dashboardApi.getFleetStatus(),
        dashboardApi.getRecentActivity(),
        machineApi.getAll(),
      ]);

      if (sumRes.status === 'fulfilled' && sumRes.value.data && sumRes.value.data.success) {
        setSummary(sumRes.value.data.data);
      }
      if (fleetRes.status === 'fulfilled' && fleetRes.value.data && fleetRes.value.data.success) {
        setFleetStatus(fleetRes.value.data.data);
      }
      if (actRes.status === 'fulfilled' && actRes.value.data && actRes.value.data.success) {
        setRecentActivities(actRes.value.data.data || []);
      }
      if (machRes.status === 'fulfilled' && machRes.value.data && machRes.value.data.success) {
        setMachinesList(machRes.value.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Easy-to-Understand Quick Guide & Dashboard Helper Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          border: '1.5px solid #BAE6FD',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#0284C7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '1.2rem',
              flexShrink: 0,
            }}
          >
            💡
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: '900', color: '#0369A1' }}>
              Easy Platform Guide for Plant Managers & Operators
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0C4A6E', fontWeight: '600', marginTop: '2px' }}>
              1️⃣ Click any <strong>KPI Card</strong> to inspect detailed telemetry • 2️⃣ Click any <strong>Weaving Loom Card</strong> to view 3D Digital Twin • 3️⃣ Check <strong>AI Risk Panel</strong> for maintenance alerts.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: '#ffffff', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid #7DD3FC', fontSize: '0.76rem', fontWeight: '800' }}>
          <span style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }} /> 🟢 Weaving
          </span>
          <span style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D97706' }} /> 🟡 Standby
          </span>
          <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626' }} /> 🔴 Service Needed
          </span>
        </div>
      </div>

      {/* 1. Full-Width Enterprise KPI Dashboard */}
      <SystemStatusBar />

      {/* 2. Interactive Real-Time Factory Operations Telemetry Graph */}
      <OperationsOverviewChart />

      {/* 2. Factory Digital Twin Layout */}
      <FactoryDigitalTwinGrid
        machines={machinesList}
        onSelectMachine={(machine) => setSelectedMachineDetail(machine)}
      />

      {/* 3. Production Monitoring */}
      <ProductionMonitoringCard />

      {/* 4. Live Sensor Widgets */}
      <LiveSensorWidgets />

      {/* 5. Energy Dashboard */}
      <EnergyDashboardCard />

      {/* 6. AI Intelligence & RUL Section */}
      <AIIntelligenceCard />

      {/* 7. Fleet Status & Recent Activity Stream */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem',
          alignItems: 'stretch',
        }}
      >
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <StatusChart
            running={fleetStatus?.running || summary?.running || 16}
            idle={fleetStatus?.idle || summary?.idle || 2}
            maintenance={fleetStatus?.maintenance || summary?.maintenance || 2}
          />
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <ActivityFeed />
        </div>
      </div>

      {/* 8. Criticality Risk & Health Trend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem',
        }}
      >
        <CriticalityChart
          high={summary?.highCriticality || 11}
          medium={summary?.mediumCriticality || 6}
          low={summary?.lowCriticality || 3}
        />
        <HealthTrendChart />
      </div>

      {/* 9. Production Analytics Chart */}
      <div style={{ marginBottom: '1.75rem' }}>
        <ProductionChart />
      </div>

      {/* 10. Alerts Panel */}
      <AlertsPanel />

      {/* Inspection Modal */}
      {selectedMachineDetail && (
        <MachineDetailsModal
          machine={selectedMachineDetail}
          onClose={() => setSelectedMachineDetail(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
