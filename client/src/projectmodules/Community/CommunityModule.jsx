import React, { useState, useEffect, useRef } from 'react';
import { socket, aiSocket } from './socket';
import { fetchMessages, sendMessage, likeMessage } from './messageService';
import { requestAiResponse } from './aiService';
import { fetchUserEmail } from './userService';
import { FaThumbsUp, FaCopy, FaPaperPlane, FaDownload, FaShareAlt, FaReply, FaEllipsisV, FaRobot } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleTyping, useTypingNotifications } from './typingService';


function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUser, setTypingUser] = useState('');
  const [collapsedMessages, setCollapsedMessages] = useState(new Set()); // State for collapsed messages

  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const dropdownRef = useRef(null);


  
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



  const handleLikeMessage = (index) => {
    likeMessage(index, likedMessages, setLikedMessages);
  };

  // Function to handle AI response request
  const handleAiResponse = (text) => {
    requestAiResponse(text, setMessages); // Trigger AI response
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

  //Logic to handle likes
  const handleLike = (index) => {
    const liked = likedMessages.has(index);
    socket.emit('likeMessage', { index, liked: !liked });
    setLikedMessages((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (liked) {
        newLiked.delete(index);
      } else {
        newLiked.add(index);
      }
      return newLiked;
    });
  };

  //Logic to handle copying of texts
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => alert('Message copied!'));
  };

  //Logic to handle downloading texts
  const handleDownload = (text) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'message.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  //Logic to handle sharing of messages
  const handleShare = (text) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Africare Message',
          text: text,
        })
        .then(() => console.log('Message shared!'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Share feature is not supported on your device.');
    }
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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-3 flex flex-col flex-1 relative">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Community</h2>
      {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${msg.sender === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
            >
            
              <div className="relative max-w-md">
                <div
                className={`p-3 rounded-lg max-w-md ${
                  msg.sender === currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
                >
                              
                <div className="self-end text-[8px] italic mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                </div>


                  {collapsedMessages.has(index) && msg.sender === 'ai' ? (
                    <div>
                      <button onClick={() => toggleCollapse(index)} className="text-xs text-[white]">
                        Expand
                      </button>
                    </div>
                  ) : (
                    <div>
                      {msg.text}
                      {msg.sender === 'ai' && (
                        <button onClick={() => toggleCollapse(index)} className="text-xs text-[white] ml-2">
                          {collapsedMessages.has(index) ? 'Expand' : 'Collapse'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {msg.replyTo && (
                  <div className="text-[#000] mt-1 text-xs italic">
                    Replying to: {messages[msg.replyTo]?.text || 'Unknown message'}
                  </div>
                )}
                <div className="flex space-x-2 mt-1 text-[10px] dark:bg-gray-800">
                  {msg.sender !== 'ai' && (
                    <>
                      <button onClick={() => handleLikeMessage(index)} className="dark:text-white text-black flex items-center space-x-1">
                        {likedMessages.has(index)} <FaThumbsUp className="text-xs" /> <span>{msg.likes}</span>
                      </button>
                      <button onClick={() => handleCopy(msg.text)} className="dark:text-white text-black flex items-center space-x-1">
                        <FaCopy className="text-xs" />
                      </button>
                      <button onClick={() => handleDownload(msg.text)} className="dark:text-white text-black flex items-center space-x-1">
                        <FaDownload className="text-xs" />
                      </button>
                      <button onClick={() => handleShare(msg.text)} className="dark:text-white text-black flex items-center space-x-1">
                        <FaShareAlt className="text-xs" />
                      </button>
                      <button onClick={() => handleReply(msg)} className="dark:text-white text-black flex items-center space-x-1">
                        <FaReply className="text-xs" />
                      </button>
                      <button onClick={() => handleAiResponse(msg.text)} className="dark:text-white text-black flex items-center space-x-1">
                        <FaRobot className="text-xs" />
                        <span>Ask AI</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {typingUser && (
            <div className="text-[#fff] text-[10px] italic">
              {typingUser} is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
      </div>
      <div className="p-3 flex items-center space-x-2 border-t border-gray-600">
        <input
          type="text"
          value={input}
          onChange={handleTypingChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md"
        />
        <button onClick={handleSendMessage} className="ml-1 px-3 py-2.5 dark:bg-white bg-violet-200 text-violet-800 rounded-md flex items-center"
        >
          <FaPaperPlane className="text-violet-800" />
          <span className="ml-1 text-[12px]">Send</span>
        </button>
      </div>
    </div>
  );
}

export default Community;
