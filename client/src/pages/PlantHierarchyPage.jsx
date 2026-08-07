import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { machineApi } from '../api/client';
import SkeletonCard from '../components/SkeletonCard';
import MachineDetailsModal from '../components/MachineDetailsModal';
import { Factory, Layers, PlayCircle, PauseCircle, Wrench, ChevronDown, ChevronRight, Eye, Edit2, Plus } from 'lucide-react';

const PlantHierarchyPage = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLines, setExpandedLines] = useState({});
  const [selectedMachineForView, setSelectedMachineForView] = useState(null);

  // Fallback 20 Default Weaving Machines across 6 Regional Plants
  const defaultMachines = [
    { _id: 'm1', machineId: 'LOOM-101', assetName: 'Toyota Air Jet Loom Alpha', machineType: 'Air Jet Loom', modelNumber: 'JAT810', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', physicalLocation: 'Floor 1 - Bay A', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Rajesh Kumar' },
    { _id: 'm2', machineId: 'LOOM-102', assetName: 'Picanol Rapier Loom Beta', machineType: 'Rapier Loom', modelNumber: 'OptiMax-i', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', physicalLocation: 'Floor 1 - Bay B', currentStatus: 'Running', assetCriticality: 'High', healthScore: 94, assignedOperator: 'Suresh V' },
    { _id: 'm3', machineId: 'LOOM-103', assetName: 'Staubli High-Speed Dobby Loom', machineType: 'Air Jet Loom', modelNumber: 'S3000', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', physicalLocation: 'Floor 1 - Bay E', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 99, assignedOperator: 'Rajesh Kumar' },
    { _id: 'm4', machineId: 'LOOM-104', assetName: 'Tsudakoma Water Jet Loom', machineType: 'Water Jet Loom', modelNumber: 'ZW8100', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 2 - Yarn Twister Line', physicalLocation: 'Floor 2 - Bay C', currentStatus: 'Idle', assetCriticality: 'Medium', healthScore: 88, assignedOperator: 'Manoj Kumar' },
    { _id: 'm5', machineId: 'LOOM-105', assetName: 'Itema R9500 Jacquard Loom', machineType: 'Rapier Loom', modelNumber: 'R9500-2', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 2 - Yarn Twister Line', physicalLocation: 'Floor 2 - Bay A', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 96, assignedOperator: 'Gopal S' },

    { _id: 'm6', machineId: 'LOOM-201', assetName: 'Dornier Heavy Shuttleless Loom', machineType: 'Rapier Loom', modelNumber: 'P2 Type', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', physicalLocation: 'Shed B - Section 1', currentStatus: 'Maintenance', assetCriticality: 'High', healthScore: 68, assignedOperator: 'Praveen R' },
    { _id: 'm7', machineId: 'LOOM-202', assetName: 'Picanol GTMax-i Rapier Loom', machineType: 'Rapier Loom', modelNumber: 'GTMax-2024', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', physicalLocation: 'Shed B - Section 2', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 95, assignedOperator: 'Vikram S' },
    { _id: 'm8', machineId: 'LOOM-203', assetName: 'Toyota JAT810 High-Speed Dobby', machineType: 'Air Jet Loom', modelNumber: 'JAT810-D', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 4 - Dobby Weaving Express', physicalLocation: 'Shed C - Section 1', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Arun K' },

    { _id: 'm9', machineId: 'LOOM-301', assetName: 'Itema A9500 Denim Air Jet Loom', machineType: 'Air Jet Loom', modelNumber: 'A9500-Denim', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 5 - Denim Production Line', physicalLocation: 'Hall 1 - Row A', currentStatus: 'Running', assetCriticality: 'High', healthScore: 96, assignedOperator: 'Harish Patel' },
    { _id: 'm10', machineId: 'LOOM-302', assetName: 'Toyota JAT810 Heavy Canvas Loom', machineType: 'Air Jet Loom', modelNumber: 'JAT810-Canvas', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 5 - Denim Production Line', physicalLocation: 'Hall 1 - Row B', currentStatus: 'Idle', assetCriticality: 'Medium', healthScore: 91, assignedOperator: 'Amit Sharma' },
    { _id: 'm11', machineId: 'LOOM-303', assetName: 'Tsudakoma ZW8200 Synthetic Jet', machineType: 'Water Jet Loom', modelNumber: 'ZW8200', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 6 - Hydro Water Jet Arena', physicalLocation: 'Hall 2 - Row A', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 99, assignedOperator: 'Harish Patel' },

    { _id: 'm12', machineId: 'LOOM-401', assetName: 'Staubli LX3202 Electronic Jacquard', machineType: 'Rapier Loom', modelNumber: 'LX3202', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', physicalLocation: 'Heritage Wing - Bay 1', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Subramanian M' },
    { _id: 'm13', machineId: 'LOOM-402', assetName: 'Bonas Si Electronic Jacquard Loom', machineType: 'Rapier Loom', modelNumber: 'Bonas Si-2023', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', physicalLocation: 'Heritage Wing - Bay 2', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Subramanian M' },

    { _id: 'm14', machineId: 'LOOM-501', assetName: 'Picanol OmniPlus i Air Jet Loom', machineType: 'Air Jet Loom', modelNumber: 'OmniPlus-i2024', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', physicalLocation: 'Eco Shed - Bay 1', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 97, assignedOperator: 'Murugan P' },
    { _id: 'm15', machineId: 'LOOM-502', assetName: 'Toyota JAT810 Organic Sheeting Loom', machineType: 'Air Jet Loom', modelNumber: 'JAT810-Organic', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', physicalLocation: 'Eco Shed - Bay 2', currentStatus: 'Running', assetCriticality: 'High', healthScore: 96, assignedOperator: 'Kannan K' },

    { _id: 'm16', machineId: 'LOOM-601', assetName: 'Tsudakoma ZW8200 Ultra Water Jet', machineType: 'Water Jet Loom', modelNumber: 'ZW8200-Ultra', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 9 - Warp Speed Polyester', physicalLocation: 'Tower A - Level 1', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 99, assignedOperator: 'Ramesh Shah' },
    { _id: 'm17', machineId: 'LOOM-602', assetName: 'Itema R9500 Synthetic Filament Rapier', machineType: 'Rapier Loom', modelNumber: 'R9500-Filament', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 9 - Warp Speed Polyester', physicalLocation: 'Tower A - Level 2', currentStatus: 'Idle', assetCriticality: 'High', healthScore: 90, assignedOperator: 'Dipak Patel' },
    { _id: 'm18', machineId: 'LOOM-603', assetName: 'Dornier P2 Technical Mesh Loom', machineType: 'Rapier Loom', modelNumber: 'P2-Mesh', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', physicalLocation: 'Tower B - Level 1', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Ramesh Shah' },
    { _id: 'm19', machineId: 'LOOM-604', assetName: 'Staubli S3200 Dobby Jet', machineType: 'Air Jet Loom', modelNumber: 'S3200-Jet', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', physicalLocation: 'Tower B - Level 2', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 95, assignedOperator: 'Dipak Patel' },
    { _id: 'm20', machineId: 'LOOM-605', assetName: 'Picanol OptiMax-i Connect Heavy Rapier', machineType: 'Rapier Loom', modelNumber: 'OptiMax-Connect', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', physicalLocation: 'Tower B - Level 3', currentStatus: 'Running', assetCriticality: 'High', healthScore: 99, assignedOperator: 'Ramesh Shah' },
  ];

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const res = await machineApi.getAll();
      if (res && res.data && res.data.success && res.data.data.length > 0) {
        populateData(res.data.data);
      } else {
        populateData(defaultMachines);
      }
    } catch (err) {
      console.warn('Using default plant hierarchy assets:', err.message);
      populateData(defaultMachines);
    } finally {
      setLoading(false);
    }
  };

  const populateData = (list) => {
    setMachines(list);
    const initialExpand = {};
    list.forEach((m) => {
      const key = `${m.factoryName || 'TexTwin Primary Mill'}__${m.productionLine || 'Line 1'}`;
      initialExpand[key] = true;
    });
    setExpandedLines(initialExpand);
  };

  const toggleLineExpand = (key) => {
    setExpandedLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Group machines by Plant -> Production Line
  const plantGroups = machines.reduce((acc, machine) => {
    const plant = machine.factoryName || 'TexTwin Primary Mill';
    const line = machine.productionLine || 'Line 1';

    if (!acc[plant]) acc[plant] = {};
    if (!acc[plant][line]) acc[plant][line] = [];

    acc[plant][line].push(machine);
    return acc;
  }, {});

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running':
        return <span className="badge badge-running"><span className="dot"></span> Running</span>;
      case 'Idle':
        return <span className="badge badge-idle"><span className="dot"></span> Idle</span>;
      case 'Maintenance':
        return <span className="badge badge-maintenance"><span className="dot"></span> Maintenance</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Plant & Production Line Hierarchy</h1>
          <p>Multi-Factory Operations — Inspect Looms Partitioned by Plant Location & Production Line</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/assets/new')}>
          <Plus size={16} /> Add Asset
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SkeletonCard height="160px" />
          <SkeletonCard height="160px" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(plantGroups).map(([plantName, linesMap]) => (
            <div key={plantName} className="glass-card" style={{ padding: '1.75rem' }}>
              {/* Plant Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="card-icon-container icon-blue">
                    <Factory size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {plantName}
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
                      {Object.keys(linesMap).length} Production Lines • {Object.values(linesMap).flat().length} Registered Weaving Looms
                    </span>
                  </div>
                </div>
              </div>

              {/* Lines Grouping under Plant */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.entries(linesMap).map(([lineName, loomList]) => {
                  const expandKey = `${plantName}__${lineName}`;
                  const isExpanded = expandedLines[expandKey];

                  const runningCount = loomList.filter((m) => m.currentStatus === 'Running').length;
                  const idleCount = loomList.filter((m) => m.currentStatus === 'Idle').length;
                  const maintCount = loomList.filter((m) => m.currentStatus === 'Maintenance').length;
                  const avgHealth = Math.round(
                    loomList.reduce((acc, m) => acc + (m.healthScore || 95), 0) / loomList.length
                  );

                  return (
                    <div
                      key={lineName}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Line Bar Toggle Header */}
                      <div
                        onClick={() => toggleLineExpand(expandKey)}
                        style={{
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: 'var(--bg-header)',
                          borderBottom: isExpanded ? '1px solid var(--border-subtle)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          <Layers size={18} style={{ color: 'var(--accent-primary)' }} />
                          <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {lineName}
                          </span>
                          <span className="badge badge-low" style={{ marginLeft: '0.5rem' }}>
                            {loomList.length} Looms
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-running)', fontWeight: '700' }}>
                            <PlayCircle size={15} /> {runningCount} Running
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-idle)', fontWeight: '700' }}>
                            <PauseCircle size={15} /> {idleCount} Idle
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-maintenance)', fontWeight: '700' }}>
                            <Wrench size={15} /> {maintCount} Maintenance
                          </div>
                          <div style={{ fontWeight: '800', color: 'var(--accent-primary)' }}>
                            Avg Health: {avgHealth}%
                          </div>
                        </div>
                      </div>

                      {/* Line Looms Table */}
                      {isExpanded && (
                        <div className="table-responsive">
                          <table className="custom-table" style={{ background: 'var(--bg-card)' }}>
                            <thead>
                              <tr>
                                <th>Machine ID</th>
                                <th>Asset Name</th>
                                <th>Type / Model</th>
                                <th>Physical Bay</th>
                                <th>Status</th>
                                <th>Criticality</th>
                                <th>Operator</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loomList.map((loom) => (
                                <tr key={loom._id || loom.machineId}>
                                  <td style={{ fontWeight: '700', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                                    {loom.machineId}
                                  </td>
                                  <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                                    {loom.assetName}
                                  </td>
                                  <td style={{ color: 'var(--text-secondary)' }}>
                                    {loom.machineType} ({loom.modelNumber || 'N/A'})
                                  </td>
                                  <td style={{ color: 'var(--text-secondary)' }}>{loom.physicalLocation || 'Bay 1'}</td>
                                  <td>{getStatusBadge(loom.currentStatus)}</td>
                                  <td>
                                    <span className={`badge badge-${(loom.assetCriticality || 'Medium').toLowerCase()}`}>
                                      {loom.assetCriticality}
                                    </span>
                                  </td>
                                  <td style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{loom.assignedOperator || 'Unassigned'}</td>
                                  <td>
                                    <div className="action-buttons">
                                      <button
                                        className="icon-btn"
                                        title="Inspect Details"
                                        onClick={() => setSelectedMachineForView(loom)}
                                      >
                                        <Eye size={15} />
                                      </button>
                                      <button
                                        className="icon-btn"
                                        title="Edit Loom"
                                        onClick={() => navigate(`/assets/edit/${loom._id || loom.machineId}`)}
                                      >
                                        <Edit2 size={15} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7-Section Machine Details Inspection View */}
      {selectedMachineForView && (
        <MachineDetailsModal
          machine={selectedMachineForView}
          onClose={() => setSelectedMachineForView(null)}
        />
      )}
    </div>
  );
};

export default PlantHierarchyPage;
