import { Avatar, AvatarStack, Box, Label, Pagination } from "@primer/react";
import { useState, useMemo } from "react";
import { useGetAllContributors } from "../../queries/useGetContributors";
import Loader from "../../assets/loader.gif";

function Table() {
  const {
    data: contributorsAllList,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllContributors();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const contributorsSize: number = contributorsAllList?.length || 0;
  const pageCount: number = Math.ceil(contributorsSize / itemsPerPage);

  // Calculate paginated data
  const paginatedContributors = useMemo(() => {
    if (!contributorsAllList) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return contributorsAllList.slice(startIndex, endIndex);
  }, [contributorsAllList, currentPage]);

  // Create empty rows to always show 10 rows
  const emptyRowsCount = itemsPerPage - paginatedContributors.length;

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
                  {paginatedContributors.map((r, i: number) => {
                    const globalRank = (currentPage - 1) * itemsPerPage + i + 1;
                    return (
                      <tr key={r?.login}>
                        <th scope="row">{globalRank}</th>
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
                          <Label 
                            variant="primary" 
                            size="large"
                            sx={{ 
                              bg: "#656BFE",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "16px",
                              px: 3,
                              py: 1,
                              borderRadius: "20px"
                            }}
                          >
                            {r?.points} pts
                          </Label>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Add empty rows to maintain consistent table height */}
                  {Array.from({ length: emptyRowsCount }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <th scope="row" style={{ visibility: "hidden" }}>-</th>
                      <td className="d-flex justify-content-start" style={{ visibility: "hidden" }}>
                        <AvatarStack>
                          <Avatar src="" size={40} />
                          <Avatar src="" size={40} />
                        </AvatarStack>
                        <span className="px-2">Placeholder</span>
                      </td>
                      <td style={{ visibility: "hidden" }}>
                        <Label 
                          variant="primary" 
                          size="large"
                          sx={{ 
                            bg: "#656BFE",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            px: 3,
                            py: 1,
                            borderRadius: "20px"
                          }}
                        >
                          0 pts
                        </Label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          {pageCount > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={(e, page) => {
                  e.preventDefault();
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </Box>
          )}
        </div>
      </section>
    </>
  );
}

export default Table;
