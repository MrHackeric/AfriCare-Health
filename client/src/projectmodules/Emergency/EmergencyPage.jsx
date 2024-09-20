import React, { useState } from 'react';

import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';
import Emergency from './Emergency'; // Assuming this is the form for adding emergency contacts
import ShowEmergencyContact from './ShowEmergencyContact'; // List of saved emergency contacts
import SaveAppointment from './SaveAppointments'; // Form for saving new appointments
import ShowAppointments from './ShowAppointments'; // List of saved appointments

function EmergencyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page Title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Emergency Contacts & Appointments</h1>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-12 gap-6">
              {/* Emergency Contacts Section */}
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Emergency Contacts</h2>

                  {/* Form to Save Emergency Contact */}
                  <div className="mb-6">
                    <Emergency />
                  </div>

                  {/* Display List of Emergency Contacts */}
                  <ShowEmergencyContact />
                </div>
              </div>

              {/* Appointments Section */}
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Doctor Appointments</h2>

                  {/* Form to Save Appointment */}
                  <div className="mb-6">
                    <SaveAppointment />
                  </div>

                  {/* Display List of Appointments */}
                  <ShowAppointments />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EmergencyPage;
