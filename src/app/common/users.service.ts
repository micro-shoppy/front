import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    return this.http.post(this.usersUrl,
      {
        email: user.email,
        password:user.password
      }).pipe(
      map(() => true),
      catchError(() => of(false)),
      share()
    )
  }

  getAuthentication(user: User): Observable<boolean> {
    return this.http.post(this.usersUrl + "/authenticate",
      {
        email: user.email,
        password: user.password
    }).pipe(
      tap(data => localStorage.setItem("access_token", data.toString())),
      map(() => true),
      catchError(() => of(false)),
      share()
    )
  }

  getUser(): Observable<User> {
    return this.http.get(this.usersUrl, this.env.getAuthHeader())
      .pipe(
        map(data => Object.assign(new User(), data)),
        share()
      )
  }
}
