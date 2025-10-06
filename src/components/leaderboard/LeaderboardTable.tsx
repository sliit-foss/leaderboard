import { Avatar, AvatarStack, Label, Pagination } from "@primer/react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllContributors } from "../../queries/useGetContributors";
import { SkeletonLoader, SkeletonAvatar } from "../ui/SkeletonLoader";
import { staggerContainer, staggerItem } from "../../lib/animations";
import { ITEMS_PER_PAGE, RANK_COLORS } from "../../lib/constants";
import { getRankSuffix } from "../../lib/utils";
import "./LeaderboardTable.scss";

function LeaderboardTable() {
  const {
    data: contributorsAllList,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllContributors();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const contributorsSize: number = contributorsAllList?.length || 0;
  const pageCount: number = Math.ceil(contributorsSize / ITEMS_PER_PAGE);

  // Calculate paginated data
  const paginatedContributors = useMemo(() => {
    if (!contributorsAllList) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return contributorsAllList.slice(startIndex, endIndex);
  }, [contributorsAllList, currentPage]);

  // Get rank medal/color
  const getRankDisplay = (rank: number) => {
    if (rank <= 3) {
      const medals = ["🥇", "🥈", "🥉"];
      return medals[rank - 1];
    }
    return getRankSuffix(rank);
  };

  const getRankColor = (rank: number) => {
    return RANK_COLORS[rank as keyof typeof RANK_COLORS] || "transparent";
  };

  // Get text color based on rank background for better contrast
  const getRankTextColor = (rank: number) => {
    if (rank === 1 || rank === 2) {
      // Gold and Silver need dark text for contrast
      return "#1a1a1a";
    }
    // Bronze and other colors work well with white text
    return "#ffffff";
  };

  return (
    <section className="leaderboard-section">
      <div className="container">
        <motion.div
          className="leaderboard-container"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div className="leaderboard-header" variants={staggerItem}>
            <h2 className="leaderboard-title">🏆 Top Contributors</h2>
            <p className="leaderboard-subtitle">
              Celebrating our amazing community members
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div className="leaderboard-loading" variants={staggerItem}>
              <div className="table-skeleton">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="skeleton-row">
                    <div className="skeleton-rank">
                      <SkeletonLoader width="40px" height="40px" circle />
                    </div>
                    <div className="skeleton-contributor">
                      <SkeletonAvatar size={48} />
                      <SkeletonLoader width="150px" height="20px" />
                    </div>
                    <div className="skeleton-points">
                      <SkeletonLoader width="80px" height="32px" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              className="error-state"
              variants={staggerItem}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="error-icon">⚠️</div>
              <h3>Oops! Something went wrong</h3>
              <p>Failed to load contributors. Please try again later.</p>
            </motion.div>
          )}

          {/* Leaderboard Table */}
          {isSuccess && (
            <motion.div className="leaderboard-table-wrapper" variants={staggerItem}>
              <div className="leaderboard-table">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={staggerContainer}
                  >
                    {paginatedContributors.map((contributor, index) => {
                      const globalRank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                      const isTopThree = globalRank <= 3;
                      
                      return (
                        <motion.div
                          key={contributor?.login || index}
                          className={`leaderboard-row ${isTopThree ? "top-rank" : ""}`}
                          variants={staggerItem}
                          initial="rest"
                          whileHover="hover"
                          custom={index}
                        >
                          {/* Rank */}
                          <div className="rank-cell">
                            <motion.div
                              className="rank-badge"
                              style={{
                                background: isTopThree
                                  ? `linear-gradient(135deg, ${getRankColor(globalRank)}22, ${getRankColor(globalRank)}44)`
                                  : "transparent",
                                border: isTopThree ? `2px solid ${getRankColor(globalRank)}` : "2px solid #e5e7eb",
                              }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <span className="rank-number">{getRankDisplay(globalRank)}</span>
                            </motion.div>
                          </div>

                          {/* Contributor Info */}
                          <div className="contributor-cell">
                            <motion.div
                              className="contributor-avatar"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <AvatarStack
                                className={contributor?.login === "dependabot" ? "anim-pulse" : ""}
                              >
                                <Avatar src={contributor?.url} size={48} />
                                <Avatar
                                  src="https://avatars.githubusercontent.com/github"
                                  size={48}
                                />
                              </AvatarStack>
                            </motion.div>
                            
                            <div className="contributor-info">
                              <a
                                href={`https://github.com/${contributor?.login}`}
                                target="_blank"
                                rel="noreferrer"
                                className="contributor-name"
                              >
                                {contributor?.login}
                              </a>
                              {contributor?.login === "dependabot" && (
                                <motion.p
                                  className="contributor-note"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  🤖 Make more contributions than the bot!
                                </motion.p>
                              )}
                            </div>
                          </div>

                          {/* Points */}
                          <div className="points-cell">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Label
                                variant="primary"
                                size="large"
                                sx={{
                                  bg: isTopThree ? getRankColor(globalRank) : "#656BFE",
                                  color: isTopThree ? getRankTextColor(globalRank) : "#fff",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  px: 4,
                                  py: 3,
                                  borderRadius: "24px",
                                  boxShadow: isTopThree
                                    ? `0 4px 12px ${getRankColor(globalRank)}44`
                                    : "0 4px 12px rgba(101, 107, 254, 0.3)",
                                }}
                              >
                                {contributor?.points} pts
                              </Label>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {pageCount > 1 && (
                <motion.div
                  className="pagination-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={(e, page) => {
                      e.preventDefault();
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default LeaderboardTable;
