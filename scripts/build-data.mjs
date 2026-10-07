import { mkdir, writeFile } from "node:fs/promises";

const ORG = "sliit-foss";
const FIRST_YEAR = 2018;
const SEARCH_LIMIT = 1000;
const OUT = new URL("../public/leaderboard.json", import.meta.url);
const BOTS = new Set([
  "dependabot",
  "github-actions",
  "copilot",
  "copilot-swe-agent",
]);

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GITHUB_TOKEN is required");
  process.exit(1);
}

const isBot = (author) =>
  !author ||
  author.__typename === "Bot" ||
  author.login.endsWith("[bot]") ||
  BOTS.has(author.login.toLowerCase());

async function graphql(query, variables) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && !body.errors) return body.data;
    if (attempt >= 3)
      throw new Error(
        `GitHub GraphQL ${res.status}: ${JSON.stringify(body.errors ?? body)}`,
      );
    await new Promise((r) => setTimeout(r, 5000 * attempt));
  }
}

const SEARCH = `query($q: String!, $after: String) {
  search(type: ISSUE, query: $q, first: 100, after: $after) {
    issueCount
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest {
        number title url createdAt mergedAt
        repository { name }
        author { __typename login avatarUrl(size: 80) }
      }
      ... on Issue {
        title url createdAt
        repository { name }
      }
    }
  }
}`;

async function search(q) {
  const nodes = [];
  let after = null;
  let count = 0;
  do {
    const { search } = await graphql(SEARCH, { q, after });
    count = search.issueCount;
    nodes.push(...search.nodes);
    after = search.pageInfo.hasNextPage ? search.pageInfo.endCursor : null;
  } while (after);
  return { nodes, count };
}

const day = (d) => d.toISOString().slice(0, 10);
const DAY_MS = 86400000;

async function mergedBetween(from, to) {
  const q = `org:${ORG} is:pr is:merged is:public merged:${day(from)}..${day(to)}`;
  const { nodes, count } = await search(q);
  if (count <= SEARCH_LIMIT || to - from < DAY_MS) return nodes;
  const mid = new Date(
    from.getTime() + Math.floor((to - from) / DAY_MS / 2) * DAY_MS,
  );
  return [
    ...(await mergedBetween(from, mid)),
    ...(await mergedBetween(new Date(mid.getTime() + DAY_MS), to)),
  ];
}

const now = new Date();
const merged = [];
for (let year = FIRST_YEAR; year <= now.getUTCFullYear(); year++) {
  const nodes = await mergedBetween(
    new Date(Date.UTC(year, 0, 1)),
    new Date(Date.UTC(year, 11, 31)),
  );
  merged.push(...nodes);
  console.log(`${year}: ${nodes.length} merged PRs`);
}

const users = {};
const seen = new Set();
const prs = [];
for (const pr of merged) {
  if (isBot(pr.author) || seen.has(pr.url)) continue;
  seen.add(pr.url);
  users[pr.author.login] = pr.author.avatarUrl;
  prs.push([pr.author.login, pr.mergedAt, pr.repository.name]);
}
prs.sort((a, b) => b[1].localeCompare(a[1]));

const since = day(new Date(now.getTime() - 90 * DAY_MS));
const open = await search(
  `org:${ORG} is:pr is:open is:public archived:false created:>=${since} sort:created-desc`,
);
const openPrs = open.nodes
  .filter((pr) => !isBot(pr.author))
  .map((pr) => ({
    number: pr.number,
    title: pr.title,
    url: pr.url,
    repo: pr.repository.name,
    author: pr.author.login,
    avatar: pr.author.avatarUrl,
    createdAt: pr.createdAt,
  }));

const issues = await search(
  `org:${ORG} is:issue is:open is:public archived:false label:"good first issue" sort:created-desc`,
);
const goodFirstIssues = issues.nodes.map((i) => ({
  title: i.title,
  url: i.url,
  repo: i.repository.name,
  createdAt: i.createdAt,
}));

await mkdir(new URL(".", OUT), { recursive: true });
await writeFile(
  OUT,
  JSON.stringify({
    generatedAt: now.toISOString(),
    users,
    prs,
    openPrs,
    goodFirstIssues,
  }),
);
console.log(
  `wrote ${prs.length} merged PRs (${merged.length - prs.length} skipped), ${Object.keys(users).length} contributors, ${openPrs.length} open PRs, ${goodFirstIssues.length} good first issues`,
);
