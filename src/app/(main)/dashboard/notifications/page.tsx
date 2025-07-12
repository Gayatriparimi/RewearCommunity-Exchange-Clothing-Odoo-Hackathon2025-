import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle2, ShoppingCart, XCircle } from "lucide-react";

const notifications = [
    { id: '1', type: 'swap_accepted', title: 'Swap Accepted!', message: "Maria K. accepted your swap request for 'Vintage Denim Jacket'.", date: '2 hours ago', read: false },
    { id: '2', type: 'swap_shipped', title: 'Item Shipped', message: "Your 'Summer Floral Dress' has been shipped to Alex P.", date: '1 day ago', read: true },
    { id: '3', type: 'swap_declined', title: 'Swap Declined', message: "Casey L. declined your request for 'Leather Ankle Boots'.", date: '3 days ago', read: true },
    { id: '4', type: 'new_message', title: 'New Message', message: "You have a new message from Sam D.", date: '4 days ago', read: true },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'swap_accepted':
            return <CheckCircle2 className="h-6 w-6 text-green-500" />;
        case 'swap_shipped':
            return <ShoppingCart className="h-6 w-6 text-blue-500" />;
        case 'swap_declined':
            return <XCircle className="h-6 w-6 text-red-500" />;
        default:
            return <Bell className="h-6 w-6 text-muted-foreground" />;
    }
}

export default function NotificationsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Stay updated on all your ReWear activity.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.map(notif => (
                            <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-lg ${!notif.read ? 'bg-muted' : ''}`}>
                                <div className="mt-1">{getIcon(notif.type)}</div>
                                <div className="flex-1">
                                    <p className={`font-semibold ${!notif.read ? 'text-foreground' : 'text-muted-foreground'}`}>{notif.title}</p>
                                    <p className={`text-sm ${!notif.read ? 'text-foreground/80' : 'text-muted-foreground/80'}`}>{notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notif.date}</p>
                                </div>
                                {!notif.read && <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
