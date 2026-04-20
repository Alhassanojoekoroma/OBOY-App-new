# Oboy App - Product Requirements Document (Updated)

**Document Version:** 1.1  
**Date:** April 19, 2026  
**Platform:** iOS, Android, Web (React Native with Expo)

***

## 1. Executive Summary

**Oboy** is a mobile-first educational marketplace platform designed to connect learners, educators, and student sellers in a unified ecosystem. The app enables users to discover courses, events, and housing, manage purchases, communicate, and access educational resources, while also allowing any student to create and market their own products and services on campus.

A new **Student Marketplace & AI Branding** layer allows students to snap a photo of a product, have AI clean and brand the image, generate multi-language marketing content, and list the item for discovery and chat-based purchase coordination within the app. Image refinement can be powered by background-removal and transformation APIs such as Cloudinary AI background removal, and branding assets can be generated via modern image-generation APIs like OpenAI’s gpt-image models.[1][2][3][4][5]

***

## 2. Product Overview

### 2.1 Vision

Empower students and professionals to access quality educational content and opportunities through an intuitive, feature-rich mobile application that also supports student entrepreneurship via an integrated marketplace and AI-powered marketing tools.

### 2.2 Core Value Propositions

- **Unified Learning Marketplace:** Browse and purchase courses, certifications, and events.
- **Event Management:** Discover and register for campus events, networking opportunities, and workshops.
- **Seamless Commerce:** One-click checkout and order tracking for digital and institution-backed purchases.
- **Direct Communication:** In-app messaging for student-to-instructor, peer-to-peer, and buyer–seller interactions.
- **Administrative Features:** Manage invoices, housing, and personal information centrally.
- **Student Marketplace:** Any verified student can list campus-appropriate products and services, manage listings, and coordinate handover with buyers.
- **AI Branding & Marketing:** AI-assisted image cleanup, branding, and caption generation in multiple languages to help student sellers present products professionally.

### 2.3 Target Users

- **Primary:** University students and recent graduates (18–35 years old) consuming learning content and services.
- **Secondary:** Working professionals seeking upskilling opportunities.
- **Tertiary:** Educators and instructors offering courses/workshops.
- **New Persona:** Student sellers and small campus entrepreneurs listing products and services, with potential expansion to local businesses in Sierra Leone in future phases.

***

## 3. Product Architecture

### 3.1 Technology Stack

- **Frontend Framework:** React Native 0.81.5 with Expo 54.0.33.
- **Navigation:** Expo Router 6.0.23 (file-based routing).
- **Backend as a Service:** Supabase (authentication, database, Realtime for messaging).
- **State Management:** React Hooks + AsyncStorage (local persistence).
- **UI Components:** Lucide React Native (icon library).
- **Styling:** React Native StyleSheet, Expo Linear Gradient.
- **Language:** TypeScript 5.9.2.
- **Platform Support:** iOS (with tablet support), Android (edge-to-edge), Web.

### 3.2 App Structure

```text
┌─────────────────────────────────────────┐
│         Authentication Layer           │
│    (Login/Signup via Supabase)        │
└──────────────┬────────────────────────┘
               │
┌──────────────▼────────────────────────┐
│      Bottom Tab Navigation            │
├───────────────────────────────────────┤
│ Home │ Discover │ Basket │ Profile   │
└───────────────────────────────────────┘
               │
┌──────────────▼────────────────────────┐
│        Core Screen Modules            │
├───────────────────────────────────────┤
│ • Detail Views (Product/Course)       │
│ • Checkout & Payment Processing       │
│ • Order History & Invoices            │
│ • Messages & Chat                     │
│ • Housing Management                  │
│ • Posts/Feed                          │
│ • Student Marketplace & Seller Hub    │
│ • AI Branding & Marketing Assistant   │
│ • Help & Support                      │
│ • Settings & Profile                  │
└────────────────────────────────────────┘
```

***

## 4. Core Features

### 4.1 Authentication & User Management

**Status:** In Development (Supabase integration)

Features, flows, and constraints remain as in v1.0 (email/password signup, login, session persistence via AsyncStorage, etc.).

***

### 4.2 Home Tab (index.tsx)

**Status:** Planned

**Purpose:** Central hub displaying personalized content, quick actions, and entry points into the Student Marketplace.

**Planned Additions:**

- "Student Market" section featuring a horizontal list of student products/services.
- CTA card: "Start Selling" for eligible student users, leading to the Seller Hub.

***

### 4.3 Discover Tab (discover.tsx)

**Status:** In Development

**Purpose:** Browse and search educational content, events, and student marketplace listings.

**Current Features:**

- Search bar for courses, events, and educational content.
- Trending section with featured courses (title, pricing, thumbnail, quick add).
- Event cards for upcoming campus and networking events, with date, location, time, and color-coded categories.

**Planned Enhancements:**

- Advanced filtering (by category, price, difficulty level).
- Sorting options (trending, newest, price).
- Event RSVP.
- Course preview videos.
- **Student Marketplace Filters:** Toggle to show university products, student products, or both; filter by student categories (e.g., food, fashion, services).

***

### 4.4 Basket Tab (basket.tsx)

**Status:** In Development

Basket remains focused on institution-backed and digital purchases (courses, events, housing fees, etc.). Student marketplace transactions initially occur outside the basket via chat and offline payment, to keep v1 scope simple.

Existing features (cart item display, quantity management, item actions, basket controls, persistence) apply to standard orders.

Planned additions:

- Labeling of items by source type ("Course", "Event", "University Product") to differentiate from student marketplace, which uses a separate flow.

***

### 4.5 Profile Tab (profile.tsx)

**Status:** Planned

**Purpose:** User account management, personal information, and seller activation.

**Planned Features:**

- Profile picture/avatar.
- Personal and academic/professional info.
- Achievement badges and certificates.
- Saved preferences.
- Account settings.
- Logout.
- **Seller Section:**
  - Seller status (not a seller / active seller).
  - Entry point to Seller Hub (see 4.16).

***

### 4.6 Detail View (detail/[id].tsx)

**Status:** In Development

**Purpose:** Full product/course information page.

**Planned Enhancements:**

- For courses: curriculum, instructor info, reviews, add to basket.
- For student marketplace items: seller info (student), AI-branded hero image, badges ("Student Seller"), and **"Chat with Seller"** CTA instead of direct checkout (for now).

***

### 4.7 Checkout (checkout.tsx)

**Status:** In Development

Covers institution-backed purchases, not student marketplace (offline payment for now).

***

### 4.8 Order History (order-history.tsx)

**Status:** Planned

Tracks standard orders from the basket and checkout flow.

Potential future extension: "Marketplace Activity" section summarizing handovers once online payments are introduced for student marketplace.

***

### 4.9 Invoices (invoices/)

**Status:** Planned

Unchanged: invoices for standard orders.

***

### 4.10 Messages & Chat (messages/)

**Status:** Planned

**Purpose:** Direct communication between students, instructors, peers, and buyer–seller interactions.

**Planned Features:**

- Messages index with conversation list.
- Individual chat threads with message history, typing indicators, read status.
- File/image attachment.
- Conversation search and archiving.

**Marketplace Integration:**

- Conversations can be initiated from:
  - Student marketplace listing ("Chat with Seller").
  - Profile or previous orders (future enhancement).
- Conversation metadata includes productId and sellerId for context.

Supabase Realtime can be used to support real-time messaging in React Native.[6]

***

### 4.11 Housing (housing.tsx)

**Status:** Planned

As described in v1.0, with no direct change from marketplace features.

***

### 4.12 Posts (post.tsx)

**Status:** Planned

Potential future integration: highlight selected marketplace items in a "Spotlight" post type.

***

### 4.13 Help & Support (help-support.tsx)

**Status:** Planned

Include support topics about student marketplace policies, acceptable products, and safety guidelines.

***

### 4.14 Settings (settings.tsx)

**Status:** Planned

Extend preferences with:

- Marketplace notifications (new messages, interest in listings).
- Language selection used by AI caption generation.

***

### 4.15 Filter Sheet Component (FilterSheet.tsx)

**Status:** In Development

Extend usage to include filters for student marketplace listings:

- Listing type: Courses, Events, Student Products, Services.
- Price range, distance (if geo added later), popularity.

***

### 4.16 Student Marketplace & Seller Hub (New)

**Status:** Planned (Phase 2–3)

**Purpose:** Provide a dedicated area for students to list, manage, and promote their products/services.

#### 4.16.1 Seller Activation Flow

1. Student navigates to Profile and taps "Start Selling".
2. App confirms eligibility (logged-in student, accepted terms and marketplace policy).
3. Seller profile is created with basic info (name, faculty, short seller bio).
4. Student gets access to the **Seller Hub**.

#### 4.16.2 Seller Hub Screen

- Stats: Active listings, inquiries, successful handovers.
- Actions: "Add new listing", "View listings", "View chats".
- Quick tips: Short cards explaining best practices for product photos and descriptions.

#### 4.16.3 Listing Creation Flow

1. Tap "Add new listing".
2. Capture or upload product photo.
3. Enter basic details: title, category, base price, quantity, campus location.
4. AI Branding Assistant suggests refined images, titles, and descriptions (see 4.17).
5. Student reviews content, edits as needed, and publishes listing.

#### 4.16.4 Buyer Flow for Student Listings

1. Buyer discovers listing on Home or Discover ("Student Market" section).
2. Taps into Detail view.
3. Sees AI-branded image, description, and seller info.
4. Taps "Chat with Seller" to coordinate pickup and payment (offline handover).

Initially, payments are handled directly between students at handover to keep the system simple and avoid early marketplace payment complexity.

***

### 4.17 AI Branding & Marketing Assistant (New)

**Status:** Planned (Phase 3–4)

**Purpose:** Help student sellers produce professional-looking listings with minimal effort, even when original photos are low-quality.

#### 4.17.1 Image Cleanup & Background Removal

- On upload, images are sent to an image-processing service for background removal and enhancement (e.g., Cloudinary AI Background Removal).[3][7][1]
- The processed image uses a clean or branded background consistent with Oboy’s design system.
- Cropping to a standard 1:1 aspect ratio for listing cards improves visual consistency.

#### 4.17.2 Branded Hero Images & Avatars

- Use an image-generation API (e.g., OpenAI’s gpt-image-1.x) to create optional branded hero images showing the product in a more polished setting or with a generic avatar showcasing the item.[2][4][8][5]
- Prompt engineering ensures outputs are campus‑appropriate, on-brand, and avoid realistic depictions of real individuals without consent.

#### 4.17.3 Caption & Description Generation

- AI generates:
  - Short title variations.
  - Product descriptions tuned to Oboy’s tone and character limits.
  - Marketing captions for use inside the app and (future) social channels.
- Multi-language support: at least local language + English for each caption.

#### 4.17.4 Seller Brand Profiles

- Store seller preferences (tone: fun, professional, simple; languages).
- Subsequent AI generations reuse these preferences for consistent branding.

Implementation uses an external LLM API (e.g., OpenAI, Gemini) via a backend service, following best practices for AI app architecture in React Native (clear API layer, prompt versioning, and robust error handling).[9][6]

***

### 4.18 Future Social Auto-Posting (Deferred)

**Status:** Out of Scope for v1.1, planned for later.

**Purpose:** Allow sellers to optionally share AI-generated content to external social platforms (Instagram Business/Creator accounts, Facebook Pages, TikTok) after internal flows are stable.

High-level requirements:

- Optional account linking via OAuth for each platform.
- Respect publishing limits and content rules on each platform.
- Simple overview of published posts and schedule.

This will only be implemented after marketplace and AI branding are validated inside Oboy.

***

## 5. User Flows (Updated)

Existing flows (first-time user, course discovery & purchase, communication) remain valid, with additions for marketplace and AI.

### 5.1 First-Time User Flow

Unchanged from v1.0.

### 5.2 Student Marketplace Seller Activation Flow

```text
Profile Tab
  ↓
Tap "Start Selling"
  ↓
Accept marketplace terms & policies
  ↓
Create seller profile (bio, faculty, languages)
  ↓
Access Seller Hub
```

### 5.3 Listing Creation with AI Branding

```text
Seller Hub
  ↓
Tap "Add new listing"
  ↓
Capture/Upload product image
  ↓
AI background removal & enhancement
  ↓
AI generates titles, descriptions, captions (multi-language)
  ↓
Seller edits & confirms
  ↓
Listing published in Student Market
```

### 5.4 Buyer–Seller Communication Flow

```text
Discover/Home (Student Market)
  ↓
Open listing detail
  ↓
Tap "Chat with Seller"
  ↓
Messages thread opens with product context
  ↓
Negotiate details, time, and place for handover
  ↓
Meet on campus and complete offline payment
```

***

## 6. Data Models (Extended)

### 6.1 User Model (Extended)

```typescript
{
  id: string; // UUID
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  role: 'student' | 'instructor' | 'admin';
  isSeller?: boolean; // new: indicates active student seller
  faculty?: string; // new: academic information for seller profile
  languages?: string[]; // new: preferred languages for AI captions
  createdAt: timestamp;
  updatedAt: timestamp;
  preferences: {
    notifications: boolean;
    emailDigest: boolean;
    theme: 'light' | 'dark';
  };
}
```

### 6.2 Course/Product Model (Extended)

```typescript
{
  id: string; // UUID
  type: 'course' | 'event_product' | 'student_product' | 'service'; // new
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string; // primary image URL (could be AI-enhanced)
  aiImages?: string[]; // new: additional AI-generated or enhanced images
  instructor?: {
    id: string;
    name: string;
    bio: string;
  };
  sellerId?: string; // new: for student_product/service
  sellerType?: 'university' | 'student'; // new
  category: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // mainly for courses
  rating?: number; // 1–5
  reviews?: number;
  duration?: string; // e.g., "4 weeks" for courses
  createdAt: timestamp;
}
```

### 6.3 Event Model

Unchanged from v1.0.

### 6.4 Order Model

As in v1.0, covers institution-backed purchases only; student marketplace handovers are initially not represented as Orders.

### 6.5 Message Model (Extended)

```typescript
{
  id: string; // UUID
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  attachments?: string[]; // URLs
  productId?: string; // new: for marketplace conversations
  timestamp: timestamp;
  readAt?: timestamp;
}
```

### 6.6 Conversation Model (New)

```typescript
{
  id: string; // UUID
  participantIds: string[]; // usually [buyerId, sellerId]
  productId?: string; // associated listing
  lastMessageAt: timestamp;
  createdAt: timestamp;
}
```

***

## 7. Design System

The existing design system (colors, typography, components) remains the base; marketplace and AI features reuse these tokens and patterns.

- Student marketplace cards use the same card style as course/event cards, with a "Student" badge and consistent 1:1 imagery.
- Seller Hub and AI-related screens use existing Button, Card, and Input components for consistency.

***

## 8. Technical Specifications (Extended)

### 8.1 Build & Deployment

Unchanged from v1.0.

### 8.2 State Management

- Local state: React Hooks.
- Persistent storage: AsyncStorage for cart, some preferences, and optional caching of recent AI results.

### 8.3 API Integration (Extended)

- **Backend:** Supabase (PostgreSQL + Auth + Realtime) for users, listings, messages, and analytics events.[6]
- **AI & Media Services:**
  - Cloudinary (or equivalent) for image upload, transformation, and background removal.[7][1][3]
  - OpenAI Image API (gpt-image family) or similar for branded hero images and avatars.[10][4][8][5][2]
  - LLM API for captions and descriptions (multi-language).

### 8.4 Offline Capabilities

Unchanged, with the understanding that marketplace listing creation requires connectivity to process images and call AI APIs.

### 8.5 Performance Considerations

- Optimize marketplace lists using FlatList/SectionList with proper `keyExtractor` and `getItemLayout` where appropriate.[11][12]
- Cache AI-processed images on CDN and in the app to avoid repeated transformations.

***

## 9. Security & Privacy

Same core policies as v1.0, plus:

- Marketplace-specific content policies and moderation guidelines.
- Logging and audit trails for AI generations affecting public-facing content.
- Clear disclosure that AI is used for image and caption generation.

***

## 10. Analytics & Monitoring (Extended)

### 10.1 Marketplace & AI Metrics

- Number of active student sellers.
- Number of active student listings.
- Views per listing and chats initiated per listing.
- Ratio of listings using AI-enhanced visuals/captions.
- AI generation success/failure rates and average latency.

These complement the existing DAU/MAU, conversion, and product metrics.

***

## 11. Roadmap (Updated)

### Phase 1: MVP (Current)

- Authentication (Supabase integration).
- Tab navigation setup.
- Basket/Cart management.
- Discover content browsing.
- Basic UI components.
- Checkout flow (for institution-backed purchases).
- Order management.

### Phase 2: Core Experience (Q2–Q3 2026)

- Full checkout and payment integration.
- Order history and tracking.
- User profiles and preferences.
- Messaging system (base implementation with Supabase Realtime).
- Event RSVP functionality.
- Invoicing system.

### Phase 3: Student Marketplace MVP (Q3–Q4 2026)

- Seller activation flow and Seller Hub.
- Student marketplace listing model and Student Market section on Home/Discover.
- Listing creation flow with basic image upload and manual descriptions.
- Buyer–seller chat, with product context.
- Marketplace policies and reporting tools.

### Phase 4: Enhanced Experience & AI Branding (2027)

- Advanced search and filters across marketplace and learning content.
- Wishlist and saved items.
- Course reviews and ratings.
- Housing management.
- Social posts/feed integration.
- Real-time notifications.
- AI Branding & Marketing Assistant:
  - Background removal and image enhancement.
  - AI caption and description generation (multi-language).
  - Seller brand profiles.

### Phase 5: Platform Expansion & Social Auto-Posting (2027+)

- Admin dashboard and instructor dashboard.
- Live chat support.
- Video streaming for courses.
- Gamification (badges, certificates).
- AI-powered recommendations.
- Pilot external social auto-posting for sellers (Instagram Business/Creator, Facebook Pages, TikTok) after internal AI features are stable.

***

## 12. Success Metrics (Extended)

Add marketplace and AI metrics alongside existing business, product, and technical metrics:

- Active student sellers per month.
- Student marketplace GMV (when online payments are introduced).
- Percentage of listings using AI-enhanced visuals or captions.
- Chat-to-handover ratio for student listings.
- Seller retention (sellers who list again after first sale).

***

## 13. Risks & Mitigation (Extended)

Add marketplace- and AI-related risks:

- **Content Moderation & Safety:** Risk of inappropriate or prohibited listings.
  - Mitigation: Clear policies, reporting tools, and a lightweight review process for flagged content.
- **AI Misuse or Low-Quality Outputs:** Risk of off-brand or misleading images/captions.
  - Mitigation: Conservative prompts, guardrails in backend, and manual override/editing by sellers.
- **Marketplace Liability:** Risk around student-to-student transactions.
  - Mitigation: Clear terms clarifying Oboy’s role as a platform, not the seller of student items.

***

## 14. Dependencies & Assumptions (Extended)

- Supabase remains the primary backend.
- Image/CDN provider supports background removal and transformation at acceptable cost and performance.[13][3]
- AI providers remain compliant with local regulations and platform policies.
- Universities allow student marketplace activity within defined categories.

***

## 15. Glossary

Extend glossary with:

- **Student Marketplace:** Area where students list and promote campus-appropriate products and services.
- **AI Branding:** Use of AI to enhance images and generate marketing copy for listings.

Other existing terms remain unchanged.

***

## 16. Document History

| Version | Date           | Author       | Changes                                      |
|---------|----------------|--------------|----------------------------------------------|
| 1.0     | April 19, 2026 | Product Team | Initial PRD creation based on codebase       |
| 1.1     | April 19, 2026 | Product Team | Added Student Marketplace and AI Branding    |