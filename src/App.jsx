import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../AuthContext'; // Adjust the import based on your setup
import ProtectedRoute from '../ProtectedRoute'; // Adjust the import based on your setup

import './css/style.css';

// Import pages
import Dashboard from './projectmodules/DashboardMain/DashboardPage';
import MapsPage from './projectmodules/Maps/MapsPage';
import CommunityPage from './projectmodules/Community/CommunityPage';
import ChatbotPage from './projectmodules/Chatbot/ChatbotPage';
import SignUpPage from './projectmodules/SignUp/SignUpPage';
import SignInPage from './projectmodules/SignIn/SignInPage';
import ForgotPasswordPage from './projectmodules/ForgotPass/ForgotPassword';
import FeedBackForm from './projectmodules/Settings/FeedBackForm';
import BillingPlans from './projectmodules/Settings/BillingPlans';
import BillingInvoices from './projectmodules/Settings/BillingInvoices';
import AccountDetailsPage from './projectmodules/Settings/AccountDetailsPage';
import NotificationsPage from './projectmodules/Settings/NotificationsPage';
import EmergencyPage from './projectmodules/Emergency/EmergencyPage';
import Landing from './projectmodules/Landing/Landing';
import NotFoundPage from './projectmodules/NotFound/NotFoundPage'; // Import a NotFound page

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/EmergencyPage" element={
          <ProtectedRoute>
            <EmergencyPage />
          </ProtectedRoute>
        } />
        <Route path="/MapsPage" element={
          <ProtectedRoute>
            <MapsPage />
          </ProtectedRoute>
        } />
        <Route path="/Community" element={
          <ProtectedRoute>
            <CommunityPage />
          </ProtectedRoute>
        } />
        <Route path="/Chatbot" element={
          <ProtectedRoute>
            <ChatbotPage />
          </ProtectedRoute>
        } />
        <Route path="/BillingInvoices" element={
          <ProtectedRoute>
            <BillingInvoices />
          </ProtectedRoute>
        } />
        <Route path="/Account" element={
          <ProtectedRoute>
            <AccountDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/Notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/BillingPlans" element={
          <ProtectedRoute>
            <BillingPlans />
          </ProtectedRoute>
        } />
        <Route path="/Feedback" element={
          <ProtectedRoute>
            <FeedBackForm />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;