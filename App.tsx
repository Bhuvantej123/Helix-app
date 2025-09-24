
import React, { useState, useRef, useCallback } from 'react';
import type { Chat } from "@google/genai";
import { SessionState, type ChatMessage } from './types';
import { initializeChat, sendMessageToHelix } from './services/geminiService';
import InitialForm from './components/InitialForm';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [sessionState, setSessionState] = useState<SessionState>(SessionState.GREETING);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  const handleStartSession = useCallback(async (topic: string, level: string) => {
    setIsLoading(true);
    setSessionState(SessionState.PLANNING);

    try {
      const chat = initializeChat();
      chatRef.current = chat;
      
      const firstUserMessage = `Topic: ${topic}\nMy Knowledge Level: ${level}`;
      const helixResponse = await sendMessageToHelix(chat, firstUserMessage);

      setMessages([
        { id: Date.now().toString(), sender: 'helix', content: helixResponse }
      ]);
      setSessionState(SessionState.TUTORING);
    } catch (error) {
      console.error("Failed to start session:", error);
      setMessages([{ id: 'error', sender: 'helix', content: 'There was an error starting the session. Please check your API key and try again.' }]);
      setSessionState(SessionState.GREETING);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!chatRef.current) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: userInput,
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const helixResponse = await sendMessageToHelix(chatRef.current, userInput);
      const newHelixMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'helix',
        content: helixResponse,
      };
      setMessages(prev => [...prev, newHelixMessage]);
    } catch (error) {
        console.error("Failed to send message:", error);
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'helix',
            content: 'Sorry, I encountered an error. Could you please rephrase your message?'
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  if (sessionState === SessionState.GREETING) {
    return <InitialForm onStart={handleStartSession} isLoading={isLoading} />;
  }

  return <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />;
};

export default App;
