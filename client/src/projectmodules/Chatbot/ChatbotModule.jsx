import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../images/Animation.json'; // replace with your actual Lottie animation file
import { FaShare, FaCopy, FaDownload, FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';
import { handleStarMessage, handleCopyMessage, handleDownloadMessage, handleShareMessage, formatText } from '../../utils/chatbotUtils';
import { fetchUserId } from '../Community/userService';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [showStarred, setShowStarred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState('');
  const [showAllStarred, setShowAllStarred] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [userId, setUserId] = useState(null);

  // API call to load messages
  const loadMessagesFromBackend = async (userId) => {
    try {
      const response = await fetch(`/messages/${userId}`);
      const data = await response.json();
      console.log('Response:', response);
      if (response.ok) {
        return data;
      } else {
        console.error('Error data:', data); // Log error data here
        throw new Error(data.message || 'Error loading messages');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      throw error;
    }
  };
  

  // API call to send a message and save
  const sendMessageToBackend = async (userId, text) => {
    try {
      const response = await fetch(`/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, text }),
      });
      const data = await response.json();
      if (response.ok) {
        return data.response;
      } else {
        throw new Error(data.message || 'Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Load userId and messages from API when component mounts
  useEffect(() => {
    const loadUserIdAndMessages = async () => {
      try {
        const fetchedUserId = await fetchUserId();
        setUserId(fetchedUserId);
        const loadedMessages = await loadMessagesFromBackend(fetchedUserId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
        setError('Error loading messages');
      }
    };
  
    loadUserIdAndMessages();
  }, []);

  // Function to handle the send button click event
  const handleSendClick = async () => {
    if (!caption.trim()) return;

    setLoading(true);
    try {
      const botResponse = await sendMessageToBackend(userId, caption);
      setMessages((prevMessages) => [...prevMessages, { text: caption, sender: 'user' }, { text: botResponse, sender: 'bot' }]);
      setCaption('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message');
    }
    setLoading(false);
  };
 
  // Automatically scroll to the bottom of the chat.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // This useEffect ensures that the chat container is scrolled into view initially, so users can see the chat interface.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  //Configurations for Lottie Animation
  const defaultOptions = {
    loop: true, // Adjust as needed
    autoplay: true, // Adjust as needed
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Event handler for when the user presses enter key inside the text input field to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault();
      handleSendClick(caption);
      setCaption('');
    }
  };

  // Function to toggle the visibility of starred messages
  const toggleShowStarred = () => setShowStarred((prev) => !prev); 

  // Function to toggle the visibility of all starred messages
  const toggleShowAllStarred = () => setShowAllStarred((prev) => !prev);

 
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-screen max-h-[85vh] flex flex-col"> {/* Max height set to 85% of viewport */}
      <div className="p-2 flex flex-col flex-1 relative">
        <header className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
        </header>

        <div className="flex flex-col flex-1 overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-1`}>
                <span
                  className={`inline-block p-2 rounded-md max-w-xs ${msg.sender === 'bot' ? 'bg-gray-100 text-[12px] text-black' : 'bg-violet-200 text-black text-[12px]'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
                <div className="text-[8px] dark:text-gray-200 text-gray-800 mt-1">
                  {new Date(msg.timestamp?.toDate()).toLocaleTimeString()} - {new Date(msg.timestamp?.toDate()).toLocaleDateString()}
                </div>
                {!error && msg.sender === 'bot' && (
                  <div className="flex space-x-2 mt-1 text-[10px]">
                    <button onClick={() => handleShareMessage(msg.text)}>
                      <FaShare className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleCopyMessage(msg.text)}>
                      <FaCopy className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleDownloadMessage(msg.text)}>
                      <FaDownload className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleStarMessage(msg, starredMessages, setStarredMessages)}>
                      {starredMessages.some((starredMsg) => starredMsg.timestamp === msg.timestamp) ? (
                        <FaStar className="dark:text-gray-200 text-gray-800" />
                      ) : (
                        <FaRegStar className="dark:text-gray-200 text-gray-800" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {error && <div className="text-red-600 text-xs italic">{error}</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="flex items-center p-2 border-t border-gray-200 bg-gray-50 dark:bg-gray-700">
            {/* Scrollable input area */}
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={handleKeyDown}
              rows="1"
              className="text-[12px] text-gray-800 dark:text-gray-800 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none max-h-28 overflow-auto"
              placeholder="Type your message here..."
              style={{ maxHeight: '80px' }} // Limit height to make it scrollable
            />
            <button onClick={handleSendClick} className="ml-1 px-3 py-2 dark:bg-white bg-violet-200 text-violet-800 rounded-md flex items-center">
              <FaPaperPlane className="text-violet-800" />
              <span className="ml-1 text-[12px]">Send</span>
            </button>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100">
              <Lottie options={defaultOptions} height={50} width={50} />
            </div>
          )}
        </div>

        {/* Starred messages button */}
        <button className="absolute top-2 right-2 text-[12px] dark:text-gray-200 text-gray-800" onClick={toggleShowStarred}>
          {showStarred ? 'Hide Starred' : 'Show Starred'}
        </button>

        {/* Starred messages dropdown */}
        {showStarred && (
          <div className="absolute top-10 right-20 dark:bg-gray-600 bg-gray-700 shadow-md rounded-lg p-2 max-h-48 overflow-y-auto">
            {starredMessages.length > 0 ? (
              starredMessages.slice(0, showAllStarred ? starredMessages.length : 5).map((msg, index) => (
                <div key={index} className="text-sm mb-1">
                  <span className="text-[10px] text-white italic">{msg.text}</span>
                  <div className="text-[9px] text-white mt-1">
                    {new Date(msg.timestamp?.toDate()).toLocaleTimeString()} - {new Date(msg.timestamp?.toDate()).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white text-xs italic">No starred messages.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;