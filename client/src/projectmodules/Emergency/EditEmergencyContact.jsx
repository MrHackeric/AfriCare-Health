import React, { useState, useEffect } from 'react';
import { ref, set, remove, onValue } from 'firebase/database';
import { realtimeDb } from '../Auth/firebase-config'; // Import your Realtime Database configuration
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEmergencyContact({ contactId, onClose }) {
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    notes: '',
  });

  const relationships = ['Family', 'Friend', 'Doctor', 'Other'];

  useEffect(() => {
    // Fetch contact details
    const contactRef = ref(realtimeDb, `emergencyContacts/${contactId}`);
    const unsubscribe = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContact(data);
      }
    }, (error) => {
      console.error('Error fetching contact:', error);
      toast.error('Failed to fetch contact details');
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [contactId]);

  // Save changes
  const saveChanges = async () => {
    if (contact.name && contact.phone && contact.email) {
      try {
        const contactRef = ref(realtimeDb, `emergencyContacts/${contactId}`);
        await set(contactRef, contact);
        toast.success('Contact updated successfully!');
        onClose(); // Close the edit modal
      } catch (error) {
        console.error('Error updating contact:', error);
        toast.error('Failed to update contact');
      }
    } else {
      toast.warn('Name, Email and Phone Number are required');
    }
  };

  // Delete contact
  const deleteContact = async () => {
    try {
      const contactRef = ref(realtimeDb, `emergencyContacts/${contactId}`);
      await remove(contactRef);
      toast.success('Contact deleted successfully!');
      onClose(); // Close the edit modal
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-gray-800 dark:bg-opacity-30 bg-gray-800 bg-opacity-30 z-50">
      <div className="dark:bg-gray-700 bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Edit Contact</h2>

        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Name</label>
          <div
            contentEditable
            className="text-[10px] text-gray-800 dark:text-gray-200 flex-1 p-2 border dark:border-gray-200 border-gray-800 rounded-md w-full"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, name: e.target.textContent })}
          >
            {contact.name}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Phone Number</label>
          <div
            contentEditable
            className="text-[10px] text-gray-800 dark:text-gray-200 flex-1 p-2 border dark:border-gray-200 border-gray-800 rounded-md w-full"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, phone: e.target.textContent })}
          >
            {contact.phone}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Email Address</label>
          <div
            contentEditable
            className="text-[10px] text-gray-800 dark:text-gray-200 flex-1 p-2 border dark:border-gray-200 border-gray-800 rounded-md w-full"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, email: e.target.textContent })}
          >
            {contact.email}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Relationship</label>
          <div
            className="text-[10px] text-gray-800 dark:text-gray-200 flex-1 p-2 border dark:border-gray-200 border-gray-800 rounded-md w-full"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, relationship: e.target.textContent })}
          >
            {contact.relationship || 'Select Relationship'}
          </div>
          <div className="mt-2">
            {relationships.map((rel) => (
              <button
                key={rel}
                className="text-sm dark:bg-gray-500 bg-gray-800 text-gray-200 dark:text-white p-2 rounded dark:hover:bg-gray-400 dark:hover:text-gray-200 hover:bg-gray-400 hover:text-gray-800 transition duration-300 ml-3"
                onClick={() => setContact({ ...contact, relationship: rel })}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-100 mb-4 text-[12px]">Notes</label>
          <div
            contentEditable
            className="text-[10px] text-gray-800 dark:text-gray-200 flex-1 p-2 border dark:border-gray-200 border-gray-800 rounded-md w-full"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, notes: e.target.textContent })}
          >
            {contact.notes}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
                className="text-sm dark:bg-gray-500 bg-gray-800 dark:text-white text-gray-200 p-2 rounded dark:hover:bg-gray-400 dark:hover:text-gray-200 transition hover:bg-gray-400 hover:text-gray-800 duration-300 ml-3"
                onClick={saveChanges}
          >
            Save
          </button>
          <button
                className="text-sm dark:bg-red-800 bg-red-800 dark:text-white text-gray-200 p-2 rounded dark:hover:bg-gray-100 dark:hover:text-red-800 hover:bg-red-200 hover:text-red-900 transition duration-300 ml-3"
                onClick={deleteContact}
          >
            Delete
          </button>
          <button
                className="text-sm dark:bg-gray-800 bg-gray-500 dark:text-white text-gray-200 p-2 rounded dark:hover:bg-gray-200 dark:hover:text-gray-800 hover:bg-gray-800 transition duration-300 ml-3"
                onClick={onClose}
          >
            Cancel
          </button>
        </div>
        
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
}

export default EditEmergencyContact;
