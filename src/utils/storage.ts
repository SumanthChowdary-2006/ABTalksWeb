import { ChallengeDay, initialUserStats, sampleChallenges, UserStats } from '../data/challengesData'

const USER_STATS_KEY = 'abtalks_user_stats'
const CHALLENGES_KEY = 'abtalks_challenges'

export function loadUserStats(): UserStats {
  try {
    const saved = localStorage.getItem(USER_STATS_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (err) {
    console.error('Failed to load user stats from LocalStorage:', err)
  }
  return initialUserStats
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats))
  } catch (err) {
    console.error('Failed to save user stats to LocalStorage:', err)
  }
}

export function loadChallenges(): ChallengeDay[] {
  try {
    const saved = localStorage.getItem(CHALLENGES_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Failed to load challenges from LocalStorage:', err)
  }
  return sampleChallenges
}

export function saveChallenges(challenges: ChallengeDay[]) {
  try {
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(challenges))
  } catch (err) {
    console.error('Failed to save challenges to LocalStorage:', err)
  }
}

export function resetStorage() {
  localStorage.removeItem(USER_STATS_KEY)
  localStorage.removeItem(CHALLENGES_KEY)
}
