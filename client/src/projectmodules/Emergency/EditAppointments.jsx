import React, { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function EditAppointments({ appointment, onClose }) {
    const [formValues, setFormValues] = useState({ date: '', time: '', doctor: '', notes: '' });
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // List of time slots for the dropdown
    const db = getFirestore();

    useEffect(() => {
        if (appointment) {
            setFormValues(appointment);
        }

        // Fetch available time slots (mock data or from the database)
        const fetchTimeSlots = async () => {
            // Mock data for time slots (replace with actual database calls if needed)
            const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];
            setAvailableTimeSlots(timeSlots);
        };

        fetchTimeSlots();
    }, [appointment]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
        if (formValues.date && new Date(formValues.date).toLocaleDateString() === new Date().toLocaleDateString()) {
            alert("Date cannot be today!");
            return;
        }

        try {
            const appointmentRef = doc(db, 'appointments', appointment.id);
            await updateDoc(appointmentRef, formValues);
            alert('Appointment updated successfully!');
            onClose(); // Close the form on success
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Failed to update appointment.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Appointment</h2>

                {/* Date Input */}
                <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />

                {/* Time Dropdown */}
                <select
                    name="time"
                    value={formValues.time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                >
                    <option value="">Select Time</option>
                    {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                {/* Doctor Input */}
                <input
                    type="text"
                    name="doctor"
                    value={formValues.doctor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    placeholder="Doctor's Name"
                />

                {/* Notes Input */}
                <textarea
                    name="notes"
                    value={formValues.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    placeholder="Notes"
                />

                <button
                    className="text-sm bg-green-600 text-white p-2 rounded hover:bg-green-500 transition duration-300"
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditAppointments;
