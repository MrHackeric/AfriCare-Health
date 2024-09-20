import React, { useState } from 'react';
import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';
import AdvisorPage from './AdvisorPage';
import QuickActions from './QuickActions';
import UpcomingAppointments from './UpcomingAppointments';
import SupportGroupActivity from './SupportGroupActivity';
import MentalHealthCheck from './MentalHealthCheck';
import HealthResources from './HealthResources';
import EmergencyButton from './EmergencyButton';
import Recommendations from './Recommendations';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


            {/* Dashboard Sections */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column (Advisor Message, Quick Actions, Mental Health) */}
              <div className="col-span-full lg:col-span-8">
                <AdvisorPage />
                <QuickActions />
                <MentalHealthCheck />
                <Recommendations />
              </div>

              {/* Right Column (Appointments, Support Group, Health Resources, Emergency Button) */}
              <div className="col-span-full lg:col-span-4">
                <UpcomingAppointments />
                <SupportGroupActivity />
                <HealthResources />
                <EmergencyButton />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
