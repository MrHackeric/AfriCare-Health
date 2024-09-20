import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function SaveAppointment() {
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const db = getFirestore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'appointments'), appointment);
      setMessage('Appointment saved successfully!');
      setAppointment({ date: '', time: '', doctor: '', notes: '' });
    } catch (error) {
      setMessage('Failed to save the appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-12 md:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Save Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Doctor's Name</label>
          <input
            type="text"
            name="doctor"
            value={appointment.doctor}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Time</label>
          <input
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Notes</label>
          <textarea
            name="notes"
            value={appointment.notes}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Appointment'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 dark:text-green-300">{message}</p>}
    </div>
  );
}

export default SaveAppointment;
