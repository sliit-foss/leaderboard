import axios from "axios";
import { PullRequest } from "../../models/pullrequest.model";

const GITHUB_API_BASE_URL = "https://api.github.com";
const ORG_NAME = "sliit-foss";

interface GitHubSearchResponse {
  items: PullRequest[];
  total_count: number;
}

export const getPendingPRs = async (): Promise<PullRequest[]> => {
  // Fetch all open PRs from the sliit-foss organization, excluding dependabot
  const response = await axios.get<GitHubSearchResponse>(
    `${GITHUB_API_BASE_URL}/search/issues?q=org:${ORG_NAME}+type:pr+state:open+-author:app/dependabot+-author:dependabot&sort=created&order=desc&per_page=100`
  );
  return response.data.items;
};
