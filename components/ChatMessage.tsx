
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import HelixAvatar from './HelixAvatar';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isHelix = message.sender === 'helix';

  const formattedContent = message.content.split('\n').map((line, index) => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.trim().startsWith('* ')) {
      return <li key={index} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
    }
    if (line.trim().startsWith('- ')) {
       return <li key={index} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
    }
    return <p key={index} dangerouslySetInnerHTML={{ __html: line }} />;
  });

  return (
    <div className={`flex items-start gap-3 my-4 ${isHelix ? '' : 'flex-row-reverse'}`}>
      {isHelix && <HelixAvatar />}
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
          isHelix
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
            : 'bg-indigo-500 text-white rounded-br-none'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none text-left">
            {formattedContent}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
