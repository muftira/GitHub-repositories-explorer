export type User = {
  login: string;
  id: number;
  avatar_url: string;
};

export type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};