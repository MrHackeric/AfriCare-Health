import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaThumbsUp, FaCopy, FaDownload, FaShareAlt, FaReply, FaEllipsisV, FaRobot } from 'react-icons/fa';
import { auth } from '../Auth/firebase-config'; 
import { onAuthStateChanged } from 'firebase/auth';

const socket = io('http://localhost:3030');
const aiSocket = io('http://localhost:3030'); // AI service socket connection

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

    socket.on('typing', () => {
      setIsTyping(true);
    });

    socket.on('stopTyping', () => {
      setIsTyping(false);
    });

    return () => {
      socket.off('message');
      socket.off('updateLikes');
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, []);

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
      socket.emit('typing');
    } else {
      socket.emit('stopTyping');
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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-full flex flex-col text-xs">
      <div className="p-3 flex flex-col flex-1 relative">
        <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-sm overflow-y-auto flex-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${msg.sender === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
            >
              <div className="relative max-w-md">
                <div
                  className={`inline-block p-1 rounded-md max-w-md ${
                    msg.sender === currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {collapsedMessages.has(index) && msg.sender === 'ai' ? (
                    <div>
                      <button onClick={() => toggleCollapse(index)} className="text-xs text-blue-500">
                        Expand
                      </button>
                    </div>
                  ) : (
                    <div>
                      {msg.text}
                      {msg.sender === 'ai' && (
                        <button onClick={() => toggleCollapse(index)} className="text-xs text-blue-500 ml-2">
                          {collapsedMessages.has(index) ? 'Expand' : 'Collapse'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {msg.replyTo && (
                  <div className="text-gray-500 dark:text-gray-300 mt-1 text-xs italic">
                    Replying to: {messages[msg.replyTo]?.text || 'Unknown message'}
                  </div>
                )}
                <div className="text-gray-500 dark:text-gray-300 mt-1 text-right text-xs">
                  {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                </div>
                <div className="flex space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-300">
                  {msg.sender !== 'ai' && (
                    <>
                      <button onClick={() => handleLike(index)} className="flex items-center space-x-1">
                        {likedMessages.has(index)} <FaThumbsUp className="text-sm" /> <span>{msg.likes}</span>
                      </button>
                      <button onClick={() => handleCopy(msg.text)} className="flex items-center space-x-1">
                        <FaCopy className="text-sm" />
                      </button>
                      <button onClick={() => handleDownload(msg.text)} className="flex items-center space-x-1">
                        <FaDownload className="text-sm" />
                      </button>
                      <button onClick={() => handleShare(msg.text)} className="flex items-center space-x-1">
                        <FaShareAlt className="text-sm" />
                      </button>
                      <button onClick={() => handleReply(msg)} className="flex items-center space-x-1">
                        <FaReply className="text-sm" />
                      </button>
                      <button onClick={() => requestAiResponse(msg.text)} className="flex items-center space-x-1">
                        <FaRobot className="text-sm" />
                        <span>Ask AI</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-gray-500 dark:text-gray-300">AI is typing...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-3 flex items-center space-x-2 border-t border-gray-300 dark:border-gray-600">
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
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
      </div>
    </div>
  );
}

export default Community;
