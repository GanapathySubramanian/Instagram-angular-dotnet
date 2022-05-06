import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }
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
