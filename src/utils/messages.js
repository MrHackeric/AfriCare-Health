// src/utils/messages.js

import xss from 'xss';

/**
 * Formats a message object with a timestamp and sender information.
 * @param {string} sender - The ID or name of the sender.
 * @param {string} text - The content of the message.
 * @returns {object} - The formatted message object.
 */
const formatMessage = (sender, text) => {
  return {
    sender: sender || 'Anonymous',
    text: sanitizeText(text),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Sanitizes text to prevent XSS attacks.
 * @param {string} text - The text to sanitize.
 * @returns {string} - The sanitized text.
 */
const sanitizeText = (text) => {
  return xss(text);  // Use the xss library to sanitize the text
};

export default formatMessage;
