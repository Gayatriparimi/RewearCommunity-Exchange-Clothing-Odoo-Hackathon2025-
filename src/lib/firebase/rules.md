## Firestore Security Rules for ReWear App

These rules are designed to protect user data while allowing the app to function correctly. Copy the content below into the `firestore.rules` file in your Firebase project console.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if a user is an admin
    function isAdmin() {
      // In a real app, this would check a custom claim or an 'admins' collection
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    // Helper function to check if user is involved in a swap
    function isUserInSwap(swapId) {
      let swap = get(/databases/$(database)/documents/swaps/$(swapId)).data;
      return request.auth.uid == swap.requesterId.id || request.auth.uid == swap.responderId.id;
    }

    // ===== USER PROFILES =====
    // Users can read any profile (for viewing item listers) but only write to their own.
    // Addresses are stored in a private subcollection.
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;

      // Address subcollection: Only the owner can read/write their own address.
      match /addresses/{addressId} {
        allow read, write: if request.auth.uid == userId;
      }
    }

    // ===== ITEMS =====
    // Anyone can browse items. Users can only create items for themselves.
    // Only the item owner can update or delete it.
    match /items/{itemId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.listedBy.id;
      allow update, delete: if get(/databases/$(database)/documents/items/$(itemId)).data.listedBy.id == request.auth.uid;
    }
    
    // ===== SWAPS =====
    // Swaps can only be read by involved parties or an admin.
    // Creation requires authenticated user.
    // Updates are restricted to involved parties.
    match /swaps/{swapId} {
      allow read: if isUserInSwap(swapId) || isAdmin();
      allow create: if request.auth != null;
      allow update: if isUserInSwap(swapId);

      // Tracking subcollection: Only involved parties or admin can access.
      match /tracking/{trackingId} {
        allow read, write: if isUserInSwap(swapId) || isAdmin();
      }
    }

    // ===== NOTIFICATIONS =====
    // Users can only read notifications intended for them.
    // Notifications are created by server-side logic (Firebase Functions), so client-side `create` is denied.
    match /notifications/{notificationId} {
      allow read, update: if get(/databases/$(database)/documents/notifications/$(notificationId)).data.recipientId.id == request.auth.uid;
      allow create, delete: if false; // Managed by backend triggers
    }

    // ===== RATINGS =====
    // Logged-in users can create ratings.
    // All ratings are public to read.
    match /ratings/{ratingId} {
        allow read: if true;
        allow create: if request.auth != null && request.auth.uid == request.resource.data.ratedBy.id;
        allow update, delete: if false; // Ratings are immutable
    }

  }
}
```
