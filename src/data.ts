export const ORG = "sliit-foss";
export const POINTS_PER_PR = 10;

export type MergedPr = [login: string, mergedAt: string, repo: string];

export type OpenPr = {
  number: number;
  title: string;
  url: string;
  repo: string;
  author: string;
  avatar: string;
  createdAt: string;
};

export type Issue = {
  title: string;
  url: string;
  repo: string;
  createdAt: string;
};

export type Data = {
  generatedAt: string;
  users: Record<string, string>;
  prs: MergedPr[];
  openPrs: OpenPr[];
  goodFirstIssues: Issue[];
};

export type Row = { login: string; count: number; rank: number };

export type Period = "all" | "year" | "month";

export async function loadData(): Promise<Data> {
  const res = await fetch(`${import.meta.env.BASE_URL}leaderboard.json`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export function periodStart(period: Period, now = new Date()): string | null {
  if (period === "all") return null;
  const month = period === "month" ? now.getMonth() : 0;
  return new Date(now.getFullYear(), month, 1).toISOString();
}

export function rank(prs: MergedPr[], since: string | null) {
  const counts = new Map<string, number>();
  const repos = new Set<string>();
  let total = 0;
  for (const [login, mergedAt, repo] of prs) {
    if (since && mergedAt < since) continue;
    counts.set(login, (counts.get(login) ?? 0) + 1);
    repos.add(repo);
    total++;
  }
  const sorted = [...counts].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
  const rows: Row[] = sorted.map(([login, count], i) => ({
    login,
    count,
    rank: i + 1,
  }));
  rows.forEach((row, i) => {
    if (i > 0 && row.count === rows[i - 1].count) row.rank = rows[i - 1].rank;
  });
  return { rows, total, repos: repos.size };
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

export function timeAgo(iso: string, now = Date.now()): string {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) {
      return relative.format(Math.round(seconds / size), unit);
    }
  }
  return "just now";
}

export const formatNumber = (n: number) => n.toLocaleString("en");

export const prSearchUrl = (login: string) =>
  `https://github.com/search?q=org:${ORG}+is:pr+is:merged+author:${encodeURIComponent(login)}&type=pullrequests`;
