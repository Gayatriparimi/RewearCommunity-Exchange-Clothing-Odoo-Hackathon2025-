import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

const myItems = [
  { id: '1', title: 'Vintage Denim Jacket', status: 'Listed', swaps: 3 },
  { id: '2', title: 'Summer Floral Dress', status: 'Swapped', swaps: 1 },
];

const ongoingSwaps = [
  { id: 'swap-1', item: 'Cozy Wool Sweater', with: 'Maria K.', status: 'Shipped' },
  { id: 'swap-2', item: 'Leather Ankle Boots', with: 'Alex P.', status: 'Request Sent' },
];

export default function DashboardPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <span className="text-2xl">🌿</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground">Points to redeem for new items</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Listed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Swaps Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">You've saved 8 items from landfill!</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="my-listings">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="my-listings">My Listings</TabsTrigger>
              <TabsTrigger value="ongoing-swaps">Ongoing Swaps</TabsTrigger>
              <TabsTrigger value="completed-swaps">Completed Swaps</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button asChild size="sm" className="h-8 gap-1">
                <Link href="/add-item">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Item
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="my-listings">
            <Card>
              <CardHeader>
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Manage your listed items and view swap requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Swap Requests</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell><Badge variant="outline">{item.status}</Badge></TableCell>
                        <TableCell>{item.swaps}</TableCell>
                        <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ongoing-swaps">
          <Card>
              <CardHeader>
                <CardTitle>Ongoing Swaps</CardTitle>
                <CardDescription>Track the status of your current swaps.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Swapping With</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingSwaps.map((swap) => (
                      <TableRow key={swap.id}>
                        <TableCell className="font-medium">{swap.item}</TableCell>
                        <TableCell>{swap.with}</TableCell>
                        <TableCell><Badge>{swap.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
