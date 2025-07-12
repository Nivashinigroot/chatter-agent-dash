import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Clock, MessageCircle } from 'lucide-react';
import { Conversation } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation?: string;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const liveConversations = conversations.filter(conv => conv.isLive);
  const pastConversations = conversations.filter(conv => !conv.isLive);

  const filteredLiveConversations = liveConversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPastConversations = pastConversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getStatusDot = (status: string) => {
    const colors = {
      online: 'bg-status-online',
      offline: 'bg-status-offline'
    };
    return colors[status as keyof typeof colors] || 'bg-status-offline';
  };


  const ConversationItem = ({ conversation }: { conversation: Conversation }) => (
    <div
      key={conversation.id}
      className={cn(
        "p-3 cursor-pointer border-b border-border hover:bg-muted/50 transition-colors",
        selectedConversation === conversation.id && "bg-primary/5 border-l-4 border-l-primary"
      )}
      onClick={() => onSelectConversation(conversation.id)}
    >
      <div className="flex items-start gap-3">
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
            getStatusDot(conversation.contact.status)
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-foreground truncate">
              {conversation.contact.name}
            </h4>
            <span className="text-xs text-muted-foreground">
              {formatTime(conversation.updatedAt)}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage?.content || 'No messages yet'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-chat-sidebar border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Conversations</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Live Conversations */}
        {filteredLiveConversations.length > 0 && (
          <div className="mb-4">
            <div className="px-4 py-2 bg-primary/5 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-online rounded-full animate-pulse" />
                <h3 className="font-medium text-sm text-primary">
                  Live Conversations ({filteredLiveConversations.length})
                </h3>
              </div>
            </div>
            {filteredLiveConversations.map(conversation => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </div>
        )}

        {/* Past Conversations */}
        {filteredPastConversations.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-muted/20 border-b border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <h3 className="font-medium text-sm text-muted-foreground">
                  Past Conversations ({filteredPastConversations.length})
                </h3>
              </div>
            </div>
            {filteredPastConversations.map(conversation => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredLiveConversations.length === 0 && filteredPastConversations.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No conversations found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}