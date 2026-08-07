import React from 'react';
import { AlertOctagon, X, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, assetName, onConfirm, onCancel, isDeleting = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <AlertOctagon size={28} />
          <h3 className="modal-title">Delete Machine Asset</h3>
        </div>

        <div className="modal-body">
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{assetName}</strong>? This action cannot be undone and will permanently remove all asset specs from the TexTwin Digital Twin database.
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onCancel} disabled={isDeleting}>
            <X size={16} /> Cancel
          </button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm} disabled={isDeleting}>
            <Trash2 size={16} /> {isDeleting ? 'Deleting...' : 'Delete Asset'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
