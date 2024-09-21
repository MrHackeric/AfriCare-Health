import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../projectmodules/Auth/firebase-config'; // Import Firestore configuration
import { getAuth } from 'firebase/auth';

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState('');
  const [showAllStarred, setShowAllStarred] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;

  // Function to fetch messages from Firestore
  useEffect(() => {
    if (user) {
      const messagesRef = collection(db, 'users', user.uid, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setError(null);

    // Save user message to Firestore
    try {
      if (user) {
        const messagesRef = collection(db, 'users', user.uid, 'messages');
        await addDoc(messagesRef, userMessage);
      }
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    try {
      const response = await fetch('https://africare-backrnd-ghfwd0e4d6aeegcv.southafricanorth-01.azurewebsites.net/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response, timestamp: new Date() };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Save bot response to Firestore
      if (user) {
        const messagesRef = collection(db, 'users', user.uid, 'messages');
        await addDoc(messagesRef, botMessage);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setError('Oops! Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    caption,
    messagesEndRef,
    chatContainerRef,
    setCaption,
    sendMessage,
  };
};
  