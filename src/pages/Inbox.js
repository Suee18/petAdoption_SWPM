// src/pages/Inbox.js
import React, { useState } from 'react';
import './Pages.css';
import './Inbox.css';

const Inbox = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  
  // Dummy data for inbox conversations - will be replaced with API calls later
  const conversations = [
    {
      id: 1,
      sender: "Happy Paws Shelter",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      lastMessage: "Thank you for your interest in adopting Max! We've reviewed your application...",
      timestamp: "10:23 AM",
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
      unread: false,
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
      unread: false,
      messages: [
        { id: 1, sender: "Paws & Claws Adoption", content: "We're reviewing your application for Bella the labrador.", timestamp: "May 11, 11:20 AM", isMe: false },
        { id: 2, sender: "Me", content: "Thank you! I'm looking forward to hearing back.", timestamp: "May 11, 12:45 PM", isMe: true },
        { id: 3, sender: "Paws & Claws Adoption", content: "Your application for Bella has been approved! Next steps include a home visit. Is that something you'd be comfortable with?", timestamp: "May 12, 9:30 AM", isMe: false }
      ]
    }
  ];

  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <h1>Messages</h1>
        <div className="inbox-actions">
          <button className="inbox-button">
            <i className="fa fa-search"></i>
          </button>
          <button className="inbox-button primary">
            <i className="fa fa-plus"></i> New Message
          </button>
        </div>
      </div>

      <div className="inbox-content">
        <div className="conversation-list">
          <div className="conversation-filter">
            <button className="filter-button active">All</button>
            <button className="filter-button">Unread</button>
            <button className="filter-button">Applications</button>
            <button className="filter-button">Notifications</button>
          </div>
          
          {conversations.map((conversation) => (
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
          ))}
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
                  <button className="message-action-button">
                    <i className="fa fa-phone"></i>
                  </button>
                  <button className="message-action-button">
                    <i className="fa fa-video-camera"></i>
                  </button>
                  <button className="message-action-button">
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              <div className="message-content">
                {activeConversation.messages.map(message => (
                  <div key={message.id} className={`message ${message.isMe ? 'my-message' : 'their-message'}`}>
                    <div className="message-bubble">
                      <p>{message.content}</p>
                      <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input">
                <button className="message-attachment-button">
                  <i className="fa fa-paperclip"></i>
                </button>
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  className="message-text-input"
                />
                <button className="message-send-button">
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