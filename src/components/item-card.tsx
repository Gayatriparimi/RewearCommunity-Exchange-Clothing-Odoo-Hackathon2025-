import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';

interface ItemCardProps {
  id: string;
  title: string;
  size: string;
  condition: string;
  imageUrl: string;
  user: string;
  dataAiHint?: string;
}

export default function ItemCard({ id, title, size, condition, imageUrl, user, dataAiHint }: ItemCardProps) {
  return (
    <Card className="group w-full overflow-hidden transition-all hover:shadow-xl">
      <CardContent className="p-0">
        <Link href={`/item/${id}`} className="block">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={imageUrl}
              data-ai-hint={dataAiHint}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button size="icon" variant="secondary" className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm transition-colors hover:bg-background">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-headline text-lg font-semibold leading-tight">{title}</h3>
          <Badge variant="outline">{size}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{condition}</p>
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user}`} />
              <AvatarFallback>{user.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{user}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
