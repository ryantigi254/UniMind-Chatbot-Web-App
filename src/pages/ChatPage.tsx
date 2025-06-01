// pages/ChatPage.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '../store';
import ChatBotAvatar from '../components/ChatBotAvatar';
import MessageInput from '../components/MessageInput';
import ChatMessageBubble from '../components/ChatMessageBubble';
import { generateResponse } from '../services/llmService';
import { Message } from '../types';
import { Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChatResources, ChatResource } from '../services/resourcesService';
import ResourcesPanel from '../components/ResourcesPanel';

const ChatPage: React.FC = () => {
  const { 
    currentChat,
    setCurrentChat,
    addMessage,
    createNewChat,
    settings,
  } = useStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isResourcesPanelOpen, setIsResourcesPanelOpen] = useState(false);
  const [chatResources, setChatResources] = useState<ChatResource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  // Clear connection error when chat changes or on successful message
  useEffect(() => {
    setConnectionError(null);
  }, [currentChat]);

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;

    setConnectionError(null);

    try {
      // Create a new chat if none exists
      let chatId = currentChat?.id;
      if (!currentChat) {
        const newChat = createNewChat('New Therapy Session', true);
        chatId = newChat.id;
      }

      if (!chatId) {
        throw new Error('Failed to create or get chat ID');
      }

      // Create and add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      addMessage(chatId, userMessage);

      // Generate AI response
      setIsLoading(true);
      
      try {
        const allMessages = [...(currentChat?.messages || []), userMessage];
        const response = await generateResponse(allMessages);
        addMessage(chatId, response);

        // Log successful interaction
        console.log('Therapy response received:', {
          sessionId: response.metadata?.sessionId,
          stage: response.metadata?.stage,
          apiSource: response.metadata?.apiSource,
          interactionCount: response.metadata?.interactionCount,
        });

      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Show user-friendly error message
        const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error occurred';
        setConnectionError(errorMessage);

        // Add error message to chat
        const errorResponse: Message = {
          id: crypto.randomUUID(),
          role: 'systemError',
          content: `I'm sorry, I'm having trouble connecting to the therapy service right now. ${errorMessage}`,
          timestamp: new Date(),
        };
        addMessage(chatId, errorResponse);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setConnectionError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    createNewChat('New Therapy Session', true);
  };

  // Updated function to fetch resources with session ID
  const handleResourcesClick = async () => {
    setIsResourcesPanelOpen(!isResourcesPanelOpen);
    
    if (!isResourcesPanelOpen) {
      setLoadingResources(true);
      
      try {
        // Get session_id from current chat or create one
        let sessionId = currentChat?.sessionId;
        
        console.log('Current chat:', currentChat);
        console.log('Session ID:', sessionId);
        console.log('API URL will be:', `${import.meta.env.VITE_CHAT_API_URL}/get_resources/${sessionId}`);
        
        if (!sessionId) {
          console.warn('No session ID found in current chat');
          setChatResources([]);
          return;
        }

        const resources = await fetchChatResources(sessionId);
        console.log('Received resources:', resources);
        setChatResources(resources);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
        setChatResources([]);
      } finally {
        setLoadingResources(false);
      }
    }
  };

  return (
    <div className={`h-full flex transition-all duration-300 ${isResourcesPanelOpen ? 'mr-80' : ''}`}>
      {/* Existing chat content */}
      <div className="flex-1 flex flex-col">
        {/* Connection Error Banner */}
        {connectionError && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 text-sm">
            <div className="flex justify-between items-center">
              <span>⚠️ Connection Error: {connectionError}</span>
              <button
                onClick={() => setConnectionError(null)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {/* Background Logo */}
          {(!currentChat || currentChat.messages.length === 0) && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[450px] pointer-events-none z-0">
              <svg
                width="200"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-full h-full text-primary-500 opacity-[0.08]"
                aria-hidden="true"
              >
                <rect width="60" height="45" x="20" y="35" rx="10" ry="10" fill="currentColor"/>
                <circle cx="38" cy="53" r="5" fill="#000" />
                <circle cx="62" cy="53" r="5" fill="#000" />
                <path d="M45 62 Q50 67 55 62" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <line x1="50" y1="25" x2="50" y2="35" stroke="currentColor" strokeWidth="3"/>
                <circle cx="50" cy="22" r="3" fill="currentColor"/>
              </svg>
            </div>
          )}

          <div className="max-w-3xl mx-auto relative z-1 space-y-4">
            {/* Welcome message */}
            {(!currentChat || currentChat.messages.length === 0) && (
              <div className="flex gap-4">
                <ChatBotAvatar size={32} />
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm inline-block max-w-2xl">
                    <p className="text-gray-900 dark:text-white mb-3">
                      Hello! I'm your therapy companion. I'm here to provide emotional support and help you work through your thoughts and feelings.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      How are you feeling today? What's on your mind?
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Display chat messages */}
            {currentChat?.messages.map((message) => (
              <ChatMessageBubble key={message.id} message={message} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-4">
                <ChatBotAvatar size={32} />
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm inline-block">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Thinking...
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area with Disclaimer */}
        <div className="w-full bg-transparent pb-4">
          <div className="max-w-3xl mx-auto px-4">
            {/* Session Info */}
            {currentChat?.sessionId && (
              <div className="text-center text-xs text-gray-400 mb-2">
                Session: {currentChat.sessionId.slice(-8)}
                {currentChat.messages.length > 0 && (
                  <span className="ml-2">• Messages: {currentChat.messages.length}</span>
                )}
              </div>
            )}

            {/* Message Input */}
            <MessageInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
              placeholder="Share what's on your mind..."
            />
            
            {/* Disclaimer */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 px-4 space-y-1">
              <p>UniMind is an AI therapy companion and cannot replace professional mental health care.</p>
              <p>If you're in crisis, please contact emergency services or a crisis helpline immediately.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resources Panel */}
      <AnimatePresence>
        {isResourcesPanelOpen && (
          <ResourcesPanel 
            resources={chatResources}
            isLoading={loadingResources}
            onClose={() => setIsResourcesPanelOpen(false)}
            onRefresh={handleResourcesClick}
          />
        )}
      </AnimatePresence>
      
      {/* Resources Toggle Button */}
      <button
        onClick={handleResourcesClick}
        className={`fixed bottom-20 right-6 w-12 h-12 ${
          isResourcesPanelOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-gray-400 hover:bg-gray-500'
        } text-white rounded-full shadow-sm flex items-center justify-center transition-all duration-200 z-10 opacity-80 hover:opacity-100`}
        aria-label="Support resources"
      >
        <Book className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatPage;