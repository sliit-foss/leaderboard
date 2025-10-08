import { motion } from "framer-motion";
import { scaleOnHover, fadeIn } from "../../lib/animations";
import { cn, formatNumber } from "../../lib/utils";
import "./StatsCard.scss";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
  className?: string;
}

export function StatsCard({ title, value, icon, trend, delay = 0, className }: StatsCardProps) {
  return (
    <motion.div
      className={cn("stats-card", className)}
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      {...scaleOnHover}
    >
      <div className="stats-card-icon">{icon}</div>
      
      <div className="stats-card-content">
        <h3 className="stats-card-title">{title}</h3>
        <motion.div
          className="stats-card-value"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {typeof value === "number" ? formatNumber(value) : value}
        </motion.div>
        
        {trend && (
          <motion.div
            className={cn("stats-card-trend", trend.isPositive ? "positive" : "negative")}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
          >
            <span className="trend-icon">{trend.isPositive ? "↑" : "↓"}</span>
            <span className="trend-value">{Math.abs(trend.value)}%</span>
          </motion.div>
        )}
      </div>

      {/* Hover overlay */}
      <motion.div
        className="stats-card-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
