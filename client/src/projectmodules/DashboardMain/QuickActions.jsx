import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaRobot, FaUsers, FaAmbulance, FaHeartbeat } from 'react-icons/fa'; // Importing icons from react-icons

function QuickActions() {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* AI Chatbot button with a link and icon */}
                <Link to="/Chatbot" className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-2">
                    <FaRobot className="text-xl" />
                    <span>AI Chatbot</span>
                </Link>

                {/* Support Groups button with a link and icon */}
                <Link to="/Community" className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 flex items-center justify-center space-x-2">
                    <FaUsers className="text-xl" />
                    <span>Support Groups</span>
                </Link>

                {/* Emergency button with a link and icon */}
                <Link to="/EmergencyPage" className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-300 flex items-center justify-center space-x-2">
                    <FaAmbulance className="text-xl" />
                    <span>Emergency</span>
                </Link>

                {/* Health Assistance button with a link and icon */}
                <Link to="/Chatbot" className="bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 flex items-center justify-center space-x-2">
                    <FaHeartbeat className="text-xl" />
                    <span>Health Assistance</span>
                </Link>
            </div>
        </div>
    );
}

export default QuickActions;
