import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const conversations = [
  { id: '1', user: 'Maria K.', item: 'Vintage Denim Jacket', lastMessage: 'Is this still available?', avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Maria' },
  { id: '2', user: 'Sam D.', item: 'Cozy Wool Sweater', lastMessage: 'Great, thanks!', avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Sam' },
];

const chatHistory = [
    { from: 'Maria K.', text: 'Hi! I am interested in your Vintage Denim Jacket. Would you be open to swapping for a floral dress I have listed?', time: '10:30 AM' },
    { from: 'You', text: 'Hi Maria! Thanks for reaching out. I took a look at the dress, it\'s lovely but not quite my style. Are you interested in a point-based swap?', time: '10:32 AM' },
    { from: 'Maria K.', text: 'I could do that! Let me check my points.', time: '10:33 AM' },
];

export default function MessagesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-8rem)]">
      {/* Conversation List */}
      <Card className="col-span-1 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map(convo => (
            <div key={convo.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer border-b">
              <Avatar>
                <AvatarImage src={convo.avatar} />
                <AvatarFallback>{convo.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{convo.user}</p>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      <Card className="md:col-span-2 lg:col-span-3 flex flex-col">
        <div className="p-4 border-b flex items-center gap-4">
            <Avatar>
                <AvatarImage src={conversations[0].avatar} />
                <AvatarFallback>{conversations[0].user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{conversations[0].user}</p>
                <p className="text-sm text-muted-foreground">Regarding: {conversations[0].item}</p>
            </div>
        </div>
        <ScrollArea className="flex-1 p-4 space-y-4">
            {chatHistory.map((msg, index) => (
                <div key={index} className={`flex gap-2 ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${msg.from === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                       <p>{msg.text}</p>
                       <p className={`text-xs mt-1 ${msg.from === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                   </div>
                </div>
            ))}
        </ScrollArea>
        <div className="p-4 border-t flex items-center gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="icon">
                <Send className="h-5 w-5" />
            </Button>
        </div>
      </Card>
    </div>
  )
}
