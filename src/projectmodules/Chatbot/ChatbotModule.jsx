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

  const defaultOptions = {
    loop: true, // Adjust as needed
    autoplay: true, // Adjust as needed
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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
    setLoading(true);
    sendMessage(caption);
    setCaption('');
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const toggleShowStarred = () => setShowStarred((prev) => !prev);
  const toggleShowAllStarred = () => setShowAllStarred((prev) => !prev);

  return (
    <div className="col-span-full xl:col-span-12 bg-[white] h-full flex flex-col text-xs">
      <div className="p-1 flex flex-col flex-1 relative">
        <div className="dark:bg-[#a06e91] rounded-xl flex flex-col h-full relative" ref={chatContainerRef}>
          <header className="px-3 py-2 border-b border-[#a06e91]">
            <h2 className="text-sm font-semibold text-[#a06e91]">Chatbot</h2>
          </header>
          <div className="flex flex-col flex-1 overflow-hidden relative">
            <div className="flex-1 overflow-y-auto p-2 bg-[#fff]">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-1`}>
                  <span
                    className={`inline-block p-1 rounded-md max-w-md ${msg.sender === 'bot' ? 'bg-[#fff] text-[#a06e91] text-[12px]' : 'bg-[#a06e91] text-[white] text-[12px]'}`}
                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                  />
                    <div className="self-end text-[10px] text-[#a06e91] mt-2">
                      {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                    </div>
                  {!error && msg.sender === 'bot' && (
                    <div className="flex space-x-1 mt-1">
                      <button onClick={() => handleShareMessage(msg.text)}>
                        <FaShare className="text-[#a06e91] text-xs" />
                      </button>
                      <button onClick={() => handleCopyMessage(msg.text)}>
                        <FaCopy className="text-[#a06e91] text-xs" />
                      </button>
                      <button onClick={() => handleDownloadMessage(msg.text)}>
                        <FaDownload className="text-[#a06e91] text-xs" />
                      </button>
                      <button onClick={() => handleStarMessage(msg)}>
                        {starredMessages.some((starredMsg) => starredMsg.timestamp === msg.timestamp) ? (
                          <FaStar className="text-[#a06e91] text-xs" />
                        ) : (
                          <FaRegStar className="text-[#a06e91] text-xs" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {error && (
                <div className="text-red-600 text-xs italic">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="flex items-center p-2 border-t border-[#a06e91]">
            <input
              value={caption} // Make sure this matches the state variable name
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              className="flex-1 p-2 border text-[12px] border-[#a06e91] text-[#a06e91] rounded-md placeholder-pink"
              placeholder="Type your message here..."
            />
              <button
                onClick={handleSendClick}
                className="ml-2 p-2 bg-[#a06e91] text-white rounded-md flex items-center"
              >
                <FaPaperPlane className="text-white" />
                <span className="ml-1 text-[12px]">Send</span>
              </button>
              {loading && (
                <div className="absolute bottom-20 inset-10 flex items-center justify-center">
                  <Lottie options={defaultOptions} height={50} width={50} />
                </div>
              )}
            </div>
            <div className="flex items-center p-2 border-t border-[#a06e91]" />
          </div>
          <button className="absolute top-2 right-2 text-[12px] text-[#a06e91]" onClick={toggleShowStarred}>
            {showStarred ? 'Hide Starred' : 'Show Starred'}
          </button>
          {showStarred && (
            <div className="absolute top-10 right-20 bg-[#a06e91] bg-opacity-100 shadow-md rounded-lg p-2 max-h-48 overflow-y-auto">
              {starredMessages.length > 0 ? (
                starredMessages.slice(0, showAllStarred ? starredMessages.length : 5).map((msg, index) => (
                  <div key={index} className="text-sm mb-1">
                    <span className="text-[10px] text-[white] italic">{msg.text}</span>
                    <div className="text-[9px] text-[white] mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[white] text-xs italic">No starred messages.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
