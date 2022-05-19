import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Like } from 'src/app/core/interfaces/react/like';
import { User } from 'src/app/core/interfaces/user/user';
import { Comment } from 'src/app/core/interfaces/react/comment';
import { Save } from 'src/app/core/interfaces/react/save';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService) { 
    console.log(this.postComment);
    
  }
  likeStatus: boolean = false;
  like: Like = {} as Like;

  postComment:string='';
  
  @Input() post!: Post;

  ispostoption: boolean = false;
  isEmojiPickerVisible: boolean=false;

  isdisablePause: boolean = false;

  ngOnInit(): void {
    this.likeStatus = this.post.liked ? true : false;

    console.log("post");
    
    console.log(this.post.postId);
    
    this.postService.userIsLiked(this.userService.getAuthUser().id, this.post.postId).subscribe((data) => {
      this.likeStatus = data ? true : false;
      if (this.likeStatus)
        this.like = data;
    })
    
    this.postService.userIsSaved(this.userService.getAuthUser().id,this.post.postId).subscribe((data)=>{
      console.log(data);
      this.saveStatus=data ? true : false;
      if(this.saveStatus)
      {
        this.save=data;
      }
    })
  }




  isImage(url: string) {
    return this.postService.isImage(url);
  }

  postOptions() {
    this.ispostoption = true;
  }


  loadThumbnail(url: string) {
    return url + '#t=2';
  }

  postView(postId: string) {
    this.postService.viewPost(postId);
  }

  closeOption() {
    this.ispostoption = false;
  }

  togglePlay() {
    if (this.isdisablePause) {
      this.isdisablePause = false;
    } else if (this.isdisablePause == false) {
      this.isdisablePause = true;
     
    }
  }

  addComment(postId:string){
    if(this.postComment.length>1){
    let commentData:Comment={} as Comment;
    commentData.postId=postId;
    commentData.userId=this.userService.getAuthUser().id;
    commentData.profile=this.userService.getAuthUser().profile;
    commentData.text=this.postComment;
    commentData.username=this.userService.getAuthUser().username;
    this.postService.commentPost(commentData).subscribe((data)=>{
      this.postComment='';
      this.isEmojiPickerVisible=false;

    });
  }
  }

  public addEmoji(event:any) {
     this.postComment= `${this.postComment}${event.emoji.native}`;
  }
  changeLikeStatus() {
    if (this.likeStatus) {
      if (this.like != undefined) {
        this.postService.unlikePost(this.like).subscribe((data) => {
          this.likeStatus = false;
          this.post.likes -= 1;
        },
        (error)=>{console.log(error);
        }
        );
      }
    }
    else {
      console.log("userid in comp: " + this.userService.getAuthUser().id);
      this.postService.likePost({
        userId: this.userService.getAuthUser().id,
        postId: this.post.postId,
        timeStamp: new Date()
      }).subscribe((data) => {
        this.like=data;
        this.likeStatus = true;
        this.post.likes += 1;
      });

      this.postService.userIsLiked(this.userService.getAuthUser().id, this.post.postId).subscribe((data) => {
        // this.likeStatus = data.liked ? true : false;
        this.likeStatus = data ? true : false;
        if (this.likeStatus)
          this.like = data;
        
      })
    }


  }

  
  saveStatus:boolean=false;
  save:Save={} as Save;
  changeSaveStatus() {
    if (this.saveStatus) {
      console.log("unlike");
      if (this.save != undefined) {
        this.postService.unsavePost(this.save).subscribe((data) => {
          console.log("unsave");
          
          this.saveStatus = false;
        },
        (error)=>{console.log("unlike err"+error);
        }
        );
        
      }
    }
    else {
      console.log("userid in comp: " + this.userService.getAuthUser().id);
      console.log("post id" + this.post.postId);

      this.postService.savePost({
        userId:this.userService.getAuthUser().id,
        postId:this.post.postId
      }).subscribe((data)=>{
        this.saveStatus=true;
      })

      this.postService.userIsSaved(this.userService.getAuthUser().id,this.post.postId).subscribe((data)=>{
        console.log(data);
        this.saveStatus=data ? true : false;
        if(this.saveStatus)
        {
          this.save=data;
        }
      })

    }
  }


  checkProfileUrl(url:any)
  {
    if(url)
    {
      return 'http://18.204.13.27:8080/Instagram/'+url;
    }else{
      return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
    }
  }

}
