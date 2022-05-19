import { Injectable } from '@angular/core';
import {PostForm} from "../../interfaces/post/post-form";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {FileUploadService} from "../media/file-upload.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Comment } from "../../interfaces/react/comment";
import {finalize, map} from "rxjs/operators";
import {Like} from "../../interfaces/react/like";
import {PostHover} from "../../interfaces/profile/post-hover";
import {Post} from "../../interfaces/post/post";
import { User } from '../../interfaces/user/user';
import { Save } from '../../interfaces/react/save';

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

  private baseURL: string = 'http://18.204.13.27:8080/api/'
  private backendURL: string = 'http://18.204.13.27:8080/Instagram/'
  

  constructor( private http: HttpClient) { }

  getPost( postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}posts/${postId}`).pipe(
      map((data:any) => {
        if(data){
          data.link = this.backendURL + data.link;
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
            data.forEach((res:any) => {
              if( postId === res.postId) {
                let temp: Comment = {
                  commentId: res.commentId,
                  userId: res.userId,
                  postId: res.postId,
                  profile:res.profile,
                  text: res.text,
                  username: res.username,
                  timeStamp: ''
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


  // Upload Post img to .Net Server
  uploadPost(file: File, userId: string) {
    const formData = new FormData(); 
    formData.append('file', file, userId+file.name);
    console.log("");
    return this.http.post(`${this.baseURL}PostUpload`, formData, {reportProgress: true, observe: 'events', responseType: 'text'});
  }

  createPost(user: User, caption: string, url: string,loc:string,turnoffcomment:number,turnofflike:number): Observable<any> {  
    console.log("post create:");
    console.log(user.id);
    return this.http.post(this.baseURL + 'posts/' + user.id, {link: url, caption: caption, userid: user.id,location:loc,commentStatus:turnoffcomment,likeCountStatus:turnofflike})
  }

 
  likePost( like: Like): Observable<any> {

    return this.http.post( this.baseURL + 'Likes', like).pipe(
      map((data) => {
        console.log(data);
        return data;
    })
    );
  }

  savePost( save: Save): Observable<any> {

    return this.http.post( this.baseURL + 'savedposts', save).pipe(
      map((data) => {
        console.log(data);
        return data;
    })
    );
  }

  commentPost(comment:Comment): Observable<any> {
    return this.http.post( this.baseURL + 'comments', comment).pipe(
      map((data) => {
        // this.getPost(comment.postId).subscribe( (data: Post) => {
        //   this.updateLikeCount(comment.postId, data.comments+1).subscribe();
        // });
        return data;
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
        // this.getPost(unlike.postId).subscribe( (data: Post) => {
        //   this.updateLikeCount(unlike.postId, data.likes-1).subscribe();
        // });
        return true;
      })
    );
  }

  unsavePost( unsave: Save): Observable<any> {
    return this.http.delete( `${this.baseURL}Savedposts/${unsave.saveId}`).pipe(
      map((data) => {
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
            res.link = this.backendURL + res.link;
            res.postId=res.id
          })
          data=data.reverse();
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
            res.link = this.backendURL + res.link;
          })
        return data;
        })
      ); 
  }

//   getAllPostsById(postId:string):Observable<any>{    
//     return this.http.get( `${this.baseURL}posts/${postId}`,{headers:{ "Access-Control-Allow-Origin": "*"}}).pipe(
//       map( (data: any) => {
//         console.log("post by id");
//         console.log(data);
//         let posts: PostHover[] = [];
//         posts.push(data)        
//         posts.forEach((res:any)=>{
//           res.postId=res.id
//           res.link = this.backendURL + res.link;
//         })
//       return posts;
//       })
//     ); 
// }

  getAllSavedPosts():Observable<any>{
    return this.http.get( this.baseURL+'Savedposts' ,{headers:{ "Access-Control-Allow-Origin": "*"}}).pipe(
      map( (data: any) => {
        let savedposts: Save[] = [];
        data.forEach((res:any)=>{
          res.saveId=res.id
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

  getPostSaves(postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}Savedposts`).pipe(
      map((data: any) => {

        if(data) {
          let saves: Save[] = [];
          data.forEach((res:any) => {

            if( postId === res.postId ) {
              let temp: Save = {
                saveId: res.id,
                postId: res.postId,
                userId: res.userId,
              }
              saves.push(temp);
            }
          })
          console.log(saves);
          return saves;
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

  userIsSaved( userId: string, postId: string): Observable<any> {
    return this.getPostSaves(postId).pipe(
      map((saves: Save[] ) => {
        console.log(saves);
        
        return saves.find( (save: Save) => save.userId === userId);
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

      // url = url.split('?')[0];
      return /\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|avif|AVIF|gif|GIF|svg|SVG)$/.test(url);
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
              // link: post.link,
              link:this.backendURL+post.link,
              caption: post.caption,
              timeStamp:'',
              likes: post.likeCount,
              comments: post.commentCount,
              profileLink:post.link,
              location:post.location
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

  
