import ItemCard from '@/components/item-card';

const wishlistItems = [
  { id: '3', title: 'Cozy Wool Sweater', size: 'L', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Sam D.', dataAiHint: 'wool sweater' },
  { id: '4', title: 'Leather Ankle Boots', size: '8', condition: 'Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Casey L.', dataAiHint: 'leather boots' },
  { id: '5', title: 'Silk Scarf', size: 'One Size', condition: 'New', imageUrl: 'https://placehold.co/600x800.png', user: 'Jenna R.', dataAiHint: 'silk scarf' },
];

export default function WishlistPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later. Keep an eye on them!</p>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
       {wishlistItems.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-2">Start browsing to add items you love.</p>
        </div>
      )}
    </div>
  );
}
