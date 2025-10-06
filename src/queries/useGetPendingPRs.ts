import { useQuery } from "@tanstack/react-query";
import { getPendingPRs } from "../api/pullrequest";
import { PullRequest } from "../models/pullrequest.model";

export const useGetPendingPRs = () => {
  return useQuery<PullRequest[]>("pendingPRs", getPendingPRs, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
