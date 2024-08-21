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
    <div className="fixed inset-0 flex items-center justify-center bg-[#a06e91] bg-opacity-30 z-50">
      <div className="bg-[#fff] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-sm font-semibold text-[#a06e91] mb-4">Edit Contact</h2>

        <div className="mb-4">
          <label className="block text-sm text-[#a06e91] mb-1">Name</label>
          <div
            contentEditable
            className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, name: e.target.textContent })}
          >
            {contact.name}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm block text-[#a06e91] mb-1">Phone Number</label>
          <div
            contentEditable
            className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, phone: e.target.textContent })}
          >
            {contact.phone}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm block text-[#a06e91] mb-1">Email Address</label>
          <div
            contentEditable
            className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, email: e.target.textContent })}
          >
            {contact.email}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm block text-[#a06e91] mb-1">Relationship</label>
          <div
            className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
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
                className="text-sm bg-[#a06e91] text-[white] p-2 rounded border-2 hover:bg-[white] hover:border-[#a06e91] hover:text-[#a06e91] transition duration-300"
                onClick={() => setContact({ ...contact, relationship: rel })}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm block text-[#a06e91] mb-1">Notes</label>
          <div
            contentEditable
            className="text-sm p-2 border w-full mt-2 border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
            suppressContentEditableWarning
            onBlur={(e) => setContact({ ...contact, notes: e.target.textContent })}
          >
            {contact.notes}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-[#a06e91] text-[white] p-2 mr-5 rounded border-2 hover:bg-[white] hover:border-[#a06e91] hover:text-[#a06e91] transition duration-300"
            onClick={saveChanges}
          >
            Save
          </button>
          <button
            className="bg-[red] text-[white] p-2 mr-5 rounded border-2 hover:bg-[white] hover:border-[red] hover:text-[red] transition duration-300"
            onClick={deleteContact}
          >
            Delete
          </button>
          <button
            className="bg-[#f2b1d0] text-[#874c78] p-2 mr-5 rounded border-2 hover:bg-[white] hover:border-[#f2b1d0] hover:text-[#f2b1d0] transition duration-300"
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
