import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Edit,
  Star,
  Clock,
  MessageSquare,
  TrendingUp,
  Activity,
  X,
  User,
  Shield,
  Settings
} from 'lucide-react';

interface ProfilePanelProps {
  onClose?: () => void;
}

export function ProfilePanel({ onClose }: ProfilePanelProps) {
  // Mock agent data
  const agent = {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Customer Support",
    role: "Senior Agent",
    avatar: null,
    status: "online",
    employeeId: "EMP001",
    joinDate: new Date(2023, 0, 15),
    location: "New York, NY"
  };

  // Mock today's stats
  const todayStats = {
    conversationsHandled: 24,
    avgResponseTime: "2.8 min",
    customerSatisfaction: 4.9,
    resolvedTickets: 18,
    activeChats: 3,
    hoursWorked: 6.5
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="w-80 border-l border-border bg-background">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Close Button */}
          {onClose && (
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                {agent.avatar ? (
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  agent.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-background bg-status-online" />
            </div>
            
            <h3 className="text-xl font-semibold mb-1">My Profile</h3>
            <p className="text-sm text-muted-foreground">{agent.name}</p>
            <Badge variant="secondary" className="mt-2">{agent.role}</Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          <Separator className="mb-6" />

          {/* Agent Information */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Agent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">{agent.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-muted-foreground">{agent.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-xs text-muted-foreground">{agent.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Employee ID</p>
                  <p className="text-xs text-muted-foreground">{agent.employeeId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-xs text-muted-foreground">{formatDate(agent.joinDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Today's Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{todayStats.conversationsHandled}</p>
                  <p className="text-xs text-muted-foreground">Conversations</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{todayStats.activeChats}</p>
                  <p className="text-xs text-muted-foreground">Active Chats</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{todayStats.resolvedTickets}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{todayStats.hoursWorked}</p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg Response</span>
                <span className="font-medium">{todayStats.avgResponseTime}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Satisfaction</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{todayStats.customerSatisfaction}</span>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <p className="text-xs font-medium">Resolved customer issue #1234</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-status-online rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Status changed to online</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Started shift</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
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