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
  const [collapsedMessages, setCollapsedMessages] = useState(new Set()); // State for collapsed messages
  const [userEmails, setUserEmails] = useState({}); // Store emails here
  const [likes, setLikes] = useState({}); // State to track likes
  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const dropdownRef = useRef(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  

  //Logic to load like status
  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const fetchLikeStatuses = async () => {
  //       const likeStatuses = await Promise.all(messages.map(async (msg) => {
  //         const hasLiked = await fetchUserLikes(msg.id);
  //         return { id: msg.id, hasLiked };
  //       }));
  //       // Set the userLikes state based on the fetched statuses
  //       setUserLikes(likeStatuses.reduce((acc, { id, hasLiked }) => {
  //         acc[id] = hasLiked;
  //         return acc;
  //       }, {}));
  //     };
  //     fetchLikeStatuses();
  //   }
  // }, [messages, currentUser]);


  //Logic to load email for use in the UI to know all users when they send messages
  const getUserEmail = async (userId) => {
    if (!userEmails[userId]) { // Check if email is already fetched
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


  // Function to Reply to Messages
  const handleReply = async (message) => {
    const senderEmail = await fetchUserEmail(message.sender);
    if (senderEmail) {
      setReplyTo(message);
      setInput(`@${senderEmail}: `);
    }
  };


  // Function to handle message sending
  const handleSendMessage = () => {
    if (input.trim() && currentUser?.uid) {
      const message = {
        sender: currentUser.uid,
        text: input.trim(),
        timestamp: new Date(),
        likes: 0,
        replyTo: replyTo,
      };
      sendMessage(message, socket, setMessages, setInput, setReplyTo); // Using the imported sendMessage function
    }
  };
  useEffect(() => {
  
  
  // Ensure messages are fetched only when user is authenticated
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      fetchMessages();
    }
  });
  
  
  // Clean up listener on component unmount
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


  // Automatically scroll to the latest message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  
  //Logic to handle user typing
  const handleTypingChange = (e) => {
    handleTyping(e, socket, currentUser, setInput, setTypingUser);
  };


  // Hook to manage typing notifications
  useTypingNotifications(socket, currentUser, typingUser, setTypingUser);
  
  //Logic to Copy messages
  const handleCopy = (message) => {
    handleCopyMessage(message.text);
  };

  //Logic to Download messages
  const handleDownload = (message) => {
    handleDownloadMessage(message.text);
  };

  //Logic to Share messages
  const handleShare = (message) => {
    handleShareMessage(message.text);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  

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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-screen max-h-[85vh] flex flex-col"> {/* Max height set to 85% of viewport */}
      <div className="p-3 flex flex-col flex-1 relative">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Community</h2>
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${msg.sender === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className="relative max-w-xl w-full">
              {/* <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"> */}
              <div className={`p-4 rounded-2xl shadow-md ${msg.sender === currentUser?.uid ? 'bg-gray-100 text-[12px] text-black' : 'bg-violet-200 text-black text-[12px]'}`}>

                
                
                {/* Sender info */}
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    {msg.sender === currentUser?.uid ? 'You' : userEmails[msg.sender] || 'User'}
                  </div>

                  <div className="text-[10px]">
                    {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                  </div>
                </div>
                
                
                {/* Message content */}
                {collapsedMessages.has(index) && msg.sender === 'ai' ? (
                  <button onClick={() => toggleCollapse(index)} className="text-xs mt-2">
                    Expand AI response
                  </button>
                ) : (
                  <p className="mt-2">
                    {msg.text}
                    {msg.sender === 'ai' && (
                      <button onClick={() => toggleCollapse(index)} className="text-xs text-blue-500 ml-2">
                        {collapsedMessages.has(index) ? 'Expand' : 'Collapse'}
                      </button>
                    )}
                  </p>
                )}
                
                {msg.replyTo && (
                  <div className="text-gray-500 mt-1 text-xs italic">
                    Replying to: {messages[msg.replyTo]?.text || 'Unknown message'}
                  </div>
                )}


                {/* Interaction buttons */}
                <div className="flex space-x-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                  

                  {/* Logic for like button */}
                 
                  <button onClick={() => {handleLike(msg.id, setLikes);setUserHasLiked(!userHasLiked);}} className={`text-sm ${userHasLiked ? 'text-blue-600 dark:text-blue-400' : 'text-blue-500 dark:text-blue-300'} flex items-center`}>
                    <FaThumbsUp className={`text-xs ${userHasLiked ? 'text-blue-600 dark:text-blue-400' : 'text-black dark:text-black'}`}/>
                    <span className="ml-2 text-black">
                      {msg.likes} {msg.likes === 1 ? 'Like' : 'Likes'}
                    </span>
                  </button>


                  {/* Logic for Copy button */}
                  <button onClick={() => handleCopy(msg)} className="flex items-center space-x-1">
                    <FaCopy className="text-xs text-black" />
                  </button>


                  {/* Logic for Download button */}
                  <button onClick={() => handleDownload(msg)} className="flex items-center space-x-1">
                    <FaDownload className="text-xs text-black" />
                  </button>



                  {/* Logic for Share button */}
                  <button onClick={() => handleShare(msg)} className="flex items-center space-x-1">
                    <FaShareAlt className="text-xs text-black" />
                  </button>


                  {/* Logic for Reply Button */}
                  <button onClick={() => handleReply(msg)} className="text-black flex items-center space-x-1">
                    <FaReply className="text-xs text-black" />
                    <span>Reply</span>
                  </button>


                  {/* Logic for AskAi Button */}
                  <button onClick={() => handleAiResponse(msg.text)} className="text-black flex items-center space-x-1">
                    <FaRobot className="text-xs text-black" />
                    <span>Ask AI</span>
                  </button>


                </div>
              </div>
            </div>
          </div>
        ))}


        {/* Logic for Showing which user is typing */}
        {typingUser && (
          <div className="text-[#fff] text-[10px] italic">
            {typingUser} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Texts */}
      <div className="p-3 flex items-center space-x-2 border-t border-gray-600">
        <input
          type="text"
          value={input}
          onChange={handleTypingChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md"/>
        
        {/* Button for Sending messages */}
        <button
          onClick={handleSendMessage}
          className="ml-1 px-3 py-2.5 bg-violet-500 text-white rounded-md flex items-center"
        >
          <FaPaperPlane />
          <span className="ml-1 text-sm">Send</span>
        </button>


      </div>
    </div>
  );
}
export default Community;
