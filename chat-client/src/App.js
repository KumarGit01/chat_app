import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Create socket connection
const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5
});

function App() {
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connected, setConnected] = useState(false);

  // Socket connection status
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // Register user when userId changes
  useEffect(() => {
    if (userId && connected) {
      console.log(`Registering user: ${userId}`);
      socket.emit('register', userId);
    }
  }, [userId, connected]);

  // Listen for online users updates
  useEffect(() => {
    socket.on('onlineUsers', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users);
    });

    return () => socket.off('onlineUsers');
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receive_message', (msg) => {
      console.log('Received message:', msg);
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = async () => {
    if (!userId || !receiverId || !message) {
      return alert('Please fill all fields');
    }

    if (!connected) {
      return alert('Not connected to server. Please try again.');
    }

    const msg = { 
      senderId: userId, 
      receiverId, 
      content: message 
    };

    console.log('Sending message:', msg);
    socket.emit('send_message', msg);
    
    // Add message to local chat
    setChat((prev) => [...prev, msg]);
    setMessage('');
  };

  const fetchHistory = async () => {
    if (!userId || !receiverId) {
      return alert('Please enter both user IDs');
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${userId}/${receiverId}`);
      console.log('Chat history:', res.data);
      setChat(res.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      alert('Failed to load chat history');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chat App</h2>
      
      <div style={{ marginBottom: 20 }}>
        <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
        <p>Online Users: {onlineUsers.length > 0 ? onlineUsers.join(', ') : 'None'}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input 
          placeholder="Your User ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
        />
        <br /><br />
        <input 
          placeholder="Chat With (User ID)" 
          value={receiverId} 
          onChange={(e) => setReceiverId(e.target.value)} 
        />
        <button onClick={fetchHistory}>Load Chat</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input 
          placeholder="Type a message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'auto' }}>
        {chat.map((msg, index) => (
          <div 
            key={index} 
            style={{ 
              marginBottom: 10, 
              padding: 5, 
              backgroundColor: msg.sender === userId ? '#e6f7ff' : '#f0f0f0',
              borderRadius: 5
            }}
          >
            <strong>{msg.sender === userId ? 'You' : msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;