import { Component, OnInit } from '@angular/core';
import { PostHover } from 'src/app/core/interfaces/profile/post-hover';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  postDetails:PostHover[]=[];
  noOfRows = 0;
  selected:string='';
  
  constructor(private postservice:PostService) { 
     this.getExplorePosts();
  }

  getExplorePosts(){
    this.postservice.getAllPosts().subscribe(res=>{
      this.postDetails=res;
      console.log(this.postDetails);
      
      this.postDetails = this.shuffleArray();
    });
  }

  isImage(url: string) {
    return this.postservice.isImage(url);
  }

  loadThumbnail(url:string){
    return url+'#t=2';
  }

  ngOnInit(): void {
  }
  showPost(postId:string){
    
    console.log(postId);
    
    this.selected=postId;
    this.postservice.viewPost(postId);
  }

  checkFormat(url:any,index:number)
  {
    if(!this.isImage(url))
    {
      return "video-container";  
    }
    return "image-container"
  }

  shuffleArray(){
  return  this.postDetails
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  }

  // changeStyleForClass(className:string,position:number)
  // {
  //   console.log(className)
  //   if (this.checkFormat(className,position) != "image-container")
  //   {
  //     const gridCell = <HTMLElement> document.getElementsByClassName(className)[0];
  //     gridCell.style.gridColumn = 'span 2';
  //     gridCell.style.gridRow = 'span 2'
  //     return true;
  //   }
  //   return false;
  // }

}
