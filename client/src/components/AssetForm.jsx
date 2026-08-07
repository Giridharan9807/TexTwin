import React, { useState, useEffect } from 'react';
import { Save, X, AlertTriangle } from 'lucide-react';

const AssetForm = ({ initialValues = {}, onSubmit, onCancel, isEdit = false, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    machineId: '',
    assetName: '',
    machineType: 'Air Jet Loom',
    manufacturer: '',
    modelNumber: '',
    serialNumber: '',
    installationDate: '',
    factoryName: 'TexTwin Primary Mill',
    plantLocation: 'Main Shed',
    department: 'Weaving',
    productionLine: 'Line 1',
    physicalLocation: '',
    purchaseCost: '',
    warrantyExpiry: '',
    currentStatus: 'Running',
    assignedOperator: '',
    maintenanceEngineer: '',
    lastMaintenanceDate: '',
    nextScheduledMaintenance: '',
    assetCriticality: 'Medium',
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      // Format dates for HTML date input strings (YYYY-MM-DD)
      const formatDateStr = (dateVal) => {
        if (!dateVal) return '';
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
      };

      setFormData((prev) => ({
        ...prev,
        ...initialValues,
        installationDate: formatDateStr(initialValues.installationDate),
        warrantyExpiry: formatDateStr(initialValues.warrantyExpiry),
        lastMaintenanceDate: formatDateStr(initialValues.lastMaintenanceDate),
        nextScheduledMaintenance: formatDateStr(initialValues.nextScheduledMaintenance),
      }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.machineId.trim()) newErrors.machineId = 'Machine ID is required';
    if (!formData.assetName.trim()) newErrors.assetName = 'Asset Name is required';
    if (!formData.machineType.trim()) newErrors.machineType = 'Machine Type is required';
    if (!formData.currentStatus) newErrors.currentStatus = 'Current Status is required';
    if (!formData.assetCriticality) newErrors.assetCriticality = 'Asset Criticality is required';

    // Date logic validations
    if (formData.installationDate && formData.warrantyExpiry) {
      const install = new Date(formData.installationDate);
      const warranty = new Date(formData.warrantyExpiry);
      if (warranty < install) {
        newErrors.warrantyExpiry = 'Warranty Expiry cannot be earlier than Installation Date';
      }
    }

    if (formData.lastMaintenanceDate && formData.nextScheduledMaintenance) {
      const lastMaint = new Date(formData.lastMaintenanceDate);
      const nextMaint = new Date(formData.nextScheduledMaintenance);
      if (nextMaint < lastMaint) {
        newErrors.nextScheduledMaintenance = 'Next Maintenance cannot be earlier than Last Maintenance Date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
      <div className="form-section-title">1. Basic Identification & Model Details</div>
      <div className="form-grid">
        <div className="form-group">
          <label>
            Machine ID <span className="required">*</span>
          </label>
          <input
            type="text"
            name="machineId"
            className={`form-control ${errors.machineId ? 'error' : ''}`}
            placeholder="e.g. LOOM-107"
            value={formData.machineId}
            onChange={handleChange}
            disabled={isEdit} // Lock ID in edit mode
          />
          {errors.machineId && <span className="error-text">{errors.machineId}</span>}
        </div>

        <div className="form-group">
          <label>
            Asset Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="assetName"
            className={`form-control ${errors.assetName ? 'error' : ''}`}
            placeholder="e.g. Toyota Air Jet Loom Delta"
            value={formData.assetName}
            onChange={handleChange}
          />
          {errors.assetName && <span className="error-text">{errors.assetName}</span>}
        </div>

        <div className="form-group">
          <label>
            Machine Type <span className="required">*</span>
          </label>
          <input
            type="text"
            name="machineType"
            className={`form-control ${errors.machineType ? 'error' : ''}`}
            placeholder="Air Jet Loom, Rapier Loom, Water Jet Loom"
            value={formData.machineType}
            onChange={handleChange}
          />
          {errors.machineType && <span className="error-text">{errors.machineType}</span>}
        </div>

        <div className="form-group">
          <label>Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            className="form-control"
            placeholder="e.g. Toyota Industries"
            value={formData.manufacturer}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Model Number</label>
          <input
            type="text"
            name="modelNumber"
            className="form-control"
            placeholder="e.g. JAT810"
            value={formData.modelNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            className="form-control"
            placeholder="e.g. SN-9981-X"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section-title">2. Factory Hierarchy & Physical Location</div>
      <div className="form-grid">
        <div className="form-group">
          <label>Factory Name</label>
          <input
            type="text"
            name="factoryName"
            className="form-control"
            value={formData.factoryName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Plant Location</label>
          <input
            type="text"
            name="plantLocation"
            className="form-control"
            value={formData.plantLocation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Production Line</label>
          <input
            type="text"
            name="productionLine"
            className="form-control"
            placeholder="e.g. Line 1"
            value={formData.productionLine}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Physical Location (Floor/Section)</label>
          <input
            type="text"
            name="physicalLocation"
            className="form-control"
            placeholder="e.g. Floor 1 - Bay C"
            value={formData.physicalLocation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Purchase Cost ($ USD)</label>
          <input
            type="number"
            name="purchaseCost"
            className="form-control"
            placeholder="e.g. 50000"
            value={formData.purchaseCost}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section-title">3. Operational Status & Personnel</div>
      <div className="form-grid">
        <div className="form-group">
          <label>
            Current Status <span className="required">*</span>
          </label>
          <select
            name="currentStatus"
            className={`form-control ${errors.currentStatus ? 'error' : ''}`}
            value={formData.currentStatus}
            onChange={handleChange}
          >
            <option value="Running">Running (Active Production)</option>
            <option value="Idle">Idle (Standby / Off-shift)</option>
            <option value="Maintenance">Maintenance (Service / Repair)</option>
          </select>
          {errors.currentStatus && <span className="error-text">{errors.currentStatus}</span>}
        </div>

        <div className="form-group">
          <label>
            Asset Criticality <span className="required">*</span>
          </label>
          <select
            name="assetCriticality"
            className={`form-control ${errors.assetCriticality ? 'error' : ''}`}
            value={formData.assetCriticality}
            onChange={handleChange}
          >
            <option value="High">High (Mission Critical)</option>
            <option value="Medium">Medium (Standard Production)</option>
            <option value="Low">Low (Auxiliary)</option>
          </select>
          {errors.assetCriticality && <span className="error-text">{errors.assetCriticality}</span>}
        </div>

        <div className="form-group">
          <label>Assigned Operator</label>
          <input
            type="text"
            name="assignedOperator"
            className="form-control"
            placeholder="Operator name"
            value={formData.assignedOperator}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Maintenance Engineer</label>
          <input
            type="text"
            name="maintenanceEngineer"
            className="form-control"
            placeholder="Engineer name"
            value={formData.maintenanceEngineer}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-section-title">4. Maintenance Schedules & Dates</div>
      <div className="form-grid">
        <div className="form-group">
          <label>Installation Date</label>
          <input
            type="date"
            name="installationDate"
            className="form-control"
            value={formData.installationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Warranty Expiry Date</label>
          <input
            type="date"
            name="warrantyExpiry"
            className={`form-control ${errors.warrantyExpiry ? 'error' : ''}`}
            value={formData.warrantyExpiry}
            onChange={handleChange}
          />
          {errors.warrantyExpiry && <span className="error-text">{errors.warrantyExpiry}</span>}
        </div>

        <div className="form-group">
          <label>Last Maintenance Date</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            className="form-control"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Next Scheduled Maintenance</label>
          <input
            type="date"
            name="nextScheduledMaintenance"
            className={`form-control ${errors.nextScheduledMaintenance ? 'error' : ''}`}
            value={formData.nextScheduledMaintenance}
            onChange={handleChange}
          />
          {errors.nextScheduledMaintenance && (
            <span className="error-text">{errors.nextScheduledMaintenance}</span>
          )}
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <AlertTriangle size={20} />
          <span>Please fix the form errors highlighted above before submitting.</span>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSubmitting}>
          <X size={18} /> Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <Save size={18} /> {isSubmitting ? 'Saving Asset...' : isEdit ? 'Update Asset' : 'Save Asset'}
        </button>
      </div>
    </form>
  );
};

export default AssetForm;
