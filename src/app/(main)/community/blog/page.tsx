import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: '1',
    title: 'The Ultimate Guide to Thrifting Vintage Denim',
    description: 'Learn how to spot high-quality vintage denim and give it a new life. From classic Levi\'s to rare finds, we cover it all.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'denim clothes',
    author: 'Alex P.',
    date: 'July 15, 2024',
  },
  {
    id: '2',
    title: '5 Sustainable Fashion Habits to Adopt Today',
    description: 'Small changes can make a big impact. Discover five simple habits you can start today to make your wardrobe more eco-friendly.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sustainable fashion',
    author: 'Maria K.',
    date: 'July 10, 2024',
  },
   {
    id: '3',
    title: 'How Clothing Swaps are Changing the World',
    description: 'Dive into the movement of community clothing exchanges and how they are promoting sustainability and community connection.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'community event',
    author: 'Sam D.',
    date: 'July 5, 2024',
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Blog</h1>
        <p className="text-muted-foreground">Insights, tips, and stories from the ReWear community.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <Link href="#">
              <Image src={post.imageUrl} alt={post.title} width={600} height={400} className="w-full object-cover aspect-[3/2]" data-ai-hint={post.dataAiHint} />
            </Link>
            <CardHeader>
              <CardTitle className="text-xl">
                 <Link href="#">{post.title}</Link>
              </CardTitle>
              <CardDescription>{post.author} on {post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
