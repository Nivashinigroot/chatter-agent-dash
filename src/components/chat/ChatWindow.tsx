import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  Archive,
  Star,
  Clock,
  CheckCheck
} from 'lucide-react';
import { Conversation, Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  conversation?: Conversation;
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.getTime() - 86400000).toDateString() === date.toDateString();
    
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getMessageStatusIcon = (status?: string) => {
    switch (status) {
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: 'bg-red-500 text-white',
      high: 'bg-orange-500 text-white',
      normal: 'bg-blue-500 text-white',
      low: 'bg-gray-500 text-white'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Send className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
          <p>Choose a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = conversation.messages.reduce((groups, message) => {
    const dateKey = message.timestamp.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {conversation.contact.avatar ? (
                  <img
                    src={conversation.contact.avatar}
                    alt={conversation.contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  conversation.contact.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                conversation.contact.status === 'online' && 'bg-status-online',
                conversation.contact.status === 'away' && 'bg-status-away',
                conversation.contact.status === 'busy' && 'bg-status-busy',
                conversation.contact.status === 'offline' && 'bg-status-offline'
              )} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{conversation.contact.name}</h3>
                {conversation.isLive && (
                  <Badge variant="default" className="text-xs bg-status-online">
                    Live
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getPriorityBadge(conversation.priority))}
                >
                  {conversation.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {conversation.contact.status === 'online' ? 'Online' : 
                 conversation.contact.lastSeen ? 
                 `Last seen ${conversation.contact.lastSeen.toLocaleString()}` : 
                 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {Object.entries(groupedMessages).map(([dateKey, messages]) => (
            <div key={dateKey}>
              {/* Date Separator */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {formatMessageDate(new Date(dateKey))}
                </div>
              </div>
              
              {/* Messages */}
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={msg.id} className={cn(
                    "flex gap-3 max-w-[80%]",
                    msg.isAgent ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}>
                    {!msg.isAgent && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {conversation.contact.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className={cn(
                      "rounded-lg px-4 py-2 break-words",
                      msg.isAgent 
                        ? "bg-chat-bubble-agent text-primary-foreground" 
                        : "bg-chat-bubble-customer text-foreground border"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1",
                        msg.isAgent ? "justify-start" : "justify-end"
                      )}>
                        <span className={cn(
                          "text-xs",
                          msg.isAgent ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {formatMessageTime(msg.timestamp)}
                        </span>
                        {msg.isAgent && getMessageStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              {conversation.contact.name.charAt(0).toUpperCase()}
            </div>
            <div className="bg-chat-bubble-customer border rounded-lg px-4 py-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                // Auto-resize textarea
                if (textareaRef.current) {
                  textareaRef.current.style.height = 'auto';
                  textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                }
              }}
              onKeyPress={handleKeyPress}
              className="min-h-[40px] max-h-32 resize-none pr-12"
              rows={1}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary-hover"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Press Enter to send, Shift + Enter for new line</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>Response time: ~2 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}