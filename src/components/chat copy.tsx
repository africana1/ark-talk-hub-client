import {useState, useEffect, useRef} from 'react';

type IdType = string | number;

interface Message {
  id: IdType;
  userId: number;
  topicId: IdType;
  text: string;
  timestamp: string;
}

interface TalkTopicChat {
  id: IdType;
  topic: string;
  speakerId: IdType;
}

export function ChatComponent() {
  const [talkTopics] = useState<TalkTopicChat[]>([
    {id: 1, topic: 'Supply Chain', speakerId: 1},
    {id: 2, topic: 'Storage', speakerId: 1},
    {id: 3, topic: 'Taxation', speakerId: 2},
  ]);

  const [selectedTopic, setSelectedTopic] = useState<TalkTopicChat | null>(talkTopics[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      userId: 1,
      topicId: 1,
      text: 'Hello! How can I help you today?',
      timestamp: `${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}`,
    },
    {
      id: 2,
      userId: 2,
      topicId: 1,
      text: 'Hi! I need some information about the event.',
      timestamp: `${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}`,
    },
  ]);

  type User = {
    id: IdType;
    name: string;
  };

  // current user
  const currentUser: User = {id: 2, name: 'You'};

  const [newMessage, setNewMessage] = useState('');

  // Ref for the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage when component mounts
  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat-${selectedTopic?.id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [selectedTopic]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (selectedTopic) {
      localStorage.setItem(`chat-${selectedTopic.id}`, JSON.stringify(messages));
    }
  }, [messages, selectedTopic]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleTopicSelect = (topic: TalkTopicChat) => {
    setSelectedTopic(topic);
    const storedMessages = localStorage.getItem(`chat-${topic.id}`);
    setMessages(
      storedMessages
        ? JSON.parse(storedMessages)
        : [
            {
              id: 1,
              userId: 1,
              topic: topic.id,
              text: `Hello! How can I help you today?`,
              timestamp: new Date().toLocaleTimeString(),
            },
            {
              id: 2,
              userId: currentUser.id,
              topic: topic.id,
              text: 'Hi! I need some information about the event.',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]
    );
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMessageObj: Message = {
      id: messages.length + 1,
      userId: 2,
      topicId: 1,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <div className='flex h-screen bg-gray-300 p-20 overflow-hidden'>
      {/* Sidebar */}
      <div className='w-1/4 bg-white border-gray-200 p-4 mt-4' style={{borderRadius: '7px', height: '90%'}}>
        <h2 className='text-xl font-bold mb-4'>Talk Topics</h2>
        <ul className='space-y-2'>
          {talkTopics.map((topic) => (
            <li
              key={topic.id}
              onClick={() => handleTopicSelect(topic)}
              className={`p-2 rounded cursor-pointer ${
                selectedTopic?.id === topic.id ? 'bg-red-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {topic.topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col p-4'>
        {/* Chat Header */}
        <div className='bg-red-600 text-white p-4 rounded-t-lg text-center font-bold'>
          {selectedTopic ? selectedTopic.topic : '...'} Group Chat
        </div>

        {/* Message Display Area */}
        <div className='flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner mt-4'>
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${
                    message.userId === currentUser.id ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-800'
                  } p-3 rounded-lg max-w-xs break-words`}
                >
                  <div className='text-sm font-semibold'>{currentUser.name}</div>
                  <div className={`${message.userId === 2 ? ' text-sky-50' : ' text-red-500'} text-xs`}>
                    {message.timestamp}
                  </div>
                  <div>{message.text}</div>
                </div>
              </div>
            ))}
            {/* Dummy div to automatically scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className='mt-4 flex'>
          <input
            type='text'
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
