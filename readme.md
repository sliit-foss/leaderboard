# SLIIT FOSS Leaderboard

Top GitHub contributors to [SLIIT FOSS](https://github.com/sliit-foss), live at [leaderboard.sliitfoss.org](https://leaderboard.sliitfoss.org). 1 merged PR = 10 points.

## How it works

`scripts/build-data.mjs` queries the GitHub GraphQL API for every merged PR in public `sliit-foss` repositories, open PRs from the last 90 days and open "good first issue" issues, and writes `public/leaderboard.json`. The GitHub Pages workflow runs it hourly before `vite build`, so the site is fully static.

## Development

```sh
pnpm install
GITHUB_TOKEN=$(gh auth token) pnpm data
pnpm dev
```

`pnpm lint` and `pnpm build` must pass before opening a PR.
