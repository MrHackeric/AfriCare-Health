import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/firebase-config'; // Ensure your Firebase config is correct
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
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side: GIF */}
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center">
          <img src={gifSrc} alt="Sign In Animation" className="object-cover w-full h-full rounded-l-lg" />
        </div>

        {/* Right Side: Sign In Form */}
        <div className="w-full md:w-1/2 p-8">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
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
                      className="block text-sm font-medium text-pink-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border-2 border-pink-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-pink-700 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-pink-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border-2 border-pink-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FaEye className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-pink-700 text-sm mt-1"
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
                    className="bg-pink-600 text-white w-full p-3 rounded hover:bg-pink-700 transition duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-sm text-gray-600 mt-4">
                    Don’t have an account?{' '}
                    <a
                      href="#"
                      onClick={() => navigate('/SignUp')}
                      className="text-pink-700 hover:underline"
                    >
                      Sign up here
                    </a>
                  </p>

                  {/* Forgot Password Link */}
                  <p className="text-sm text-gray-600 mt-2">
                    <a
                      href="#"
                      onClick={() => navigate('/ForgotPassword')}
                      className="text-pink-700 hover:underline"
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
