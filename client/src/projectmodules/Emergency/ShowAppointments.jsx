import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FaCalendarAlt } from 'react-icons/fa';

function ShowAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [db]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="col-span-12 md:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Appointments</h2>
      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="flex items-center">
            <FaCalendarAlt className="text-blue-500 text-2xl mr-4" />
            <div>
              <p className="text-lg font-semibold">{appointment.doctor}</p>
              <p>{appointment.date} at {appointment.time}</p>
              {appointment.notes && <p className="text-gray-600 dark:text-gray-400">{appointment.notes}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowAppointments;
