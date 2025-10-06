import { Avatar, AvatarStack, Box, Label, Pagination } from "@primer/react";
import { useState } from "react";
import { useGetAllContributors } from "../../queries/useGetContributors";
import Loader from "../../assets/loader.gif";

function Table() {
  const {
    data: contributorsAllList,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllContributors();

  const [currentPage] = useState<number>(1);

  const contributorsSize: number = contributorsAllList?.length as number | 0;
  const pageCount: number = contributorsSize / 10;

  return (
    <>
      <section className="fdb-block">
        <div className="container">
          <div className="container table-responsive py-5">
            {/*TODO: Need to Impl*/}
            {/*<Box mt={2} mb={4}>*/}
            {/*  <Button variant="default" sx={{ m: 2 }}>This Month</Button>*/}
            {/*  <Button variant="danger" sx={{ m: 2 }}>Last Month</Button>*/}
            {/*  <Button variant="default" sx={{ m: 2 }}>All</Button>*/}
            {/*  <Button variant="primary" sx={{ m: 2 }}>Board Members</Button>*/}
            {/*</Box>*/}

            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Contributor</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              {isLoading && (
                <>
                  <span className={"anim-pulse"}>
                    <img src={Loader} width="20px" alt="" />
                  </span>
                  <span className="AnimatedEllipsis" />
                </>
              )}
              {isError && (
                <div className="flash mt-3 flash-error">
                  Failed to get contributors
                </div>
              )}
              {isSuccess && (
                <tbody>
                  {contributorsAllList?.map((r, i) => (
                    <tr key={r?.login}>
                      <th scope="row">{i + 1}</th>
                      <td className="d-flex justify-content-start">
                        <AvatarStack
                          className={
                            r?.login === "dependabot" ? "anim-pulse" : ""
                          }
                        >
                          <Avatar src={r?.url} size={40} />
                          <Avatar src="https://avatars.githubusercontent.com/github" size={40} />
                        </AvatarStack>{" "}
                        <a
                          className="px-2 "
                          href={`https://github.com/${r?.login}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          {r?.login}
                        </a>
                        {r?.login === "dependabot" && (
                          <p className="text-left text-italic">
                            : At least make contributions than I do!
                          </p>
                        )}
                      </td>
                      <td>
                        <Label sx={{ bg: "#656BFE", m: 1 }}>
                          {r?.points}
                        </Label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <Box>
            <Pagination
              pageCount={pageCount | 1}
              currentPage={currentPage | 1}
              onPageChange={(e) => e.preventDefault()}
            />
          </Box>
        </div>
      </section>
    </>
  );
}

export default Table;
