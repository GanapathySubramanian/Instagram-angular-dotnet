import {Comment} from "../react/comment";
import { Like } from "../react/like";
import { User } from "../user/user";

export interface Post {
  postId: string;
  user:User
  link: string;
  caption: string;
  timeStamp: string;
  likes: number;
  comments: number;
  profileLink?: string;
  liked?: Like;
  isLiked?: boolean;
}
