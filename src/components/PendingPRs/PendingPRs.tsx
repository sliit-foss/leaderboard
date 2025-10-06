import { Avatar, Label, Box } from "@primer/react";
import { GitPullRequestIcon, ClockIcon } from "@primer/octicons-react";
import { useGetPendingPRs } from "../../queries/useGetPendingPRs";
import Loader from "../../assets/loader.gif";
import "./PendingPRs.scss";

function PendingPRs() {
  const { data: pendingPRs, isSuccess, isLoading, isError } = useGetPendingPRs();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <section className="fdb-block pending-prs-section">
      <div className="container">
        <Box sx={{ py: 5 }}>
          <div className="section-header">
            <h2 className="section-title">
              <GitPullRequestIcon size={28} />
              Pending Pull Requests
            </h2>
            <p className="section-subtitle">
              Review and merge outstanding contributions from the community
            </p>
          </div>

          {isLoading && (
            <div className="loading-container">
              <img src={Loader} width="50px" alt="Loading..." />
              <p className="loading-text">Fetching pending PRs...</p>
            </div>
          )}

          {isError && (
            <div className="error-message">
              <span>⚠️ Failed to fetch pending pull requests</span>
            </div>
          )}

          {isSuccess && pendingPRs && pendingPRs.length > 0 && (
            <div className="pr-grid">
              {pendingPRs.map((pr) => {
                // Extract repository name from repository_url
                const repoName = pr.repository_url.split("/repos/")[1] || "";
                const repoShortName = repoName.split("/")[1] || repoName;
                
                return (
                  <div key={pr.id} className="pr-card">
                    <div className="pr-card-header">
                      <div className="pr-meta">
                        <GitPullRequestIcon size={16} className="pr-icon" />
                        <span className="pr-number">#{pr.number}</span>
                        <Label variant="accent" size="small" className="repo-label">
                          {repoShortName}
                        </Label>
                      </div>
                    </div>

                    <div className="pr-card-body">
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-title"
                      >
                        {pr.title}
                      </a>
                    </div>

                    <div className="pr-card-footer">
                      <div className="pr-author">
                        <Avatar src={pr.user.avatar_url} size={24} />
                        <a
                          href={pr.user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="author-link"
                        >
                          {pr.user.login}
                        </a>
                      </div>
                      <div className="pr-time">
                        <ClockIcon size={14} />
                        <span>{formatDate(pr.created_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isSuccess && pendingPRs && pendingPRs.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>All caught up!</h3>
              <p>No pending pull requests at the moment</p>
            </div>
          )}
        </Box>
      </div>
    </section>
  );
}

export default PendingPRs;
