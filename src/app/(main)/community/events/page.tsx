import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: '1',
    title: 'Summer Swap Meet in the Park',
    date: 'August 5, 2024',
    time: '11:00 AM - 3:00 PM',
    location: 'Central Park, Brooklyn',
    description: 'Join us for our biggest swap event of the summer! Bring your pre-loved clothes and find some new treasures. Live music and food trucks will be there.',
  },
  {
    id: '2',
    title: 'Virtual Workshop: Mending & Upcycling Basics',
    date: 'August 20, 2024',
    time: '7:00 PM - 8:30 PM',
    location: 'Online (Zoom)',
    description: 'Learn basic sewing and mending techniques to give your clothes a longer life. This workshop is perfect for beginners!',
  }
];

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Events</h1>
        <p className="text-muted-foreground">Connect with fellow fashion lovers at our upcoming events.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" /> <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" /> <span>{event.time}</span>
                </div>
                 <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" /> <span>{event.location}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button>RSVP Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
