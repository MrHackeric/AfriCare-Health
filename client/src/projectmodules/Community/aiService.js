export const requestAiResponse = async (text, setMessages) => {
    const placeholderId = `placeholder-${Date.now()}`;
    
    // Show fetching for AI prompts
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: placeholderId,
        sender: 'AI',
        text: 'Fetching...',
        timestamp: new Date(),
        likes: 0,
      },
    ]);
  
    try {
      const response = await fetch('http://localhost:3030/askAi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json();
      const aiResponseText = data.response;
  
      // Replace placeholder message with AI response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === placeholderId ? { ...msg, text: aiResponseText } : msg
        )
      );
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, text: 'Oops! Something went wrong. Please try again later. 🌟💬✨' }
            : msg
        )
      );
    }
  };
  