## Firestore Security Rules for ReWear App

These rules are designed to protect user data while allowing the app to function correctly. Copy the content below into the `firestore.rules` file in your Firebase project console.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if a user has an admin role.
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'superadmin'];
    }

    // Helper function to check if the requesting user is one of the two parties involved in a swap.
    function isUserInSwap(swapId) {
      let swap = get(/databases/$(database)/documents/swaps/$(swapId)).data;
      return request.auth.uid == swap.senderID || request.auth.uid == swap.receiverID;
    }
    
    // ===== USER PROFILES =====
    // Users can read any profile, but only write to their own. Admins can write to any profile.
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || isAdmin();

      // Address subcollection: Only the owner or an admin can access a user's address.
      match /deliveryAddresses/{addressId} {
        allow read, write: if request.auth.uid == userId || isAdmin();
      }
    }

    // ===== ITEMS =====
    // Anyone can read items. Authenticated users can create items for themselves.
    // Only the item owner or an admin can update or delete an item.
    match /items/{itemId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.ownerID;
      allow update, delete: if get(/databases/$(database)/documents/items/$(itemId)).data.ownerID == request.auth.uid || isAdmin();
    }
    
    // ===== SWAPS =====
    // Swaps can only be read/updated by the involved parties or an admin.
    // Creation requires an authenticated user.
    match /swaps/{swapId} {
      allow read, update: if isUserInSwap(swapId) || isAdmin();
      allow create: if request.auth != null;
      allow delete: if isAdmin(); // Only admins can delete swaps

      // Delivery Details subcollection
      // Only visible to involved users if the swap privacy is 'visible', or to admins anytime.
      match /deliveryDetails/{detailId} {
        allow read, write: if (isUserInSwap(swapId) && get(/databases/$(database)/documents/swaps/$(swapId)).data.privacyStatus == 'visible') || isAdmin();
      }

      // Tracking subcollection: Only involved parties or an admin can access.
      match /tracking/{trackingId} {
        allow read, write: if isUserInSwap(swapId) || isAdmin();
      }
    }

    // ===== NOTIFICATIONS =====
    // Users can only read notifications intended for them.
    // Server-side logic creates notifications, so client creation is denied.
    match /notifications/{notificationId} {
      allow read, update: if get(/databases/$(database)/documents/notifications/$(notificationId)).data.recipientID == request.auth.uid;
      allow create, delete: if false; // Managed by backend
    }

    // ===== RATINGS =====
    // All users can read ratings.
    // Only an authenticated user who was part of the swap can create a rating.
    // Ratings are immutable once created.
    match /ratings/{ratingId} {
        allow read: if true;
        allow create: if request.auth != null && isUserInSwap(request.resource.data.swapId);
        allow update, delete: if false;
    }
    
    // ===== ADMIN LOGS =====
    // Only admins can read or write to admin logs.
    match /adminLogs/{logId} {
      allow read, write: if isAdmin();
    }

  }
}
```
