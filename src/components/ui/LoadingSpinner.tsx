import { motion } from "framer-motion";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="loading-spinner-container">
      <motion.div
        className="loading-spinner"
        style={{ width: spinnerSize, height: spinnerSize }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}
