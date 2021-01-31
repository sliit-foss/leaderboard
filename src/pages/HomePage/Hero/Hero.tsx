import React from "react";
import { Box, Grid } from "@primer/components";
import GitSvg from "../../../assets/git.svg";
function Hero() {
  return (
    <>
      <Grid mt={5} gridTemplateColumns="repeat(1, auto)">
        <Box p={0}>
          <section className="fdb-block">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <img alt="image" className="img-fluid" src={GitSvg} />
                </div>
                <div className="col-12 col-md-6 col-lg-5 ml-md-auto text-left">
                  <h1>SLIIT FOSS GitHub Leaderboard</h1>
                  <p>
                    The following leaderboard shows the top github contributors
                    of SLIIT FOSS. You can join this leaderboard by sending a
                    Pull Request to any repository within
                    <strong>
                      <a href="https://github.com/sliit-foss/" target="_blank">
                        SLIIT FOSS Github Organization.
                      </a>
                    </strong>
                    Scores will automatically updates when merging a Pull
                    request.
                    <br />
                    <b>1 merged PR = 10 Points</b>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Grid>
    </>
  );
}

export default Hero;
