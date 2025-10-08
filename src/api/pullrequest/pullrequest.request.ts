import axios from "axios";
import { PullRequest } from "../../models/pullrequest.model";

const GITHUB_API_BASE_URL = "https://api.github.com";
const ORG_NAME = "sliit-foss";

interface GitHubSearchResponse {
  items: PullRequest[];
  total_count: number;
}

export const getPendingPRs = async (): Promise<PullRequest[]> => {
  try {
    // Calculate date from 1 year ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateFilter = oneYearAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Fetch open PRs from the past year from sliit-foss organization using public API
    const response = await axios.get<GitHubSearchResponse>(
      `${GITHUB_API_BASE_URL}/search/issues`,
      {
        params: {
          q: `org:${ORG_NAME} type:pr state:open created:>${dateFilter} -author:app/dependabot -author:dependabot`,
          sort: "created",
          order: "desc",
          per_page: 100,
        },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching pending PRs:", error);
    return [];
  }
};
