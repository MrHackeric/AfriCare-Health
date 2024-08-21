import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/firebase-config'; // Ensure your Firebase config is correct
import Header from '../Landing/partials/Header';

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
      // Redirect to /Dashboard or another page
      navigate('/Community');
    } catch (error) {
      console.error("Sign in error:", error);
      actions.setStatus({ error: "Failed to sign in. Please check your credentials and try again." });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#874c78]">
      <div className="border-2 border-[#f2b1d0] bg-white dark:bg-[#874c78] shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold dark:text-[white] text-center">
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
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium dark:text-[white]"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
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
                    className="block text-sm font-medium text-gray-700 dark:text-[white]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.98 8.236a9.953 9.953 0 0 1 1.783-2.89m2.56-1.045A9.956 9.956 0 0 1 12 4.5c2.16 0 4.164.714 5.757 1.903m1.897 1.566a9.957 9.957 0 0 1 2.09 3.513m1.415 1.756a9.953 9.953 0 0 1 1.734 2.26M5.715 16.757a9.95 9.95 0 0 1-1.696-2.206m2.648-3.438A9.956 9.956 0 0 1 12 19.5c-2.16 0-4.164-.714-5.757-1.903m-1.897-1.566A9.958 9.958 0 0 1 2.82 12m-1.415-1.756A9.953 9.953 0 0 1 .69 7.728m2.12-2.217C3.982 4.42 5.863 3.5 7.982 3.5c2.227 0 4.206.78 5.75 2.085M12 12c-1.43 0-2.755.61-3.757 1.59M14.757 13.59C13.755 12.61 12.43 12 12 12m4.757-2.242c-.657-.87-1.542-1.563-2.757-1.563M9.243 10.756c-.657-.87-1.542-1.563-2.757-1.563M16.257 13.59c-.657-.87-1.542-1.563-2.757-1.563" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20.5c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14.5a6.5 6.5 0 0 0-6.5 6.5 6.5 6.5 0 0 0 6.5 6.5 6.5 6.5 0 0 0 6.5-6.5A6.5 6.5 0 0 0 12 6zm0 8.5a2.5 2.5 0 0 1-2.5-2.5A2.5 2.5 0 0 1 12 9.5 2.5 2.5 0 0 1 14.5 12 2.5 2.5 0 0 1 12 14.5z" />
                        </svg>
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
              {status.error && (
                <div className="mb-4 text-red-500 text-sm">{status.error}</div>
              )}
              <div className="mt-6 flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Don’t have an account?{' '}
                  <a
                    href="#"
                    onClick={() => navigate('/SignUp')}
                    className="text-blue-500 hover:underline"
                  >
                    Sign up here
                  </a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <a
                    href="#"
                    onClick={() => navigate('/ForgotPassword')}
                    className="text-blue-500 hover:underline"
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
  );
};

export default SignInPage;
