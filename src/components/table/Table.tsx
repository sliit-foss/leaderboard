import React from "react";
import {
  Pagination,
  ButtonPrimary,
  Button,
  ButtonDanger,
  ButtonOutline,
  Box,
} from "@primer/components";

function Table() {
  return (
    <>
      <section className="fdb-block">
        <div className="container">
          <div className="container table-responsive py-5">
            <Box mt={2} mb={4}>
              <Button mr={3}>This Month</Button>
              <ButtonDanger mr={3}>Last Month</ButtonDanger>
              <ButtonOutline mr={3}>All</ButtonOutline>
              <ButtonPrimary>Board Members</ButtonPrimary>
            </Box>

            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Rank</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Box>
            <Pagination
              pageCount={15}
              currentPage={1}
              onPageChange={(e) => e.preventDefault()}
            />
          </Box>
        </div>
      </section>
    </>
  );
}

export default Table;
