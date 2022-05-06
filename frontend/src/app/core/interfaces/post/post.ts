import {Comment} from "../react/comment";
import { Like } from "../react/like";

export interface Post {
  postId: string;
  userId: string;
  username?: string;
  url: string;
  caption: string;
  timeStamp: string;
  likes: number;
  comments: number;
  profileLink?: string;
  liked?: Like;
  isLiked?: boolean;
}
