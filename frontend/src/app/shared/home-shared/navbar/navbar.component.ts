import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user/user';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private postservice:PostService,private router:Router,private userService:UserService) {
    this.userService.$authUser.subscribe((data) => {
      this.authenticatedUser = data;
    })
   }

   
  authenticatedUser: User={} as User;
  home: string = "assets/Images/home3.png";
  chat: string = "assets/Images/emptychat.png";
  square: string = "far fa-plus-square";
  compass: string = "far fa-compass";
  heart: string = "far fa-heart";
  onHomeClick(){
    if(this.home== "assets/Images/home3.png"){
      this.home = "assets/Images/filledhome1.png"
      this.chat = "assets/Images/emptychat.png"
      this.square = "far fa-plus-square"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"
    }else{
      this.home = "assets/Images/home3.png"
    }

    this.router.navigateByUrl('/home');
  }

  onChatClick(){
    if(this.chat== "assets/Images/emptychat.png"){
      this.chat = "assets/Images/filledchat.png"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"

    }else{
      this.chat = "assets/Images/emptychat.png"
    }
    this.router.navigateByUrl('/message');
  }

  onSquareClick(){
    if(this.square== "far fa-plus-square"){
      this.square = "fas fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"
    }else{
      this.square = "far fa-plus-square"
    }


    this.postservice.showCreatePost();

  }

  onCompassClick(){
    if(this.compass== "far fa-compass"){
      this.compass = "fas fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "far fa-heart"
    }else{
      this.compass = "far fa-compass"
    }

    this.router.navigateByUrl('/explore');
  }

  onHeartClick(){
    if(this.heart== "far fa-heart"){
      this.compass = "far fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "fas fa-heart"
    }else{
      this.heart = "far fa-heart"
    }
  }
  disableIcons(){
    
      this.compass = "far fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "far fa-heart"
  }
  
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

  ngOnInit(): void {
    this.authenticatedUser=JSON.parse(localStorage.getItem('user')!);
  }


  checkProfileUrl(url:any)
  {
    if(url){
      return url;
    }else{
    return "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

    }
  }

}
