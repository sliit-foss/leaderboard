import { Contributor } from "../../models/contributor.model";
import { apiInstance } from "../apiInstance";

export async function getAllContributors() {
  const PATH = "/v1/leaderboard";
  try {
    const res = await apiInstance.get(PATH);
    return res.data.data as Contributor[];
  } catch (e) {
    throw new Error("Failed to get All products");
  }
}
