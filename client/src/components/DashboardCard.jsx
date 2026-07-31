import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon: Icon, colorClass, onClick }) => {
  return (
    <div className="glass-card dashboard-card" onClick={onClick}>
      <div className="card-info">
        <h4 className="card-title">{title}</h4>
        <div className="card-value">{value}</div>
        <div className="card-subtitle">{subtitle}</div>
      </div>
      {Icon && (
        <div className={`card-icon-container ${colorClass || ''}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
