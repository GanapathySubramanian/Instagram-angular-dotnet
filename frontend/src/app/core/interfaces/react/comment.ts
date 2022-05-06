export interface Comment {
  commentId?: string;
  userId: string;
  username: string;
  text: string;
  postId: string;
  timeStamp?: Date;
}
