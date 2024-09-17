import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import { FaShare, FaCopy, FaDownload, FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';
import { handleStarMessage, handleCopyMessage, handleDownloadMessage, handleShareMessage, formatText } from '../../utils/messageUtils';
import { fetchUserId } from '../../services/userService';
import { fetchUserMessages, requestChatbotResponse } from '../../services/aiService'; // Import the functions


function Chatbot() {

  // State variables for managing messages, starred messages, loading state, errors, input text, etc.
  const [messages, setMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [showStarred, setShowStarred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState('');
  const [showAllStarred, setShowAllStarred] = useState(false);
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState(null); // State to store the userId
  const [inputText, setInputText] = useState(''); // State to track the input text

  
  // Fetch user ID and fetch user messages when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const id = await fetchUserId(); // Get the user ID from the service
      setUserId(id); // Set the user ID to state
      fetchUserMessages(id, setMessages); // Fetch existing messages for the user based on the ID
    };
    fetchUser();
  }, []);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!inputText.trim() || !userId) return; // Ensure input is not empty and user ID exists

    // Request chatbot response from the server and update the message state
    await requestChatbotResponse(inputText, setMessages, setLoading, setError, userId);
    
    // Clear input after sending
    setInputText('');
  };

  // Handle input text change when the user types in the input area
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Fetch messages when the userId is available
  useEffect(() => {
    if (userId) {
      fetchUserMessages(userId, setMessages);
    }
  }, [userId]);

  // Automatically scroll to the latest message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle when the user presses "Enter" to send a message (without Shift)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of "Enter" key
      handleSendMessage(); // Call the send message function
      setCaption(''); // Clear caption after sending
    }
  };

  // Toggle showing or hiding starred messages
  const toggleShowStarred = () => setShowStarred((prev) => !prev);

  // Function to handle starring a message
  const handleStar = (message) => {
    handleStarMessage(message, starredMessages, setStarredMessages); // Call utility to star the message
  };

  // Function to handle copying a message to clipboard
  const handleCopy = (message) => {
    handleCopyMessage(message.text);
  };

  // Function to handle downloading a message
  const handleDownload = (message) => {
    handleDownloadMessage(message.text);
  };

  // Function to handle sharing a message
  const handleShare = (message) => {
    handleShareMessage(message.text);
  };

  // Format message text to support bold and other formatting
  const formatMessageText = (message) => {
    return { __html: formatText(message.text) };
  };

  // Render the Chatbot component with input box, messages, and starred messages section
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-screen max-h-[85vh] flex flex-col">
      {/* Chatbot Header */}
      <div className="p-2 flex flex-col flex-1 relative">
        <header className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
        </header>

        {/* Messages container */}
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-1`}>
                <span
                  className={`inline-block p-2 rounded-md max-w-xs ${msg.sender === 'bot' ? 'bg-gray-100 text-[12px] text-black' : 'bg-violet-200 text-black text-[12px]'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }} // Render formatted message text
                />
                <div className="text-[8px] dark:text-gray-200 text-gray-800 mt-1">
                  {new Date(msg.timestamp?.toDate()).toLocaleTimeString()} - {new Date(msg.timestamp?.toDate()).toLocaleDateString()}
                </div>
                
                {/* Actions for bot messages: share, copy, download, star */}
                {!error && msg.sender === 'bot' && (
                  <div className="flex space-x-2 mt-1 text-[10px]">
                    <button onClick={() => handleShare(msg.text)}>
                      <FaShare className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleCopy(msg.text)}>
                      <FaCopy className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleDownload(msg.text)}>
                      <FaDownload className="dark:text-gray-200 text-gray-800" />
                    </button>
                    <button onClick={() => handleStar(msg)}>
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
            <div ref={messagesEndRef}></div> {/* Reference to scroll to the last message */}
          </div>

          {/* Message input area */}
          <div className="flex items-center p-2 border-t border-gray-200 bg-gray-50 dark:bg-gray-700">
            {/* Textarea for typing the message */}
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)} // Update caption state when typing
              onKeyDown={handleKeyDown} // Handle "Enter" key for sending message
              rows="1"
              className="text-[12px] text-gray-800 dark:text-gray-800 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none max-h-28 overflow-auto"
              placeholder="Type your message here..."
              style={{ maxHeight: '80px' }} // Limit height to make it scrollable
            />
            {/* Send button */}
            <button onClick={handleSendMessage} className="ml-1 px-3 py-2 dark:bg-white bg-violet-200 text-violet-800 rounded-md flex items-center">
              <FaPaperPlane className="text-violet-800" />
              <span className="ml-1 text-[12px]">Send</span>
            </button>
          </div>

          {/* Loading animation during API call */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100">
              <Lottie options={defaultOptions} height={50} width={50} />
            </div>
          )}
        </div>

        {/* Toggle button for starred messages */}
        <button className="absolute top-2 right-2 text-[12px] dark:text-gray-200 text-gray-800" onClick={toggleShowStarred}>
          {showStarred ? 'Hide Starred' : 'Show Starred'}
        </button>

        {/* Starred messages dropdown */}
        {showStarred && (
          <div className="absolute top-10 right-20 dark:bg-gray-600 bg-gray-700 shadow-md rounded-lg p-2 max-h-48 overflow-y-auto">
            {starredMessages.length > 0 ? (
              starredMessages.slice(0, showAllStarred ? starredMessages.length : 5).map((msg, index) => (
                <div key={index} className="text-sm mb-2 italic dark:text-white text-white">
                  {msg.text}
                </div>
              ))
            ) : (
              <div className="text-xs italic text-white">No starred messages yet.</div>
            )}
            {starredMessages.length > 5 && (
              <button
                onClick={() => setShowAllStarred(!showAllStarred)} // Toggle viewing all or limited starred messages
                className="text-xs italic text-gray-400"
              >
                {showAllStarred ? 'Show Less' : 'Show All'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
