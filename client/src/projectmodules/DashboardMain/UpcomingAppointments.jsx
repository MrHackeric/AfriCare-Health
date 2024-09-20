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
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-sm rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">
        Upcoming Appointments
      </h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaCalendarAlt className="text-2xl text-blue-500 mr-4" />
                <div>
                  <p className="text-lg font-bold text-pink-600">{appointment.date}</p>
                  <p className='text-pink-600 italic text-[12px]'>{appointment.time} with {appointment.doctor}</p>
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
          <p className="text-pink-600">No upcoming appointments.</p>
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
