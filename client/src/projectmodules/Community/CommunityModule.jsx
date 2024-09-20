import React, { useState, useEffect, useRef } from 'react';
import { socket, aiSocket } from './socket';
import { fetchMessages, sendMessage, handleLike, fetchUserLikes } from '../../services/messageService';
import { requestAiResponse } from '../../services/aiService';
import { fetchUserEmail } from '../../services/userService';
import { FaThumbsUp, FaCopy, FaPaperPlane, FaDownload, FaShareAlt, FaReply, FaRobot } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleTyping, useTypingNotifications } from '../../services/typingService';
import { handleCopyMessage, handleDownloadMessage, handleShareMessage } from '../../utils/messageUtils';

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUser, setTypingUser] = useState('');
  const [collapsedMessages, setCollapsedMessages] = useState(new Set());
  const [userEmails, setUserEmails] = useState({});
  const [likes, setLikes] = useState({});
  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const dropdownRef = useRef(null);
  const [userHasLiked, setUserHasLiked] = useState(false);

  // Fetch user email by userId and store
  const getUserEmail = async (userId) => {
    if (!userEmails[userId]) {
      const email = await fetchUserEmail(userId);
      setUserEmails((prevEmails) => ({ ...prevEmails, [userId]: email }));
    }
  };

  // Fetch emails when messages are loaded
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.sender !== currentUser?.uid) {
        getUserEmail(msg.sender);
      }
    });
  }, [messages, currentUser]);

  // Fetch emails for users in the message list
  useEffect(() => {
    const fetchEmailsForMessages = async () => {
      const emailMap = {};
      for (const msg of messages) {
        if (!emailMap[msg.sender]) {
          const email = await fetchUserEmail(msg.sender); // Fetch email based on UID
          if (email) {
            emailMap[msg.sender] = email;
          }
        }
      }
      setUserEmails(emailMap); // Store emails with corresponding UIDs
    };
    fetchEmailsForMessages();
  }, [messages]);

  // Function to retrieve messages from Firestore
  useEffect(() => {
    fetchMessages(setMessages);
  }, []);

  // Function to reply to messages
  const handleReply = async (message) => {
    const senderEmail = await fetchUserEmail(message.sender);
    if (senderEmail) {
      setReplyTo(message);
      setInput(`@${senderEmail}: `);
    }
  };

  // Handle message sending
  const handleSendMessage = () => {
    if (input.trim() && currentUser?.uid) {
      const message = {
        sender: currentUser.uid,
        text: input.trim(),
        timestamp: new Date(),
        likes: 0,
        replyTo: replyTo,
      };
      sendMessage(message, socket, setMessages, setInput, setReplyTo);
    }
  };

  // Ensure user is authenticated to fetch messages
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchMessages();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Function to handle AI response request
  const handleAiResponse = async (text) => {
    try {
      await requestAiResponse(text, setMessages); // Trigger AI response
    } catch (error) {
      console.error('Error handling AI response:', error);
    }
  };

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing notifications
  const handleTypingChange = (e) => {
    handleTyping(e, socket, currentUser, setInput, setTypingUser);
  };

  useTypingNotifications(socket, currentUser, typingUser, setTypingUser);

  // Message action buttons (copy, download, share)
  const handleCopy = (message) => handleCopyMessage(message.text);
  const handleDownload = (message) => handleDownloadMessage(message.text);
  const handleShare = (message) => handleShareMessage(message.text);

  // Toggle message collapse for AI responses
  const toggleCollapse = (index) => {
    setCollapsedMessages((prev) => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(index)) {
        newCollapsed.delete(index);
      } else {
        newCollapsed.add(index);
      }
      return newCollapsed;
    });
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-[90vh]">
      <div className="p-3 flex flex-col flex-1 overflow-y-auto relative">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
          Join the Conversation! Connect with the Community.
        </h2>

        {/* Message list */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 flex ${msg.sender === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className="relative max-w-lg w-full">
              <div className={`p-4 rounded-3xl shadow-md transition-transform transform-gpu ${msg.sender === currentUser?.uid ? 'bg-gray-100 text-sm text-black' : 'bg-violet-200 text-sm text-black'}`}>
                
                {/* Sender and timestamp */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">
                    {msg.sender === currentUser?.uid ? 'You' : userEmails[msg.sender] || 'User'}
                  </span>
                  <span className="text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Message content */}
                {collapsedMessages.has(index) && msg.sender === 'ai' ? (
                  <button onClick={() => toggleCollapse(index)} className="text-xs mt-2">
                    Expand AI response
                  </button>
                ) : (
                  <p className="mt-2 break-words">
                    {msg.text}
                    {msg.sender === 'ai' && (
                      <button onClick={() => toggleCollapse(index)} className="text-xs text-blue-500 ml-2">
                        {collapsedMessages.has(index) ? 'Expand' : 'Collapse'}
                      </button>
                    )}
                  </p>
                )}

                {/* Replying to another message */}
                {msg.replyTo && (
                  <div className="text-gray-500 mt-1 text-xs italic border-l-4 pl-2 border-blue-300">
                    Replying to: {messages[msg.replyTo]?.text || 'Unknown message'}
                  </div>
                )}

                {/* Interaction buttons */}
                <div className="flex justify-between mt-3 text-xs text-gray-800">
                  
                  {/* Like button */}
                  <button onClick={() => {handleLike(msg.id, setLikes);setUserHasLiked(!userHasLiked);}} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaThumbsUp className={`${userHasLiked ? 'text-blue-600' : ''}`} />
                    <span>{msg.likes} {msg.likes === 1 ? 'Like' : 'Likes'}</span>
                  </button>

                  {/* Copy */}
                  <button onClick={() => handleCopy(msg)} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaCopy />
                    <span>Copy</span>
                  </button>

                  {/* Download */}
                  <button onClick={() => handleDownload(msg)} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaDownload />
                    <span>Download</span>
                  </button>

                  {/* Share */}
                  <button onClick={() => handleShare(msg)} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaShareAlt />
                    <span>Share</span>
                  </button>

                  {/* Reply */}
                  <button onClick={() => handleReply(msg)} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaReply />
                    <span>Reply</span>
                  </button>

                  {/* AI */}
                  <button onClick={() => handleAiResponse(msg.text)} className="flex items-center space-x-1 hover:text-blue-600">
                    <FaRobot />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typingUser && (
          <div className="text-gray-500 italic text-xs mt-2">
            {typingUser} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <div className="p-3 flex items-center border-t border-gray-200 dark:border-gray-600">
        <input
          type="text"
          value={input}
          onChange={handleTypingChange}
          placeholder="Type your message..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
        >
          <FaPaperPlane className="mr-2" /> Send
        </button>
      </div>
    </div>
  );
}

export default Community;