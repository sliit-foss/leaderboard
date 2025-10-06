import { Avatar, Label, Box, Timeline } from "@primer/react";
import { GitPullRequestIcon } from "@primer/octicons-react";
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
          <h2 className="text-center mb-4">Pending Pull Requests</h2>
          <p className="text-center text-muted mb-5">
            Review and merge these outstanding contributions
          </p>

          {isLoading && (
            <div className="text-center">
              <img src={Loader} width="40px" alt="Loading..." />
              <p className="text-muted mt-2">Loading pending PRs...</p>
            </div>
          )}

          {isError && (
            <div className="flash mt-3 flash-error">
              Failed to fetch pending pull requests
            </div>
          )}

          {isSuccess && pendingPRs && pendingPRs.length > 0 && (
            <Timeline>
              {pendingPRs.map((pr) => {
                // Extract repository name from repository_url
                const repoName = pr.repository_url.split("/repos/")[1] || "";
                
                return (
                  <Timeline.Item key={pr.id}>
                    <Timeline.Badge>
                      <GitPullRequestIcon />
                    </Timeline.Badge>
                    <Timeline.Body>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Avatar src={pr.user.avatar_url} size={32} />
                        <Box sx={{ flex: 1 }}>
                          <a
                            href={pr.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pr-title"
                          >
                            #{pr.number} {pr.title}
                          </a>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                            <Label variant="accent">{repoName}</Label>
                            <span className="text-muted">
                              opened by{" "}
                              <a
                                href={pr.user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {pr.user.login}
                              </a>{" "}
                              {formatDate(pr.created_at)}
                            </span>
                          </Box>
                        </Box>
                      </Box>
                    </Timeline.Body>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          )}

          {isSuccess && pendingPRs && pendingPRs.length === 0 && (
            <div className="text-center text-muted py-5">
              <p>🎉 No pending pull requests at the moment!</p>
            </div>
          )}
        </Box>
      </div>
    </section>
  );
}

export default PendingPRs;
