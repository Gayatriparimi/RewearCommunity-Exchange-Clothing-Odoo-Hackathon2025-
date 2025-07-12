## Firestore Security Rules for ReWear App

These rules are designed to protect user data while allowing the app to function correctly. Copy the content below into the `firestore.rules` file in your Firebase project console.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if a user is an admin by checking their role in their user document.
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Helper function to check if the requesting user is one of the two parties involved in a swap.
    function isUserInSwap(swapId) {
      let swap = get(/databases/$(database)/documents/swaps/$(swapId)).data;
      return request.auth.uid == swap.requesterId.id || request.auth.uid == swap.responderId.id;
    }
    
    // ===== USER PROFILES =====
    // Users can read any profile (for viewing item listers), but only write to their own profile.
    // An admin can update any user's profile, for moderation purposes.
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || isAdmin();

      // Address subcollection: Only the owner or an admin can access a user's address.
      match /addresses/{addressId} {
        allow read, write: if request.auth.uid == userId || isAdmin();
      }
    }

    // ===== ITEMS =====
    // Anyone can browse items. Authenticated users can create items for themselves.
    // Only the item owner or an admin can update or delete an item.
    match /items/{itemId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.listedBy.id;
      allow update, delete: if get(/databases/$(database)/documents/items/$(itemId)).data.listedBy.id == request.auth.uid || isAdmin();
    }
    
    // ===== SWAPS =====
    // Swaps can only be read by the involved parties or an admin.
    // Creation requires an authenticated user.
    // Updates are restricted to involved parties or an admin.
    // Deletion is not allowed to preserve swap history.
    match /swaps/{swapId} {
      allow read, update: if isUserInSwap(swapId) || isAdmin();
      allow create: if request.auth != null;
      allow delete: if false;

      // Tracking subcollection: Only involved parties or an admin can access.
      match /tracking/{trackingId} {
        allow read, write: if isUserInSwap(swapId) || isAdmin();
      }
    }

    // ===== NOTIFICATIONS =====
    // Users can only read notifications intended for them. An admin can read any notification.
    // Notifications are created by server-side logic (Firebase Functions), so client-side `create` is denied.
    match /notifications/{notificationId} {
      allow read, update: if get(/databases/$(database)/documents/notifications/$(notificationId)).data.recipientId.id == request.auth.uid || isAdmin();
      allow create, delete: if false; // Managed by backend triggers
    }

    // ===== RATINGS =====
    // All users can read ratings to see community feedback.
    // Only an authenticated user who was part of the swap can create a rating.
    // Ratings are immutable once created.
    match /ratings/{ratingId} {
        allow read: if true;
        // Ensure the rater is who they say they are, and was part of the rated swap.
        allow create: if request.auth != null && request.auth.uid == request.resource.data.ratedBy.id && isUserInSwap(request.resource.data.swapId.id);
        allow update, delete: if false; // Ratings are immutable
    }

  }
}
```
