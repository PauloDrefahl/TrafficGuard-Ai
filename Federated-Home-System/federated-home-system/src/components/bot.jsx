import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const [userInput, setUserInput] = useState('');

  // Dummy bot response function (replace with actual logic or API calls)
  const getBotResponse = (userMessage) => {
    return `I heard you say: "${userMessage}". Here is a dummy response.`;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add the user's message
    const newUserMessage = { sender: 'user', text: userInput.trim() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Get the bot's response
    const botMessageText = getBotResponse(userInput.trim());
    const newBotMessage = { sender: 'bot', text: botMessageText };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    // Clear input
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.sender === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            <strong>{message.sender.toUpperCase()}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

// Inline styles for demonstration purposes
const styles = {
  container: {
    /** Make the container fill its parent’s width */
    width: '100%',
    border: '1px solid #ccc',
    height: '100%',
    marginBottom: '5rem', // optional margin
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem', // optional margin
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    maxHeight: '400px', // adjust to your needs
  },
  message: {
    marginBottom: '10px',
    lineHeight: '1.5',
  },
  userMessage: {
    textAlign: 'right',
  },
  botMessage: {
    textAlign: 'left',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px',
    outline: 'none',
  },
  button: {
    padding: '10px',
    border: 'none',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Chatbot;
