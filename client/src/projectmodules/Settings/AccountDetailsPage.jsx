import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../Auth/firebase-config';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Sidebar from '../../Header&Sidebar/Sidebar';
import Header from '../../Header&Sidebar/Header';

const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    username: '',
  });
  const [status, setStatus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setInitialValues(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setStatus({ error: 'Failed to load account details.' });
      }
    };

    fetchUserData();
  }, []);

  const AccountDetailsSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    username: Yup.string().required('Username is required'),
  });

  const handleFormSubmit = async (values, actions) => {
    try { 
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), values);
        setStatus({ success: 'Account details updated successfully!' });
      }
    } catch (error) {
      console.error('Error updating account details:', error);
      actions.setStatus({ error: 'Failed to update account details. Please try again later.' });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <header className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                    Account Details
                  </h2>
                </header>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={AccountDetailsSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Form Fields */}
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter your first name"
                            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter your last name"
                            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                            disabled
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Phone Number
                          </label>
                          <PhoneInput
                            country={'us'}
                            value={initialValues.phoneNumber}
                            onChange={(phone) => setFieldValue('phoneNumber', phone)}
                            inputProps={{
                              name: 'phoneNumber',
                              id: 'phoneNumber',
                              className: 'mt-1 p-2 w-full border border-gray-200 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100',
                            }}
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Gender
                          </label>
                          <Field
                            as="select"
                            name="gender"
                            id="gender"
                            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                          >
                            <option value="" label="Select gender" />
                            <option value="male" label="Male" />
                            <option value="female" label="Female" />
                            <option value="other" label="Other" />
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Username
                          </label>
                          <Field
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Choose a username"
                            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                      {status.success && (
                        <div className="mb-4 text-green-500 text-sm">{status.success}</div>
                      )}
                      {status.error && (
                        <div className="mb-4 text-red-500 text-sm">{status.error}</div>
                      )}
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                          onClick={() => navigate('/Dashboard')}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountDetailsPage;