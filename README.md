# ABTalks Web — 60-Day Coding Challenge Platform Redesign

A mobile-first, high-performance web platform built for Indian college students participating in a 60-day daily coding sprint. Students build a project every day, submit GitHub & LinkedIn proof of work, maintain their streak, and get discovered by top recruiters.

---

## 📍 Route Map

```text
/
/dashboard
/day/12
```

---

## 🚀 Key Features

### 1. Landing Page (`/`)
- **First Experience & Motivation**: Designed to convert new students into committed builders within seconds.
- **Live Activity Marquee**: Real-time ticker showing live project submissions from students across India.
- **3-Step Workflow**: Clear breakdown of *Build* → *Post* → *Grow*.
- **Live Leaderboard Ticker**: Top student builders with active streak counts and institute badges.

### 2. Student Dashboard (`/dashboard`)
- **Streak & Stats Engine**: Real-time tracking of current streak (`🔥 12 Days`), total completion (`20%`), points (`⭐ 1,450 XP`), and leaderboard rank (`#47`).
- **60-Day Interactive Curriculum Matrix**: Filterable grid covering React UI, REST APIs, WebSockets, Backend Databases, and Full-Stack AI Capstones.
- **Interactive Proof Submission Modal**: Validates GitHub repo link and LinkedIn post proof URL before awarding +100 XP.
- **Recruiter Proof Card**: One-click shareable proof profile for resume/LinkedIn sharing.
- **⚙️ Judge Demo Controls (Edge Case Evaluation)**: Floating top switcher allowing instant testing of all required edge cases:
  - 🆕 **New Student State** (0 Streak, Day 1 Active, 0 Completed, Onboarding Banner)
  - ⚠️ **Missed Day State** (Day 12 Missed, Streak in Danger, Streak Freeze Recovery)
  - 🔥 **Active Student State** (12-Day Streak, Day 13 Active)

### 3. Challenge Day Screen (`/day/12`)
- **Task Specification**: Complete problem statement, difficulty badge, acceptance criteria checklist, and tags.
- **Proof Submission Form**: Dedicated inputs for GitHub repository/commit link, LinkedIn post proof link, live demo URL, and key learnings notes.

---

## 💡 Thoughtful UX Innovations
1. **Streak Shield & Freeze System**: Protects student motivation from burn-out after an accidental missed day.
2. **Recruiter Proof Profile**: Generates a verified proof card students can link directly on their resumes.
3. **Mobile-First Design System (390px)**: Optimized specifically for late-night mobile usage after college classes.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript 5.7
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism design tokens
- **Font System**: Plus Jakarta Sans & JetBrains Mono (via Google Fonts)

---

## 💻 Development & Build Setup

### Prerequisites
- Node.js >= 18

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```

### Build Production Bundle
```bash
npm run build
```
