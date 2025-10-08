import { motion } from "framer-motion";
import { StatsCard } from "./StatsCard";
import { staggerContainer, staggerItem } from "../../lib/animations";
import { useGetAllContributors } from "../../queries/useGetContributors";
import { useGetPendingPRs } from "../../queries/useGetPendingPRs";
import "./StatsDashboard.scss";

export function StatsDashboard() {
  const { data: contributors } = useGetAllContributors();
  const { data: pendingPRs } = useGetPendingPRs();

  const stats = [
    {
      title: "Total Contributors",
      value: contributors?.length || 0,
      icon: "👥",
      // trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Pull Requests",
      value: Math.floor((contributors?.reduce((acc, c) => acc + (c?.points || 0), 0) ?? 0) / 10),
      icon: "🔀",
      // trend: { value: 8, isPositive: true },
    },
    {
      title: "Pending Reviews",
      value: pendingPRs?.length || 0,
      icon: "⏳",
      // trend: { value: 5, isPositive: false },
    },
    {
      title: "Total Points",
      value: contributors?.reduce((acc, c) => acc + (c?.points || 0), 0) ?? 0,
      icon: "⭐",
      // trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <section className="stats-dashboard-section">
      <div className="container">
        <motion.div
          className="stats-dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="dashboard-title">📊 Community Stats</h2>
          <p className="dashboard-subtitle">
            Real-time insights into our growing community
          </p>
        </motion.div>

        <motion.div
          className="stats-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.title} variants={staggerItem}>
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
