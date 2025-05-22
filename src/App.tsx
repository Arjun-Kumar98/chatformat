import { useState } from 'react';
import './App.css';
import ChatBubble from './components/ChatBubble';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  id?: number;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleSend = () => {
    if (!currentInput.trim()) return;

    const userContent = currentInput.trim();
    const userMessage: Message = { role: 'user', content: userContent };
    const loadingId = Date.now();

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: 'assistant',
        content: '__loading__',
        id: loadingId,
      },
    ]);

    setCurrentInput('');

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                content: userContent.startsWith('"')
                  ? JSON.parse(userContent)
                  : userContent,
              }
            : msg
        )
      );
    }, 45000);
  };

  return (
    <div className="App">
      <h1>Southwest GPT</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="input-area">
        <textarea
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Enter your query here"
          rows={4}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
