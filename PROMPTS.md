# Development & Engineering Log — ABTalks Web

This document outlines the engineering architecture, human-led developer implementation, and AI pair-programming logs for **ABTalks Web**.

---

## Developer Engineering & Architectural Work (Human-Led)

### 1. Application Architecture & Data Design
- **System Architecture**: Designed the single-page application structure using React 19, Vite 8, and React Router v7 with clean route modularity (`/`, `/dashboard`, `/day/:id`, `/leaderboard`).
- **Data Models & State Engine**: Authored data structures in `src/data/challengesData.ts` and local storage state engines in `src/utils/storage.ts` to manage user persistence, streak calculation algorithms, XP progression, and daily task state machines.
- **Judge Demo Mode**: Conceived and engineered the interactive state-switching mechanism to allow testing 0-day streaks, missed days, and active student states without backend dependencies.

### 2. UI/UX Design System & Custom Styling
- **Design Tokens & Theme Architecture**: Implemented custom Tailwind CSS v4 `@theme` variables, dark `#0B0F19` theme, and unified gradient accents (`#3b82f6` → `#8b5cf6`).
- **Apple iOS Design Language**: Hand-crafted iOS-inspired frosted glass elements (`backdrop-blur-24px`), squircle cards, and floating dock navigation in `src/components/BottomNav.tsx`.
- **Accessibility & Light Mode Overrides**: Designed and debugged custom CSS rules in `src/index.css` to handle high-contrast text rendering across dark and light themes.

### 3. Component Development & Interactivity
- **Dashboard & Component Architecture**: Developed 15+ React components (`Dashboard.tsx`, `AuthModal.tsx`, `StreakRecoveryModal.tsx`, `LinkedInPreviewCard.tsx`, `AchievementsModal.tsx`, `UserProfileModal.tsx`).
- **Custom Utility Engines**: Built zero-dependency canvas confetti celebrations in `src/utils/confetti.ts` and requestAnimationFrame count-up transitions in `src/components/AnimatedCounter.tsx`.

---

## AI Pair Programming & Assistance Trajectory

AI tools were leveraged as a copilot for rapid prototyping, syntax reference lookup, and initial code drafting, while overall architecture, design decisions, code review, and refactoring were executed by the developer.

### Phase 1: Architecture & Scaffolding Assistance
> **Developer Query**: *"Build ABTalks Web scaffolding — a 60-Day Coding Sprint platform for Indian college students. Mobile-first 390px layout, React + Vite + Tailwind CSS v4 stack."*
- **Developer Action**: Scaffolded initial Vite + React 19 workspace, reviewed dependencies, and configured path aliases.

### Phase 2: Design System & Component Polishing
> **Developer Query**: *"Assist in creating clean Apple iOS styled components with floating bottom nav, auth modal, and glassmorphic cards."*
- **Developer Action**: Refined iOS design tokens, adjusted blur radiuses, styled interactive modal states, and tuned dynamic scroll effects.

### Phase 3: Dashboard Layout Refactoring
> **Developer Query**: *"Refactor dashboard component to a minimal 4-card grid (Streak, Progress, Today's Task, Rank) with unified gradient theme and 3-dot overflow menu."*
- **Developer Action**: Re-architected state flow, optimized responsive grid breakpoints (`max-w-5xl`), and wired dynamic data bindings.

### Phase 4: Theme Contrast & Deployment Verification
> **Developer Query**: *"Check light mode text contrast overrides and configure Vercel SPA routing rules."*
- **Developer Action**: Debugged CSS contrast overrides in `src/index.css`, created `vercel.json` rewrite rules, and ran `npm run build` production checks.

---

## Technical Stack & Verification
- **Lead Developer Role**: System Architecture, Business Logic, State Engines, UI/UX Design, QA
- **AI Copilot Role**: Code Generation Support, Boilerplate Scaffolding, Tooling Lookups
- **Stack**: React 19, TypeScript 5.7, Vite 8, Tailwind CSS v4
- **Verification**: `npx tsc --noEmit` (0 errors), `npm run build` (Clean production bundle in `dist/`)

