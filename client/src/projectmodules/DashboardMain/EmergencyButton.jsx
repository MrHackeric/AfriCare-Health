import React from 'react';

function EmergencyButton() {
    return (
        <div className="bg-red-500 text-white py-4 rounded-md shadow-lg mt-6 text-center">
            <a href="/EmergencyPage" className="font-semibold hover:underline text-lg">Emergency Services</a>
        </div>
    );
}

export default EmergencyButton;
