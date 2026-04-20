# Oboy v1.1 - Quick Start Guide

## 🎯 How to Test the New Features

### 1. **Access Seller Hub**

Navigate to the seller features:

```
Profile Tab → "Start Selling" CTA (if non-seller)
    ↓
Seller Hub Dashboard
    ├── View Performance Stats
    ├── Read Quick Tips
    ├── "Add New Listing" Button
    ├── "View My Listings" Button
    └── "View Chats" Button
```

### 2. **Create Your First Listing**

Follow the 4-step flow:

**Step 1: Add Photo**
```
Seller Hub → "Add New Listing"
    ↓
Choose: Take Photo or Upload from Gallery
    ↓
Confirm image selection (1:1 aspect ratio)
```

**Step 2: Enter Product Details**
```
Product Title: e.g., "iPhone 13 Case"
Description: Multi-line details about your product
Category: Select from 9 categories
Price: Enter amount in local currency
Quantity: How many items available
Location: Where on campus to meet
```

**Step 3: AI Branding (Magic! ✨)**
```
"Generate with AI" Button
    ↓
AI processes your image and generates:
    ├── Cleaned/enhanced image
    ├── Professional title variation
    ├── Persuasive description
    ├── English marketing caption
    └── Local language caption
```

**Step 4: Review & Publish**
```
Review AI-generated content
    ↓
(Option) Edit any field
    ↓
"Publish Listing" Button
    ↓
Success! Listing is now live
```

### 3. **Manage Your Listings**

View and manage all your active listings:

```
Seller Hub → "View My Listings"
    ↓
See all your listings with stats:
    ├── Active listings
    ├── Sold items
    ├── View counts
    ├── Inquiry counts
    └── Quick actions (Edit/Message/Delete)
```

### 4. **Access from Profile**

For existing Oboy users:

```
Profile Tab
    ↓
If non-seller:
    └── See "Start Selling" CTA
        └── Tap to activate seller mode
    
If already seller:
    └── Seller Dashboard Section
        ├── "View Seller Hub" link
        └── "Manage Listings" link
```

---

## 📂 File Structure & Navigation

### New Routes Added

```typescript
// Seller screens
/seller                      // Seller Hub Dashboard
/seller/create-listing       // Multi-step listing creation
/seller/my-listings          // Manage listings

// Updated screens
/(tabs)/profile              // Enhanced with seller features
```

### Import New Services

```typescript
// In any screen, import the AI service:
import aiBranding from '../../utils/aiBranding';

// Use in your components:
const result = await aiBranding.processListingWithAI(
  imageUri,
  productTitle,
  productDescription,
  category,
  sellerId
);
```

---

## 🎨 Component Breakdown

### Seller Hub (`app/seller/index.tsx`)

**Purpose:** Central dashboard for all seller activities

**Key Components:**
- Welcome card with gradient background
- 3 stat cards (active listings, inquiries, successful handovers)
- 3 tip cards with emoji and actionable advice
- 3 action buttons with icons and navigation

**Data Structure:**
```typescript
interface SellerStats {
  activeListings: number;
  inquiries: number;
  successfulHandovers: number;
  totalRevenue: number;
}
```

**Mock Data:**
```javascript
{
  activeListings: 5,
  inquiries: 12,
  successfulHandovers: 3,
  totalRevenue: 450.00
}
```

### Create Listing (`app/seller/create-listing.tsx`)

**Purpose:** Guide users through listing creation with AI assistance

**Key Components:**
- Step indicators with progress bar
- Image picker (camera/gallery)
- Form inputs with validation
- Category selector (horizontal scroll)
- Row layout for price/quantity
- AI processing screen with loading state
- Review card with AI-generated content

**Form Fields:**
```typescript
interface ListingData {
  image?: string;
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  quantity?: string;
  location?: string;
}
```

**AI Output:**
```typescript
interface AIGenerated {
  title: string;
  description: string;
  captions: {
    english: string;
    local: string;
  };
}
```

### My Listings (`app/seller/my-listings.tsx`)

**Purpose:** Display and manage seller's listings

**Key Components:**
- Filter tabs (All/Active/Sold/Pending)
- Listing cards with image, stats, actions
- Status badges with color coding
- Empty state with CTA
- FlatList for performance

**Listing Card Structure:**
```typescript
interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  status: 'active' | 'sold' | 'pending';
  createdAt: string;
}
```

---

## 🔧 Available Mock Data

### Demo Listings (My Listings Screen)

```typescript
[
  {
    id: '1',
    title: 'iPhone 13 Case - Premium Quality',
    price: 25.00,
    views: 142,
    inquiries: 8,
    status: 'active'
  },
  {
    id: '2',
    title: 'Chemistry Textbook - Like New',
    price: 35.00,
    views: 89,
    inquiries: 3,
    status: 'active'
  },
  // ... more listings
]
```

### Categories Available

```javascript
[
  'Electronics',
  'Fashion',
  'Books',
  'Food & Beverages',
  'Services',
  'Notes & Study Materials',
  'Furniture',
  'Sports Equipment',
  'Other'
]
```

---

## 📲 Expected User Journeys

### Journey 1: Student Becomes Seller

```
1. User on Profile tab
2. Sees "Start Selling" CTA
3. Taps → Accepted terms (mock for now)
4. Profile updates to show seller mode
5. Can now access Seller Hub
```

### Journey 2: Create First Listing

```
1. Seller Hub → "Add New Listing"
2. Capture photo of item
3. Fill in product details
4. AI generates professional content
5. Review AI suggestions
6. Publish listing
7. Listing appears in "My Listings"
```

### Journey 3: Manage Listings

```
1. Profile → "Manage Listings"
2. View all listings with stats
3. Filter by status (active/sold/pending)
4. Quick actions: Edit, Message, Delete
5. See view/inquiry counts
```

---

## 🛠️ Customization Options

### Change AI Branding Behavior

Edit `utils/aiBranding.ts`:

```typescript
// Customize title generation
function generateProfessionalTitle(originalTitle: string): string {
  // Modify quality modifiers and conditions
  const qualityModifiers = ['Premium', 'Professional', 'High-Quality'];
  const conditions = ['Like New', 'Excellent', 'Perfect Condition'];
  // ... your logic
}

// Customize captions
function generateEnglishCaption(productTitle: string, category: string): string {
  // Change emojis, tone, CTAs
  const emojis = ['🎯', '✨', '🔥'];
  // ... your logic
}
```

### Customize Colors & Styling

Edit individual screen stylesheets (bottom of each `.tsx` file):

```typescript
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    // ... modify as needed
  },
});
```

### Add More Categories

Update `app/seller/create-listing.tsx`:

```typescript
const categories = [
  'Electronics',
  'Fashion',
  // Add more here...
  'My New Category',
];
```

---

## 📊 Statistics & Metrics

### What Gets Tracked

In the Seller Hub:
- **Active Listings:** Total number of live listings
- **Inquiries:** Total messages/questions received
- **Successful Handovers:** Completed sales
- **Total Revenue:** Sum of all completed transactions

### On Listing Cards

- **Views:** Number of times listing was viewed
- **Inquiries:** Number of interested buyers who messaged
- **Status:** Current state (active/sold/pending)
- **Created:** How long ago the listing was posted

---

## 🧪 Testing Scenarios

### Scenario 1: Happy Path (New Seller)
```
1. ✅ User navigates to Profile
2. ✅ Taps "Start Selling"
3. ✅ Views Seller Hub
4. ✅ Creates listing with all fields
5. ✅ AI generates content
6. ✅ Publishes successfully
```

### Scenario 2: Manage Listings
```
1. ✅ View all listings
2. ✅ Filter by status
3. ✅ See stats for each
4. ✅ Tap Edit/Message/Delete
```

### Scenario 3: Error Handling
```
1. ✅ Empty form submission → Error alert
2. ✅ AI processing failure → Retry option
3. ✅ Image upload fail → Fallback message
4. ✅ Network error → Graceful degradation
```

---

## 🔗 Related Documentation

- **[PRD.md](PRD.md)** - Full product requirements
- **[PRD2.md](PRD2.md)** - v1.1 updated features
- **[BUILD_SUMMARY_v1.1.md](BUILD_SUMMARY_v1.1.md)** - What's been built

---

## 💻 Development Tips

### Debugging

All screens have console logging for tracking:
```
- Image selection
- Form submissions
- AI processing
- Navigation events
- Errors
```

Check React Native debugger for detailed logs.

### Performance

- Use FlatList for long lists (My Listings)
- Image optimization with aspect ratio constraints
- Mock delays in AI processing (2s) simulates real API latency

### Testing Commands

```bash
# Start the app
expo start

# Test on iOS
expo start --ios

# Test on Android
expo start --android

# Test on Web
expo start --web
```

---

## 📝 Notes

- All new features use **mock data** for development
- Ready for **Supabase integration** (see comments in code)
- **AI service layer** designed as standalone, easily replaceable
- All screens follow **Oboy design system** (colors, typography, spacing)
- Full **TypeScript support** with interfaces

---

**Version:** 1.1  
**Created:** April 19, 2026  
**Ready for:** Testing & Integration Phase
