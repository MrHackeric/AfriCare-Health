// src/components/EditEmergencyContact.js
import React, { useState, useEffect } from 'react';
import { updateContact, deleteContact } from './firebaseService'; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEmergencyContacts({ isOpen, onClose, contact }) {
  const [editedContact, setEditedContact] = useState(null);

  useEffect(() => {
    if (contact) {
      setEditedContact(contact);
    }
  }, [contact]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleSaveClick = async () => {
    if (editedContact) {
      try {
        await updateContact(editedContact.id, editedContact);
        toast.success('Contact updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating contact:', error);
        toast.error('Failed to update contact');
      }
    }
  };

  const handleDeleteClick = async () => {
    if (editedContact) {
      try {
        await deleteContact(editedContact.id);
        toast.success('Contact deleted successfully!');
        onClose();
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  if (!isOpen || !editedContact) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-pink-300 shadow-lg rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="font-semibold text-gray-800 text-lg text-center mb-4">Edit Emergency Contact</h2>

        <input
          type="text"
          name="name"
          value={editedContact.name || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Name"
        />
        <input
          type="tel"
          name="phone"
          value={editedContact.phone || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          value={editedContact.email || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Email"
        />
        <select
          name="relationship"
          value={editedContact.relationship || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Relationship</option>
          {['Family', 'Friend', 'Doctor', 'Other'].map((rel) => (
            <option key={rel} value={rel}>
              {rel}
            </option>
          ))}
        </select>
        <textarea
          name="notes"
          value={editedContact.notes || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Notes"
          rows="3"
        />
        <div className="flex justify-between mt-4">
          <button
            className="text-sm bg-pink-600 text-white p-2 rounded-md hover:bg-pink-500 transition duration-300"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="text-sm bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition duration-300"
            onClick={handleDeleteClick}
          >
            Delete
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

export default EditEmergencyContacts;
