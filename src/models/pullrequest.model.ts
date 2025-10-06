export interface PullRequest {
  id: number;
  title: string;
  url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  repository: string;
  created_at: string;
  state: string;
}
