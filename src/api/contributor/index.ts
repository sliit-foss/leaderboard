import { apiInstance } from "../apiInstance";

export async function getAllContributors() {
  const PATH = "/contributors";
  try {
    const res = await apiInstance.get(PATH);
    const apiRes = res.data;

    return apiRes as [];
  } catch (e) {
    throw new Error("Failed to get All products");
  }
}
