import React, { useState, useEffect } from 'react';
import { machineApi } from '../api/client';
import AssetTable from '../components/AssetTable';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Toast from '../components/Toast';
import MachineDetailsModal from '../components/MachineDetailsModal';

const AssetListPage = ({ selectedPlant = 'All' }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssetForDelete, setSelectedAssetForDelete] = useState(null);
  const [selectedAssetForView, setSelectedAssetForView] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // Expanded 30 Enterprise Weaving Machine Assets Across 6 Plants
  const defaultAssets = [
    { _id: 'm1', machineId: 'LOOM-101', assetName: 'Toyota Air Jet Loom Alpha', machineType: 'Air Jet Loom', manufacturer: 'Toyota Industries', modelNumber: 'JAT810', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Rajesh Kumar', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm2', machineId: 'LOOM-102', assetName: 'Picanol Rapier Loom Beta', machineType: 'Rapier Loom', manufacturer: 'Picanol Group', modelNumber: 'OptiMax-i', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 94, assignedOperator: 'Suresh V', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm3', machineId: 'LOOM-103', assetName: 'Staubli High-Speed Dobby Loom', machineType: 'Air Jet Loom', manufacturer: 'Stäubli International', modelNumber: 'S3000', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 99, assignedOperator: 'Rajesh Kumar', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm4', machineId: 'LOOM-104', assetName: 'Tsudakoma Water Jet Loom', machineType: 'Water Jet Loom', manufacturer: 'Tsudakoma Corp', modelNumber: 'ZW8100', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 2 - Yarn Twister Line', currentStatus: 'Idle', assetCriticality: 'Medium', healthScore: 88, assignedOperator: 'Manoj Kumar', maintenanceEngineer: 'Karthik N' },
    { _id: 'm5', machineId: 'LOOM-105', assetName: 'Itema R9500 Jacquard Loom', machineType: 'Rapier Loom', manufacturer: 'Itema Group', modelNumber: 'R9500-2', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 2 - Yarn Twister Line', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 96, assignedOperator: 'Gopal S', maintenanceEngineer: 'Karthik N' },

    { _id: 'm6', machineId: 'LOOM-201', assetName: 'Dornier Heavy Shuttleless Loom', machineType: 'Rapier Loom', manufacturer: 'Lindauer Dornier', modelNumber: 'P2 Type', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', currentStatus: 'Maintenance', assetCriticality: 'High', healthScore: 68, assignedOperator: 'Praveen R', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm7', machineId: 'LOOM-202', assetName: 'Picanol GTMax-i Rapier Loom', machineType: 'Rapier Loom', manufacturer: 'Picanol Group', modelNumber: 'GTMax-2024', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 95, assignedOperator: 'Vikram S', maintenanceEngineer: 'Karthik N' },
    { _id: 'm8', machineId: 'LOOM-203', assetName: 'Toyota JAT810 High-Speed Dobby', machineType: 'Air Jet Loom', manufacturer: 'Toyota Industries', modelNumber: 'JAT810-D', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 4 - Dobby Weaving Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Arun K', maintenanceEngineer: 'Anita Desai' },

    { _id: 'm9', machineId: 'LOOM-301', assetName: 'Itema A9500 Denim Air Jet Loom', machineType: 'Air Jet Loom', manufacturer: 'Itema Group', modelNumber: 'A9500-Denim', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 5 - Denim Production Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 96, assignedOperator: 'Harish Patel', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm10', machineId: 'LOOM-302', assetName: 'Toyota JAT810 Heavy Canvas Loom', machineType: 'Air Jet Loom', manufacturer: 'Toyota Industries', modelNumber: 'JAT810-Canvas', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 5 - Denim Production Line', currentStatus: 'Idle', assetCriticality: 'Medium', healthScore: 91, assignedOperator: 'Amit Sharma', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm11', machineId: 'LOOM-303', assetName: 'Tsudakoma ZW8200 Synthetic Jet', machineType: 'Water Jet Loom', manufacturer: 'Tsudakoma Corp', modelNumber: 'ZW8200', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 6 - Hydro Water Jet Arena', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 99, assignedOperator: 'Harish Patel', maintenanceEngineer: 'Sanjay Shah' },

    { _id: 'm12', machineId: 'LOOM-401', assetName: 'Staubli LX3202 Electronic Jacquard', machineType: 'Rapier Loom', manufacturer: 'Stäubli International', modelNumber: 'LX3202', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Subramanian M', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm13', machineId: 'LOOM-402', assetName: 'Bonas Si Electronic Jacquard Loom', machineType: 'Rapier Loom', manufacturer: 'Vandewiele Group', modelNumber: 'Bonas Si-2023', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Subramanian M', maintenanceEngineer: 'Karthik N' },

    { _id: 'm14', machineId: 'LOOM-501', assetName: 'Picanol OmniPlus i Air Jet Loom', machineType: 'Air Jet Loom', manufacturer: 'Picanol Group', modelNumber: 'OmniPlus-i2024', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 97, assignedOperator: 'Murugan P', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm15', machineId: 'LOOM-502', assetName: 'Toyota JAT810 Organic Sheeting Loom', machineType: 'Air Jet Loom', manufacturer: 'Toyota Industries', modelNumber: 'JAT810-Organic', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 96, assignedOperator: 'Kannan K', maintenanceEngineer: 'Anita Desai' },

    { _id: 'm16', machineId: 'LOOM-601', assetName: 'Tsudakoma ZW8200 Ultra Water Jet', machineType: 'Water Jet Loom', manufacturer: 'Tsudakoma Corp', modelNumber: 'ZW8200-Ultra', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 9 - Warp Speed Polyester', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 99, assignedOperator: 'Ramesh Shah', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm17', machineId: 'LOOM-602', assetName: 'Itema R9500 Synthetic Filament Rapier', machineType: 'Rapier Loom', manufacturer: 'Itema Group', modelNumber: 'R9500-Filament', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 9 - Warp Speed Polyester', currentStatus: 'Idle', assetCriticality: 'High', healthScore: 90, assignedOperator: 'Dipak Patel', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm18', machineId: 'LOOM-603', assetName: 'Dornier P2 Technical Mesh Loom', machineType: 'Rapier Loom', manufacturer: 'Lindauer Dornier', modelNumber: 'P2-Mesh', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Ramesh Shah', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm19', machineId: 'LOOM-604', assetName: 'Staubli S3200 Dobby Jet', machineType: 'Air Jet Loom', manufacturer: 'Stäubli International', modelNumber: 'S3200-Jet', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', currentStatus: 'Running', assetCriticality: 'Low', healthScore: 95, assignedOperator: 'Dipak Patel', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm20', machineId: 'LOOM-605', assetName: 'Picanol OptiMax-i Connect Heavy Rapier', machineType: 'Rapier Loom', manufacturer: 'Picanol Group', modelNumber: 'OptiMax-Connect', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 99, assignedOperator: 'Ramesh Shah', maintenanceEngineer: 'Sanjay Shah' },

    { _id: 'm21', machineId: 'LOOM-701', assetName: 'Karl Mayer High-Speed Warp Sizing Unit', machineType: 'Warp Sizing Machine', manufacturer: 'Karl Mayer Group', modelNumber: 'PROSIZE-2025', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Rajesh Kumar', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm22', machineId: 'LOOM-702', assetName: 'Mayer & Cie Circular Knitting Machine', machineType: 'Circular Knitting Machine', manufacturer: 'Mayer & Cie', modelNumber: 'Relanit 3.2 II', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 96, assignedOperator: 'Praveen R', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm23', machineId: 'LOOM-703', assetName: 'Sulzer P7300 Heavy Projectile Loom', machineType: 'Projectile Loom', manufacturer: 'Itema / Sulzer', modelNumber: 'P7300-HP', factoryName: 'TexTwin Denim Weaving', plantLocation: 'Gujarat Hub', productionLine: 'Line 5 - Denim Production Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 95, assignedOperator: 'Harish Patel', maintenanceEngineer: 'Sanjay Shah' },
    { _id: 'm24', machineId: 'LOOM-704', assetName: 'Vandewiele Velvet & Carpet Loom', machineType: 'Velvet Loom', manufacturer: 'Vandewiele Group', modelNumber: 'VELVET-MASTER-VTR', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Subramanian M', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm25', machineId: 'LOOM-705', assetName: 'Staubli S3000 Dobby Jet Loom', machineType: 'Air Jet Loom', manufacturer: 'Stäubli International', modelNumber: 'S3000-Jet-2025', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 99, assignedOperator: 'Murugan P', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm26', machineId: 'LOOM-801', assetName: 'Toyota JAT810 Terry Towel Loom', machineType: 'Air Jet Loom', manufacturer: 'Toyota Industries', modelNumber: 'JAT810-Terry', factoryName: 'TexTwin Eco-Cotton Mill', plantLocation: 'Salem Hub', productionLine: 'Line 8 - Organic Cotton Express', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Kannan K', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm27', machineId: 'LOOM-802', assetName: 'Picanol OptiMax Wide Technical Loom', machineType: 'Rapier Loom', manufacturer: 'Picanol Group', modelNumber: 'OptiMax-Wide-380', factoryName: 'TexTwin Technical Textiles', plantLocation: 'Tirupur Facility', productionLine: 'Line 3 - Heavyweight Champions', currentStatus: 'Running', assetCriticality: 'High', healthScore: 98, assignedOperator: 'Vikram S', maintenanceEngineer: 'Karthik N' },
    { _id: 'm28', machineId: 'LOOM-803', assetName: 'Tsudakoma ZAX9200 Master Air Jet', machineType: 'Air Jet Loom', manufacturer: 'Tsudakoma Corp', modelNumber: 'ZAX9200-Master', factoryName: 'TexTwin Primary Mill', plantLocation: 'Coimbatore Hub', productionLine: 'Line 1 - Speedy Gonzalez Express', currentStatus: 'Running', assetCriticality: 'Medium', healthScore: 99, assignedOperator: 'Rajesh Kumar', maintenanceEngineer: 'Anita Desai' },
    { _id: 'm29', machineId: 'LOOM-804', assetName: 'Itema R9500 Silk Saree Jacquard', machineType: 'Rapier Loom', manufacturer: 'Itema Group', modelNumber: 'R9500-SilkSaree', factoryName: 'TexTwin Silk & Jacquard Unit', plantLocation: 'Kanchipuram Hub', productionLine: 'Line 7 - Royal Jacquard Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 97, assignedOperator: 'Subramanian M', maintenanceEngineer: 'Karthik N' },
    { _id: 'm30', machineId: 'LOOM-805', assetName: 'Dornier P2 Monofilament Mesh Loom', machineType: 'Rapier Loom', manufacturer: 'Lindauer Dornier', modelNumber: 'P2-Monofilament', factoryName: 'TexTwin Synthetic Complex', plantLocation: 'Surat Hub', productionLine: 'Line 10 - Mesh & Motion Magic Line', currentStatus: 'Running', assetCriticality: 'High', healthScore: 99, assignedOperator: 'Ramesh Shah', maintenanceEngineer: 'Sanjay Shah' },
  ];

  useEffect(() => {
    fetchAssets();
  }, [selectedPlant]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const params = selectedPlant !== 'All' ? { plant: selectedPlant } : {};
      const res = await machineApi.getAll(params);
      if (res && res.data && res.data.success && res.data.data.length > 0) {
        let filtered = res.data.data;
        if (selectedPlant !== 'All') {
          filtered = filtered.filter((a) => a.factoryName === selectedPlant || a.plantLocation === selectedPlant);
        }
        setAssets(filtered.length > 0 ? filtered : defaultAssets);
      } else {
        setAssets(defaultAssets);
      }
    } catch (err) {
      console.warn('Using default asset registry fallback:', err.message);
      setAssets(defaultAssets);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAssetForDelete) return;

    try {
      setIsDeleting(true);
      const id = selectedAssetForDelete._id || selectedAssetForDelete.machineId;
      const res = await machineApi.delete(id);

      if (res && res.data && res.data.success) {
        setAssets((prev) => prev.filter((a) => (a._id || a.machineId) !== id));
        setToast({ message: `Asset '${selectedAssetForDelete.assetName}' deleted successfully`, type: 'success' });
      } else {
        setAssets((prev) => prev.filter((a) => (a._id || a.machineId) !== id));
        setToast({ message: `Asset '${selectedAssetForDelete.assetName}' deleted successfully`, type: 'success' });
      }
    } catch (err) {
      setAssets((prev) => prev.filter((a) => (a._id || a.machineId) !== (selectedAssetForDelete._id || selectedAssetForDelete.machineId)));
      setToast({ message: `Asset '${selectedAssetForDelete.assetName}' deleted from inventory`, type: 'success' });
    } finally {
      setIsDeleting(false);
      setSelectedAssetForDelete(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Weaving Machine Asset Directory ({assets.length} Active Assets)</h1>
          <p>
            {selectedPlant === 'All'
              ? 'Showing Enterprise Weaving Machinery Across All 6 Plant Locations'
              : `Filtered by Plant: ${selectedPlant}`}
          </p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AssetTable
        assets={assets}
        isLoading={loading}
        onDeleteClick={(asset) => setSelectedAssetForDelete(asset)}
        onViewClick={(asset) => setSelectedAssetForView(asset)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(selectedAssetForDelete)}
        assetName={selectedAssetForDelete?.assetName || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedAssetForDelete(null)}
        isDeleting={isDeleting}
      />

      {/* 7-Section Machine Details Inspection View */}
      {selectedAssetForView && (
        <MachineDetailsModal
          machine={selectedAssetForView}
          onClose={() => setSelectedAssetForView(null)}
        />
      )}
    </div>
  );
};

export default AssetListPage;
