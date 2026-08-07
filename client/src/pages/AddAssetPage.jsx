import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { machineApi } from '../services/api';
import AssetForm from '../components/AssetForm';
import Toast from '../components/Toast';

const AddAssetPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await machineApi.create(formData);

      if (res.data.success) {
        // Redirect to Asset List with state message for toast
        navigate('/assets', {
          state: { toastMessage: `Asset '${formData.assetName}' registered successfully!` },
        });
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to create asset. Check form details.';
      setToast({ message: errMsg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Register New Machine Asset</h1>
          <p>Add technical specifications, physical location, and maintenance metadata</p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AssetForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/assets')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddAssetPage;
