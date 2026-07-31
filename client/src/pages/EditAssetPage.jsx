import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { machineApi } from '../services/api';
import AssetForm from '../components/AssetForm';
import Toast from '../components/Toast';

const EditAssetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAsset();
  }, [id]);

  const fetchAsset = async () => {
    try {
      setLoading(true);
      const res = await machineApi.getById(id);
      if (res.data.success) {
        setAssetData(res.data.data);
      }
    } catch (err) {
      setToast({ message: 'Failed to load asset details', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await machineApi.update(id, formData);

      if (res.data.success) {
        navigate('/assets', {
          state: { toastMessage: `Asset '${formData.assetName}' updated successfully!` },
        });
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to update asset.';
      setToast({ message: errMsg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
        Loading machine asset details...
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Edit Machine Asset ({assetData?.machineId})</h1>
          <p>Update machine status, operational specs, and scheduled maintenance</p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AssetForm
        initialValues={assetData}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/assets')}
        isEdit={true}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditAssetPage;
