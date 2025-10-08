import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import "./SkeletonLoader.scss";

interface SkeletonLoaderProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
}

export function SkeletonLoader({
  className,
  width,
  height = "1rem",
  circle = false,
  count = 1,
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          className={cn("skeleton-loader", circle && "skeleton-circle", className)}
          style={{ width, height }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Preset skeleton components
export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <SkeletonLoader circle width={size} height={size} />;
}

export function SkeletonText({ lines = 1 }: { lines?: number }) {
  return (
    <div className="skeleton-text-wrapper">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader
          key={i}
          height="1rem"
          width={i === lines - 1 ? "80%" : "100%"}
          className="mb-2"
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-header">
        <SkeletonAvatar size={48} />
        <div className="skeleton-card-info">
          <SkeletonLoader width="120px" height="1rem" />
          <SkeletonLoader width="80px" height="0.875rem" className="mt-2" />
        </div>
      </div>
      <div className="skeleton-card-body">
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}
