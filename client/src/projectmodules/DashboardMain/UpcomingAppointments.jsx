import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import EditAppointmentForm from '../Emergency/EditAppointments'; // Adjust the import path as needed

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Add the document ID for referencing later
          ...doc.data()
        }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };

    fetchAppointments();
  }, [db]);

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleCloseEditForm = () => {
    setEditingAppointment(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Upcoming Appointments
      </h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaCalendarAlt className="text-2xl text-blue-500 mr-4" />
                <div>
                  <p className="text-lg font-bold">{appointment.date}</p>
                  <p>{appointment.time} with {appointment.doctor}</p>
                </div>
              </div>
              <button
                onClick={() => handleEditClick(appointment)}
                className="text-sm text-red-500 hover:underline"
              >
                Reschedule
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
      </ul>

      {editingAppointment && (
        <EditAppointmentForm
          appointment={editingAppointment}
          onClose={handleCloseEditForm}
        />
      )}
    </div>
  );
}

export default UpcomingAppointments;
