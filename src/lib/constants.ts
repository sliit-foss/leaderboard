/**
 * Application constants
 */

// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.sliitfoss.org";

// Points configuration
export const POINTS_PER_PR = 10;

// Pagination
export const ITEMS_PER_PAGE = 10;
export const PR_ITEMS_PER_PAGE = 12;

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Theme
export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

// Toast configuration
export const TOAST_CONFIG = {
  duration: 3000,
  position: "top-right" as const,
  style: {
    borderRadius: "12px",
    padding: "12px 16px",
  },
};

// Query keys
export const QUERY_KEYS = {
  CONTRIBUTORS: "contributors",
  PENDING_PRS: "pendingPRs",
  CONTRIBUTOR_DETAILS: "contributorDetails",
  STATS: "stats",
} as const;

// External links
export const LINKS = {
  GITHUB_ORG: "https://github.com/sliit-foss",
  SLIIT_FOSS: "https://sliitfoss.org",
} as const;

// Rank colors
export const RANK_COLORS = {
  1: "#FFD700", // Gold
  2: "#C0C0C0", // Silver
  3: "#CD7F32", // Bronze
} as const;
