import React from 'react';

const SkeletonCard = ({ height = '180px' }) => {
  return (
    <div
      className="glass-card skeleton-pulse"
      style={{
        height,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div className="skeleton-pulse" style={{ height: '18px', width: '40%', marginBottom: '1rem', background: '#1E293B' }}></div>
      <div className="skeleton-pulse" style={{ height: '32px', width: '70%', marginBottom: '0.8rem', background: '#1E293B' }}></div>
      <div className="skeleton-pulse" style={{ height: '14px', width: '50%', background: '#1E293B' }}></div>
    </div>
  );
};

export default SkeletonCard;
