import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBubble.css';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';
  const isLoading = role === 'assistant' && content === '__loading__';
  const normalizedContent = content.replace(/\\n/g, '\n\n');

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'} ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <>
          <span className="loading-text">Response is being generated</span>
          <span className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </>
      ) : isUser ? (
        <div className="user-raw">{content}</div>
      ) : (
        <ReactMarkdown>{normalizedContent}</ReactMarkdown>
      )}
    </div>
  );
};

export default ChatBubble;
