// src/components/ShowEmergencyContact.js
import React, { useEffect, useState } from 'react';
import { fetchEmergencyContacts } from './firebaseService'; // Import the service
import EditEmergencyContacts from './EditEmergencyContact';

function ShowEmergencyContact() {
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null); // For storing selected contact to edit
  
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the emergency contacts from Firestore
  useEffect(() => {
    const unsubscribe = fetchEmergencyContacts((contactList) => {
      setContacts(contactList);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);


  // // Close the editing modal
  // const handleCloseEdit = () => {
  //   setEditing(false);
  //   setSelectedContact(null);
  // };

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

  // Fetch a list of contacts and render buttons to open the modal
  // Replace this with actual logic for fetching and displaying contacts
  const [contacts, setContacts] = useState([]);
  React.useEffect(() => {
    const unsubscribe = fetchEmergencyContacts((contactList) => {
      setContacts(contactList);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-3">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Saved Emergency Contacts</h2>
      
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">{contact.name}</h3>
            <p className="text-gray-700 dark:text-gray-300">Phone: {contact.phone}</p>
            <p className="text-gray-700 dark:text-gray-300">Email: {contact.email}</p>
            <p className="text-gray-700 dark:text-gray-300">Relationship: {contact.relationship}</p>
            {contact.notes && (
              <p className="text-gray-700 dark:text-gray-300">Notes: {contact.notes}</p>
            )}


            {/* Edit Button */}
            <button
              className="mt-2 text-sm bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
              onClick={() => handleOpenModal(contact)}
            >
              Edit
            </button>  
            <EditEmergencyContacts isOpen={isModalOpen} onClose={handleCloseModal} contact={selectedContact}/>
          </li>
        ))}
      </ul>

      {/* Conditionally render the EditEmergencyContact component */}
      {editing && selectedContact && (
        <EditEmergencyContact
          contact={selectedContact}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
}

export default ShowEmergencyContact;
