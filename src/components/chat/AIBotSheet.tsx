import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface AIBotSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const helpQuestions = [
  {
    id: 1,
    question: "How do I process a refund request?",
    answer: "To process a refund: 1) Verify the customer's order details, 2) Check refund eligibility (within 30 days), 3) Navigate to Orders > Refunds, 4) Enter order number and refund amount, 5) Select refund method and submit.",
    category: "Billing"
  },
  {
    id: 2,
    question: "What's the escalation process for technical issues?",
    answer: "For technical escalations: 1) Document the issue thoroughly, 2) Try basic troubleshooting steps, 3) If unresolved, assign to Technical Support (Level 2), 4) For critical issues, use the 'Urgent' flag and notify the duty manager.",
    category: "Technical"
  },
  {
    id: 3,
    question: "How do I handle angry customers?",
    answer: "Best practices for upset customers: 1) Listen actively and acknowledge their frustration, 2) Apologize for their experience, 3) Ask clarifying questions, 4) Offer specific solutions, 5) Follow up to ensure resolution, 6) If needed, escalate to supervisor.",
    category: "Customer Service"
  },
  {
    id: 4,
    question: "What are our current shipping policies?",
    answer: "Shipping policies: 1) Standard shipping: 3-5 business days, 2) Express shipping: 1-2 business days, 3) Free shipping on orders over $50, 4) International shipping available to select countries, 5) Tracking provided for all orders.",
    category: "Shipping"
  },
  {
    id: 5,
    question: "How do I access customer order history?",
    answer: "To view order history: 1) Search customer by email or phone, 2) Click on customer profile, 3) Navigate to 'Order History' tab, 4) Use date filters if needed, 5) Click on any order to view detailed information including items, payments, and shipping status.",
    category: "Orders"
  }
];

export function AIBotSheet({ open, onOpenChange }: AIBotSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = helpQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[600px]">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <SheetTitle>AWS AI Assistant</SheetTitle>
          </div>
        </SheetHeader>
        
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-3 max-h-[450px] overflow-y-auto">
            {filteredQuestions.map((item) => (
              <Card key={item.id} className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      {item.question}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs">
                    Copy Response
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No help topics found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}