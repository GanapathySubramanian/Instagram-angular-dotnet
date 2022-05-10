export interface Comment {
  commentId?: string;
  userId: string;
  username: string;
  profile:string;
  text: string;
  postId: string;
  timeStamp?: string;
}
