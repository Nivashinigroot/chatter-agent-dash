import { Contact, Conversation, Message } from '@/types/chat';

// Mock contacts
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    status: 'online',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    tags: ['VIP', 'Premium'],
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    status: 'away',
    phone: '+1 (555) 234-5678',
    company: 'StartupXYZ',
    tags: ['New Customer'],
    lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@business.co',
    status: 'busy',
    phone: '+1 (555) 345-6789',
    company: 'Business Solutions Ltd',
    tags: ['Support', 'Priority'],
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@corp.com',
    status: 'offline',
    company: 'Corporate Solutions',
    tags: ['Enterprise'],
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.t@startup.io',
    status: 'online',
    phone: '+1 (555) 456-7890',
    company: 'InnovateLab',
    tags: ['Beta User', 'Feedback'],
    lastSeen: new Date()
  }
];

// Mock messages
const createMockMessages = (conversationId: string, count: number): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isAgent = Math.random() > 0.6; // 40% chance of agent message
    const timestamp = new Date(now.getTime() - (count - i) * 5 * 60 * 1000); // 5 minutes apart
    
    const agentMessages = [
      "Hello! How can I help you today?",
      "I understand your concern. Let me look into that for you.",
      "Thank you for providing that information.",
      "I've updated your account settings as requested.",
      "Is there anything else I can assist you with?",
      "I'll escalate this to our technical team and get back to you within 24 hours.",
      "Thank you for your patience while I research this issue."
    ];
    
    const customerMessages = [
      "Hi, I'm having trouble with my account login.",
      "I can't seem to access my dashboard.",
      "The payment didn't go through but I was charged.",
      "Can you help me update my billing information?",
      "I'm interested in upgrading my plan.",
      "The feature doesn't seem to be working as expected.",
      "Thank you for your help!",
      "When will this be resolved?",
      "I need to cancel my subscription."
    ];
    
    messages.push({
      id: `msg-${conversationId}-${i}`,
      content: isAgent 
        ? agentMessages[Math.floor(Math.random() * agentMessages.length)]
        : customerMessages[Math.floor(Math.random() * customerMessages.length)],
      timestamp,
      isAgent,
      status: isAgent ? (Math.random() > 0.5 ? 'read' : 'delivered') : undefined
    });
  }
  
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactId: '1',
    contact: mockContacts[0],
    messages: createMockMessages('conv-1', 8),
    isLive: true,
    unreadCount: 2,
    priority: 'high',
    tags: ['billing', 'urgent'],
    assignedAgent: 'Agent John',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 'conv-2',
    contactId: '2',
    contact: mockContacts[1],
    messages: createMockMessages('conv-2', 5),
    isLive: true,
    unreadCount: 1,
    priority: 'normal',
    tags: ['onboarding'],
    assignedAgent: 'Agent Sarah',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 'conv-3',
    contactId: '3',
    contact: mockContacts[2],
    messages: createMockMessages('conv-3', 12),
    isLive: false,
    unreadCount: 0,
    priority: 'urgent',
    tags: ['technical', 'escalated'],
    assignedAgent: 'Agent Mike',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: 'conv-4',
    contactId: '4',
    contact: mockContacts[3],
    messages: createMockMessages('conv-4', 6),
    isLive: false,
    unreadCount: 0,
    priority: 'low',
    tags: ['general'],
    assignedAgent: 'Agent Lisa',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
  },
  {
    id: 'conv-5',
    contactId: '5',
    contact: mockContacts[4],
    messages: createMockMessages('conv-5', 4),
    isLive: false,
    unreadCount: 0,
    priority: 'normal',
    tags: ['feedback', 'feature-request'],
    assignedAgent: 'Agent John',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000)
  }
];

// Add last message to conversations
mockConversations.forEach(conversation => {
  if (conversation.messages.length > 0) {
    conversation.lastMessage = conversation.messages[conversation.messages.length - 1];
  }
});