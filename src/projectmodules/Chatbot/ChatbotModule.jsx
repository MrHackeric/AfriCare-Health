import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../images/Animation.json'; // replace with your actual Lottie animation file
import { FaShare, FaCopy, FaDownload, FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [showStarred, setShowStarred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(() => !sessionStorage.getItem('isReturningUser'));
  const [name, setName] = useState(() => sessionStorage.getItem('userName') || '');
  const [email, setEmail] = useState(() => sessionStorage.getItem('userEmail') || '');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => !!sessionStorage.getItem('isReturningUser'));
  const [caption, setCaption] = useState('');
  const [showAllStarred, setShowAllStarred] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text: text.trim(), timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3030/chat', {
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
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setError('Oops! Something went wrong. Please try again later. 🌟💬✨');
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingSubmit = () => {
    if (name.trim() && email.trim()) {
      sessionStorage.setItem('isReturningUser', 'true');
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userEmail', email);
      setIsOnboardingComplete(true);
      const welcomeMessage = { sender: 'bot', text: `Welcome, ${name}! 🎉 How can I assist you today?`, timestamp: new Date() };
      setMessages([welcomeMessage]);
    }
  };

  const handleStarMessage = (message) => {
    const isStarred = starredMessages.some((msg) => msg.timestamp === message.timestamp);
    if (isStarred) {
      setStarredMessages((prev) => prev.filter((msg) => msg.timestamp !== message.timestamp));
    } else {
      setStarredMessages((prev) => [...prev, message]);
    }
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied to clipboard!');
  };

  const handleDownloadMessage = (text) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'message.txt';
    document.body.appendChild(element);
    element.click();
  };

  const handleShareMessage = (text) => {
    if (navigator.share) {
      navigator.share({
        title: 'AfriCare Chatbot Message',
        text: text,
      });
    } else {
      alert('Share not supported in your browser.');
    }
  };

  const formatText = (text) => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(caption);
      setCaption('');
    }
  };

  const handleSendClick = () => {
    sendMessage(caption);
    setCaption('');
  };

  const toggleShowStarred = () => setShowStarred((prev) => !prev);
  const toggleShowAllStarred = () => setShowAllStarred((prev) => !prev);

  if (isNewUser && !isOnboardingComplete) {
    return (
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-full">
        <header className="px-3 py-2 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-3">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={75}
              width={75}
            />
          </div>
        )}

          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Welcome to AfriCare! 🎉</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Let's get you started. Please provide your name and email address.</p>
          <input
            type="text"
            placeholder="Your Name"
            className="p-1 border rounded-sm mb-1 w-full dark:bg-gray-800 dark:border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-1 border rounded-sm mb-1 w-full dark:bg-gray-800 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-1 rounded-sm w-full text-sm"
            onClick={handleOnboardingSubmit}
          >
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-full relative" ref={chatContainerRef}>
      <header className="px-3 py-2 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
      </header>
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-1`}>
              <span
                className={`inline-block p-1 rounded-md max-w-md ${msg.sender === 'bot' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white text-sm'}`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
              />
              <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
              </div>
              {!error && msg.sender === 'bot' && (
                <div className="flex space-x-1 mt-1">
                  <button onClick={() => handleShareMessage(msg.text)}>
                    <FaShare className="text-gray-500 dark:text-gray-300 text-xs" />
                  </button>
                  <button onClick={() => handleCopyMessage(msg.text)}>
                    <FaCopy className="text-gray-500 dark:text-gray-300 text-xs" />
                  </button>
                  <button onClick={() => handleDownloadMessage(msg.text)}>
                    <FaDownload className="text-gray-500 dark:text-gray-300 text-xs" />
                  </button>
                  <button onClick={() => handleStarMessage(msg)}>
                    {starredMessages.some((starredMsg) => starredMsg.timestamp === msg.timestamp) ? (
                      <FaStar className="text-yellow-500 text-xs" />
                    ) : (
                      <FaRegStar className="text-gray-500 dark:text-gray-300 text-xs" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-xs italic">
              {error}
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="flex items-center p-2 border-t border-gray-100 dark:border-gray-700/60">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="2"
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSendClick}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md flex items-center"
          >
            <FaPaperPlane className="text-white" />
            <span className="ml-1">Send</span>
          </button>
        </div>
      </div>
      <button className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-300" onClick={toggleShowStarred}>
        {showStarred ? 'Hide Starred' : 'Show Starred'}
      </button>
      {showStarred && (
        <div className="absolute top-8 right-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 max-h-48 overflow-y-auto">
          {starredMessages.length > 0 ? (
            starredMessages.slice(0, showAllStarred ? starredMessages.length : 5).map((msg, index) => (
              <div key={index} className="text-sm mb-1">
                <span className="italic">{msg.text}</span>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-300 text-xs italic">No starred messages.</div>
          )}
          {starredMessages.length > 5 && (
            <button className="text-xs text-blue-500 dark:text-blue-400 mt-1" onClick={toggleShowAllStarred}>
              {showAllStarred ? 'Show Less' : 'Show All'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
