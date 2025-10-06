import { motion } from "framer-motion";
import { Box, Label } from "@primer/react";
import { slideInLeft, slideInRight } from "../../lib/animations";
import { POINTS_PER_PR, LINKS } from "../../lib/constants";
import GitSvg from "../../assets/HeroVector.svg";
import "./Hero.scss";

function Hero() {
  return (
    <Box sx={{ mt: 5 }}>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {/* Image Column */}
            <motion.div
              className="hero-image-col"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
              viewport={{ once: true }}
            >
              <motion.img
                src={GitSvg}
                alt="GitHub Leaderboard"
                className="hero-image"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Text Column */}
            <motion.div
              className="hero-text-col"
              variants={slideInRight}
              initial="initial"
              animate="animate"
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="hero-title">
                  <span className="gradient-text">SLIIT FOSS</span>
                  <br />
                  GitHub Leaderboard
                </h1>
              </motion.div>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                The following leaderboard shows the top GitHub contributors of
                SLIIT FOSS. You can join this leaderboard by sending a Pull
                Request to any repository within{" "}
                <strong>
                  <a
                    href={LINKS.GITHUB_ORG}
                    target="_blank"
                    rel="noreferrer"
                    className="hero-link"
                  >
                    SLIIT FOSS GitHub Organization
                  </a>
                </strong>
                . Scores will automatically update when merging a Pull Request.
              </motion.p>

              <motion.div
                className="hero-badge-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Label
                    variant="success"
                    size="large"
                    sx={{
                      fontSize: "1.125rem",
                      px: 4,
                      py: 4,
                      borderRadius: "24px",
                      boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
                      fontWeight: "bold",
                    }}
                  >
                    🎯 1 merged PR = {POINTS_PER_PR} Points
                  </Label>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href={LINKS.GITHUB_ORG}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button"
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(101, 107, 254, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Contributing
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background decorations */}
        <motion.div
          className="hero-decoration hero-decoration-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="hero-decoration hero-decoration-2"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </section>
    </Box>
  );
}

export default Hero;
