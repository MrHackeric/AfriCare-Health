// src/components/ShowEmergencyContact.js
import React, { useEffect, useState } from 'react';
import { fetchEmergencyContacts } from './firebaseService'; // Import the service
import EditEmergencyContacts from './EditEmergencyContact';

function ShowEmergencyContact() {
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  // Fetch the emergency contacts from Firestore
  useEffect(() => {
    const unsubscribe = fetchEmergencyContacts((contactList) => {
      setContacts(contactList);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Open the modal with a specific contact
  const handleOpenModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  if (loading) {
    return <p className="text-center text-pink-600">Loading contacts...</p>;
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-lg rounded-lg p-5">
      <h2 className="font-semibold text-pink-600 text-lg text-center mb-4">Saved Emergency Contacts</h2>
      
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="p-4 bg-white rounded-md shadow-md transition-transform transform hover:scale-105">
            <h3 className="font-bold text-gray-800">{contact.name}</h3>
            <p className="text-gray-700">Phone: {contact.phone}</p>
            <p className="text-gray-700">Email: {contact.email}</p>
            <p className="text-gray-700">Relationship: {contact.relationship}</p>
            {contact.notes && (
              <p className="text-gray-700">Notes: {contact.notes}</p>
            )}
            <button
              className="mt-2 text-sm bg-pink-500 text-white p-2 rounded hover:bg-pink-400 transition duration-300"
              onClick={() => handleOpenModal(contact)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Conditionally render the EditEmergencyContacts component */}
      {isModalOpen && selectedContact && (
        <EditEmergencyContacts 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          contact={selectedContact} 
        />
      )}
    </div>
  );
}

export default ShowEmergencyContact;
