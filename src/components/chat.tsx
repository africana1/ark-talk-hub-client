import {useState, useEffect, useRef} from 'react';
import {io, Socket} from 'socket.io-client';
import {baseURL_SOCKET_IO} from '../services/http';
import useStoreData from '../hooks/useStoreData';

type IdType = string | number;

interface Message {
  userId: string;
  userName: string;
  topicId: IdType;
  text: string;
  timestamp: string;
}

interface TalkTopicChat {
  id: string;
  location: string;
  speakerId: string;
  time: string;
  topicTitle: string;
  date: Date;
  createdAt?: string;
  updatedAt?: string;
}

export function ChatComponent() {
  const {getStoreTalks} = useStoreData();
  const [talkTopics] = useState<TalkTopicChat[]>(getStoreTalks);

  const [selectedTopic, setSelectedTopic] = useState<TalkTopicChat | null>(talkTopics[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Socket instance
  const socketRef = useRef<Socket | null>(null);

  const getUser = localStorage.getItem('user') ?? '';
  const currentUser = JSON.parse(getUser) ?? '';

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(baseURL_SOCKET_IO);

    // Listen for incoming messages from the server
    socketRef.current.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current?.off('receiveMessage');
      socketRef.current?.disconnect();
    };
  }, [selectedTopic]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleTopicSelect = (topic: TalkTopicChat) => {
    setSelectedTopic(topic);
    socketRef.current?.emit('joinTopic', topic.id);
    setMessages([]);
  };

  const handleSend = () => {
    if (!newMessage.trim() || !selectedTopic) return;

    const messageData: Message = {
      userId: currentUser.id,
      userName: currentUser.firstName,
      topicId: selectedTopic.id,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // Emit the message to the server
    socketRef.current?.emit('sendMessage', messageData);

    // Update local state with the new message
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage('');
  };

  return (
    <div className='flex h-screen bg-gray-300 p-20 overflow-hidden'>
      {/* Sidebar */}
      <div className='w-1/4 bg-white border-gray-200 p-4 mt-4' style={{borderRadius: '7px', height: '90%'}}>
        <h2 className='text-xl font-bold mb-4'>Talk Topics</h2>
        <ul className='space-y-2'>
          {talkTopics.map((topic, index) => {
            return (
              <li
                key={index}
                onClick={() => handleTopicSelect(topic)}
                className={`p-2 rounded cursor-pointer ${
                  selectedTopic?.id === topic.id ? 'bg-red-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                {topic.topicTitle}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col p-4'>
        {/* Chat Header */}
        <div className='bg-red-600 text-white p-4 rounded-t-lg text-center font-bold'>
          {selectedTopic ? selectedTopic.topicTitle : '...'} Channel
        </div>

        {/* Message Display Area */}
        <div className='flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner mt-4'>
          <div className='space-y-4'>
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex ${message.userId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`${
                      message.userId === currentUser?.id
                        ? 'bg-teal-800 text-white'
                        : 'bg-gray-200 text-gray-800'
                    } p-3 rounded-lg max-w-xs break-words`}
                  >
                    <div className='text-sm font-semibold'>
                      {message.userId === currentUser?.id ? currentUser.firstName : message.userName}
                    </div>
                    <div
                      className={`${
                        message.userId === currentUser?.id ? ' text-sky-50' : ' text-red-500'
                      } text-xs`}
                    >
                      {message.timestamp}
                    </div>
                    <div>{message.text}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className='mt-4 flex'>
          <input
            id='newMessage'
            placeholder='Type a message...'
            className='flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-red-200'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className='bg-red-500 text-white px-4 rounded-r-lg hover:bg-red-600'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
