import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfigService} from "./app-config.service";
import {User} from "./entities/user";
import {Observable, of} from "rxjs";
import {catchError, map, share, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl: string;

  constructor(private http: HttpClient, private env: AppConfigService) {
    this.usersUrl = env.usersResourcesUrl;
  }

  createUser(user: User): Observable<boolean> {
    return this.http.post(this.usersUrl, user).pipe(
      map(() => {
        console.log(`User ${user.username} created successfully!`)
        return true;
      }),
      catchError(() => of(false)),
      share()
    )
  }

  getUser(): Observable<User> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("access_token")}`)
    }
    return this.http.get(this.usersUrl, header)
      .pipe(
        map(data => Object.assign(new User(), data)),
        share()
      )
  }

  getAuthentication(user: User): Observable<boolean> {
    return this.http.post(this.usersUrl + "/authenticate", {
      email: user.email,
      password: user.password
    }).pipe(
      tap(data => localStorage.setItem("access_token", data.toString())),
      map(() => {
        console.log(`User ${user.username} created successfully!`)
        return true;
      }),
      catchError(() => of(false)),
      share()
    )

  }
}
