import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-suggestion-component',
  templateUrl: './suggestion-component.component.html',
  styleUrls: ['./suggestion-component.component.scss']
})
export class SuggestionComponentComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.$authUser.subscribe((data) => {
      this.authenticatedUser = data;
    })
   }

  ngOnInit(): void {
    this.authenticatedUser= this.userService.getAuthUser();
  }

  authenticatedUser: User = {} as User;



  checkProfileUrl(url:any)
  {
    if(url!=null)
      return url;
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
  }

}
