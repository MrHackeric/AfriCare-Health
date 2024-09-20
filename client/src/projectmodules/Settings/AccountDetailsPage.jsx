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
    fullName: '',
    email: '',
    gender: '',
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
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
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
              <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-md rounded-lg p-8 max-w-lg w-full">
                <header className="mb-6 text-center">
                  <h2 className="text-3xl font-semibold text-pink-800">
                    Account Settings
                  </h2>
                  <p className="text-pink-600">Manage your account details</p>
                </header>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={AccountDetailsSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-pink-600"
                        >
                          Full Name
                        </label>
                        <Field
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Enter your full name"
                          className="mt-1 block w-full px-3 py-2 border border-pink-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-pink-700"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-pink-600"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          className="mt-1 block w-full px-3 py-2 border border-pink-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-pink-700"
                          disabled
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {/* Gender */}
                      <div>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-pink-600"
                        >
                          Gender
                        </label>
                        <Field
                          as="select"
                          name="gender"
                          id="gender"
                          className="mt-1 block w-full px-3 py-2 border border-pink-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-pink-700"
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
                      {/* Status Messages */}
                      {status.success && (
                        <div className="text-green-500 text-sm">{status.success}</div>
                      )}
                      {status.error && (
                        <div className="text-red-500 text-sm">{status.error}</div>
                      )}
                      {/* Buttons */}
                      <div className="flex justify-between items-center">
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-all duration-200"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          className="ml-4 text-red-800 underline hover:text-gray-800 dark:hover:text-gray-300"
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
