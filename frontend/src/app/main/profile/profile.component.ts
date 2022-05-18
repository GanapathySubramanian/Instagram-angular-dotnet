import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
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
  hidesetting:boolean=true;
  selected:string='';
  savedPosts:any[]=[];
  constructor(private userService: UserService  ,private postservice:PostService,private uploadService: FileUploadService,private toaster:ToastNotificationService) {
  
    this.authenticatedUser = this.userService.getAuthUser();
    this.getUser();
    this.userService.$authUser.subscribe((data) => {
      this.authenticatedUser = data;
    })
    this.postservice.$profilepost.subscribe((data)=>{
      this.postDetails=data;
      console.log(data);  
    })
    this.getSavedData()

}


  getSavedData(){
    this.postservice.getAllSavedPosts().subscribe((data)=>{
      data=data.filter((temp:any)=>temp.userId==this.userService.getAuthUser().id)
      this.postservice.getAllPosts().subscribe((res)=>{
        let finalArr:any[]=[];
        res.forEach((val:any)=>{
          data.forEach((val2:any)=>{
              if(val.postId==val2.postId){
                    finalArr.push(val)
              }
          })
        })
        this.savedPosts=finalArr;
      })
    })

  } 
  ngOnInit(): void {
    this.getSavedData()
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
    
    this.postservice.viewProfilePosts(this.authenticatedUser.id).subscribe((data)=>{
       this.postDetails=data;
       console.log(this.postDetails);
    })
  }

  
  
  isImage(url: string) {
    return this.postservice.isImage(url);
  }

  showchooseProfile(){
    this.hidechooseProfile=false;
  }
  showsettings(){
    this.hidesetting=false;
  }
  closechooseProfile(){
    this.hidechooseProfile=true;
  }
  closeuploadProfile(){
    this.hideuploadProfile=true;
  }
  closesettings(){
    this.hidesetting=true;
  }


    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      if(this.selectedFiles){
        this.hidechooseProfile=true;
        this.hideuploadProfile=false;
    }

}

removeProfile(){
  this.userService.removeProfile(this.authenticatedUser).subscribe((res)=>{
    localStorage.setItem('user', JSON.stringify(res));
    this.hidechooseProfile=true;
    
    this.toaster.showSuccess('profile removed successfully','success')
  });
}
uploadProfile(): void {
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    if (file) {
      // this.currentFileUpload = new FileUpload(file);
      let count=0;
      this.postservice.uploadPost(file, this.authenticatedUser.id).subscribe({
          next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total)
            this.percentage = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            if(count===0){
                console.log("ASasnasjnj");
                
              console.log(event.body);

              this.userService.uploadProfilePost(this.authenticatedUser,event.body? event.body:'').subscribe({
                next: (data) => {
                this.userService.updateProfile(this.userService.getAuthUser().id);
                  console.log('uploaded');
                  this.hideuploadProfile=true;
                  this.toaster.showSuccess('profile updated successfully','success')
                  count=1;
                },
                error: (e) => {
                  console.log("error in profile upload");        
                },
                complete: () => {
                }
            })
              
             
            }
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }
  }
}

  

  checkProfileUrl(url:any)
  {
    if(url)
    {
      return 'http://54.87.204.229:8080/Instagram/'+url;
    }else{
      return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
    }
  }
}
