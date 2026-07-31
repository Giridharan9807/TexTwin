import React from 'react';
import { X, Server, Calendar, User, DollarSign, MapPin, Activity, ShieldCheck } from 'lucide-react';

const AssetDetailPage = ({ asset, onClose }) => {
  if (!asset) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-high" style={{ fontFamily: 'JetBrains Mono' }}>{asset.machineId}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{asset.machineType}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>{asset.assetName}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '0.25rem', color: asset.currentStatus === 'Running' ? '#34d399' : asset.currentStatus === 'Idle' ? '#fbbf24' : '#f87171' }}>
              {asset.currentStatus}
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Criticality</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '0.25rem', color: asset.assetCriticality === 'High' ? '#f87171' : asset.assetCriticality === 'Medium' ? '#fbbf24' : '#60a5fa' }}>
              {asset.assetCriticality} Criticality
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Digital Twin Health</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '0.25rem', color: '#38bdf8' }}>
              {asset.healthScore || 95}% Health Score
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Server size={16} /> Manufacturer Specs & Identification
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div><strong>Manufacturer:</strong> {asset.manufacturer || 'N/A'}</div>
              <div><strong>Model Number:</strong> {asset.modelNumber || 'N/A'}</div>
              <div><strong>Serial Number:</strong> {asset.serialNumber || 'N/A'}</div>
              <div><strong>Purchase Cost:</strong> ${asset.purchaseCost?.toLocaleString() || 'N/A'}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} /> Plant & Physical Location
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div><strong>Factory:</strong> {asset.factoryName || 'N/A'}</div>
              <div><strong>Plant Location:</strong> {asset.plantLocation || 'N/A'}</div>
              <div><strong>Department:</strong> {asset.department || 'N/A'}</div>
              <div><strong>Production Line:</strong> {asset.productionLine || 'N/A'}</div>
              <div><strong>Floor / Bay:</strong> {asset.physicalLocation || 'N/A'}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> Personnel & Responsibilities
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div><strong>Assigned Operator:</strong> {asset.assignedOperator || 'Unassigned'}</div>
              <div><strong>Maintenance Engineer:</strong> {asset.maintenanceEngineer || 'Unassigned'}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} /> Dates & Warranty Lifespan
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div><strong>Installation Date:</strong> {formatDate(asset.installationDate)}</div>
              <div><strong>Warranty Expiry:</strong> {formatDate(asset.warrantyExpiry)}</div>
              <div><strong>Last Maintenance:</strong> {formatDate(asset.lastMaintenanceDate)}</div>
              <div><strong>Next Maintenance:</strong> {formatDate(asset.nextScheduledMaintenance)}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
