import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { Comment } from 'src/app/core/interfaces/react/comment';
import { Like } from 'src/app/core/interfaces/react/like';
import { User } from 'src/app/core/interfaces/user/user';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post:Post={} as Post;
  comments:Comment[]=[];

  postComment:string='';

  postId:string='';

  isdisablepostview:boolean=true;

  url:string="";

  format:any;
  isdisablePause: boolean=false;
  isdisableaudio:boolean=false;
  ispostoption:boolean=false;

  // isuser:boolean=false;
  

  video = document.querySelector('video');

  constructor(private postservice:PostService, private userService: UserService) {
    this.viewPost();
    console.log("constructor of view post"); 
  }

  deletePost(postId:string,userId:string){
    this.postservice.deletePostById(postId,userId);
    this.ispostoption=false;
  }

  addComment(postId:string){
    let commentData:Comment={} as Comment;
    commentData.postId=postId;
    commentData.userId=this.userService.getAuthUser().id;
    commentData.profile=this.userService.getAuthUser().profile;
    commentData.text=this.postComment;
    commentData.username=this.userService.getAuthUser().username;
    this.postservice.commentPost(commentData).subscribe((data)=>{
      this.postComment='';
      this.postservice.getPostComments(data.postId).subscribe((res)=>{
        this.comments=res;

        // this.comments.forEach((data)=>{
        //   if(!data.profile){
        //     data.profile="https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
        //   }
        // })
      })
    });
  }
  
  getPost(postId: string) {
    console.log("getpost");
    console.log(postId);
    
    
      this.postservice.getPost(postId).subscribe((data)=>{     
        this.post=data;
        console.log("data");
        console.log(data);
        
        console.log(this.post.postId);
        
        // this.userService.getUserWithId(this.post.postId).subscribe((user) => {
          // console.log(user);
          
          // this.post.user.username = user?.username;
          // this.post.profileLink = user?.profile;
        // })
       
        if(this.postservice.isImage(this.post.link)){
          this.format='image';
        }
        else{
          this.format='video';
        }
        this.url=this.post.link;
        //here
        console.log(this.userService.getAuthUser().id);
        // console.log(this.post.postId);
        
        
        this.postservice.userIsLiked(this.userService.getAuthUser().id, postId).subscribe((data) => {
          console.log("like status: " + data);

          // this.likeStatus = data.liked ? true : false;
          this.likeStatus = data ? true : false;
          if (this.likeStatus)
            this.like = data;
        })
    });
    
    this.postservice.getPostComments(this.postId).subscribe((data)=>{
      this.comments=data;
    })
  }

  isUser(){

    let user:any=localStorage.getItem('user');
    if(user){
      if(JSON.parse(user).id===this.post.user?.id){
          return true;
      }
    }
  return false;
  }
  

  ngOnInit(): void {
    this.isdisablepostview=true;
    this.checkFormat();    


    this.postservice.$postid.subscribe((data)=>{
      this.postId=data
      
      this.getPost(this.postId);  
    })
   
    
  }




  viewPost() {
    //to display the overlay of viewpost
    this.postservice.showpostData.subscribe((data)=>{
      this.isdisablepostview=data;
    })

    //to verify the url is image or video
    this.postservice.$postURL.subscribe((data) => {
      this.url =  data;
      if(this.postservice.isImage(data))
        this.format = 'image';
      else
        this.format = 'video';
        
      
    })
    
  }

  checkFormat(){
    const file = this.url;
    this.format='video';
    if(this.format=='video'){
      this.isdisablePause=false;
    }
  }

  hidePost(){
    if(this.isdisablepostview==false){
      this.pauseVideo('pause');
      this.isdisablePause=false;
      this.isdisablepostview=true;
    }

  }
    togglePlay(){
     if(this.isdisablePause){
       this.isdisablePause=false;
       
     }else if(this.isdisablePause==false){
      this.isdisablePause=true;
      
     }
  }
  
  postOptions(){
    this.ispostoption=true;
  }

  closeOption(){
    this.ispostoption=false;
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


  checkProfileUrl(url:any)
  {
    if(url!=null)
      return url;
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }


  likeStatus: boolean = false;
  like: Like = {} as Like;

  changeLikeStatus() {
    
    if (this.likeStatus) {
      console.log("unlike");
      
      if (this.like != undefined) {
        this.postservice.unlikePost(this.like).subscribe((data) => {
          console.log("unliked");
          
          this.likeStatus = false;
        },
        (error)=>{console.log("unlike err"+error);
        }
        );
      }
    }
    else {
      console.log("userid in comp: " + this.userService.getAuthUser().id);
      console.log("post id" + this.post.postId);
      
      this.postservice.likePost({
        userId: this.userService.getAuthUser().id,
        postId: this.post.postId,
        timeStamp: new Date()
      }).subscribe((data) => {
        this.likeStatus = true;
      });


      this.postservice.userIsLiked(this.userService.getAuthUser().id, this.postId).subscribe((data) => {
        console.log("like status: " + data);

        // this.likeStatus = data.liked ? true : false;
        this.likeStatus = data ? true : false;
        if (this.likeStatus)
          this.like = data;
      })

    }
  }

      
}
