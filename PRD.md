
# Product Requirements Document (PRD) - TweetFlow Pro

## 1. Product Overview
TweetFlow Pro is an all-in-one Twitter growth and automation dashboard. It helps creators, social media managers, and brands consistently publish high-quality threads, manage evergreen content, and analyze performance.

## 2. Target Audience
- **Solo Creators**: Building a personal brand.
- **Agencies**: Managing multiple accounts (though MVP focuses on single user).
- **SaaS Founders**: "Building in public".

## 3. Core Features

### 3.1. Dashboard
- **Goal**: Provide a high-level snapshot of account health.
- **Key Metrics**: Follower Growth, Impressions, Engagement Rate, Profile Visits.
- **Visuals**: Area charts for growth, Pie charts for content mix.
- **Activity Feed**: Recent actions (posts published, milestones).

### 3.2. Creator Studio
- **Goal**: A dedicated space for ideation and quick drafting.
- **Fast Draft**: A text area that acts as a "scratchpad". Supports Slash Commands (`/writer`, `/imagine`, `/analyze`).
- **AI Tools**:
    - **AI Writer**: Generates tweets based on prompt/tone.
    - **AI Image Gen**: Generates visuals for tweets.
    - **Insights**: Real-time analysis of draft potential.
- **Brainstorms**: List of saved ideas/drafts.

### 3.3. Queue Management
- **Goal**: Visualize and organize upcoming content.
- **Views**: List View (Queue) and Calendar View.
- **Features**:
    - Drag-and-drop reordering.
    - Status indicators (Peak time, Evergreen).
    - Quick edit/delete actions.
    - "Smart Schedule" toggle to auto-optimize times.

### 3.4. Thread Composer
- **Goal**: A focused editor for long-form content (Threads).
- **Features**:
    - Multi-tweet editor.
    - Preview sidebar (WYSIWYG).
    - Image/GIF attachments.
    - Scheduling capability.
    - Template injection.

### 3.5. Evergreen Library
- **Goal**: Recycle timeless content to keep the timeline active.
- **Structure**:
    - **Slots**: Define *when* an evergreen post goes out (e.g., "Mon/Wed at 9 AM").
    - **Collections**: Groups of posts (e.g., "Tech Tips") assigned to Slots.
- **Logic**: Once a post in a slot is published, it moves to the back of the queue for that slot.

### 3.6. Templates
- **Goal**: Overcome writer's block.
- **Features**:
    - Categorized library (Educational, Marketing, Storytelling).
    - "Use Template" action pre-fills the Composer.
    - Visual indicators of tweet structure (hooks, body, CTA).

### 3.7. Settings & Profile
- **Goal**: Configuration.
- **Features**:
    - Account integrations (Twitter/X, LinkedIn).
    - Automation rules (Auto-retweet, Quiet hours).
    - Team management (Mock UI).

## 4. Technical Requirements

### 4.1. Frontend
- **Framework**: React (Vite/Next.js ecosystem).
- **Styling**: Tailwind CSS for rapid UI development.
- **State**: React `useState` / `useRef` for local interaction.

### 4.2. Database (Supabase)
- **Profiles**: User data and plan tiers.
- **Posts**: The core content unit. Handles status (`draft`, `scheduled`, `queue`).
- **Evergreen Collections**: Schema for recycling logic.
- **Templates**: Storage for system and user-defined templates.

## 5. User Flows
1.  **Ideation**: User enters `Studio`, types `/writer` to generate a hook.
2.  **Creation**: User sends idea to `Composer`, expands it into a thread.
3.  **Scheduling**: User picks a date/time or adds to `Queue`.
4.  **Recycling**: User adds a successful thread to an `Evergreen Slot` for future reposting.
5.  **Analysis**: User checks `Dashboard` to see performance impact.

## 6. Future Considerations
- **Multi-Account Support**: Switch between personal and brand profiles.
- **Deep Analytics**: Click-through tracking for links.
- **Engagement**: Reply to comments directly from the app.
