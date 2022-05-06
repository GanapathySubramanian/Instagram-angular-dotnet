import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostComponent } from './view-post/view-post.component';

import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    CreatePostComponent,
    NavbarComponent,
    ViewPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports:[
    ViewPostComponent,
    CreatePostComponent,
    NavbarComponent
  ]
})
export class HomeSharedModule { }
