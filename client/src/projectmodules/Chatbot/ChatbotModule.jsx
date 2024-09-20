import React from 'react';
import Lottie from 'react-lottie';
import { FaPaperPlane } from 'react-icons/fa';
import { useChatbot } from '../../services/chatbot';
import animationData from '../../images/Animation.json';

function ChatbotModule() {
  const {
    messages,
    loading,
    error,
    caption,
    messagesEndRef,
    setCaption,
    sendMessage,
  } = useChatbot();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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

  const formatText = (text) => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 shadow-lg rounded-lg h-[600px]">
      <div className="p-1 flex flex-col flex-1 relative h-full">
        {/* Chat Header */}
        <header className="px-4 py-3 bg-pink-500 text-white rounded-t-lg shadow-lg">
          <h2 className="font-semibold text-xl">💬 AI Chatbot</h2>
        </header>

        {/* Chat Body */}
        <div className="flex flex-col flex-1 overflow-hidden relative bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 p-4 rounded-lg shadow-lg">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.sender === 'bot' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-xs shadow-md text-sm transition-all duration-200 ${
                    msg.sender === 'bot'
                      ? 'bg-white text-black'
                      : 'bg-pink-200 text-black'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                />
              </div>
            ))}
            {error && <div className="text-red-500 text-xs italic">{error}</div>}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Field */}
          <div className="flex items-center p-2 border-t bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 rounded-b-lg shadow-sm">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              className="flex-1 p-3 text-gray-900 bg-pink-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendClick}
              className="ml-2 bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="flex items-center justify-center absolute inset-0 bg-gray-500 bg-opacity-30 rounded-lg">
            <Lottie options={defaultOptions} height={100} width={100} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatbotModule;
