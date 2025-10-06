import { motion } from "framer-motion";
import { Avatar, Label } from "@primer/react";
import { GitPullRequestIcon, ClockIcon, GitBranchIcon } from "@primer/octicons-react";
import { formatRelativeTime } from "../../lib/utils";
import { cardHover } from "../../lib/animations";
import { PullRequest } from "../../models/pullrequest.model";
import "./PRCard.scss";

interface PRCardProps {
  pr: PullRequest;
  index: number;
}

export function PRCard({ pr, index }: PRCardProps) {
  // Extract repository name from repository_url
  const repoName = pr.repository_url.split("/repos/")[1] || "";
  const repoShortName = repoName.split("/")[1] || repoName;

  return (
    <motion.div
      className="pr-card-modern"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      custom={index}
      layout
    >
      {/* Card Header */}
      <div className="pr-card-header">
        <div className="pr-meta">
          <motion.div
            className="pr-icon-wrapper"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <GitPullRequestIcon size={18} className="pr-icon" />
          </motion.div>
          <span className="pr-number">#{pr.number}</span>
          <Label variant="accent" size="small" className="repo-label">
            <GitBranchIcon size={12} />
            {repoShortName}
          </Label>
        </div>
        <div className="pr-time">
          <ClockIcon size={14} />
          <span>{formatRelativeTime(pr.created_at)}</span>
        </div>
      </div>

      {/* Card Body */}
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

      {/* Card Footer */}
      <div className="pr-card-footer">
        <motion.div
          className="pr-author"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Avatar src={pr.user.avatar_url} size={28} />
          <a
            href={pr.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            {pr.user.login}
          </a>
        </motion.div>
        
        {pr.state && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Label
              variant={pr.state === "open" ? "success" : "default"}
              size="small"
            >
              {pr.state}
            </Label>
          </motion.div>
        )}
      </div>

      {/* Glassmorphism overlay on hover */}
      <motion.div
        className="pr-card-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
