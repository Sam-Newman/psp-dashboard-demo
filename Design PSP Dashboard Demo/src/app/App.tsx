import { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { Header } from '@/app/components/Header';
import { Dashboard } from '@/app/pages/Dashboard';
import { Merchants } from '@/app/pages/Merchants';
import { Transactions } from '@/app/pages/Transactions';
import { Settlements } from '@/app/pages/Settlements';
import { Settings } from '@/app/pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'merchants':
        return 'Merchant Management';
      case 'transactions':
        return 'Transaction Monitoring';
      case 'settlements':
        return 'Settlements & Reporting';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'merchants':
        return <Merchants />;
      case 'transactions':
        return <Transactions />;
      case 'settlements':
        return <Settlements />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#141414] overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
