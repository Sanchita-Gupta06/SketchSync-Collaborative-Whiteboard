import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSocket } from '../socketio/Socketio';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0f172a;
  color: #e5e7eb;
  border-left: 1px solid #1e293b;
  min-width: 360px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  height: 60px;
  position: relative;
  right : 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 25px;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #64748b;
  cursor: pointer;

  &:hover {
    color: #f1f5f9;
  }

  &::before {
    content: "✕";
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 16px;
  background: #1e1e2e;
  border-radius: 12px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  margin-bottom: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  width: 100%;
`;

const Message = styled.div`
  margin: 6px 0;
  padding: 12px 16px;
  background: #334155;
  color: #f1f5f9;
  border-radius: 16px;
  max-width: 75%;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  position: relative;

  ${({ $isOwn }) =>
    $isOwn
      ? `border-bottom-right-radius: 4px; border-top-right-radius: 4px;`
      : `border-bottom-left-radius: 4px; border-top-left-radius: 4px;`}

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ $isOwn }) => ($isOwn ? 'right: -6px;' : 'left: -6px;')}
    width: 0;
    height: 0;
    border: 6px solid transparent;
    ${({ $isOwn }) =>
      $isOwn
        ? 'border-left-color: #334155; border-right: 0; margin-bottom: 2px;'
        : 'border-right-color: #334155; border-left: 0; margin-bottom: 2px;'}
  }
`;

const MessageHeader = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  color: #60a5fa;
`;

const MessageContent = styled.div`
  font-size: 0.92rem;
  line-height: 1.4;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  height: 42px;
  padding: 10px 14px;
  border: 1px solid #475569;
  background: #1f2937;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #e2e8f0;
  outline: none;

  &:focus {
    border-color: #64748b;
    box-shadow: 0 0 6px rgba(100, 116, 139, 0.2);
  }

  &::placeholder {
    color: #64748b;
  }
`;

const SendButton = styled.button`
  padding: 10px 16px;
  height: 42px;
  background: #475569;
  color: #e2e8f0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #64748b;
  }

  &:disabled {
    background: #334155;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  font-size: 0.8rem;
  color: #c4b5fd;
  font-style: italic;
  padding-left: 10px;
  margin-bottom: 6px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
`;

function Sidebar({ users, roomId, currentUsername, onClose, onNewMessage }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const { socket, sendMessage } = useSocket();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive-message', (messageData) => {
      setMessages(prev => {
        if (onNewMessage && prev.length > 0) onNewMessage();
        return [...prev, messageData];
      });
    });

    socket.on('room-joined', (data) => {
      if (data.messages) setMessages(data.messages);
    });

    socket.on('user-typing', (data) => {
      if (data.username !== currentUsername) {
        setTypingUsers(prev => new Set(prev).add(data.username));
      }
    });

    socket.on('user-stop-typing', (data) => {
      if (data.username !== currentUsername) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.username);
          return newSet;
        });
      }
    });

    return () => {
      socket.off('receive-message');
      socket.off('room-joined');
      socket.off('user-typing');
      socket.off('user-stop-typing');
    };
  }, [socket, currentUsername, onNewMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() && sendMessage) {
      sendMessage(newMessage.trim(), currentUsername, roomId);
      setNewMessage('');
      setIsTyping(false);
      socket?.emit('stop-typing', { roomId, username: currentUsername });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { roomId, username: currentUsername });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('stop-typing', { roomId, username: currentUsername });
    }, 1000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    return diffInHours < 24
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const renderTypingIndicator = () => {
    if (typingUsers.size === 0) return null;
    const users = Array.from(typingUsers);
    const text = users.length === 1
      ? `${users[0]} is typing...`
      : `${users[0]} and ${users.length - 1} other(s) are typing...`;
    return <TypingIndicator>{text}</TypingIndicator>;
  };

  return (
    <SidebarContainer>
      <TabContainer>
        <h2 style={{ color: '#aab4f9', fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>Chats</h2>
        <CloseButton onClick={onClose} />
      </TabContainer>

      <ContentArea>
        <ChatContainer>
          <MessagesContainer>
            {messages.length === 0 ? (
              <EmptyState>
                <div>No messages yet</div>
                <div style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                  Start the conversation!
                </div>
              </EmptyState>
            ) : (
              <>
                {messages.map((message, index) => {
                  const isOwn = message.username === currentUsername;
                  return (
                    <MessageWrapper key={index} $isOwn={isOwn}>
                      <Message $isOwn={isOwn}>
                        <MessageHeader>
                          <span>{message.username}</span>
                          <span>{formatTime(message.timestamp)}</span>
                        </MessageHeader>
                        <MessageContent>{message.message}</MessageContent>
                      </Message>
                    </MessageWrapper>
                  );
                })}
                {renderTypingIndicator()}
                <div ref={messagesEndRef} />
              </>
            )}
          </MessagesContainer>

          <ChatInputContainer>
            <ChatInput
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              maxLength={500}
            />
            <SendButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
              Send
            </SendButton>
          </ChatInputContainer>
        </ChatContainer>
      </ContentArea>
    </SidebarContainer>
  );
}

export default Sidebar;
