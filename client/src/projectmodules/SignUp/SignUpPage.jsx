import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Auth/firebase-config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import signUpGif from '../../images/giphy.gif'; // Ensure you have a GIF file at this path

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    fullName: '',
    email: '',
    gender: '',
    password: ''
  };

  const SignUpSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
  });

  const handleFormSubmit = async (values, actions) => {
    const { fullName, email, gender, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        gender
      });

      // Redirect to Onboarding page
      navigate('/Onboarding');
    } catch (error) {
      console.error("Sign up error:", error);
      actions.setStatus({ error: "Failed to sign up. Please try again." });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="hero px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* GIF Section */}
        <div className="hidden lg:block w-full lg:w-1/2 p-6">
          <img src={signUpGif} alt="Sign Up GIF" className="w-full h-auto rounded-lg object-cover" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full lg:w-1/2 p-6">
          <header className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Sign Up to AfriCare
            </h2>
          </header>

          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="space-y-4">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Enter your full name"
                      className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      id="gender"
                      className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-2 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-4 h-4 text-gray-500" />
                        ) : (
                          <FaEye className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                {/* Error Message */}
                {status && status.error && (
                  <div className="mb-4 text-red-500 text-xs">{status.error}</div>
                )}

                {/* Sign Up Button */}
                <div className="mt-4 flex flex-col items-center">
                  <button
                    type="submit"
                    className="w-full bg-pink-700 text-white border-2 border-pink-700  px-4 py-2 rounded-md transition text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                  </button>

                  {/* Sign In Link */}
                  <p className="text-xs text-gray-700 mt-4">
                    Already have an account?{' '}
                    <a
                      href="#"
                      onClick={() => navigate('/SignIn')}
                      className="text-pink-700 hover:underline"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
