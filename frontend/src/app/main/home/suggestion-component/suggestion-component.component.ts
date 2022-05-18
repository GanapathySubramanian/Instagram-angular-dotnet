import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-suggestion-component',
  templateUrl: './suggestion-component.component.html',
  styleUrls: ['./suggestion-component.component.scss']
})
export class SuggestionComponentComponent implements OnInit {
  authenticatedUser: User = {} as User;


  constructor(private userService: UserService) {
    this.authenticatedUser=this.userService.getAuthUser();
   
   }

  ngOnInit(): void {
    this.authenticatedUser= this.userService.getAuthUser();
  }
  checkProfileUrl(url:any)
  {  
    if(url)
    {
      return 'http://54.87.204.229:8080/Instagram/'+url;
    }else{
      
      
      return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
    }
  }

}
