import { Data, ORG, timeAgo } from "./data";

const LIMIT = 8;

const search = (q: string, type: string) =>
  `https://github.com/search?q=${encodeURIComponent(q)}&type=${type}`;

export default function Activity({ data }: { data: Data }) {
  const prs = data.openPrs.slice(0, LIMIT);
  const issues = data.goodFirstIssues.slice(0, LIMIT);

  return (
    <div className="activity">
      <section aria-labelledby="open-prs">
        <h2 id="open-prs">Recently opened PRs</h2>
        <p className="section-lede">
          Open pull requests from the last 90 days. Reviews welcome.
        </p>
        {prs.length === 0 ? (
          <p className="notice">No pull requests opened in the last 90 days.</p>
        ) : (
          <ul className="items">
            {prs.map((pr) => (
              <li key={pr.url}>
                <img
                  className="avatar"
                  src={pr.avatar}
                  alt=""
                  width="28"
                  height="28"
                  loading="lazy"
                />
                <div>
                  <a href={pr.url}>{pr.title}</a>
                  <p className="meta">
                    {pr.repo} #{pr.number} by {pr.author},{" "}
                    <time dateTime={pr.createdAt}>{timeAgo(pr.createdAt)}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <a
          className="more"
          href={search(`org:${ORG} is:pr is:open`, "pullrequests")}
        >
          See all open PRs on GitHub
        </a>
      </section>

      <section aria-labelledby="good-first-issues">
        <h2 id="good-first-issues">Good first issues</h2>
        <p className="section-lede">
          Small, well-scoped issues to make your first contribution.
        </p>
        {issues.length === 0 ? (
          <p className="notice">
            No open good first issues right now. Browse the repositories for
            something to improve.
          </p>
        ) : (
          <ul className="items">
            {issues.map((issue) => (
              <li key={issue.url}>
                <div>
                  <a href={issue.url}>{issue.title}</a>
                  <p className="meta">
                    {issue.repo}, opened{" "}
                    <time dateTime={issue.createdAt}>
                      {timeAgo(issue.createdAt)}
                    </time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <a
          className="more"
          href={search(
            `org:${ORG} is:issue is:open archived:false label:"good first issue"`,
            "issues",
          )}
        >
          See all good first issues on GitHub
        </a>
      </section>
    </div>
  );
}
