import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../common/users.service";
import {User} from "../../common/entities/user";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  username: String;
  email: String;
  password: String;
  loggedIn: boolean;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem("access_token") != undefined;
  }

  createAccount() {
    this.usersService.createUser(Object.assign(new User(), {
      username: this.username,
      email: this.email,
      password: this.password
    }))
  }

  login() {
    this.usersService.getAuthentication(Object.assign(new User(), {
      username: this.username,
      email: this.email,
      password: this.password
    }))
  }
}
