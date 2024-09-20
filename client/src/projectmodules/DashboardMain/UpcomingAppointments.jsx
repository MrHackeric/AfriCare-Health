import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function UpcomingAppointments() {
  const appointments = [
    { date: '2024-09-20', time: '10:00 AM', doctor: 'Dr. Jane Doe' },
    { date: '2024-10-05', time: '2:00 PM', doctor: 'Dr. John Smith' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Upcoming Appointments
      </h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaCalendarAlt className="text-2xl text-blue-500 mr-4" />
              <div>
                <p className="text-lg font-bold">{appointment.date}</p>
                <p>{appointment.time} with {appointment.doctor}</p>
              </div>
            </div>
            <button className="text-sm text-red-500 hover:underline">
              Reschedule
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingAppointments;
