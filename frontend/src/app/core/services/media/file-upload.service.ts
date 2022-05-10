import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from "../../models/file-upload";
import {UserService} from "../user/user.service";
import {PostService} from "../post/post.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private userService: UserService,
    private postService: PostService
  ) { }


  pushFileToStorage(fileUpload: FileUpload, userId: string, type: string, caption?: string): Observable<number | undefined> {
    const filePath = `${type}/${userId}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        // storageRef.getDownloadURL().subscribe(downloadURL => {
        //   if( type === 'profile') this.userService.uploadProfilePic( userId, downloadURL).subscribe(res=>{
        //     this.userService.updateProfile(this.userService.getAuthUser().id);
        //   });
        //   else if( type === 'post' && caption) this.postService.createPost({userId,caption, link: downloadURL, timeStamp: new Date() }).subscribe();
        // });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  getFiles(numberItems: number, basePath: string): AngularFireList<FileUpload> {
    return this.db.list(basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload, basePath: string): void {
    this.deleteFileDatabase(fileUpload.key, basePath)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, basePath);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string, basePath: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  private deleteFileStorage(name: string, basePath: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }

  
}
