import { apiInstance } from "../apiInstance";

export const getPendingPRs = async () => {
  const response = await apiInstance.get("/pending-prs");
  return response.data;
};
