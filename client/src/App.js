import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';

// 12 Dedicated Pages for Each Navigation Item
import DashboardPage from './pages/DashboardPage';
import PlantHierarchyPage from './pages/PlantHierarchyPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import AssetListPage from './pages/AssetListPage';
import SensorMonitoringPage from './pages/SensorMonitoringPage';
import AIIntelligencePage from './pages/AIIntelligencePage';
import WhatIfSimulationPage from './pages/WhatIfSimulationPage';
import MaintenancePage from './pages/MaintenancePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// Additional CRUD & Auth Pages
import AddAssetPage from './pages/AddAssetPage';
import EditAssetPage from './pages/EditAssetPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  const [selectedPlant, setSelectedPlant] = useState('Coimbatore Hub');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setToken(localStorage.getItem('token'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Protected Route Wrapper Component
  const ProtectedLayout = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-wrapper">
          <HeaderBar
            selectedPlant={selectedPlant}
            onPlantChange={setSelectedPlant}
            user={user}
            onLogout={handleLogout}
          />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Unprotected Auth Routes */}
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 12 Protected Dedicated Page Routes */}
        <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
        <Route path="/plants" element={<ProtectedLayout><PlantHierarchyPage /></ProtectedLayout>} />
        <Route path="/digital-twin" element={<ProtectedLayout><DigitalTwinPage /></ProtectedLayout>} />
        <Route path="/assets" element={<ProtectedLayout><AssetListPage selectedPlant={selectedPlant} /></ProtectedLayout>} />
        <Route path="/sensors" element={<ProtectedLayout><SensorMonitoringPage /></ProtectedLayout>} />
        <Route path="/ai-intelligence" element={<ProtectedLayout><AIIntelligencePage /></ProtectedLayout>} />
        <Route path="/what-if" element={<ProtectedLayout><WhatIfSimulationPage /></ProtectedLayout>} />
        <Route path="/maintenance" element={<ProtectedLayout><MaintenancePage /></ProtectedLayout>} />
        <Route path="/analytics" element={<ProtectedLayout><AnalyticsPage /></ProtectedLayout>} />
        <Route path="/alerts" element={<ProtectedLayout><AlertsPage /></ProtectedLayout>} />
        <Route path="/reports" element={<ProtectedLayout><ReportsPage /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />

        {/* Additional Asset CRUD Routes */}
        <Route path="/assets/new" element={<ProtectedLayout><AddAssetPage /></ProtectedLayout>} />
        <Route path="/assets/edit/:id" element={<ProtectedLayout><EditAssetPage /></ProtectedLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
