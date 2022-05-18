import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-story-component',
  templateUrl: './story-component.component.html',
  styleUrls: ['./story-component.component.scss']
})
export class StoryComponentComponent implements OnInit {

  users:any=Array() ;
  authenticatedUser:User={} as User;
  constructor(private userService:UserService) { 
    this.authenticatedUser=this.userService.getAuthUser();
    this.userService.getUsers().subscribe(res=>this.users=res);
    console.log(this.authenticatedUser);
    
  }

  ngOnInit(): void {
  }

  checkProfileUrl(url:any)
  {
    if(url){
      return url;
    }
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }

}
