import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-story-component',
  templateUrl: './story-component.component.html',
  styleUrls: ['./story-component.component.scss']
})
export class StoryComponentComponent implements OnInit {

  users:any=Array() ;

  constructor(private userService:UserService) { 
    this.userService.getUsers().subscribe(res=>this.users=res);
  }

  ngOnInit(): void {
  }

  checkProfileUrl(url:any)
  {
    if(url!=null)
    return url;
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }

}
