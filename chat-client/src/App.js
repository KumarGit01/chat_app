import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleLogin = () => {
    if (!userId) {
      alert('Please enter your user ID');
      return;
    }
    setIsLoggedIn(true);
  };

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

    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${userId}/${receiverId}`);
      console.log('Chat history:', res.data);
      setChat(res.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      alert('Failed to load chat history');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="app-title">ChatApp</h1>
          <div className="login-form">
            <input 
              className="login-input"
              placeholder="Enter your user ID" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button className="login-button" onClick={handleLogin}>
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <div className="user-info">
            <div className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}></div>
            <span className="user-id">User: {userId}</span>
          </div>
          <div className="online-users">
            <span className="online-count">{onlineUsers.length} online</span>
            <div className="online-users-list">
              {onlineUsers.map((user, index) => (
                <span key={index} className="online-user">{user}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="chat-sidebar">
          <div className="sidebar-section">
            <h3>Chat With</h3>
            <input 
              className="receiver-input"
              placeholder="Enter user ID" 
              value={receiverId} 
              onChange={(e) => setReceiverId(e.target.value)}
            />
            <button className="load-button" onClick={fetchHistory} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load Chat'}
            </button>
          </div>
        </div>

        <div className="chat-main">
          <div className="messages-container" ref={chatContainerRef}>
            {chat.length === 0 ? (
              <div className="empty-chat">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              chat.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <div className="message-text">{msg.content}</div>
                    <div className="message-time">{formatTime(msg.createdAt)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="message-input-container">
            <input 
              className="message-input"
              placeholder="Type a message..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;