import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Send, Search } from 'lucide-react';

export const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Mathematics Teacher',
      lastMessage: 'Your assignment has been graded.',
      time: '10:30 AM',
      unread: 2,
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Admin Office',
      role: 'Administration',
      lastMessage: 'Fee payment reminder',
      time: 'Yesterday',
      unread: 0,
      avatar: 'AO',
    },
    {
      id: 3,
      name: 'Prof. Michael Brown',
      role: 'Physics Teacher',
      lastMessage: 'Lab report feedback available',
      time: '2 days ago',
      unread: 1,
      avatar: 'MB',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      content: 'Hello! I wanted to inform you that your recent assignment has been graded.',
      time: '10:25 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you! Could you please share the feedback?',
      time: '10:28 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Dr. Sarah Johnson',
      content: 'Your assignment has been graded. You scored 85/100. Well done! Check the detailed feedback in the assignments section.',
      time: '10:30 AM',
      isOwn: false,
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Messages' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" padding={false}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                  selectedConversation === conversation.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20'
                    : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {conversation.name}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge variant="danger" className="ml-2">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {conversation.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padding={false}>
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                    SJ
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Dr. Sarah Johnson
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mathematics Teacher
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn
                            ? 'text-indigo-200'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button>
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};