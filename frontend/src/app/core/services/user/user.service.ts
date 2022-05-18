import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserForm} from "../../interfaces/user/user-form";
import {User} from "../../interfaces/user/user";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL: string = 'https://kwuyw1vw65.execute-api.us-east-1.amazonaws.com/api/';
  private backendURL: string = ''
  private _authUser = new Subject<User>();
  readonly $authUser = this._authUser.asObservable();
  private authUser: User = {} as User;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseURL + 'users').pipe( map((users: any) => {
      if(users){
      // let users: User[] = [];
      // Object.keys(data).forEach(key => {
      //   let temp: User = {
      //     id: key,
      //     username: data[key].username,
      //     email: data[key].email,
      //     name: data[key].name,
      //     profile: data[key].profile,
      //     password: data[key].password
      //   }
      //   users.push(temp);
      // })
      return users;
    } else{
      return [];
    }
    } ))
  }

  createUser( user: UserForm): Observable<any> {
    user.posts = false;
    return this.http.post(this.baseURL + 'Users', user);
  }

  isUser( username: string): Observable<any> {
    return this.getUsers().pipe( map((users: User[])=> {
      let index = users.findIndex( (user: User) => user.username === username)
      return index!==-1;
    }))
  }

  // uploadProfilePost(user:User,url:string){
  //   console.log(user);
  //   console.log(url);
  //   return this.http.post(this.baseURL + 'users/profile/' + user.id, {user:user,url:url})
  // }

  getUserWithUsername( username: string): Observable<any> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find( ( user: User ) => username === user.username))
    );
  }

  getUserWithId( id: string): Observable<any> {
    return this.getUsers().pipe(
      map( (users: User[]) => users.find( (user: User ) => id === user.id))
    );
  }

  uploadProfilePost( user:User, url: string): Observable<any> {
    user.profile=url;
    console.log(user); 
    let data:User={} as User;
    data=user;
    return this.http.post(`${this.baseURL}users/${user.id}`,user);
  }

  getAuthUser() {
    var data=JSON.parse(localStorage.getItem('user')!);
    console.log(data);
    return data;
  }

 
  updateProfile(id: string) {
    this.getUserWithId(id).subscribe((data:any) => { 
        if(data){
          console.log("update profile: " );
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data));
          this._authUser.next(data);
        }    
        
      })
   
  }

  removeProfile(user:User):Observable<any>{
    user.profile=null;
    console.log(user); 
    return this.http.post(`${this.baseURL}users/${user.id}`,user);
  }
}
