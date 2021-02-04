import { useQuery } from "react-query";
import { Contributor_API } from "../api/contributor";

const CONTRIBUTORS_ALL_LIST = "CONTRIBUTORS_ALL_LIST";

export function useGetAllContributors() {
  return useQuery(CONTRIBUTORS_ALL_LIST, Contributor_API.getAllContributors);
}
