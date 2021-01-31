import React from "react";
import {
  Pagination,
  ButtonPrimary,
  ButtonDanger,
  ButtonOutline,
  Box,
  Avatar,
  AvatarPair,
  Label,
} from "@primer/components";

type Contributor = {
  rank: number;
  username: string;
  points: number;
  avatar: string;
};

function Table() {
  const tempArray: Contributor[] = [
    {
      avatar: "https://avatars.githubusercontent.com/u/19349315",
      points: 100,
      rank: 1,
      username: "Shehanka",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/24352487",
      points: 90,
      rank: 2,
      username: "ebonynon",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/38850236?s=60&v=4",
      points: 80,
      rank: 3,
      username: "Bawanthathilan",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/37530024?s=60&v=4",
      points: 70,
      rank: 4,
      username: "Safnaj",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/42801983?s=60&v=4",
      points: 60,
      rank: 5,
      username: "nisalrenuja",
    },
  ];

  return (
    <>
      <section className="fdb-block">
        <div className="container">
          <div className="container table-responsive py-5">
            <Box mt={2} mb={4}>
              <ButtonOutline mr={3}>This Month</ButtonOutline>
              <ButtonDanger mr={3}>Last Month</ButtonDanger>
              <ButtonOutline mr={3}>All</ButtonOutline>
              <ButtonPrimary>Board Members</ButtonPrimary>
            </Box>

            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Avatar</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {tempArray.map((r) => (
                  <tr>
                    <th scope="row">{r.rank}</th>
                    <td className="d-flex justify-content-start">
                      <AvatarPair>
                        <Avatar src={r.avatar} size={40} />
                        <Avatar src="https://avatars.githubusercontent.com/github" />
                      </AvatarPair>{" "}
                      <a
                        className="px-2 "
                        href={`https://github.com/${r.username}`}
                        target={"_blank"}
                      >
                        {r.username}
                      </a>
                    </td>
                    <td>
                      <Label variant="medium" bg="#656BFE" m={1}>
                        {r.points}
                      </Label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Box>
            <Pagination
              pageCount={10}
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
