import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Auth/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});

  const initialValues = {
    email: '',
    password: ''
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleFormSubmit = async (values, actions) => {
    const { email, password } = values;

    try {
      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Set the success status and navigate to the dashboard
      setStatus({ success: 'Sign-in successful! Redirecting to the dashboard...' });
      navigate('/Dashboard');
    } catch (error) {
      // Set the error status
      setStatus({ error: error.message });
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Sign In to AfriCare
          </h2>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-4">
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
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
                <div className="text-blue-600 hover:underline">
                  <a href="/ForgotPassword">Forgot Password?</a>
                </div>
                {status.error && (
                  <div className="text-red-500 text-sm">
                    {status.error}
                  </div>
                )}
                {status.success && (
                  <div className="text-green-500 text-sm">
                    {status.success}
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Don't have an account?{' '}
                  <a href="/" className="text-blue-600 hover:underline">
                    Sign Up
                  </a>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
