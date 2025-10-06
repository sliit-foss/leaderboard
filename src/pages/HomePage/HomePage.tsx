import Hero from "../../modules/HomeModule/Hero/Hero";
// import { StatsDashboard } from "../../components/stats/StatsDashboard";
import Table from "../../components/table/Table";
import PendingPRs from "../../components/PendingPRs/PendingPRs";

function HomePage() {
  return (
    <>
      <Hero />
      {/* <StatsDashboard /> */}
      <Table />
      <PendingPRs />
    </>
  );
}

export default HomePage;
