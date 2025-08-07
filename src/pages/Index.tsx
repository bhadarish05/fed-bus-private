import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { BusMap } from '@/components/BusMap';
import { RouteManager } from '@/components/RouteManager';
import { PrivacyDashboard } from '@/components/PrivacyDashboard';
import { EmergencyPanel } from '@/components/EmergencyPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <BusMap />;
      case 'routes':
        return <RouteManager />;
      case 'privacy':
        return <PrivacyDashboard />;
      case 'emergency':
        return <EmergencyPanel />;
      default:
        return <BusMap />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
