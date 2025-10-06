import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@primer/react";
import { GitPullRequestIcon } from "@primer/octicons-react";
import { useGetPendingPRs } from "../../queries/useGetPendingPRs";
import { PRCard } from "./PRCard";
import { SkeletonCard } from "../ui/SkeletonLoader";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { staggerContainer, staggerItem, fadeIn } from "../../lib/animations";
import "./PRList.scss";

function PRList() {
  const { data: pendingPRs, isSuccess, isLoading, isError } = useGetPendingPRs();

  return (
    <section className="pr-list-section">
      <div className="container">
        <Box sx={{ py: 5 }}>
          {/* Header */}
          <motion.div
            className="pr-section-header"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="pr-title-wrapper">
              <motion.div
                className="pr-icon-bg"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GitPullRequestIcon size={32} />
              </motion.div>
              <div>
                <h2 className="section-title">Pending Pull Requests</h2>
                <p className="section-subtitle">
                  Review and merge outstanding contributions from the community
                </p>
              </div>
            </div>
            
            {isSuccess && pendingPRs && pendingPRs.length > 0 && (
              <motion.div
                className="pr-count-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              >
                <span className="count-number">{pendingPRs.length}</span>
                <span className="count-label">Open PRs</span>
              </motion.div>
            )}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              className="pr-loading"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="pr-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <SkeletonCard />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              className="pr-error-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="error-icon">⚠️</div>
              <h3>Failed to fetch pending pull requests</h3>
              <p>Please try again later or check your network connection</p>
            </motion.div>
          )}

          {/* PR Grid */}
          {isSuccess && pendingPRs && pendingPRs.length > 0 && (
            <motion.div
              className="pr-grid"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <AnimatePresence mode="popLayout">
                {pendingPRs.map((pr, index) => (
                  <motion.div
                    key={pr.id}
                    variants={staggerItem}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <PRCard pr={pr} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {isSuccess && pendingPRs && pendingPRs.length === 0 && (
            <motion.div
              className="pr-empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="empty-icon"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎉
              </motion.div>
              <h3>All caught up!</h3>
              <p>No pending pull requests at the moment</p>
              <p className="empty-subtext">
                Great work! All contributions have been reviewed.
              </p>
            </motion.div>
          )}
        </Box>
      </div>
    </section>
  );
}

export default PRList;
