import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle,
  MessageCircle,
  Search,
  BookOpen,
  X,
  Bot,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

interface AISupportPanelProps {
  onClose?: () => void;
}

export function AISupportPanel({ onClose }: AISupportPanelProps) {
  // Mock FAQ data
  const faqs = [
    {
      question: "How do I escalate a customer issue?",
      answer: "To escalate an issue, click the 'Escalate' button in the chat window and select the appropriate department. Provide a brief summary of the issue and urgency level.",
      category: "Escalation"
    },
    {
      question: "What's the standard response time for support tickets?",
      answer: "Our standard response times are: Priority 1 (Critical) - 15 minutes, Priority 2 (High) - 2 hours, Priority 3 (Normal) - 24 hours, Priority 4 (Low) - 48 hours.",
      category: "SLA"
    },
    {
      question: "How do I access customer purchase history?",
      answer: "Click on the customer's profile in the right panel, then navigate to the 'Purchase History' tab. You can view all transactions, refunds, and order details.",
      category: "Customer Info"
    },
    {
      question: "What should I do if a customer requests a refund?",
      answer: "First, verify the purchase within our refund policy timeframe. Check for any exceptions, then process through the refund system. Always document the reason and get customer confirmation.",
      category: "Refunds"
    },
    {
      question: "How do I transfer a chat to another agent?",
      answer: "Use the transfer button in the chat header, select the destination agent or department, add transfer notes, and click confirm. The customer will be notified of the transfer.",
      category: "Chat Management"
    },
    {
      question: "Where can I find product documentation?",
      answer: "Access the knowledge base through the main menu > Resources > Product Docs. Use the search function to find specific product information and troubleshooting guides.",
      category: "Resources"
    }
  ];

  const quickActions = [
    { label: "Knowledge Base", icon: BookOpen, description: "Search company policies and procedures" },
    { label: "Customer Lookup", icon: Search, description: "Find customer information quickly" },
    { label: "Escalation Guide", icon: HelpCircle, description: "Learn when and how to escalate issues" },
    { label: "Common Responses", icon: MessageCircle, description: "Pre-written responses for common issues" }
  ];

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

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">AI Support</h3>
            <p className="text-sm text-muted-foreground">Get instant help and answers</p>
          </div>

          {/* Quick Actions */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-between h-auto p-3 text-left"
                >
                  <div className="flex items-start gap-3">
                    <action.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              ))}
            </CardContent>
          </Card>

          <Separator className="mb-6" />

          {/* FAQ Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs shrink-0 mt-0.5">
                      {faq.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{faq.question}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  {index < faqs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Chat Suggestion */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-sm font-medium mb-2">Need more help?</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Chat with our AI assistant for personalized support
                </p>
                <Button size="sm" className="w-full">
                  Start AI Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}