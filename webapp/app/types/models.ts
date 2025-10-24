export type SocialMedia = {
  name: string;
  url: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  url: string;
};

export type User = {
  username: string;
  name: string;
  description: string;
  contact_email: string;
  avatar: string;
  social: SocialMedia[];
  projects: Project[];
};
