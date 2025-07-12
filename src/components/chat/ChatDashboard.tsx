import { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { UserDetails } from './UserDetails';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Bell, 
  User, 
  LogOut,
  MessageCircle,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Conversation, Message } from '@/types/chat';
import { mockConversations } from '@/data/mockData';

export function ChatDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string>();
  const [agentStatus, setAgentStatus] = useState<'online' | 'away' | 'busy'>('online');
  const { toast } = useToast();

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);
  const liveConversationsCount = conversations.filter(conv => conv.isLive).length;
  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  // Simulate new message arrivals
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new messages to live conversations
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const liveConversations = conversations.filter(conv => conv.isLive);
        if (liveConversations.length > 0) {
          const randomConv = liveConversations[Math.floor(Math.random() * liveConversations.length)];
          handleNewMessage(randomConv.id, "This is a new incoming message from customer");
        }
      }
      
      // Occasionally add a new live conversation
      if (Math.random() > 0.95) { // 5% chance
        handleNewConversation();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [conversations]);

  const handleNewMessage = (conversationId: string, content: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          content,
          timestamp: new Date(),
          isAgent: false
        };
        
        const updatedConv = {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: newMessage,
          unreadCount: selectedConversationId === conversationId ? 0 : conv.unreadCount + 1,
          updatedAt: new Date()
        };
        
        return updatedConv;
      }
      return conv;
    }));

    // Show toast notification for new messages
    if (selectedConversationId !== conversationId) {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        toast({
          title: "New Message",
          description: `${conversation.contact.name}: ${content.slice(0, 50)}${content.length > 50 ? '...' : ''}`,
        });
      }
    }
  };

  const handleNewConversation = () => {
    // Create a mock new conversation
    const newContact = {
      id: `contact-${Date.now()}`,
      name: `New Customer ${Math.floor(Math.random() * 1000)}`,
      email: `customer${Math.floor(Math.random() * 1000)}@email.com`,
      status: 'online' as const,
    };

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      contactId: newContact.id,
      contact: newContact,
      messages: [{
        id: `msg-${Date.now()}`,
        content: "Hi, I need help with my account. Can someone assist me?",
        timestamp: new Date(),
        isAgent: false
      }],
      isLive: true,
      unreadCount: 1,
      priority: 'normal',
      assignedAgent: 'You',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    newConversation.lastMessage = newConversation.messages[0];

    setConversations(prev => [newConversation, ...prev]);
    
    toast({
      title: "New Chat Request",
      description: `${newContact.name} started a new conversation`,
    });
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      isAgent: true,
      status: 'sent'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: newMessage,
          unreadCount: 0,
          updatedAt: new Date()
        };
      }
      return conv;
    }));

    // Simulate message status updates
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
            )
          };
        }
        return conv;
      }));
    }, 1000);

    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            )
          };
        }
        return conv;
      }));
    }, 3000);
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark conversation as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-status-online',
      away: 'bg-status-away',
      busy: 'bg-status-busy'
    };
    return colors[status as keyof typeof colors] || 'bg-status-offline';
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Chat Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{liveConversationsCount} Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{conversations.length} Total</span>
            </div>
            {totalUnreadCount > 0 && (
              <Badge variant="default" className="h-5">
                {totalUnreadCount} unread
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Agent Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(agentStatus)}`} />
            <select 
              value={agentStatus}
              onChange={(e) => setAgentStatus(e.target.value as any)}
              className="text-sm bg-transparent border border-border rounded px-2 py-1 capitalize"
            >
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
            </select>
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
        
        <ChatWindow
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          onClose={() => setSelectedConversationId(undefined)}
        />
        
        <UserDetails
          contact={selectedConversation?.contact}
          conversation={selectedConversation}
          onClose={() => setSelectedConversationId(undefined)}
        />
      </div>
    </div>
  );
}