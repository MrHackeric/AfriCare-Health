import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { realtimeDb } from '../Auth/firebase-config'; // Import your Realtime Database configuration
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEmergencyContact from './EditEmergencyContact'; // Import the EditEmergencyContact component

function ShowEmergencyContact() {
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

  // Fetch contacts from Realtime Database
  useEffect(() => {
    const contactsRef = ref(realtimeDb, 'emergencyContacts');
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactsList = Object.entries(data).map(([id, contact]) => ({
          id,
          ...contact
        }));
        setContacts(contactsList);
      } else {
        setContacts([]);
      }
    }, (error) => {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white rounded-xl p-6">
      <h2 className="text-sm font-semibold text-[#a06e91] mb-4">Your Saved Emergency Contacts</h2>
      <div className="mb-4 text-[#a06e91] text-sm ">
        {isContactsVisible && (
          <ul className="list-disc pl-5">
            {contacts.map((contact) => (
              <li key={contact.id} className="mb-2">
                <div>
                  <strong>Name:</strong> {contact.name}
                </div>
                <div>
                  <strong>Phone:</strong> {contact.phone}
                </div>
                <div>
                  <strong>Email Address:</strong> {contact.email}
                </div>
                <div>
                  <strong>Relationship:</strong> {contact.relationship}
                </div>
                <div>
                  <strong>Notes:</strong> {contact.notes}
                </div>
                <button
                  className="bg-[#a06e91] text-[white] p-2 rounded border-2 hover:bg-[white] hover:border-[#a06e91] hover:text-[#a06e91] transition duration-300"
                  onClick={() => setEditingContactId(contact.id)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editingContactId && (
        <EditEmergencyContact
          contactId={editingContactId}
          onClose={() => setEditingContactId(null)}
          onSave={() => toast.success('Contact updated successfully!')} // Ensure toast appears after successful edit
        />
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ShowEmergencyContact;
