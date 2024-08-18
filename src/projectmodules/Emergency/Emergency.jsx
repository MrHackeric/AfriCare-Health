import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { realtimeDb } from '../Auth/firebase-config'; // Import your Realtime Database configuration
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEmergencyContact from './EditEmergencyContact'; // Import the EditEmergencyContact component

function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    notes: '',
  });
  const [editingContactId, setEditingContactId] = useState(null);
  const [isContactsVisible, setIsContactsVisible] = useState(true); // New state for collapse/expand

  const relationships = ['Family', 'Friend', 'Doctor', 'Other'];

  // Add a new contact
  const addContact = async () => {
    if (newContact.name && newContact.phone && newContact.email) {
      try {
        const newContactRef = ref(realtimeDb, `emergencyContacts/${Date.now()}`);
        await set(newContactRef, newContact);
        setNewContact({ name: '', phone: '', email: '', relationship: '', notes: '' });
        toast.success('Contact added successfully!');
      } catch (error) {
        console.error('Error adding contact:', error);
        toast.error('Failed to add contact');
      }
    } else {
      toast.warn('Name, Email, and Phone Number are required');
    }
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Emergency Contacts</h2>

      <div className="mb-4">
        <h3 className="font-medium text-gray-800 dark:text-gray-100">Add New Contact</h3>
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded-sm w-full mt-2 dark:bg-gray-800 dark:border-gray-700"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="p-2 border rounded-sm w-full mt-2 dark:bg-gray-800 dark:border-gray-700"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="p-2 border rounded-sm w-full mt-2 dark:bg-gray-800 dark:border-gray-700"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <select
          className="p-2 border rounded-sm w-full mt-2 dark:bg-gray-800 dark:border-gray-700"
          value={newContact.relationship}
          onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
        >
          <option value="">Select Relationship</option>
          {relationships.map((rel) => (
            <option key={rel} value={rel}>
              {rel}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Notes"
          className="p-2 border rounded-sm w-full mt-2 dark:bg-gray-800 dark:border-gray-700"
          value={newContact.notes}
          onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2 rounded-sm mt-2" onClick={addContact}>
          Add Contact
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Emergency;
