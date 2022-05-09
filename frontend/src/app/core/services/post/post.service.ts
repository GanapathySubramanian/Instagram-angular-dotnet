import { Injectable } from '@angular/core';
import {PostForm} from "../../interfaces/post/post-form";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FileUploadService} from "../media/file-upload.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Comment } from "../../interfaces/react/comment";
import {finalize, map} from "rxjs/operators";
import {Like} from "../../interfaces/react/like";
import {PostHover} from "../../interfaces/profile/post-hover";
import {Post} from "../../interfaces/post/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  private hidecreatepost = new BehaviorSubject<boolean>(true);
  hidepost = this.hidecreatepost.asObservable();

  private viewpost = new BehaviorSubject<boolean>(true);
  showpostData = this.viewpost.asObservable();

  private postURL = new BehaviorSubject<string>("");
  $postURL = this.postURL.asObservable();
  
  private postid = new BehaviorSubject<string>("");
  $postid = this.postid.asObservable();

  private profilepost = new BehaviorSubject<PostHover[]>([]);
  $profilepost = this.profilepost.asObservable();

  private baseURL: string = 'https://localhost:5001/api/'

  constructor( private http: HttpClient) { }

  getPost( postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}posts/${postId}`).pipe(
      map((data:any) => {
        if(data){
          data.postId = data.id;
          return data;
        }
      })
    );
  }

  getPostComments( postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}comments`).pipe(
      map((data: any) => {
        if(data){
            let comments: Comment[] = [];
            Object.keys(data).forEach( key => {
              if( postId === data[key].postId) {
                let temp: Comment = {
                  commentId: key,
                  userId: data[key].userId,
                  postId: data[key].postId,
                  text: data[key].text,
                  username: data[key].username,
                  timeStamp: data[key].timeStamp
                }
                comments.push(temp);
              }
            });
            return comments;
        }
        return [];
      })
    );
  }

  createPost( post: PostForm): Observable<any> {
    post.likes = 0;
    post.comments = 0;
    return this.http.post(this.baseURL + 'posts', post);
  }

  likePost( like: Like): Observable<any> {

    return this.http.post( this.baseURL + 'Likes', like).pipe(
      map((data) => {
        this.getPost(like.postId).subscribe( (data: Post) => {
          this.updateLikeCount(like.postId, data.likes+1).subscribe();
        });
        return true;
    })
    );
  }

  commentPost( comment: Comment): Observable<any> {
    return this.http.post( this.baseURL + 'comments', comment).pipe(
      map((data) => {
        this.getPost(comment.postId).subscribe( (data: Post) => {
          this.updateLikeCount(comment.postId, data.comments+1).subscribe();
        });
        return true;
      })
    );
  }

  updateLikeCount( postId: string, count: number): Observable<any> {
    console.log(postId);
    let temp={"likeCount":count};
    return this.http.patch(`${this.baseURL}posts/${postId}`,temp);
  }

  updateCommentCount( postId: string, count: number): Observable<any> {
    return this.http.patch(`${this.baseURL}posts/${postId}`, { comments: count });
  }

   

  unlikePost( unlike: Like): Observable<any> {
    return this.http.delete( `${this.baseURL}Likes/${unlike.likeId}`).pipe(
      map((data) => {
        // console.log('post return '+data);
        this.getPost(unlike.postId).subscribe( (data: Post) => {
          this.updateLikeCount(unlike.postId, data.likes-1).subscribe();
        });
        return true;
      })
    );
  }


  showCreatePost(){
      this.hidecreatepost.next(false);
  }


  viewProfilePosts( userId?: string) : Observable<any> {
    console.log("iam the view");
    return this.http.get(this.baseURL+'posts/user/'+userId ).pipe(
      map( (data: any) => {
        console.log(data);
        
          data.forEach((res:any)=>{
            res.postId=res.id
          })
          this.profilepost.next(data);
          
        return data;
      })
    );
  }

  getAllPosts():Observable<any>{

      return this.http.get( this.baseURL+'Posts' ,{headers:{ "Access-Control-Allow-Origin": "*"}}).pipe(
        map( (data: any) => {
          let posts: PostHover[] = [];
          data.forEach((res:any)=>{
            res.postId=res.id
          })
        return data;
        })
      );
    
  }

  deletePostById(postid:string,userid:string){
    return this.http.delete( `${this.baseURL}Posts/${postid}`)
    .subscribe(
      {
        next: (data) => {
          console.log("changed status");
          this.viewProfilePosts(userid).subscribe(()=>{
            this.viewpost.next(true);
          });
          
        },
        error: (e) => {
         
        },
        complete: () => {
          
        }
      }
    )
    
  }


  getPostLikes(postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}likes`).pipe(
      map((data: any) => {

        if(data) {
          let likes: Like[] = [];
          data.forEach((res:any) => {

            if( postId === res.postId ) {
              let temp: Like = {
                likeId: res.likeId,
                postId: res.postId,
                userId: res.userId,
                // timeStamp: data[key].timeStamp
              }
              likes.push(temp);
            }
          })
          return likes;
      } else{
        return [];
      }
      })
    );
  }

  userIsLiked( userId: string, postId: string): Observable<any> {
    return this.getPostLikes(postId).pipe(
      map((likes: Like[] ) => {
        return likes.find( (like: Like) => like.userId === userId);
      })
    );
  }


  showPost(postId: string){
    this.viewpost.next(false);

    // this.http.get<Post[]>("assets/static-data/posts.json").subscribe(data => {    
    //     this.postURL.next(data.find(post => post.postId === postId)?.link!);
    // })
  }

  viewPost(postId:string){
    this.viewpost.next(false);
    this.postid.next(postId);
  }  

    isImage(url: string) {
      url = url?.split('?')[0];
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }


    homeProfilePosts( userId: string) : Observable<any> {
      return this.http.get( this.baseURL+'Posts' ).pipe(
        map( (data: any) => {
          let posts: Post[] = [];
          data=data.filter((temp:any)=>temp.user.id!=userId)
          // console.log(data);
          data.forEach( (post:any) => {
            let temp: Post = {
              postId: post.id,
              user: post.user,
              link: post.link,
              caption: post.caption,
              timeStamp:'',
              likes: post.likeCount,
              comments: post.commentCount,
              profileLink: post.link
            }
            // if(userId !== data.user.id) {
                posts.push(temp);
            // }
          });
          return posts;
        })
      );
      }


  }

  
