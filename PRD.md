# Oboy App - Product Requirements Document

**Document Version:** 1.1  
**Date:** April 19, 2026  
**Platform:** iOS, Android, Web (React Native with Expo)

---

## 1. Executive Summary

**Oboy** is a mobile-first educational marketplace platform designed to connect learners, educators, and student sellers in a unified ecosystem. The app enables users to discover courses, events, and housing, manage purchases, communicate, and access educational resources, while also allowing any student to create and market their own products and services on campus.

A new **Student Marketplace & AI Branding** layer allows students to snap a photo of a product, have AI clean and brand the image, generate multi-language marketing content, and list the item for discovery and chat-based purchase coordination within the app.

---

## 2. Product Overview

### 2.1 Vision
Empower students and professionals to access quality educational content and opportunities through an intuitive, feature-rich mobile application.

### 2.2 Core Value Propositions
- **Unified Learning Marketplace:** Browse and purchase courses, certifications, and events
- **Event Management:** Discover and register for campus events, networking opportunities, and workshops
- **Seamless Commerce:** One-click checkout and order tracking
- **Direct Communication:** In-app messaging for student-to-instructor and peer-to-peer interactions
- **Administrative Features:** Manage invoices, housing, and personal information centrally

### 2.3 Target Users
- **Primary:** University students, recent graduates (18-35 years old)
- **Secondary:** Working professionals seeking upskilling opportunities
- **Tertiary:** Educators and instructors offering courses/workshops

---

## 3. Product Architecture

### 3.1 Technology Stack
- **Frontend Framework:** React Native 0.81.5 with Expo 54.0.33
- **Navigation:** Expo Router 6.0.23 (file-based routing)
- **Backend as a Service:** Supabase (authentication, database)
- **State Management:** React Hooks + AsyncStorage (local persistence)
- **UI Components:** Lucide React Native (icon library)
- **Styling:** React Native StyleSheet, Expo Linear Gradient
- **Language:** TypeScript 5.9.2
- **Platform Support:** iOS (with tablet support), Android (edge-to-edge), Web

### 3.2 App Structure

```
┌─────────────────────────────────────────┐
│         Authentication Layer            │
│    (Login/Signup via Supabase)         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Bottom Tab Navigation               │
├──────────────────────────────────────────┤
│  Home │ Discover │ Basket │ Profile    │
└──────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        Core Screen Modules              │
├──────────────────────────────────────────┤
│ • Detail Views (Product/Course)         │
│ • Checkout & Payment Processing         │
│ • Order History & Invoices              │
│ • Messages & Chat                       │
│ • Housing Management                    │
│ • Posts/Feed                            │
│ • Help & Support                        │
│ • Settings & Profile                    │
└──────────────────────────────────────────┘
```

---

## 4. Core Features

### 4.1 Authentication & User Management
**Status:** In Development (Supabase integration)

#### Features:
- Email/password signup with validation
- Email/password login with error handling
- Session persistence using AsyncStorage
- Fallback dev mode for development testing
- Auto token refresh on app startup
- Password recovery (planned)

#### User Flow:
1. User launches app → Auth check
2. If unauthenticated → Redirect to login/signup
3. On successful auth → Redirect to home tab
4. Session persists across app reopens

---

### 4.2 Home Tab (index.tsx)
**Status:** Planned

#### Purpose:
Central hub displaying personalized content and quick actions.

#### Planned Features:
- Welcome message with user greeting
- Quick stats (courses in progress, credits earned, upcoming events)
- Recent activity feed
- Personalized course recommendations
- Navigation shortcuts to main features

---

### 4.3 Discover Tab (discover.tsx)
**Status:** In Development

#### Purpose:
Browse and search educational content and events.

#### Current Features:
- **Search Bar:** Search courses, events, and educational content
- **Trending Section:** Featured courses displaying:
  - Course title (e.g., "Architecture 101", "Data Science")
  - Pricing (FREE or dollar amount)
  - Course thumbnail image
  - Quick view/add to cart action

#### Event Cards:
- Upcoming campus and networking events
- Event details: Date, location, time
- Color-coded event categories with gradients
- Examples:
  - Campus Career Fair (March 28)
  - Design Hackathon (April 2)
  - Alumni Networking (April 10)

#### Planned Enhancements:
- Advanced filtering (by category, price, difficulty level)
- Sorting options (trending, newest, price)
- Event RSVP functionality
- Course preview/preview videos

---

### 4.4 Basket Tab (basket.tsx)
**Status:** In Development

#### Purpose:
Shopping cart management and checkout preparation.

#### Current Features:
- **Cart Item Display:** Grid layout showing:
  - Product image
  - Product title
  - Unit price
  - Quantity selector (±)
  - More options button (long press)

- **Quantity Management:**
  - Increment/decrement item quantity
  - Minimum quantity: 1
  - Real-time total calculation
  - Persistent storage via AsyncStorage

- **Item Actions (Long Press Menu):**
  - View item details
  - Move to wishlist
  - Remove from basket
  - Cancel action

- **Basket Controls:**
  - Clear entire basket button
  - Trash icon for quick clear (with confirmation)
  - Dynamic total price calculation

- **Cart Persistence:**
  - Saves to AsyncStorage (device local storage)
  - Loads on screen focus
  - Fallback to demo items if empty

#### Planned Features:
- Wishlist integration
- Saved for later section
- Bulk editing mode
- Promo code entry
- Estimated delivery/access date
- Stock/availability indicators

---

### 4.5 Profile Tab (profile.tsx)
**Status:** Planned

#### Purpose:
User account management and personal information.

#### Planned Features:
- User profile picture/avatar
- Personal information (name, email, contact)
- Academic/professional details
- Achievement badges and certificates
- Saved preferences
- Account settings shortcut
- Logout functionality

---

### 4.6 Detail View (detail/[id].tsx)
**Status:** In Development

#### Purpose:
Full product/course information page.

#### Planned Features:
- Large product image/gallery
- Detailed title and description
- Full pricing information
- Instructor/creator information
- Student reviews and ratings
- Course curriculum/outline (if course)
- Add to basket button
- Share functionality
- Wishlist toggle

---

### 4.7 Checkout (checkout.tsx)
**Status:** In Development

#### Purpose:
Complete purchase process.

#### Planned Features:
- Order summary (items, quantities, total)
- Billing information form
- Shipping address selection
- Payment method selection
- Promo/discount code application
- Order review before submission
- Order confirmation screen

---

### 4.8 Order History (order-history.tsx)
**Status:** Planned

#### Purpose:
Track past and ongoing purchases.

#### Planned Features:
- List of all orders with dates
- Order status (pending, completed, cancelled)
- Order total and items count
- Quick reorder button
- Download invoice option
- Track shipment/access status
- Return/refund option

---

### 4.9 Invoices (invoices/)
**Status:** Planned

#### Features:
- **Index:** List all invoices with filters (paid, unpaid, due)
- **[id]:** Detailed invoice view with itemization
- **Create:** Generate invoice for specific order/transaction
- PDF export functionality
- Resubmit/reminder functionality

---

### 4.10 Messages & Chat (messages/)
**Status:** Planned

#### Purpose:
Direct communication between students, instructors, and peers.

#### Planned Features:
- **Messages Index:** List of active conversations
  - Last message preview
  - Timestamp
  - Unread indicator
  - Search conversations

- **[chatId]:** Individual chat thread
  - Message history
  - Real-time message sending/receiving
  - User typing indicator
  - Message read/delivered status
  - File/image attachment option
  - User profile quick view

#### Message Features:
- Text messages
- Image sharing
- Emoji support
- Message timestamps
- Conversation archiving

---

### 4.11 Housing (housing.tsx)
**Status:** Planned

#### Purpose:
Manage student housing opportunities and listings.

#### Planned Features:
- Available housing listings (on-campus, off-campus)
- Housing details (price, capacity, amenities)
- Room/apartment photos
- Location map view
- Application/booking process
- Housing history and current assignment
- Roommate matching
- Management dashboard for admins

---

### 4.12 Posts (post.tsx)
**Status:** Planned

#### Purpose:
Social feed for discussions and announcements.

#### Planned Features:
- Create posts (text, images, links)
- View community posts
- Like/react to posts
- Comment on posts
- Share posts
- Pin important announcements
- Filter by category/channel
- Trending posts section

---

### 4.13 Help & Support (help-support.tsx)
**Status:** Planned

#### Purpose:
Customer support and FAQ resources.

#### Planned Features:
- FAQ section (searchable)
- Contact support form
- Live chat with support team (planned)
- Ticket submission and tracking
- Knowledge base articles
- Video tutorials
- Common issues troubleshooting guide

---

### 4.14 Settings (settings.tsx)
**Status:** Planned

#### Purpose:
App customization and account preferences.

#### Planned Features:
- **Account Settings:**
  - Email/password management
  - Two-factor authentication (planned)
  - Account deletion option

- **Privacy & Security:**
  - Privacy policy agreement
  - Data usage preferences
  - Blocked users list

- **Preferences:**
  - Notification settings
  - Language selection (if multi-language)
  - Theme (light/dark mode)
  - Default currency/region

- **About:**
  - App version
  - Terms of service
  - Privacy policy
  - Contact/support
  - Logout button

---

### 4.15 Feature Sheet Component (FilterSheet.tsx)
**Status:** In Development

#### Purpose:
Reusable modal component for filtering options.

#### Planned Uses:
- Filter Discover content (category, price range, difficulty)
- Sort options
- Advanced search filters
- Multi-select filters

---

## 5. User Flows

### 5.1 First-Time User Flow
```
App Launch
    ↓
Splash Screen
    ↓
Check Authentication Status
    ↓
NOT Authenticated → Login/Signup Screen
    ↓
    ├→ Signup: Email, Password → Verify → Redirect to Home
    └→ Login: Email, Password → Auth Check → Redirect to Home
    ↓
Authenticated → Home Tab (Skip to step below)
    ↓
Home Tab displays personalized content
```

### 5.2 Course Discovery & Purchase Flow
```
User taps Discover Tab
    ↓
Browse Trending Courses/Events
    ↓
Search for specific content
    ↓
Tap Course Card → Detail View
    ↓
Review course details, ratings, curriculum
    ↓
Add to Basket
    ↓
Navigate to Basket Tab
    ↓
Review items in cart
    ↓
Proceed to Checkout
    ↓
Enter billing/shipping info
    ↓
Select payment method
    ↓
Review & Confirm Order
    ↓
Order Confirmation
    ↓
Track in Order History
```

### 5.3 Communication Flow
```
Home/Discover Tab
    ↓
Tap Messages Tab
    ↓
View list of conversations
    ↓
Tap conversation or start new
    ↓
Send/Receive messages
    ↓
View conversation history
    ↓
Attach files/images (planned)
```

---

## 6. Data Models

### 6.1 User Model
```typescript
{
  id: string (UUID)
  email: string
  name: string
  profileImage?: string
  bio?: string
  role: 'student' | 'instructor' | 'admin'
  createdAt: timestamp
  updatedAt: timestamp
  preferences: {
    notifications: boolean
    emailDigest: boolean
    theme: 'light' | 'dark'
  }
}
```

### 6.2 Course/Product Model
```typescript
{
  id: string (UUID)
  title: string
  description: string
  price: number
  currency: string
  image: string (URL)
  instructor: {
    id: string
    name: string
    bio: string
  }
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number (1-5)
  reviews: number
  duration: string (e.g., "4 weeks")
  createdAt: timestamp
}
```

### 6.3 Event Model
```typescript
{
  id: string (UUID)
  title: string
  description: string
  date: timestamp
  time: string
  location: string
  capacity: number
  attendees: number
  image: string (URL)
  category: string
  color: string (for UI)
  createdAt: timestamp
}
```

### 6.4 Order Model
```typescript
{
  id: string (UUID)
  userId: string
  items: [
    {
      productId: string
      title: string
      price: number
      quantity: number
    }
  ]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 6.5 Message Model
```typescript
{
  id: string (UUID)
  conversationId: string
  senderId: string
  senderName: string
  content: string
  attachments?: [string] (URLs)
  timestamp: timestamp
  readAt?: timestamp
}
```

---

## 7. Design System

### 7.1 Color Palette
- **Primary:** Theme color for active states and CTAs
- **Surface:** Background colors
- **OnSurface:** Text and icon colors
- **Error:** For error states and delete actions
- **Outline:** Borders and dividers
- **OutlineVariant:** Secondary borders and disabled states
- **SurfaceContainerLow:** Light container backgrounds

### 7.2 Typography
- **PlusJakartaSans:** Display and heading font
  - 400 Regular
  - 700 Bold
  - 800 ExtraBold
- **Inter:** Body and UI text
  - 400 Regular
  - 500 Medium
  - 600 SemiBold

### 7.3 Components
- **Tab Navigation:** Custom styled bottom tabs with rounded corners and shadow
- **Cards:** Product and event cards with images and text
- **Buttons:** Primary, secondary, and destructive button variants
- **Input Fields:** TextInput with icons
- **Modals:** Full-screen and bottom sheet presentations
- **Icons:** Lucide icons (24px standard size)

---

## 8. Technical Specifications

### 8.1 Build & Deployment
- **Build Tool:** Expo CLI
- **Development Server:** `expo start`
- **Platform Builds:**
  - iOS: `expo start --ios`
  - Android: `expo start --android`
  - Web: `expo start --web`

### 8.2 State Management
- **Local State:** React Hooks (useState, useCallback, useFocusEffect)
- **Persistent Storage:** AsyncStorage (device local storage)
- **Session Persistence:** Supabase Auth with AsyncStorage adapter
- **Navigation State:** Expo Router

### 8.3 API Integration
- **Backend:** Supabase (PostgreSQL database + Auth)
- **Authentication:** Email/password authentication
- **Real-time Features:** Planned Supabase Realtime for messaging and updates
- **Environment Variables:**
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### 8.4 Offline Capabilities
- **Offline First:** Local AsyncStorage for cart and preferences
- **Sync:** Manual refresh/pull-to-refresh patterns
- **Fallback Content:** Demo data for development and testing

### 8.5 Performance Considerations
- **Image Optimization:** Using unsplash URLs with query params (q=80&w=2070)
- **Code Splitting:** Expo Router automatic code splitting
- **Bundle Size:** Monitoring with Expo build command
- **New Architecture:** Enabled in app.json (React Native New Architecture)

---

## 9. Security & Privacy

### 9.1 Authentication
- Supabase Auth with email/password validation
- Session persistence in secure AsyncStorage
- Auto-refresh token on app startup
- Logout functionality to clear session

### 9.2 Data Security
- HTTPS for all API calls (Supabase)
- No sensitive data stored in plain text locally
- Environment variables for API keys
- Row-level security (RLS) policies on Supabase (planned)

### 9.3 Privacy
- Privacy policy in settings
- User data consent on signup
- Data usage transparency
- GDPR compliance (planned)

---

## 10. Analytics & Monitoring

### 10.1 Tracking (Planned)
- User signup/login events
- Course discovery and view tracking
- Add to cart and purchase events
- Feature usage analytics
- Crash reporting and error tracking

### 10.2 Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Conversion rate (cart to checkout)
- Average order value
- Feature adoption rates
- App crash rate

---

## 11. Roadmap

### Phase 1: MVP (Current)
- ✅ Authentication (Supabase integration)
- ✅ Tab navigation setup
- ✅ Basket/Cart management
- ✅ Discover content browsing
- 🔄 Basic UI components
- ⬜ Checkout flow
- ⬜ Order management

### Phase 2: Core Features (Q2-Q3 2026)
- ⬜ Full checkout and payment integration
- ⬜ Order history and tracking
- ⬜ User profiles and preferences
- ⬜ Messaging system
- ⬜ Event RSVP functionality
- ⬜ Invoicing system

### Phase 3: Enhanced Experience (Q3-Q4 2026)
- ⬜ Search and advanced filtering
- ⬜ Wishlist and saved items
- ⬜ Course reviews and ratings
- ⬜ Housing management
- ⬜ Social posts and feed
- ⬜ Real-time notifications

### Phase 4: Platform Expansion (2027)
- ⬜ Admin dashboard
- ⬜ Instructor dashboard
- ⬜ Live chat support
- ⬜ Video streaming for courses
- ⬜ Gamification (badges, certificates)
- ⬜ AI-powered recommendations

---

## 12. Success Metrics

### Business Metrics
- Number of registered users
- Monthly active users
- Conversion rate (visitor → buyer)
- Average order value
- Customer lifetime value
- Retention rate (30-day, 60-day)

### Product Metrics
- Feature adoption rates
- Time spent in app
- Screens per session
- Cart abandonment rate
- Course completion rate
- User satisfaction score (NPS)

### Technical Metrics
- App crash rate
- API response time
- App load time
- Feature success rate (errors)
- Bug resolution time

---

## 13. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| **Backend delay (Supabase)** | Medium | High | Implement mock data; use fallback modes for testing |
| **Payment integration complexity** | Medium | High | Partner with payment provider early; thorough testing |
| **User adoption** | Low-Medium | High | Strong onboarding; referral program; marketing |
| **Scalability issues** | Low | High | Database optimization; caching strategy; monitoring |
| **Security breach** | Low | Critical | Penetration testing; data encryption; compliance audit |
| **Performance degradation** | Medium | Medium | Regular profiling; optimization sprints; CDN usage |

---

## 14. Dependencies & Assumptions

### 14.1 External Dependencies
- **Supabase:** Authentication and database backend
- **React Native & Expo:** Core framework and build tools
- **Third-party APIs:** Payment processor, analytics, push notifications (planned)
- **Image CDN:** Unsplash or similar for product/course images

### 14.2 Assumptions
- Users have reliable internet connectivity
- iOS 13+ and Android 8+ device support
- Users are comfortable with email-based authentication
- Course/event content is provided by admin or instructor partners

---

## 15. Glossary

- **MVP:** Minimum Viable Product
- **RLS:** Row-Level Security
- **AsyncStorage:** React Native local storage solution
- **Supabase:** Open-source Firebase alternative
- **Expo Router:** File-based routing for React Native
- **DAU/MAU:** Daily/Monthly Active Users
- **NPS:** Net Promoter Score
- **GDPR:** General Data Protection Regulation
- **CTA:** Call-to-Action

---

## 16. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | April 19, 2026 | Product Team | Initial PRD creation based on codebase analysis |

---

**Document Owner:** Product Team  
**Last Updated:** April 19, 2026  
**Next Review Date:** July 19, 2026
