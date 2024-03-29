import { Avatar, AvatarPair, Box, Label, Pagination } from "@primer/components";
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
            {/*  <ButtonOutline m={2}>This Month</ButtonOutline>*/}
            {/*  <ButtonDanger m={2}>Last Month</ButtonDanger>*/}
            {/*  <ButtonOutline m={2}>All</ButtonOutline>*/}
            {/*  <ButtonPrimary m={2}>Board Members</ButtonPrimary>*/}
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
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td className="d-flex justify-content-start">
                        <AvatarPair
                          className={
                            r?.login === "dependabot" ? "anim-pulse" : ""
                          }
                        >
                          <Avatar src={r?.url} size={40} />
                          <Avatar src="https://avatars.githubusercontent.com/github" />
                        </AvatarPair>{" "}
                        <a
                          className="px-2 "
                          href={`https://github.com/${r?.login}`}
                          target={"_blank"}
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
                        <Label variant="medium" bg="#656BFE" m={1}>
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
