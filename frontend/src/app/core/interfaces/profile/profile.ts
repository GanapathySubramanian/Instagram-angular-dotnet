import {PostHover} from "./post-hover";

export interface Profile {
  username: string;
  name: string;
  postCount: number;
  posts: PostHover[];
}
