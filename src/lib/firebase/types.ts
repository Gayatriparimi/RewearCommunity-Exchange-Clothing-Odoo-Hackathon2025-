import type { Timestamp, DocumentReference } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: Timestamp;
  location?: string;
  bio?: string;
  avatarUrl?: string;
  itemsListed?: number;
  swapsCompleted?: number;
}

// Minimal address info stored in a subcollection for privacy
export interface UserAddress {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber?: string;
}

export interface Item {
    id: string;
    title: string;
    description: string;
    category: string;
    size: string;
    condition: 'new' | 'like-new' | 'gently-used' | 'used';
    tags: string[];
    imageUrls: string[];
    listedBy: DocumentReference<UserProfile>; // Reference to the user who listed it
    createdAt: Timestamp;
    status: 'available' | 'swapped';
}

export interface Swap {
    id: string;
    requesterId: DocumentReference<UserProfile>;
    responderId: DocumentReference<UserProfile>;
    requestedItemId: DocumentReference<Item>;
    offeredItemId?: DocumentReference<Item>; // For 2-way swaps
    status: 'pending' | 'accepted' | 'shipped' | 'received' | 'completed' | 'declined' | 'cancelled' | 'expired' | 'disputed';
    disputeStatus?: 'open' | 'resolved';
    createdAt: Timestamp;
    updatedAt: Timestamp;
    // Personal info is locked until swap is accepted and shipped
    deliveryDetails?: {
        requesterAddress: UserAddress;
        responderAddress: UserAddress;
    }
}

export interface Tracking {
    id: string;
    courierName?: string;
    trackingNumber?: string;
    status: 'label_created' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed';
    estimatedArrival?: Timestamp;
    lastUpdated: Timestamp;
    // Optional history for detailed tracking
    history?: { status: string, location: string, timestamp: Timestamp }[];
}


export interface AppNotification {
    id: string;
    recipientId: DocumentReference<UserProfile>; // Can also be 'admins'
    title: string;
    message: string;
    link?: string; // e.g., to `/swaps/{swapId}`
    readStatus: boolean;
    createdAt: Timestamp;
}

export interface Rating {
    id: string;
    swapId: DocumentReference<Swap>;
    ratedBy: DocumentReference<UserProfile>;
    ratedUser: DocumentReference<UserProfile>;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    createdAt: Timestamp;
}
