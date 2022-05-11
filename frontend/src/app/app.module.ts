import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeSharedModule } from './shared/home-shared/home-shared.module';

import { ExploreComponent } from './main/explore/explore.component';

import { HomeComponentComponent } from './main/home/home-component/home-component.component';
import { PostComponentComponent } from './main/home/post-component/post-component.component';
import { StoryComponentComponent } from './main/home/story-component/story-component.component';
import { SuggestionComponentComponent } from './main/home/suggestion-component/suggestion-component.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { SignupComponent } from './main/app-module/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './main/footer/footer.component';
import { LoginComponent } from './main/app-module/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { StoryViewComponent } from './main/story-view/story-view.component';
import { MessagesComponent } from './main/messages/messages.component';
import { PostItemComponent } from './main/home/post-item/post-item.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    HomeComponentComponent,
    PostComponentComponent,
    StoryComponentComponent,
    SuggestionComponentComponent,
    SignupComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    StoryViewComponent,
    MessagesComponent,
    PostItemComponent,
  ],

  imports: [
    BrowserModule,
    HomeSharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IvyCarouselModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({preventDuplicates:true}),
    PickerModule,
  ],
  providers: [],
 
  bootstrap: [AppComponent]
})
export class AppModule { }