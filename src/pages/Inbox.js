// src/pages/Inbox.js
import React, { useState, useEffect, useRef } from 'react';
import './Pages.css';
import './Inbox.css';

// Helper function to format timestamps
const formatMessageTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Helper function to format date
const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const Inbox = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newSenderName, setNewSenderName] = useState('');
  const [conversationsData, setConversationsData] = useState([
    {
      id: 1,
      sender: "Happy Paws Shelter",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      lastMessage: "Thank you for your interest in adopting Max! We've reviewed your application...",
      timestamp: "10:23 AM",
      date: "May 15", 
      unread: true,
      messages: [
        { id: 1, sender: "Happy Paws Shelter", content: "Hello! Thank you for your interest in adopting Max!", timestamp: "May 15, 10:15 AM", isMe: false },
        { id: 2, sender: "Me", content: "Hi there! I'm very excited about the possibility of adopting Max. He seems like a wonderful dog.", timestamp: "May 15, 10:18 AM", isMe: true },
        { id: 3, sender: "Happy Paws Shelter", content: "Thank you for your interest in adopting Max! We've reviewed your application and would love to schedule a meet and greet. Would you be available this weekend?", timestamp: "May 15, 10:23 AM", isMe: false }
      ]
    },
    {
      id: 2,
      sender: "Furry Friends Rescue",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "We have a few cats that match your preferences. Would you like to...",
      timestamp: "Yesterday",
      date: "May 14",
      unread: false,
      type: "application",
      messages: [
        { id: 1, sender: "Furry Friends Rescue", content: "Hello! We noticed you're interested in adopting a cat.", timestamp: "May 14, 3:15 PM", isMe: false },
        { id: 2, sender: "Me", content: "Yes, I'm looking for an adult cat that's good with children.", timestamp: "May 14, 3:30 PM", isMe: true },
        { id: 3, sender: "Furry Friends Rescue", content: "We have a few cats that match your preferences. Would you like to schedule a time to meet them?", timestamp: "May 14, 4:05 PM", isMe: false }
      ]
    },
    {
      id: 3,
      sender: "Paws & Claws Adoption",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Your application for Bella has been approved! Next steps...",
      timestamp: "May 12",
      date: "May 12",
      unread: false,
      type: "notification",
      messages: [
        { id: 1, sender: "Paws & Claws Adoption", content: "We're reviewing your application for Bella the labrador.", timestamp: "May 11, 11:20 AM", isMe: false },
        { id: 2, sender: "Me", content: "Thank you! I'm looking forward to hearing back.", timestamp: "May 11, 12:45 PM", isMe: true },
        { id: 3, sender: "Paws & Claws Adoption", content: "Your application for Bella has been approved! Next steps include a home visit. Is that something you'd be comfortable with?", timestamp: "May 12, 9:30 AM", isMe: false }
      ]
    }
  ]);
  
  const endOfMessagesRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Scroll to bottom of messages when conversation changes or new messages are added
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);
  
  // Focus search input when search is activated
  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);
  
  // Mark conversation as read when opened
  useEffect(() => {
    if (activeConversation?.unread) {
      const updatedConversations = conversationsData.map(conv => 
        conv.id === activeConversation.id ? { ...conv, unread: false } : conv
      );
      setConversationsData(updatedConversations);
      
      // Update active conversation as well
      setActiveConversation({...activeConversation, unread: false});
    }
  }, [activeConversation]);

  // Filter conversations based on current filter
  const filteredConversations = conversationsData.filter(conversation => {
    if (searchTerm) {
      return conversation.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
             conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    switch (filter) {
      case 'unread':
        return conversation.unread;
      case 'applications':
        return conversation.type === 'application';
      case 'notifications':
        return conversation.type === 'notification';
      default:
        return true;
    }
  });

  // Function to handle sending new messages
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const timeString = formatMessageTime();
    const dateString = formatDate(new Date());
    
    // Create new message object
    const newMessageObj = {
      id: activeConversation.messages.length + 1,
      sender: 'Me',
      content: newMessage,
      timestamp: `Today, ${timeString}`,
      isMe: true
    };
    
    // Update conversations with new message
    const updatedConversations = conversationsData.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessageObj],
          lastMessage: newMessage,
          timestamp: timeString,
          date: dateString
        };
      }
      return conv;
    });
    
    // Update state
    setConversationsData(updatedConversations);
    
    // Update active conversation
    const updatedActiveConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessageObj],
      lastMessage: newMessage,
      timestamp: timeString,
      date: dateString
    };
    setActiveConversation(updatedActiveConversation);
    
    // Clear input
    setNewMessage('');
    
    // Sometimes shelter will respond
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const shelterResponses = [
          "Thank you for your message. We'll get back to you shortly.",
          "We appreciate your interest! Our team will review your request.",
          "Thanks for reaching out! We'll contact you with more information soon.",
          "Got it! We'll process your request as soon as possible.",
          "Thanks for your patience. One of our team members will respond soon."
        ];
        
        const responseIndex = Math.floor(Math.random() * shelterResponses.length);
        const responseTimeString = formatMessageTime();
        
        const shelterResponse = {
          id: updatedActiveConversation.messages.length + 1,
          sender: updatedActiveConversation.sender,
          content: shelterResponses[responseIndex],
          timestamp: `Today, ${responseTimeString}`,
          isMe: false
        };
        
        const responsesUpdated = updatedConversations.map(conv => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              messages: [...conv.messages, newMessageObj, shelterResponse],
              lastMessage: shelterResponses[responseIndex],
              timestamp: responseTimeString,
              date: dateString
            };
          }
          return conv;
        });
        
        setConversationsData(responsesUpdated);
        
        const responseActiveConversation = {
          ...updatedActiveConversation,
          messages: [...updatedActiveConversation.messages, shelterResponse],
          lastMessage: shelterResponses[responseIndex],
          timestamp: responseTimeString,
          date: dateString
        };
        
        setActiveConversation(responseActiveConversation);
      }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
    }
  };
  
  // Handle creating a new conversation
  const handleCreateConversation = () => {
    if (!newSenderName.trim()) return;
    
    // Create a new conversation
    const newId = conversationsData.length + 1;
    const avatarOptions = [
      "https://randomuser.me/api/portraits/women/32.jpg",
      "https://randomuser.me/api/portraits/men/42.jpg",
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/men/52.jpg"
    ];
    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
    
    const newConversation = {
      id: newId,
      sender: newSenderName,
      avatar: randomAvatar,
      lastMessage: "New conversation started",
      timestamp: formatMessageTime(),
      date: formatDate(new Date()),
      unread: false,
      messages: [{
        id: 1,
        sender: newSenderName,
        content: "Hello! How can we help you today?",
        timestamp: `Today, ${formatMessageTime()}`,
        isMe: false
      }]
    };
    
    // Add to conversations
    setConversationsData([newConversation, ...conversationsData]);
    
    // Set as active
    setActiveConversation(newConversation);
    
    // Reset
    setNewSenderName('');
    setShowNewMessageModal(false);
  };

  // Handle keyboard events for message input and search
  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'message') {
        handleSendMessage();
      } else if (type === 'search') {
        // Search is handled by the filter already
      } else if (type === 'new-conversation') {
        handleCreateConversation();
      }
    }
  };

  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <h1>Messages</h1>
        <div className="inbox-actions">
          {isSearchActive ? (
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search conversations..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'search')}
              />
              <button 
                className="search-close-button"
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchTerm('');
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          ) : (
            <button 
              className="inbox-button"
              onClick={() => setIsSearchActive(true)}
            >
              <i className="fa fa-search"></i>
            </button>
          )}
          <button 
            className="inbox-button primary"
            onClick={() => setShowNewMessageModal(true)}
          >
            <i className="fa fa-plus"></i> New Message
          </button>
        </div>
      </div>

      {/* New message modal */}
      {showNewMessageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>New Conversation</h3>
              <button 
                className="modal-close"
                onClick={() => setShowNewMessageModal(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="sender-name">Shelter or Organization Name</label>
                <input 
                  type="text"
                  id="sender-name"
                  placeholder="Enter shelter name..."
                  value={newSenderName}
                  onChange={(e) => setNewSenderName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'new-conversation')}
                />
              </div>
              <button 
                className="modal-button primary"
                onClick={handleCreateConversation}
                disabled={!newSenderName.trim()}
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="inbox-content">
        <div className="conversation-list">
          <div className="conversation-filter">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`filter-button ${filter === 'applications' ? 'active' : ''}`}
              onClick={() => setFilter('applications')}
            >
              Applications
            </button>
            <button 
              className={`filter-button ${filter === 'notifications' ? 'active' : ''}`}
              onClick={() => setFilter('notifications')}
            >
              Notifications
            </button>
          </div>
          
          {filteredConversations.length === 0 ? (
            <div className="no-conversations">
              <p>No conversations found</p>
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className={`conversation-item ${conversation.unread ? 'unread' : ''} ${activeConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="conversation-avatar">
                  <img src={conversation.avatar} alt={conversation.sender} />
                </div>
                <div className="conversation-details">
                  <div className="conversation-header">
                    <h3 className="conversation-sender">{conversation.sender}</h3>
                    <span className="conversation-time">{conversation.timestamp}</span>
                  </div>
                  <p className="conversation-preview">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <div className="unread-indicator"></div>}
              </div>
            ))
          )}
        </div>

        <div className="message-view">
          {activeConversation ? (
            <>
              <div className="message-header">
                <div className="message-contact">
                  <div className="message-avatar">
                    <img src={activeConversation.avatar} alt={activeConversation.sender} />
                  </div>
                  <div className="message-contact-info">
                    <h2>{activeConversation.sender}</h2>
                    <p className="message-status">Online</p>
                  </div>
                </div>
                <div className="message-actions">
                  <button className="message-action-button" title="Call">
                    <i className="fa fa-phone"></i>
                  </button>
                  <button className="message-action-button" title="Video call">
                    <i className="fa fa-video-camera"></i>
                  </button>
                  <button className="message-action-button" title="More options">
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              <div className="message-content">
                <div className="date-separator">
                  <span>{activeConversation.date}</span>
                </div>
                
                {activeConversation.messages.map(message => (
                  <div key={message.id} className={`message ${message.isMe ? 'my-message' : 'their-message'}`}>
                    <div className="message-bubble">
                      <p>{message.content}</p>
                      <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
                <div ref={endOfMessagesRef} />
              </div>

              <div className="message-input">
                <button className="message-attachment-button" title="Add attachment">
                  <i className="fa fa-paperclip"></i>
                </button>
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  className="message-text-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'message')}
                />
                <button 
                  className={`message-send-button ${!newMessage.trim() ? 'disabled' : ''}`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📨</div>
              <h2>Select a conversation</h2>
              <p>Choose a conversation from the list to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;