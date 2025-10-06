import { useQuery } from "@tanstack/react-query";
import { Contributor_API } from "../api/contributor";
import { Contributor } from "../models/contributor.model";

const CONTRIBUTORS_ALL_LIST = "CONTRIBUTORS_ALL_LIST";

export function useGetAllContributors() {
  return useQuery<Contributor[]>({
    queryKey: [CONTRIBUTORS_ALL_LIST],
    queryFn: Contributor_API.getAllContributors,
  });
}
