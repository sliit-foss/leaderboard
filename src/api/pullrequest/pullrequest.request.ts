import axios from "axios";
import { PullRequest } from "../../models/pullrequest.model";

const GITHUB_API_BASE_URL = "https://api.github.com";
const REPO_OWNER = "sliit-foss";
const REPO_NAME = "leaderboard";

export const getPendingPRs = async (): Promise<PullRequest[]> => {
  const response = await axios.get<PullRequest[]>(
    `${GITHUB_API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open`
  );
  return response.data;
};
