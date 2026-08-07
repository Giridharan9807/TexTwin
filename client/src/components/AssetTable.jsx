import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Edit2, Trash2, Filter, RotateCcw } from 'lucide-react';

const AssetTable = ({ assets = [], onDeleteClick, onViewClick, isLoading = false }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [criticalityFilter, setCriticalityFilter] = useState('All');
  const [lineFilter, setLineFilter] = useState('All');

  // Extract unique production lines for dropdown
  const productionLines = ['All', ...new Set(assets.map((a) => a.productionLine).filter(Boolean))];

  // Robust Client-side filtering logic with case-insensitive matching
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      !search ||
      (asset.machineId && asset.machineId.toLowerCase().includes(search.toLowerCase())) ||
      (asset.assetName && asset.assetName.toLowerCase().includes(search.toLowerCase())) ||
      (asset.manufacturer && asset.manufacturer.toLowerCase().includes(search.toLowerCase())) ||
      (asset.productionLine && asset.productionLine.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ||
      (asset.currentStatus && asset.currentStatus.toLowerCase() === statusFilter.toLowerCase());

    const matchesCriticality =
      criticalityFilter === 'All' ||
      (asset.assetCriticality && asset.assetCriticality.toLowerCase() === criticalityFilter.toLowerCase());

    const matchesLine = lineFilter === 'All' || asset.productionLine === lineFilter;

    return matchesSearch && matchesStatus && matchesCriticality && matchesLine;
  });

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setCriticalityFilter('All');
    setLineFilter('All');
  };

  const getStatusBadge = (status) => {
    const st = (status || 'Running').toLowerCase();
    switch (st) {
      case 'running':
        return (
          <span className="badge badge-running">
            <span className="dot"></span> Running
          </span>
        );
      case 'idle':
        return (
          <span className="badge badge-idle">
            <span className="dot"></span> Idle
          </span>
        );
      case 'maintenance':
        return (
          <span className="badge badge-maintenance">
            <span className="dot"></span> Maintenance
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getCriticalityBadge = (criticality) => {
    const cr = (criticality || 'Medium').toLowerCase();
    switch (cr) {
      case 'high':
        return <span className="badge badge-high">High</span>;
      case 'medium':
        return <span className="badge badge-medium">Medium</span>;
      case 'low':
        return <span className="badge badge-low">Low</span>;
      default:
        return <span className="badge">{criticality}</span>;
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      {/* Search and Filters Bar */}
      <div className="table-controls">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Machine ID or Asset Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Filter size={16} /> Filters:
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Idle">Idle</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <select
            className="filter-select"
            value={criticalityFilter}
            onChange={(e) => setCriticalityFilter(e.target.value)}
          >
            <option value="All">All Criticalities</option>
            <option value="High">High Criticality</option>
            <option value="Medium">Medium Criticality</option>
            <option value="Low">Low Criticality</option>
          </select>

          <select
            className="filter-select"
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
          >
            {productionLines.map((line) => (
              <option key={line} value={line}>
                {line === 'All' ? 'All Lines' : line}
              </option>
            ))}
          </select>

          {(search || statusFilter !== 'All' || criticalityFilter !== 'All' || lineFilter !== 'All') && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={resetFilters}
              title="Reset Filters"
              style={{ fontSize: '0.78rem' }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/assets/new')}
            style={{ marginLeft: 'auto' }}
          >
            <Plus size={16} /> + Add Asset
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Machine ID</th>
              <th>Asset Name</th>
              <th>Manufacturer</th>
              <th>Production Line</th>
              <th>Current Status</th>
              <th>Criticality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  Loading assets from TexTwin Digital Twin registry...
                </td>
              </tr>
            ) : filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                      No weaving machine assets found matching current criteria.
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
                      <RotateCcw size={14} /> Reset Search & Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset._id || asset.machineId}>
                  <td style={{ fontWeight: '700', color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {asset.machineId}
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    <div>{asset.assetName}</div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{asset.machineType}</span>
                  </td>
                  <td>{asset.manufacturer || 'Toyota / Picanol'}</td>
                  <td>{asset.productionLine || 'Line 1'}</td>
                  <td>{getStatusBadge(asset.currentStatus)}</td>
                  <td>{getCriticalityBadge(asset.assetCriticality)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="icon-btn"
                        title="View Asset Details"
                        onClick={() => onViewClick && onViewClick(asset)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="icon-btn"
                        title="Edit Asset"
                        onClick={() => navigate(`/assets/edit/${asset._id || asset.machineId}`)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="icon-btn icon-btn-delete"
                        title="Delete Asset"
                        onClick={() => onDeleteClick && onDeleteClick(asset)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
