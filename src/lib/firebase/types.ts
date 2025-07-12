import type { Timestamp, DocumentReference } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  profilePicURL?: string;
  points: number; // default: 100
  role: 'user' | 'admin' | 'superadmin';
  joinedAt: Timestamp;
  deliveryAddresses?: UserAddress[]; // Can be an array or a subcollection
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
}

export interface Item {
  id: string;
  ownerID: string; // uid of the user who listed it
  title: string;
  description: string;
  images: string[];
  category: 'Men' | 'Women' | 'Kids' | string;
  type: 'Swap' | 'Redeem';
  size: 'S' | 'M' | 'L' | 'XL' | 'Free Size' | string;
  condition: 'New' | 'Like New' | 'Used';
  tags: string[];
  status: 'pending' | 'approved' | 'swapped' | 'rejected';
  createdAt: Timestamp;
}

export interface Swap {
  id: string;
  senderID: string;
  receiverID: string;
  itemARef: DocumentReference<Item>;
  itemBRef?: DocumentReference<Item>;
  swapStatus: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'rejected' | 'cancelled';
  timestamps: {
    requestAt: Timestamp;
    acceptedAt?: Timestamp;
    deliveredAt?: Timestamp;
  };
  finalPoints?: {
    sender: number;
    receiver: number;
  };
  privacyStatus: 'locked' | 'visible';
}

// Stored in /swaps/{swapId}/deliveryDetails/{userId}
export interface DeliveryDetails {
    address: UserAddress;
    contactNumber: string; // May be masked
}

export interface Tracking {
  id: string;
  courierName: string;
  trackingNumber: string;
  status: 'Shipped' | 'In Transit' | 'Delivered';
  ETA?: Timestamp;
  lastUpdated: Timestamp;
}

export interface AppNotification {
  id: string;
  recipientID: string;
  title: string;
  message: string;
  readStatus: boolean;
  type: 'swap' | 'admin' | 'general';
  createdAt: Timestamp;
  link?: string;
}

export interface Rating {
  id: string;
  swapId: string;
  ratedBy: string;
  ratedUser: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: Timestamp;
}

export interface AdminLog {
    id: string;
    adminID: string;
    actionType: 'approve_item' | 'reject_swap' | 'reset_points' | string;
    targetID: string; // Can be itemId, userId, or swapId
    reason?: string;
    timestamp: Timestamp;
}
