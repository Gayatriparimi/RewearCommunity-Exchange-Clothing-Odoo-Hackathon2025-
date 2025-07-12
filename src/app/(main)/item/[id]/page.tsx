import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const item = {
  id: '1',
  title: 'Vintage Denim Jacket',
  description: "A classic denim jacket from the 90s. Perfectly worn-in with a comfortable fit. Features two chest pockets and two side pockets. Made from 100% cotton. A timeless piece that pairs well with anything.",
  category: 'Outerwear',
  size: 'M',
  condition: 'Gently Used',
  tags: ['Denim', 'Vintage', '90s', 'Jacket', 'Streetwear'],
  images: [
    'https://placehold.co/600x800.png?1',
    'https://placehold.co/600x800.png?2',
    'https://placehold.co/600x800.png?3',
  ],
  user: {
    name: 'Alex P.',
    location: 'Brooklyn, NY',
    rating: 4.8,
    reviews: 23,
    avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Alex',
  },
  availability: 'Available',
};

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch item data based on params.id
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
      <div className="grid gap-4">
        <Carousel>
          <CarouselContent>
            {item.images.map((src, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={src}
                      alt={`${item.title} - view ${index + 1}`}
                      data-ai-hint="denim jacket"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{item.title}</h1>
          <Badge variant={item.availability === 'Available' ? 'default' : 'destructive'} className="bg-primary/20 text-primary border-primary/30">
            {item.availability}
          </Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">{item.description}</p>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Category</p>
                <p>{item.category}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Size</p>
                <p>{item.size}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Condition</p>
                <p>{item.condition}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listed by</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={item.user.avatarUrl} alt={item.user.name} />
                <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.user.name}</p>
                <p className="text-sm text-muted-foreground">{item.user.location}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>{item.user.rating} ({item.user.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Message lister</span>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button size="lg" className="font-bold">Swap Request</Button>
          <Button size="lg" variant="secondary" className="font-bold">Redeem with 800 Points</Button>
        </div>
      </div>
    </div>
  );
}
