import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard'
import DayChallenge from '../pages/DayChallenge'
import Leaderboard from '../pages/Leaderboard'

export const router = createBrowserRouter([
  { path: '/', Component: Landing },
  { path: '/dashboard', Component: Dashboard },
  { path: '/leaderboard', Component: Leaderboard },
  { path: '/day/:dayId', Component: DayChallenge },
])
