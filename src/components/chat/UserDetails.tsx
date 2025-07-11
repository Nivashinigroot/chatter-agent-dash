import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  Tag,
  Edit,
  Star,
  Clock,
  MessageSquare,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Contact, Conversation } from '@/types/chat';
import { cn } from '@/lib/utils';

interface UserDetailsProps {
  contact?: Contact;
  conversation?: Conversation;
}

export function UserDetails({ contact, conversation }: UserDetailsProps) {
  if (!contact) {
    return (
      <div className="w-80 border-l border-border bg-background flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8" />
          </div>
          <p>Select a conversation to view contact details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'text-status-online',
      away: 'text-status-away',
      busy: 'text-status-busy',
      offline: 'text-status-offline'
    };
    return colors[status as keyof typeof colors] || 'text-status-offline';
  };

  const getStatusBg = (status: string) => {
    const colors = {
      online: 'bg-status-online',
      away: 'bg-status-away',
      busy: 'bg-status-busy',
      offline: 'bg-status-offline'
    };
    return colors[status as keyof typeof colors] || 'bg-status-offline';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock conversation statistics
  const stats = {
    totalMessages: conversation?.messages.length || 0,
    avgResponseTime: '3.2 min',
    satisfaction: 4.8,
    totalConversations: 12,
    lastActivity: conversation?.updatedAt || new Date()
  };

  return (
    <div className="w-80 border-l border-border bg-background">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Contact Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  contact.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-background",
                getStatusBg(contact.status)
              )} />
            </div>
            
            <h3 className="text-xl font-semibold mb-1">{contact.name}</h3>
            <p className={cn("text-sm font-medium capitalize", getStatusColor(contact.status))}>
              {contact.status}
            </p>
            {contact.lastSeen && contact.status !== 'online' && (
              <p className="text-xs text-muted-foreground mt-1">
                Last seen {formatDate(contact.lastSeen)}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button size="sm" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4" />
            </Button>
          </div>

          <Separator className="mb-6" />

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">{contact.email}</p>
                </div>
              </div>
              
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
              )}
              
              {contact.company && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-xs text-muted-foreground">{contact.company}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {contact.tags && contact.tags.length > 0 && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conversation Stats */}
          {conversation && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Conversation Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-semibold text-primary">{stats.totalMessages}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-semibold text-primary">{stats.totalConversations}</p>
                    <p className="text-xs text-muted-foreground">Total Chats</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Response</span>
                  <span className="font-medium">{stats.avgResponseTime}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{stats.satisfaction}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Started conversation</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(conversation?.createdAt || new Date())}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-status-away rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Status changed to {contact.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(contact.lastSeen || new Date())}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Profile updated</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}