export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: Date;
  phone?: string;
  company?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isAgent: boolean;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Conversation {
  id: string;
  contactId: string;
  contact: Contact;
  messages: Message[];
  isLive: boolean;
  lastMessage?: Message;
  unreadCount: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  tags?: string[];
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ChatStatus = 'online' | 'away' | 'busy' | 'offline';