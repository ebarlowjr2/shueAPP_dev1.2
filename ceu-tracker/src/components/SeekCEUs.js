import React, { useState } from 'react';

function SeekCEUs() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-message bot-message">{response}</div>
      </div>
      <div className="chat-form">
        <input 
          type="text" 
          placeholder="Ask about CEUs..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default SeekCEUs;
