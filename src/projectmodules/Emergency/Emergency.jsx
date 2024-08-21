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
    <div className="col-span-full xl:col-span-6 bg-[#fff] rounded-xl p-6">
      <h2 className="text-sm font-semibold text-[#a06e91] mb-4">Emergency Contacts</h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-[#a06e91]">Add New Contact</h3>
        <input
          type="text"
          placeholder="Name"
          className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink type-pink"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <select
          className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
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
          className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
          value={newContact.notes}
          onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
        />
        <button className="text-sm bg-[#a06e91] text-[white] p-2 rounded border-2 hover:bg-[white] hover:border-[#a06e91] hover:text-[#a06e91] transition duration-300" onClick={addContact}>
          Add Contact
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Emergency;
