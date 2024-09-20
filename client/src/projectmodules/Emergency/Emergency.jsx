// src/components/Emergency.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContactToFirestore } from './firebaseService'; // Import the function

function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    notes: '',
  });
  const relationships = ['Family', 'Friend', 'Doctor', 'Other'];

  // Add a new contact to Firestore subcollection
  const addContact = async () => {
    try {
      await addContactToFirestore(newContact);
      setNewContact({ name: '', phone: '', email: '', relationship: '', notes: '' });
      toast.success('Contact added successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-lg rounded-lg p-5">
      <h2 className="font-semibold text-pink-600 text-lg text-center mb-4">Emergency Contacts</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Add New Contact</h3>
        
        <input
          type="text"
          placeholder="Name"
          className="mt-2 text-gray-800 dark:text-gray-800 p-3 border border-pink-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="mt-2 text-gray-800 dark:text-gray-800 p-3 border border-pink-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="mt-2 text-gray-800 dark:text-gray-800 p-3 border border-pink-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <select
          className="mt-2 text-gray-800 dark:text-gray-800 p-3 border border-pink-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
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
          className="mt-2 text-gray-800 dark:text-gray-800 p-3 border border-pink-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={newContact.notes}
          onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
        />
        <button
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          onClick={addContact}
        >
          Add Contact
        </button>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Emergency;
