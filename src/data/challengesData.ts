export interface ChallengeDay {
  day: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  status: 'completed' | 'active' | 'missed' | 'locked';
  completedAt?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
}

export interface UserStats {
  name: string;
  username: string;
  college: string;
  studyGroup?: string;
  dateJoined?: string;
  streak: number;
  longestStreak: number;
  completedDays: number;
  totalDays: number;
  missedDays: number;
  xp: number;
  rank: number;
  totalStudents: number;
  streakFreezes: number;
  githubConnected?: boolean;
  linkedinConnected?: boolean;
}

export const initialUserStats: UserStats = {
  name: "Sumanth",
  username: "sumanth_dev",
  college: "Parul University",
  studyGroup: "AI & Machine Learning (AIML)",
  dateJoined: "Aug 1, 2026",
  streak: 12,
  longestStreak: 12,
  completedDays: 12,
  totalDays: 60,
  missedDays: 1,
  xp: 1450,
  rank: 47,
  totalStudents: 2400,
  streakFreezes: 1,
  githubConnected: true,
  linkedinConnected: true
};

export const sampleChallenges: ChallengeDay[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  let category = 'Frontend';
  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  let title = '';
  let description = '';
  let tags: string[] = [];

  if (day <= 15) {
    category = 'React & UI';
    difficulty = day <= 5 ? 'Easy' : 'Medium';
    const titles = [
      'Interactive Counter with LocalStorage',
      'Dynamic Accordion Component',
      'Multi-step Onboarding Form',
      'Dark/Light Mode Theme Switcher',
      'Responsive Navbar with Mobile Drawer',
      'Custom React Debounce Hook',
      'Kanban Board Drag & Drop',
      'Data Table with Search & Sort',
      'Infinite Scroll Component',
      'Toast Notification System',
      'Modal & Drawer System',
      'Tabbed Navigation Component',
      'Async Search Autocomplete',
      'Form Validation with Zod & React Hook Form',
      'Custom Audio Player UI'
    ];
    title = titles[(day - 1) % titles.length];
    description = `Build a performant ${title.toLowerCase()} using React 19 and Tailwind CSS. Focus on accessible keyboard interaction and smooth micro-animations.`;
    tags = ['React', 'TailwindCSS', 'TypeScript', 'UI/UX'];
  } else if (day <= 30) {
    category = 'APIs & Async Data';
    difficulty = day <= 22 ? 'Medium' : 'Hard';
    const titles = [
      'Weather App with OpenWeather API',
      'GitHub User Search & Analytics',
      'Crypto Live Price Tracker (WebSocket)',
      'Movie Discovery App with TMDB API',
      'Markdown Live Preview Editor',
      'Recipe Finder with Filtering',
      'Pexels Stock Image Search Gallery',
      'Currency Converter with Live Rates',
      'Spotify Playlist Visualizer',
      'AI Text Summarizer (OpenAI API)',
      'Habit Tracker with Chart.js',
      'URL Shortener Dashboard',
      'Custom Axios Interceptor Setup',
      'Infinite Paginated Products Feed',
      'E-commerce Shopping Cart System'
    ];
    title = titles[(day - 16) % titles.length];
    description = `Integrate live APIs, handle loading/error states gracefully, and implement caching or skeleton loaders for optimal performance.`;
    tags = ['REST API', 'Async/Await', 'Axios', 'State Management'];
  } else if (day <= 45) {
    category = 'Backend & DB';
    difficulty = day <= 38 ? 'Medium' : 'Hard';
    const titles = [
      'REST API with Express & TypeScript',
      'JWT Authentication System',
      'User Profile CRUD with PostgreSQL',
      'File Upload Pipeline to Cloud Storage',
      'Rate Limiter Middleware',
      'Redis Caching Layer for API',
      'Role-based Access Control (RBAC)',
      'Websocket Chat Server',
      'Email Notification Queue with BullMQ',
      'Stripe Payment Gateway Checkout',
      'Prisma ORM Migrations & Queries',
      'GraphQL Schema & Resolvers',
      'Dockerized Node.js Microservice',
      'API Analytics & Request Logger',
      'Serverless Function Deployments'
    ];
    title = titles[(day - 31) % titles.length];
    description = `Design clean backend endpoints, set up secure auth, write efficient database queries, and structure modular backend code.`;
    tags = ['Node.js', 'Express', 'PostgreSQL', 'Auth'];
  } else {
    category = 'Full-Stack Apps';
    difficulty = 'Hard';
    const titles = [
      'Realtime Collaborative Whiteboard',
      'AI-Powered Code Review Bot',
      'SaaS Subscription & Billing Hub',
      'Multi-tenant Task Manager App',
      'Live Code Playground Engine',
      'Fullstack Blog Engine with MDX',
      'Realtime Stock Market Dashboard',
      'AI Image Generator (Replicate API)',
      'Peer-to-Peer Video Call App (WebRTC)',
      'Discourse-style Community Forum',
      'Micro-SaaS Analytics Platform',
      'Automated E2E Testing Suite',
      'Fullstack Portfolio Engine',
      'System Architecture Design Spec',
      'Final Capstone Project Showcase'
    ];
    title = titles[(day - 46) % titles.length];
    description = `Combine fullstack architecture, scalable DB design, sleek UI/UX, and deploy a production-ready application.`;
    tags = ['Fullstack', 'Next.js', 'WebSockets', 'AI'];
  }

  let status: 'completed' | 'active' | 'missed' | 'locked' = 'locked';
  let completedAt: string | undefined = undefined;
  let githubUrl: string | undefined = undefined;
  let linkedinUrl: string | undefined = undefined;

  if (day <= 11) {
    status = 'completed';
    completedAt = `Aug ${day}, 2026`;
    githubUrl = `https://github.com/sumanth_dev/abtalks-day-${day}`;
    linkedinUrl = `https://linkedin.com/posts/sumanth_abtalks_day${day}`;
  } else if (day === 12) {
    status = 'missed';
  } else if (day === 13) {
    status = 'active';
  }

  return {
    day,
    title,
    category,
    difficulty,
    description,
    tags,
    status,
    completedAt,
    githubUrl,
    linkedinUrl
  };
});
