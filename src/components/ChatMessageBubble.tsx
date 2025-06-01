import React, { memo } from 'react';
import { Message } from '../types';
import ChatBotAvatar from './ChatBotAvatar';
import { AlertTriangle } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: Message;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = memo(({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.role === 'systemError';

  return (
    <div
      className={`flex gap-4 ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      {!isUser && !isError && <ChatBotAvatar size={32} />}
      {isError && (
        <div className="w-8 h-8 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
      )}
      <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`
            ${
              isUser
                ? 'bg-primary-500 text-white'
                : isError
                ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            }
            rounded-2xl p-4 shadow-sm inline-block max-w-2xl
          `}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
});

ChatMessageBubble.displayName = 'ChatMessageBubble';

export default ChatMessageBubble;