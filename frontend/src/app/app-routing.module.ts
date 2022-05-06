import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/app-module/login/login.component';
import { NavbarComponent } from './shared/home-shared/navbar/navbar.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SignupComponent } from './main/app-module/signup/signup.component';
import { ExploreComponent } from './main/explore/explore.component';
import { HomeComponentComponent } from './main/home/home-component/home-component.component';
import { MessagesComponent } from './main/messages/messages.component';
import { StoryViewComponent } from './main/story-view/story-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponentComponent},
  { path: 'profile',component:ProfileComponent},
  {path:'explore',component:ExploreComponent},
  { path: 'logout', redirectTo: 'login', pathMatch: 'full'}, 
  { path: 'message', component: MessagesComponent},
  {path:'stories',component:StoryViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
