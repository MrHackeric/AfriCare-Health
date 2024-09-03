import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaThumbsUp, FaCopy, FaPaperPlane, FaDownload, FaShareAlt, FaReply, FaEllipsisV, FaRobot } from 'react-icons/fa';
import { auth } from '../Auth/firebase-config'; 
import { onAuthStateChanged } from 'firebase/auth';


const socket = io('http://localhost:3030');
const aiSocket = io('http://localhost:3030'); // AI service socket connection

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null); // State for managing which message dropdown is open
  const [aiReplies, setAiReplies] = useState(new Set()); // State for AI replies
  const [collapsedMessages, setCollapsedMessages] = useState(new Set()); // State for collapsed messages
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { ...msg, likes: 0 }]);
    });

    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { ...msg, likes: msg.likes || 0 }]);
    });

    socket.on('updateLikes', ({ index, likes }) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[index]) {
          newMessages[index].likes = likes;
        }
        return newMessages;
      });
    });

    socket.on('userTyping', (user) => {
      if (user !== currentUser?.displayName) {
        setTypingUser(user);
      }
    });

    socket.on('userStopTyping', (user) => {
      if (user === typingUser) {
        setTypingUser('');
      }
    });

    return () => {
      socket.off('message');
      socket.off('updateLikes');
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }, [currentUser, typingUser]);

  useEffect(() => {
    aiSocket.on('aiResponse', (response) => {
      setMessages((prevMessages) => [...prevMessages, response]);
      setAiReplies((prevReplies) => new Set([...prevReplies, response.id]));
    });

    return () => aiSocket.off('aiResponse');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null); // Close dropdown if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sendMessage = () => {
    if (input.trim() && currentUser) {
      const message = {
        sender: currentUser.uid, 
        text: input.trim(),
        timestamp: new Date(),
        likes: 0,
        replyTo: replyTo,
      };
      socket.emit('chatMessage', message);
      socket.emit('stopTyping');
      setInput('');
      setReplyTo(null);
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      socket.emit('typing', currentUser?.displayName || currentUser?.email || 'Anonymous');
    } else {
      socket.emit('stopTyping', currentUser?.displayName || currentUser?.email || 'Anonymous');
    }
  };

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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => alert('Message copied!'));
  };

  const handleDownload = (text) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'message.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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

  const handleReply = (message) => {
    setReplyTo(message);
    setInput(`@${message.sender}: `);
  };


  const toggleDropdown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  
  const requestAiResponse = async (text) => {
    // Generate a unique ID for the placeholder message
    const placeholderId = `placeholder-${Date.now()}`;
  
    // Add a placeholder message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: placeholderId,  // Unique ID for placeholder
        sender: 'AI',
        text: 'Fetching...',
        timestamp: new Date(),
        likes: 0,
      },
    ]);
  
    try {
      // Make the API call to get the AI response
      const response = await fetch('http://localhost:3030/askAi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const aiResponseText = data.response; // Assuming the response has a 'response' field
  
      // Replace the placeholder message with the actual AI response
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === placeholderId) {
            return {
              ...msg,
              text: aiResponseText, // Update with the actual AI response
            };
          }
          return msg;
        });
      });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Replace the placeholder message with an error message
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === placeholderId) {
            return {
              ...msg,
              text: 'Oops! Something went wrong. Please try again later. 🌟💬✨',
            };
          }
          return msg;
        });
      });
    }
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
                  className={`flex flex-col justify-between p-2 rounded-md max-w-md text-[#fff] ${
                    msg.sender === currentUser?.uid ? 'bg-violet-200 text-[black] text-[12px]' : 'bg-gray-100 text-[12px] text-[black]'//User-Left-Right
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
                      <button onClick={() => handleLike(index)} className="dark:text-white text-black flex items-center space-x-1">
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
                      <button onClick={() => requestAiResponse(msg.text)} className="dark:text-white text-black flex items-center space-x-1">
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
            <div className="text-[#fff] mt-2 italic">
              {typingUser} is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
      </div>
      <div className="p-3 flex items-center space-x-2 border-t border-gray-600">
        <input
          type="text"
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md"
        />
        <button onClick={sendMessage} className="ml-1 px-3 py-2.5 dark:bg-white bg-violet-200 text-violet-800 rounded-md flex items-center"
        >
          <FaPaperPlane className="text-violet-800" />
          <span className="ml-1 text-[12px]">Send</span>
        </button>
      </div>
    </div>
  );
}

export default Community;
