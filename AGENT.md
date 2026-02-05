
# Agent Guidelines for TweetFlow Pro

This document outlines the coding standards, project structure, and operational guidelines for AI agents working on the TweetFlow Pro codebase.

## Project Overview
TweetFlow Pro is a SaaS application built for content creators to automate, schedule, and analyze their social media presence, primarily focused on Twitter (X).

## Tech Stack
- **Frontend Framework**: React 18+ (via Vite/Next.js structure)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Utility-first)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend/Database**: Supabase (PostgreSQL + Auth)

## Code Style & Conventions

### 1. Component Structure
- Use **Functional Components** with hooks.
- **PascalCase** for component filenames (e.g., `Dashboard.tsx`).
- Keep components modular. If a component exceeds 300 lines, consider breaking it down into sub-components.
- Props should be typed using `interface`.

### 2. Styling
- Use **Tailwind CSS** classes directly in `className`.
- Avoid extracting simple Tailwind strings to variables unless reused significantly.
- Use the `slate` color palette for neutrals and `primary` (defined in tailwind config) for actions.
- Ensure **Dark Mode** compatibility using `dark:` modifiers where appropriate.

### 3. State Management
- Use `useState` for local component state.
- Use props to pass data down.
- Avoid complex global state libraries (Redux) unless absolutely necessary. For this scale, Context API or simple prop drilling is sufficient.

### 4. Icons
- Use `lucide-react` for all UI icons.
- Consistent sizing: typically `size={18}` or `size={20}` for standard UI elements.

### 5. Data Fetching (Future Implementation)
- When integrating Supabase, use the `supabase-js` client.
- Wrap async calls in `useEffect` or use a data fetching library like `swr` or `react-query` if the app scales.

## File Structure
- `/components`: Reusable UI components and View components (Dashboard, Queue, etc.).
- `/supabase`: Database migrations and configuration.
- `App.tsx`: Main router/layout manager.
- `types.ts`: Shared TypeScript interfaces.

## specific Feature Guidelines

### Dashboard
- Must be responsive.
- Charts should use `ResponsiveContainer` from Recharts.

### Queue / Calendar
- Maintain visual consistency between list view and grid view.
- Drag-and-drop logic is currently implemented in `Queue.tsx` using native HTML5 Drag and Drop API.

### Studio / Composer
- The "Fast Draft" and "Composer" are distinct.
- Fast Draft is for quick ideas; Composer is for full thread creation.
- AI features use mock logic currently but should be structured to easily swap in real API calls (OpenAI/Anthropic).

## Development Workflow
1.  Read `PRD.md` to understand the feature requirements.
2.  Check existing `components` to reuse patterns.
3.  Implement changes.
4.  Ensure no TypeScript errors.
