import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NotificationsPage = () => {
  const [initialValues, setInitialValues] = useState({
    emailAlerts: false,
    smsNotifications: false,
    pushNotifications: false,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('notificationPreferences'));
    if (savedPreferences) {
      setInitialValues(savedPreferences);
    }
  }, []);

  const NotificationSchema = Yup.object().shape({
    emailAlerts: Yup.boolean(),
    smsNotifications: Yup.boolean(),
    pushNotifications: Yup.boolean(),
  });

  const handleFormSubmit = (values, actions) => {
    try {
      localStorage.setItem('notificationPreferences', JSON.stringify(values));
      setStatus('Notification settings updated successfully.');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setStatus('Failed to update notification settings. Please try again later.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Notification Preferences
          </h2>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={NotificationSchema}
          enableReinitialize={true}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="emailAlerts"
                    id="emailAlerts"
                    className="mr-2"
                  />
                  <label
                    htmlFor="emailAlerts"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="smsNotifications"
                    id="smsNotifications"
                    className="mr-2"
                  />
                  <label
                    htmlFor="smsNotifications"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    SMS Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="pushNotifications"
                    id="pushNotifications"
                    className="mr-2"
                  />
                  <label
                    htmlFor="pushNotifications"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Push Notifications
                  </label>
                </div>
              </div>

              {status && (
                <div className="mt-4 text-center text-sm text-green-500">{status}</div>
              )}

              <div className="mt-6 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Preferences'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NotificationsPage;
