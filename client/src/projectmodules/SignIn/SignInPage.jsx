import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/firebase-config'; // Ensure your Firebase config is correct
import Header from '../Landing/partials/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import gifSrc from '../../images/giphy.gif'; // Replace with your actual GIF path

const SignInPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to /Community page
      navigate('/Community');
    } catch (error) {
      console.error("Sign in error:", error);
      actions.setStatus({ error: "Failed to sign in. Please check your credentials and try again." });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: GIF */}
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center">
          <img src={gifSrc} alt="Sign In Animation" className="object-cover w-full h-full" />
        </div>

        {/* Right Side: Sign In Form */}
        <div className="w-full md:w-1/2 p-8">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
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
                <div className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-3 rounded border-2 border-gray-300 bg-gray-100 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-[#a06e91] text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full p-3 rounded border-2 border-gray-300 bg-gray-100 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        ) : (
                          <FaEye className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-[#a06e91] text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {status.error && (
                  <div className="mb-4 text-red-500 text-sm">{status.error}</div>
                )}

                {/* Sign In Button */}
                <div className="mt-6 flex flex-col items-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Don’t have an account?{' '}
                    <a
                      href="#"
                      onClick={() => navigate('/SignUp')}
                      className="text-blue-600 hover:underline"
                    >
                      Sign up here
                    </a>
                  </p>

                  {/* Forgot Password Link */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <a
                      href="#"
                      onClick={() => navigate('/ForgotPassword')}
                      className="text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
