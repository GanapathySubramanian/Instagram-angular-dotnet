import {FileUpload} from "../../models/file-upload";

export interface PostForm {
  userId: string;
  link: string,
  caption: string;
  timeStamp: Date;
  likes?: number;
  comments?: number;
}
