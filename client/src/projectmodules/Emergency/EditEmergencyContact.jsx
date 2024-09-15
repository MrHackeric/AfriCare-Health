import React, { useState, useEffect } from 'react';
import { updateContact, deleteContact } from './firebaseService'; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEmergencyContacts({ isOpen, onClose, contact }) {
  const [editedContact, setEditedContact] = useState(null);

  // Initialize or reset the editedContact state when the contact prop changes
  useEffect(() => {
    if (contact) {
      setEditedContact(contact);
    }
  }, [contact]);

  // Handle editing a contact's details
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  // Save changes to the contact
  const handleSaveClick = async () => {
    if (editedContact) {
      try {
        await updateContact(editedContact.id, editedContact);
        toast.success('Contact updated successfully!');
        onClose(); // Close the modal on success
      } catch (error) {
        console.error('Error updating contact:', error);
        toast.error('Failed to update contact');
      }
    }
  };

  // Delete the contact
  const handleDeleteClick = async () => {
    if (editedContact) {
      try {
        await deleteContact(editedContact.id);
        toast.success('Contact deleted successfully!');
        onClose(); // Close the modal on success
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  if (!isOpen || !editedContact) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Emergency Contact</h2>

        <input
          type="text"
          name="name"
          value={editedContact.name || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Name"
        />
        <input
          type="tel"
          name="phone"
          value={editedContact.phone || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          value={editedContact.email || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Email"
        />
        <select
          name="relationship"
          value={editedContact.relationship || ''}
          onChange={handleEditChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
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
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Notes"
        />
        <div className="flex justify-between mt-2">
          <button
            className="text-sm bg-green-600 text-white p-2 rounded hover:bg-green-500 transition duration-300"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="text-sm bg-red-600 text-white p-2 rounded hover:bg-red-500 transition duration-300"
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
