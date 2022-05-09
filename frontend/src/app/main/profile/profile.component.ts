import { Component, OnInit } from '@angular/core';
import { PostHover } from 'src/app/core/interfaces/profile/post-hover';
import { User } from 'src/app/core/interfaces/user/user';
import { FileUpload } from 'src/app/core/models/file-upload';
import { FileUploadService } from 'src/app/core/services/media/file-upload.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastNotificationService } from 'src/app/core/services/toaster/toast-notification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  authenticatedUser: User={} as User;
  postDetails:PostHover[]=[];
  
  fileformat:string='';

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  
  isdisableok=false;
  
  hidechooseProfile:boolean=true;
  hideuploadProfile:boolean=true;

  selected:string='';
  
  constructor(private userService: UserService  ,private postservice:PostService,private uploadService: FileUploadService,private toaster:ToastNotificationService) {
    
    this.authenticatedUser = this.userService.getAuthUser();
    this.getUser();
    this.userService.$authUser.subscribe((data) => {
      this.authenticatedUser = data;
     
    })
  }

  ngOnInit(): void {
    this.userService.updateProfile(this.userService.getAuthUser().id);
    
  }

  displayPost(postId:string){
      this.showPost(postId)
  }

  loadThumbnail(url:string){
    return url+'#t=2';
  }

  showPost(postId:any){
    console.log("inside show post");
    
    console.log(postId);
    
    this.selected=postId;
    this.postservice.viewPost(postId);
  }

  getUser() {  
   
    if(this.authenticatedUser.profile==null)
    {
      console.log("Empty profile");
      this.authenticatedUser.profile="https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
    }
    this.postservice.viewProfilePosts(this.authenticatedUser.id).subscribe((data)=>{
       this.postDetails=data.reverse();
       console.log(this.postDetails);
       
    })
    
  }

  
  isImage(url: string) {
    return this.postservice.isImage(url);
  }

  showchooseProfile(){
    this.hidechooseProfile=false;
  }
  closechooseProfile(){
    this.hidechooseProfile=true;
  }
  closeuploadProfile(){
    this.hideuploadProfile=true;
  }


    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      if(this.selectedFiles){
        this.hidechooseProfile=true;
        this.hideuploadProfile=false;
    }

}

  uploadProfile(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        let count=0;
        this.uploadService.pushFileToStorage(this.currentFileUpload,this.authenticatedUser.id,'profile').subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.isdisableok=true;
            if(this.percentage==100){      
              this.hidechooseProfile=true;
              this.hideuploadProfile=true;
              if(count===0){
                this.toaster.showSuccess('Profile updated successfully','success')
                count=1;
              }
            this.isdisableok=false;
            }
          },
          error => {
            console.log(error);
            this.toaster.showError('Profile updated Failed','error')
          }
        );
      }
    }
  }


  checkProfileUrl(url:any)
  {
    if(url!=null)
      return url;
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }
}
