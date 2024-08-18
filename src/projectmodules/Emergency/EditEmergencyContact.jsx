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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Contact</h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <div
            contentEditable
            className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, name: e.target.textContent })}
          >
            {contact.name}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <div
            contentEditable
            className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, phone: e.target.textContent })}
          >
            {contact.phone}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <div
            contentEditable
            className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, email: e.target.textContent })}
          >
            {contact.email}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Relationship</label>
          <div
            className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
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
                className="bg-gray-300 p-2 rounded-sm mr-2"
                onClick={() => setContact({ ...contact, relationship: rel })}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <div
            contentEditable
            className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, notes: e.target.textContent })}
          >
            {contact.notes}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white p-2 rounded-sm mr-2"
            onClick={saveChanges}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-sm mr-2"
            onClick={deleteContact}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded-sm"
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
