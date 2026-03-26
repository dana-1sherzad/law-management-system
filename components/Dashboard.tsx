
import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardHome from './dashboard/DashboardHome';
import CasesPage from './dashboard/pages/CasesPage';
import ClientsPage from './dashboard/pages/ClientsPage';
import FinancePage from './dashboard/pages/FinancePage';
import ArchivePage from './dashboard/pages/ArchivePage';
import ReportsPage from './dashboard/pages/ReportsPage';
import SettingsPage from './dashboard/pages/SettingsPage';
import CalendarPage from './dashboard/pages/CalendarPage';
import NotesPage from './dashboard/pages/NotesPage';
import TasksPage from './dashboard/pages/TasksPage';
import TeamPage from './dashboard/pages/TeamPage';
import ClientProfilePage from './dashboard/pages/ClientProfilePage';
import TeamMemberProfilePage from './dashboard/pages/TeamMemberProfilePage';
import MatterDetailsPage from './dashboard/pages/MatterDetailsPage';
import DocumentsPage from './dashboard/pages/DocumentsPage';
import TrustAccountsPage from './dashboard/pages/TrustAccountsPage';
import CommunicationPage from './dashboard/pages/CommunicationPage';
import ConflictCheckPage from './dashboard/pages/ConflictCheckPage';
import NotificationsPage from './dashboard/pages/NotificationsPage';
import { motion, AnimatePresence } from 'motion/react';

export type Page = 'dashboard' | 'cases' | 'clients' | 'finance' | 'archive' | 'reports' | 'calendar' | 'settings' | 'notes' | 'tasks' | 'team' | 'client-profile' | 'team-member-profile' | 'matter-details' | 'documents' | 'trust-accounts' | 'communication' | 'conflict-check' | 'notifications';
export type UserRole = 'Lawyer' | 'Secretariat';

interface DashboardProps {
  setShowDashboard: (show: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setShowDashboard }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Lawyer');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);

  const handleViewClientProfile = (clientId: string) => {
    setSelectedClientId(clientId);
    setActivePage('client-profile');
  };

  const handleViewMemberProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
    setActivePage('team-member-profile');
  };

  const handleViewMatterDetails = (matterId: string) => {
    setSelectedMatterId(matterId);
    setActivePage('matter-details');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardHome setActivePage={setActivePage} />;
      case 'cases': return <CasesPage onViewClient={handleViewClientProfile} onViewMatter={handleViewMatterDetails} />;
      case 'clients': return <ClientsPage userRole={userRole} onViewProfile={handleViewClientProfile} />;
      case 'finance': return <FinancePage />;
      case 'archive': return <ArchivePage userRole={userRole} />;
      case 'reports': return <ReportsPage />;
      case 'calendar': return <CalendarPage />;
      case 'settings': return <SettingsPage />;
      case 'notes': return <NotesPage />;
      case 'tasks': return <TasksPage />;
      case 'team': return <TeamPage onViewProfile={handleViewMemberProfile} />;
      case 'client-profile': return <ClientProfilePage clientId={selectedClientId || ''} onBack={() => setActivePage('clients')} userRole={userRole} />;
      case 'team-member-profile': return <TeamMemberProfilePage memberId={selectedMemberId || ''} onBack={() => setActivePage('team')} />;
      case 'matter-details': return <MatterDetailsPage matterId={selectedMatterId || ''} onBack={() => setActivePage('cases')} />;
      case 'documents': return <DocumentsPage />;
      case 'trust-accounts': return <TrustAccountsPage />;
      case 'communication': return <CommunicationPage />;
      case 'conflict-check': return <ConflictCheckPage />;
      case 'notifications': return <NotificationsPage />;
      default: return <DashboardHome setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="relative flex h-screen bg-surface-bg text-text-main overflow-hidden font-sans selection:bg-brand-accent/10 selection:text-brand-accent">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <DashboardHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          handleLogout={() => setShowDashboard(false)}
          userRole={userRole}
          setUserRole={setUserRole}
          setActivePage={setActivePage}
        />
        
        <main className="flex-1 relative z-10">
          <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
