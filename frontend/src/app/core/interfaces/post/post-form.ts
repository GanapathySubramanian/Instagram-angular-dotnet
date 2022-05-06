import {FileUpload} from "../../models/file-upload";

export interface PostForm {
  userId: string;
  url: string,
  caption: string;
  timeStamp: Date;
  likes?: number;
  comments?: number;
}
