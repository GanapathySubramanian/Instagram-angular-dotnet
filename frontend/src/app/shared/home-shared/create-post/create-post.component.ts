import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user/user';
import { FileUpload } from 'src/app/core/models/file-upload';
import { FileUploadService } from 'src/app/core/services/media/file-upload.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastNotificationService } from 'src/app/core/services/toaster/toast-notification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  authenticatedUser: User={} as User;
  disableupload:boolean=true;
  disablechoose:boolean=true;
  
  
  format:any;
  url:any;
  
  location:string='' 
  caption:string='';
  length:number=0;
  turnOffLike:number=0;
  turnOffComment:number=0;

  isaccess:boolean=false;
  isadvance=false;
  isdiscard=false;
  isdisableShare=true;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

 isEmojiPickerVisible: boolean=false;

  public addEmoji(event:any) {
     this.caption= `${this.caption}${event.emoji.native}`;
  }
  
  ngOnInit(): void {
    this.disableupload=true;
    this.disablechoose=true;
    this.authenticatedUser=JSON.parse(localStorage.getItem('user')!);
    
  }

  checkProfileUrl(url:any)
  {
    if(url){
      return 'http://18.204.13.27:8080/Instagram/'+url;
    }else{
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

    }
  }


    
    constructor(private postservice:PostService,private userService:UserService,private postService: PostService,private toaster:ToastNotificationService) {
      this.displaypost(); 
      this.userService.$authUser.subscribe((data) => {
        this.authenticatedUser = data;
      })      
    }


    changeComment(){
        this.turnOffComment=1;
        console.log(this.turnOffComment);
        
    }

    changeLike(){
      
      this.turnOffLike=1;
      console.log(this.turnOffLike);
      
    }

  displaypost() {
    this.postservice.hidepost.subscribe((data)=>{
      this.disablechoose=data;
    })
  }

    showAccessbility(){
      if(this.isaccess==true){
        this.isaccess=false;
      }else{
        this.isaccess=true;
      }
    }

    showAdvanceSetting(){
      if(this.isadvance==true){
        this.isadvance=false;
      }else{
        this.isadvance=true;
      }
    }
    
    captionlength(){
       this.length=this.caption.length;
       if(this.length>0){
          this.isdisableShare=false;
       }
    }

    closeChoose() {
      this.disablechoose=true;
    }

    closeUpload(){
      this.pauseVideo('pause')
      this.disableupload=false;
      this.isdiscard=true;
      this.isEmojiPickerVisible = false;
    }

    discardAll(){
      this.pauseVideo('pause')
      this.isdiscard=false;
      this.disableupload=true;
      this.caption='';
      this.isaccess=false;
      this.isadvance=false;
      this.isEmojiPickerVisible = false;
    }
    
    closeDiscard(){
      // this.pauseVideo('play')
      this.isdiscard=false;
      this.disableupload=false;
       this.isEmojiPickerVisible = false;
     }
    
    openChoose(){
      this.disableupload=true;
      this.disablechoose=false;
    }

    pauseVideo = function (s:string) {
      var iframe =document.querySelector( 'iframe');
      var video = document.querySelector( 'video' );
      if ( iframe ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
      if ( video &&s=='pause') {
        video.pause();
      }
      if( video && s=='play'){
        video.play();
      }
    };
   onChange(event:any) {

    this.selectFile(event);

      const file = event.target.files && event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.format = 'image';
        } else if(file.type.indexOf('video')> -1){
          this.format = 'video';
        }
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
          console.log(this.url);
          
        }
        this.disableupload=false;
        this.disablechoose=true;
      }else{
        this.disableupload=true;
          this.disablechoose=false;
      }
    }


    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }

    



    upload(): void {
      if (this.selectedFiles&&this.length>0) {
        const file: File | null = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        if (file) {
          // this.currentFileUpload = new FileUpload(file);
          let count=0;
          this.postService.uploadPost(file, this.authenticatedUser.id).subscribe({
              next: (event) => {
              if (event.type === HttpEventType.UploadProgress && event.total)
                this.percentage = Math.round(100 * event.loaded / event.total);
              else if (event.type === HttpEventType.Response) {
                if(count===0){

                  console.log(event.body);

                  this.postService.createPost(this.authenticatedUser, this.caption,event.body? event.body:'',this.location,this.turnOffComment,this.turnOffLike).subscribe({
                    next: (data) => {
                      this.caption='';
                      this.isdisableShare=false;
                      this.disableupload=true;
                      this.isEmojiPickerVisible=false;
                      this.location='';
                      this.isaccess=false;
                      this.isadvance=false;
                      // this.showAccessbility();
                      // this.showAdvanceSetting();
                      this.pauseVideo('pause')
                      this.turnOffComment=0;
                      this.turnOffLike=0;
                      this.toaster.showSuccess('Post uploaded successfully','success')
                      count=1;
                    },
                    error: (e) => {
                      console.log("error in create post");        
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
          // this.uploadService.pushFileToStorage(this.currentFileUpload,this.authenticatedUser.id,'post',this.caption).subscribe(
          //   percentage => {
          //     // this.toaster.showPending('Post is uploading wait','info')
          //     this.percentage = Math.round(percentage ? percentage : 0);
          //     this.isdisableShare=true;
          //     if(this.percentage==100){       
          //       this.caption='';
          //       this.isdisableShare=false;
          //       this.disableupload=true;
          //       if(count===0){
          //         this.toaster.showSuccess('Post uploaded successfully','success')
          //         count=1;
          //       }
          //     }
          //   },
          //   error => {
          //     console.log(error);
          //     this.toaster.showError('Post upload Failed','error')
          //   }
          // );
        // }
    //   }
    // }

}
