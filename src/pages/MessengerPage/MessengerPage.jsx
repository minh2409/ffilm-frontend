import React, { useState, useEffect } from 'react';

const MessengerPage = () => {    
    const messages = [
        {
            reciverName: "John Doe",
            lastMessage: "love you",
            theirMessages: [
                { text: "Hi there!", timestamp: "2024-07-13T14:48:00.000Z" },
                { text: "How are you?", timestamp: "2024-07-13T14:50:00.000Z" }
            ],
            yourMessages: [
                { text: "Hi", timestamp: "2024-07-13T14:49:00.000Z" },
                { text: "I'm fine", timestamp: "2024-07-13T14:51:00.000Z" }
            ]
        },
    ];
    
    const [currentMessage, setCurrentMessage] = useState([]);

    useEffect(() => {
        setCurrentMessage(messages);
    },[]);
    
    return (
        <div className="app slide-up min-h-[96vh] flex rounded-2xl border border-gray-300 shadow-2xl">
          {/* Sidebar */}
          <div className="w-1/4 bg-red-900 text-white flex flex-col rounded-l-2xl">
            <div className="p-4 border-b border-red-700">
              <h2 className="text-xl font-bold">Chats</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Chat list */}   
              {currentMessage.map((msg, index) => (
                    <div key={index} className="p-4 border-b border-red-700 cursor-pointer">
                        <h3 className="text-lg font-semibold">{msg.reciverName}</h3>
                        <p className="text-sm text-gray-400">{msg.lastMessage}</p>
                    </div>
                ))}                                                
              {/* Repeat similar blocks for more chats */}
            </div>
          </div>
          {/* Chat Window */}
          <div className="w-3/4 flex flex-col rounded-r-2xl">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 rounded-tr-2xl">
              {/* Messages */}
              <div className="flex flex-col">
                {currentMessage.map((msg, index) => {
                    const allMessages = [...msg.theirMessages.map(m => ({ ...m, sender: 'their' })), ...msg.yourMessages.map(m => ({ ...m, sender: 'your' }))];
                    allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    return (
                        <React.Fragment key={index}>
                            {allMessages.map((message, i) => (
                                <div key={i} className={`${message.sender === 'their' ? 'self-start bg-red-500 text-white' : 'self-end bg-gray-300'} p-2 rounded-lg max-w-xs my-1`}>
                                    <p>{message.text}</p>
                                    <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                </div>
                            ))}
                        </React.Fragment>
                    );
                })}
                {/* Repeat similar blocks for more messages */}
              </div>
            </div>
            <div className="p-4 border-t border-gray-300 bg-white flex rounded-br-2xl">
              <input 
                type="text" 
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                placeholder="Type a message..." 
              />
              <button className="ml-4 bg-red-500 text-white p-2 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      );
}

export default MessengerPage;