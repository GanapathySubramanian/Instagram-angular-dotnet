export interface PostForm {
  userid: string;
  link: string,
  caption: string;
  timeStamp: Date;
  likes?: number;
  comments?: number;
  location?:string;
  turnoffcomment:number;
  likecountstatus:number;
}
