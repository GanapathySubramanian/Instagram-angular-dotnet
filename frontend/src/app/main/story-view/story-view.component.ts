import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss']
})
export class StoryViewComponent implements OnInit {
  
  progressbarValue = 0;

  private _curSec = new Subject<number>();
  readonly curSec$ = this._curSec.asObservable();
  curSec: number = 0;
  sub:any;

  index = 0;

  posts = [
    "https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301__340.jpg",
    "https://m.media-amazon.com/images/I/81HgVEqBVuL._SL1500_.jpg",
    "https://www.jiomart.com/images/product/original/rvwpkd53vy/hanish-arts-crafts-scenery-canvas-painting-handmade-painting-18-x-24-unframed-product-images-orvwpkd53vy-p590815153-0-202110082026.jpg"

  ];
  storyImageElement!:any ;

  constructor(){

    this.curSec$.subscribe(res=>{
      this.index++;
      if(!this.isLastPost())
      {
        this.startTimer(5);
        this.storyImageElement.src = this.posts[this.index];
        this.progressbarValue = 0;
      }
    });

  }

  ngOnInit(): void {

    this.storyImageElement = document.getElementById("story-img") as HTMLImageElement;
    this.storyImageElement.src = this.posts[this.index];
    this.startTimer(5);
    
  }

  isLastPost()
  {
    if(this.index >= this.posts.length)
    return true;
    return false;
  }

  startTimer(seconds: number) {

    const time = seconds;
    const timer$ = interval(250);

    this.sub = timer$.subscribe((sec) => {
      
      this.progressbarValue = 0 + sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        this.sub.unsubscribe();
        this._curSec.next(this.curSec);
      }
    });
  }

  checkIfActive(index:number):number
  {
    if(index == this.index)
    return this.progressbarValue;
    if(index < this.index)
    return 100;
    return 0;
  }
  

  prevStory()
  {
    this.sub.unsubscribe();
    this.index--;
    this.startTimer(5);
    this.progressbarValue = 0;
    if(this.index<0)
    {
      this.index = 0;
    }    
      this.storyImageElement.src = this.posts[this.index];
    
  }

  nextStory(){
    this.sub.unsubscribe();
    this.index++;
    this.progressbarValue = 0;
    if(this.isLastPost())
    {
      this.index = this.posts.length-1;
      this.progressbarValue = 100;
    }
      this.startTimer(5);
      this.storyImageElement.src = this.posts[this.index];
  }
}
