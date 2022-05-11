import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  authenticatedUser:User={} as User;
  constructor(private userservice:UserService) { 
    this.authenticatedUser=this.userservice.getAuthUser();
  }
  show : boolean = true;

  ngOnInit(): void {
  }

  showChat(){
    if(this.show == true)
      this.show=false
    else  
      this.show=true
  }

}
