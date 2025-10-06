import React from "react";
import Hero from "../../modules/HomeModule/Hero/Hero";
import Table from "../../components/table/Table";
import PendingPRs from "../../components/PendingPRs/PendingPRs";

function HomePage() {
  return (
    <>
      <Hero />
      <Table />
      <PendingPRs />
    </>
  );
}

export default HomePage;
