// Handle Starring of messages
export const handleStarMessage = (message, starredMessages, setStarredMessages) => {
  const isStarred = starredMessages.some((msg) => msg.timestamp === message.timestamp);
  if (isStarred) {
    setStarredMessages((prev) => prev.filter((msg) => msg.timestamp !== message.timestamp));
  } else {
    setStarredMessages((prev) => [...prev, message]);
  }
};

// Handle copying of messages
export const handleCopyMessage = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => alert('Message copied to clipboard!'))
    .catch((err) => console.error('Failed to copy: ', err));
};

// Handle downloading of messages
export const handleDownloadMessage = (text) => {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'message.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element); // Clean up after download
};

// Handle Sharing of messages
export const handleShareMessage = (text) => {
  if (navigator.share) {
    navigator.share({
      title: 'AfriCare Chatbot Message',
      text: text,
    }).catch((error) => console.error('Error sharing message: ', error));
  } else {
    alert('Share not supported in your browser.');
  }
};

// Format text (bold using asterisks)
export const formatText = (text) => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};
