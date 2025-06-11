export type Items = {
  login: string;
  id: number;
  avatar_url: string;
};

export type User = {
  status: number;

  data: { total_count: number; items: Items[] };
};

export type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};

export type Repos = {
  status: number;
  data: Repo[];
};

export type Query = {
  value: string;
  username: string;
};
