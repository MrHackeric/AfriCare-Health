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
  const [editingContactId, setEditingContactId] = useState(null);
  const [isContactsVisible, setIsContactsVisible] = useState(true); // New state for collapse/expand

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
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-3 flex flex-col flex-1 relative">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Emergency Contacts</h2>
        
        <div className="mb-4">
          <h3 className="text-[12px] font-medium text-gray-800 dark:text-gray-100">Add New Contact</h3>
          
          <input
            type="text"
            placeholder="Name"
            className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md text-sm w-full mt-2"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md text-sm w-full mt-2"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md text-sm w-full mt-2"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
          <select
            className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md text-sm w-full mt-2"
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
            className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md text-sm w-full mt-2"
            value={newContact.notes}
            onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
          />
          <button
            className="ml-1 px-3 py-2.5 dark:bg-white bg-violet-200 text-[13px] text-violet-800 rounded-md flex items-center"
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
    </div>
  );
}

export default Emergency;
