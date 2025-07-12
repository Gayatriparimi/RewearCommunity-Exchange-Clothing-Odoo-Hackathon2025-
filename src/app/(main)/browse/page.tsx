import ItemCard from '@/components/item-card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const browseItems = [
  { id: '1', title: 'Vintage Denim Jacket', size: 'M', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Alex P.', dataAiHint: 'denim jacket' },
  { id: '2', title: 'Summer Floral Dress', size: 'S', condition: 'Like New', imageUrl: 'https://placehold.co/600x800.png', user: 'Maria K.', dataAiHint: 'floral dress' },
  { id: '3', title: 'Cozy Wool Sweater', size: 'L', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Sam D.', dataAiHint: 'wool sweater' },
  { id: '4', title: 'Leather Ankle Boots', size: '8', condition: 'Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Casey L.', dataAiHint: 'leather boots' },
  { id: '5', title: 'Silk Scarf', size: 'One Size', condition: 'New', imageUrl: 'https://placehold.co/600x800.png', user: 'Jenna R.', dataAiHint: 'silk scarf' },
  { id: '6', title: 'Classic White Tee', size: 'M', condition: 'Like New', imageUrl: 'https://placehold.co/600x800.png', user: 'Tom B.', dataAiHint: 'white shirt' },
  { id: '7', title: 'High-Waisted Jeans', size: '28', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Chloe G.', dataAiHint: 'blue jeans' },
  { id: '8', title: 'Plaid Flannel Shirt', size: 'M', condition: 'Gently Used', imageUrl: 'https://placehold.co/600x800.png', user: 'Ben S.', dataAiHint: 'flannel shirt' },
];

export default function BrowsePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Items</h1>
        <p className="text-muted-foreground">Find your next favorite piece from the community.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by keyword..." className="pl-10" />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Tops</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Bottoms</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Dresses</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Outerwear</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Accessories</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {browseItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
