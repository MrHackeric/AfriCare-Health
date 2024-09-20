import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Auth/firebase-config';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

function ForgotPasswordPage() {
  const [status, setStatus] = useState({});
  const [countdown, setCountdown] = useState(10); // 10 seconds countdown
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate('/SignIn');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setStatus({ success: "Password reset email sent! Please check your inbox." });

      // Start countdown after successful email sent
      setCountdown(10);
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus({ error: "Failed to send password reset email. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Forgot Password
          </h2>
        </header>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-pink-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-3 w-full border-2 border-pink-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-300 w-full"
                  disabled={isSubmitting}
                >
                  Send Password Reset Email
                </button>
              </div>
              {status && status.success && (
                <div className="mt-4 text-green-500 text-sm text-center">
                  {status.success}
                  <div className="text-sm mt-2">
                    Redirecting to Sign In in {countdown} seconds...
                  </div>
                </div>
              )}
              {status && status.error && (
                <div className="mt-4 text-red-500 text-sm text-center">
                  {status.error}
                </div>
              )}
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <a
            href="/SignIn"
            className="text-sm text-pink-700 hover:underline"
          >
            Remembered your password? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
