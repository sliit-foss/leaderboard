import { Box, Grid } from "@primer/components";
import React from "react";

function Footer() {
  return (
    <>
      <Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
        <Box p={3} bg="blue.2">
          1
        </Box>
        <Box p={3} bg="yellow.2">
          2
        </Box>
      </Grid>
    </>
  );
}

export default Footer;
