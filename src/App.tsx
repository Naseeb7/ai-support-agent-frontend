import { useState, useEffect } from 'react';
import { sendChatMessage, getChatHistory } from './lib/api';
import type { ChatMessage } from './chatTypes';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    return localStorage.getItem('chatSessionId');
  });
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const loadChatHistory = async () => {
      const storedSessionId = localStorage.getItem('chatSessionId');
      if (storedSessionId) {
        try {
          const response = await getChatHistory(storedSessionId);
          // Handle different possible response formats from backend
          let history;
          if (Array.isArray(response)) {
            history = response;
          } else if (response && typeof response === 'object' && response.messages) {
            history = response.messages;
          } else {
            // If response format is unexpected, use empty array
            history = [];
          }

          const chatMessages: ChatMessage[] = history.map((msg: any) => ({
            id: msg.id || Date.now().toString(),
            sender: msg.sender,
            text: msg.text,
            status: msg.status
          }));
          setMessages(chatMessages);
          setSessionId(storedSessionId);
        } catch (error) {
          console.error('Failed to load chat history:', error);
          // Continue with empty messages
          setMessages([]);
        }
      }
    };

    loadChatHistory();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await sendChatMessage(inputValue, sessionId);

      // Update sessionId if provided in response
      if (response.sessionId) {
        setSessionId(response.sessionId);
        localStorage.setItem('chatSessionId', response.sessionId);
      }

      // Add AI response
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "ai",
        text: response.reply,
        status: "success"
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "ai",
        text: "Something went wrong. Please try again.",
        status: "error"
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <ChatHeader
        onNewChat={() => {
          setMessages([]);
          localStorage.removeItem('chatSessionId');
          setSessionId(null);
        }}
      />
      <MessageList
        messages={messages}
        isSending={isSending}
      />
      <ChatInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        disabled={isSending}
      />
    </div>
  )
}

export default App
