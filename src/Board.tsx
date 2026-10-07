import { useMemo, useState } from "react";
import {
  Data,
  ORG,
  POINTS_PER_PR,
  Row,
  Period,
  formatNumber,
  prSearchUrl,
  rank,
  timeAgo,
  periodStart,
} from "./data";

const PERIODS: { id: Period; label: string; empty: string }[] = [
  { id: "all", label: "All time", empty: "No merged PRs yet." },
  { id: "year", label: "This year", empty: "No PRs merged this year yet." },
  { id: "month", label: "This month", empty: "No PRs merged this month yet." },
];

const LIST_LIMIT = 25;

const describe = (row: Row) =>
  `Rank ${row.rank}, ${row.login}, ${row.count} merged ${row.count === 1 ? "PR" : "PRs"}, ${formatNumber(row.count * POINTS_PER_PR)} points`;

function Podium({ rows, avatars }: { rows: Row[]; avatars: Data["users"] }) {
  return (
    <ol className="podium" aria-label="Top 3">
      {rows.map((row, i) => (
        <li key={row.login} className={`place place-${i + 1}`}>
          <a href={prSearchUrl(row.login)} aria-label={describe(row)}>
            <img
              className="avatar"
              src={avatars[row.login]}
              alt=""
              width="72"
              height="72"
            />
            <span className="login">{row.login}</span>
            <span className="score">
              {formatNumber(row.count * POINTS_PER_PR)} pts
            </span>
            <span className="step">
              <span className="numeral">{row.rank}</span>
              <span className="prs">
                {row.count} {row.count === 1 ? "PR" : "PRs"}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function RankList({
  rows,
  max,
  avatars,
}: {
  rows: Row[];
  max: number;
  avatars: Data["users"];
}) {
  return (
    <ol className="ranks">
      {rows.map((row) => (
        <li key={row.login}>
          <a
            className="rank-row"
            href={prSearchUrl(row.login)}
            aria-label={describe(row)}
          >
            <span className="rank">{row.rank}</span>
            <img
              className="avatar"
              src={avatars[row.login]}
              alt=""
              width="36"
              height="36"
              loading="lazy"
            />
            <span className="who">
              <span className="login">{row.login}</span>
              <span className="bar" aria-hidden="true">
                <span style={{ width: `${(row.count / max) * 100}%` }} />
              </span>
            </span>
            <span className="prs">
              {row.count} {row.count === 1 ? "PR" : "PRs"}
            </span>
            <span className="points">
              {formatNumber(row.count * POINTS_PER_PR)}
              <small> pts</small>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function Board({ data }: { data: Data }) {
  const [period, setPeriod] = useState<Period>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const { rows, total, repos } = useMemo(
    () => rank(data.prs, periodStart(period)),
    [data.prs, period],
  );

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? rows.filter((row) => row.login.toLowerCase().includes(needle))
    : rows.slice(3);
  const visible =
    needle || expanded ? matches : matches.slice(0, LIST_LIMIT - 3);
  const max = rows[0]?.count ?? 1;
  const current = PERIODS.find((w) => w.id === period)!;

  return (
    <section className="board" aria-labelledby="board-title">
      <h2 id="board-title" className="visually-hidden">
        Rankings
      </h2>

      <div className="controls">
        <div className="tabs" role="group" aria-label="Time period">
          {PERIODS.map((w) => (
            <button
              key={w.id}
              type="button"
              aria-pressed={period === w.id}
              onClick={() => setPeriod(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="visually-hidden">Search contributors</span>
          <input
            type="search"
            placeholder="Search by username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>

      <div className="stats">
        <dl>
          <div>
            <dt>Contributors</dt>
            <dd>{formatNumber(rows.length)}</dd>
          </div>
          <div>
            <dt>Merged PRs</dt>
            <dd>{formatNumber(total)}</dd>
          </div>
          <div>
            <dt>Repositories</dt>
            <dd>{formatNumber(repos)}</dd>
          </div>
        </dl>
        <p className="updated">
          Updated{" "}
          <time dateTime={data.generatedAt}>{timeAgo(data.generatedAt)}</time>
        </p>
      </div>

      <div className="panel">
        {rows.length === 0 ? (
          <div className="notice">
            <p>
              {current.empty}{" "}
              <a href={`https://github.com/${ORG}`}>
                Open a pull request on GitHub
              </a>{" "}
              to take the top spot.
            </p>
          </div>
        ) : (
          <>
            {!needle && <Podium rows={rows.slice(0, 3)} avatars={data.users} />}
            {visible.length > 0 && (
              <RankList rows={visible} max={max} avatars={data.users} />
            )}
            {needle && visible.length === 0 && (
              <p className="notice">No contributor matches "{query.trim()}".</p>
            )}
            {!needle && !expanded && matches.length > visible.length && (
              <button
                type="button"
                className="button button-quiet show-all"
                onClick={() => setExpanded(true)}
              >
                Show all {formatNumber(rows.length)} contributors
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function BoardSkeleton() {
  return (
    <div className="board skeleton" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading the leaderboard</span>
      <div className="controls">
        <span className="bone tabs-bone" />
        <span className="bone search-bone" />
      </div>
      <div className="stats">
        <span className="bone stats-bone" />
      </div>
      <div className="panel">
        <div className="podium">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`bone place place-${n}`} />
          ))}
        </div>
        <div className="ranks">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="bone row" />
          ))}
        </div>
      </div>
    </div>
  );
}
