import {FileUpload} from "../../models/file-upload";

export interface PostForm {
  userid: string;
  link: string,
  caption: string;
  timeStamp: Date;
  likes?: number;
  comments?: number;
}
