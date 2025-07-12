import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Recycle, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ItemCard from '@/components/item-card';
import PublicHeader from '@/components/layout/public-header';
import Footer from '@/components/layout/footer';

const featuredItems = [
  { id: '1', title: 'Vintage Denim Jacket', size: 'M', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Alex P.', dataAiHint: 'denim jacket' },
  { id: '2', title: 'Summer Floral Dress', size: 'S', condition: 'Like New', imageUrl: 'https://placehold.co/600x800.png', user: 'Maria K.', dataAiHint: 'floral dress' },
  { id: '3', title: 'Cozy Wool Sweater', size: 'L', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Sam D.', dataAiHint: 'wool sweater' },
  { id: '4', title: 'Leather Ankle Boots', size: '8', condition: 'Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Casey L.', dataAiHint: 'leather boots' },
  { id: '5', title: 'Silk Scarf', size: 'One Size', condition: 'New', imageUrl: 'https://placehold.co/600x800.png', user: 'Jenna R.', dataAiHint: 'silk scarf' },
  { id: '6', title: 'Classic White Tee', size: 'M', condition: 'Like New', imageUrl: 'https://placehold.co/600x800.png', user: 'Tom B.', dataAiHint: 'white shirt' },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-secondary/50" />
          <Image
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="sustainable fashion"
            alt="Eco-themed background"
            layout="fill"
            objectFit="cover"
            className="-z-10 opacity-20"
          />
          <div className="container relative text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Give Your Wardrobe a Second Life
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80 md:text-xl">
              Join ReWear, the community exchange where you can swap, share, and rediscover fashion sustainably.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">Start Swapping <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/browse">Browse Items</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-foreground/70 md:text-lg">
                Exchanging clothes is simple, fun, and great for the planet.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
              <Card className="h-full border-2 border-transparent bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/20 p-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>1. List an Item</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Upload photos and details of clothes you no longer wear. It's free and easy.</p>
                </CardContent>
              </Card>
              <Card className="h-full border-2 border-transparent bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/20 p-4">
                    <HeartHandshake className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>2. Swap or Earn</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Accept swap requests from others or earn points when someone redeems your item.</p>
                </CardContent>
              </Card>
              <Card className="h-full border-2 border-transparent bg-card transition-all hover:border-primary/50 hover:shadow-lg">
                <CardHeader className="flex flex-col items-center text-center">
                   <div className="mb-4 rounded-full bg-primary/20 p-4">
                    <Recycle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>3. Get New Styles</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Use your points or swap directly to get "new" pre-loved items for your wardrobe.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="featured" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">Featured Items</h2>
            <p className="mx-auto mb-12 mt-4 max-w-[600px] text-center text-foreground/70 md:text-lg">
              Check out what your community is swapping right now.
            </p>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <ItemCard {...item} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12 hidden sm:flex" />
              <CarouselNext className="mr-12 hidden sm:flex" />
            </Carousel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
