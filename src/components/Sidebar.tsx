import React, { useState } from 'react';
import { MessageSquare, BarChart2, Book, History, BookOpen, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { Chat } from '../types';
import ContextMenu from './ContextMenu';
import UniMindTextLogo from './UniMindTextLogo';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, isActive, onClick, onContextMenu }) => (
  <button
    onClick={onClick}
    onContextMenu={onContextMenu}
    className={`
      w-full px-4 py-3 text-left
      rounded-lg transition-colors
      hover:bg-gray-800
      ${isActive ? 'bg-gray-800' : ''}
      flex items-center gap-3
    `}
  >
    <MessageSquare className="w-4 h-4 text-gray-400" />
    <span className="flex-1 truncate text-gray-300">{chat.title}</span>
  </button>
);

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  path, 
  isActive = false,
  collapsed = false,
  onClick
}) => (
  <a
    href={path}
    onClick={(e) => {
      e.preventDefault();
      console.log(`NavItem clicked: Attempting to navigate to ${path}`);
      onClick?.();
    }}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
      ${isActive
        ? 'bg-gray-800 text-white'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }
      ${collapsed ? 'justify-center' : ''}
    `}
    role="menuitem"
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
  </a>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    isSidebarCollapsed,
    toggleSidebarCollapse,
    chats,
    currentChat,
    setCurrentChat,
    renameChat,
    deleteChat,
    createNewChat
  } = useStore();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    chatId: string;
  } | null>(null);

  const mainNavItems = [
    { path: '/', icon: <MessageSquare className="h-5 w-5" />, label: 'Chat' },
    { path: '/mood', icon: <BarChart2 className="h-5 w-5" />, label: 'Mood Tracker' },
    { path: '/journal', icon: <Book className="h-5 w-5" />, label: 'Journal' },
    { path: '/resources', icon: <BookOpen className="h-5 w-5" />, label: 'Resources' },
  ];

  const handleNavigation = (path: string) => {
    console.log(`[Sidebar] handleNavigation called with path: ${path}`);
    navigate(path);
  };

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
    navigate('/');
  };

  const handleContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      chatId,
    });
  };

  const handleRename = () => {
    if (!contextMenu) return;
    const chat = chats.find(c => c.id === contextMenu.chatId);
    if (!chat) return;

    const newTitle = window.prompt('Enter new chat title:', chat.title);
    if (newTitle && newTitle.trim() !== '') {
      renameChat(contextMenu.chatId, newTitle.trim());
    }
  };

  const handleDelete = () => {
    if (!contextMenu) return;
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(contextMenu.chatId);
    }
  };

  const handleExpandAndLoadRecent = () => {
    toggleSidebarCollapse();
    if (chats.length > 0) {
      const mostRecent = chats[0];
      setCurrentChat(mostRecent);
      navigate('/');
    }
  };

  const handleNewChat = () => {
    const newChat = createNewChat('New Therapy Session', true);
    setCurrentChat(newChat);
    navigate('/');
  };

  return (
    <div 
      className="h-full flex flex-col bg-gray-900"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header Section */}
      <div className="px-4 py-6 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <UniMindTextLogo />
        )}
        <button
          onClick={toggleSidebarCollapse}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div className="flex flex-col gap-1.5">
            <div className="w-5 h-0.5 bg-gray-400 rounded-full" />
            <div className="w-5 h-0.5 bg-gray-400 rounded-full" />
            <div className="w-5 h-0.5 bg-gray-400 rounded-full" />
          </div>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4" role="menu">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <NavItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
                collapsed={isSidebarCollapsed}
                onClick={() => handleNavigation(item.path)}
              />
            </li>
          ))}
        </ul>

        {/* New Chat Button */}
        {isSidebarCollapsed ? (
          <div className="mt-6">
            <button
              onClick={handleNewChat}
              className="w-full flex justify-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">New Chat</span>
            </button>
          </div>
        )}

        {/* Recent Chats Section */}
        {!isSidebarCollapsed && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <h2 className="px-4 text-sm font-medium text-gray-400 mb-2">Recent Chats</h2>
            <div className="space-y-1 max-h-[calc(100vh-400px)] overflow-y-auto">
              {chats.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-400">
                  No chats yet. Start a new conversation!
                </div>
              ) : (
                chats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChat?.id === chat.id}
                    onClick={() => handleChatSelect(chat)}
                    onContextMenu={(e) => handleContextMenu(e, chat.id)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {isSidebarCollapsed && chats.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={handleExpandAndLoadRecent}
              className="w-full flex justify-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              title="Show Recent Chats"
            >
              <History className="h-5 w-5" />
            </button>
          </div>
        )}
      </nav>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Sidebar;