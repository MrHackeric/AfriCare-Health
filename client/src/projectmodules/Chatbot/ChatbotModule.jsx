import React from 'react';
import Lottie from 'react-lottie';
import { FaShare, FaCopy, FaDownload, FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';
import { useChatbot } from '../../services/chatbot'; // Import your custom hook
import animationData from '../../images/Animation.json'; // Replace with your actual Lottie animation file

function ChatbotModule() {
  const {
    messages,
    starredMessages,
    showStarred,
    loading,
    error,
    caption,
    showAllStarred,
    messagesEndRef,
    setCaption,
    sendMessage,
    handleStarMessage,
    handleCopyMessage,
    handleDownloadMessage,
    handleShareMessage,
    setShowStarred,
    setShowAllStarred,
  } = useChatbot(); // Use the hook here

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

  const toggleShowStarred = () => setShowStarred((prev) => !prev);
  const toggleShowAllStarred = () => setShowAllStarred((prev) => !prev);

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-1 flex flex-col flex-1 relative">
        <header className="px-3 py-2">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
        </header>
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-1`}>
                <span
                  className={`inline-block p-1 rounded-md max-w-md ${
                    msg.sender === 'bot'
                      ? 'bg-gray-100 text-[12px] text-[black]'
                      : 'bg-violet-200 text-[black] text-[12px]'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                />
                <div className="self-end text-[8px] dark:text-gray-200 text-gray-800 mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
                </div>
                {!error && msg.sender === 'bot' && (
                  <div className="flex space-x-1 mt-1">
                    <button onClick={() => handleShareMessage(msg.text)}>
                      <FaShare className="dark:text-gray-200 text-gray-800 text-[10px]" />
                    </button>
                    <button onClick={() => handleCopyMessage(msg.text)}>
                      <FaCopy className="dark:text-gray-200 text-gray-800 text-[10px]" />
                    </button>
                    <button onClick={() => handleDownloadMessage(msg.text)}>
                      <FaDownload className="dark:text-gray-200 text-gray-800 text-[10px]" />
                    </button>
                    <button onClick={() => handleStarMessage(msg)}>
                      {starredMessages.some((starredMsg) => starredMsg.timestamp === msg.timestamp) ? (
                        <FaStar className="dark:text-gray-200 text-gray-800 text-[10px]" />
                      ) : (
                        <FaRegStar className="dark:text-gray-200 text-gray-800 text-[10px]" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {error && <div className="text-red-600 text-xs italic">{error}</div>}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="flex items-center p-2 border-t border-gray-200">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              className="text-[12px] text-gray-800 dark:text-gray-800 flex-1 p-2 border border-[gray] rounded-md"
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSendClick}
              className="ml-1 px-3 py-2.5 dark:bg-white bg-violet-200 text-white dark:text-gray-800 rounded-md"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-25">
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default ChatbotModule;
