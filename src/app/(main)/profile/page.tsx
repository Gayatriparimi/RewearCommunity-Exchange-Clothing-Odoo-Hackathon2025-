import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const user = {
  name: 'Alex P.',
  email: 'alex.p@example.com',
  joined: 'January 15, 2023',
  location: 'Brooklyn, NY',
  bio: "Fashion enthusiast and lover of all things vintage. I believe in sustainable style and giving clothes a second chance to shine. Let's swap!",
  avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Alex',
  itemsListed: 12,
  swapsCompleted: 8,
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <Avatar className="h-32 w-32 border-4 border-primary/20">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">Joined {user.joined}</p>
          <div className="mt-2">
            <Badge>{user.location}</Badge>
          </div>
        </div>
        <Button variant="outline" className="ml-auto w-full md:w-auto">
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{user.bio}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Stats</CardTitle>
            <CardDescription>Your contribution to the community.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between">
                <span className="text-muted-foreground">Items Listed</span>
                <span className="font-semibold">{user.itemsListed}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Swaps Completed</span>
                <span className="font-semibold">{user.swapsCompleted}</span>
              </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Eco Impact</CardTitle>
            <CardDescription>Items you've saved from landfill.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-4 p-6">
              <span className="text-6xl">🌿</span>
              <div>
                <p className="text-3xl font-bold">{user.swapsCompleted}</p>
                <p className="text-muted-foreground">Items Saved</p>
              </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
