import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Like } from 'src/app/core/interfaces/react/like';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService) { }
  likeStatus: boolean = false;
  like: Like = {} as Like;

  
  @Input() post!: Post;

  ispostoption: boolean = false;

  isdisablePause: boolean = false;

  ngOnInit(): void {
    // if(this.post.liked != undefined)

    this.likeStatus = this.post.liked ? true : false;

    console.log("post");
    
    console.log(this.post.postId);
    
    this.postService.userIsLiked(this.userService.getAuthUser().id, this.post.postId).subscribe((data) => {
      this.likeStatus = data ? true : false;
      if (this.likeStatus)
        this.like = data;
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

  checkProfileUrl(url:any)
  {
    if(url!=null)
      return url;
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }

}
