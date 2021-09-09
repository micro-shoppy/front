import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../common/users.service";
import {User} from "../../common/entities/user";
import {Router} from "@angular/router";
import {Order} from "../../common/entities/order";
import {OrdersService} from "../../common/orders.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  // email: String;
  // password: String;
  loggedIn: boolean;
  // user: User;
  orders: Order[];
  loggedUser: User = Object.assign(new User(), {email: "", password: ""});
  newUser: User = Object.assign(new User(), {email: "", password: ""});

  constructor(private usersService: UsersService,
              private router: Router,
              private orderService: OrdersService) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem("access_token") != undefined;
    if (!this.loggedIn) {
      console.log("No user is logged in...")
    }
    else {
      this.orderService.getOrders().subscribe(orders => this.orders = orders);
    }
  }

  createAccount() {
    this.usersService.createUser(this.newUser)
      .subscribe(created => {
      if (created) {
        console.log("User created successfully!")
      }
    })
  }

  login() {
    this.usersService.getAuthentication(this.loggedUser)
      .subscribe( logged => {
        if (logged) {
          this.usersService.getUser().subscribe(user => {
            this.loggedUser = user;
            if (this.loggedUser.isAdmin) {
              localStorage.setItem("isAdmin", 'true');
              this.router.navigate(['/admin-panel']).then(r => console.log(r));
            }
            else {
              localStorage.setItem("isAdmin", 'false');
              this.loggedIn = logged;
              window.location.reload()
            }
          });
        }
      });
  }

  logout() {
    localStorage.clear()
  }
}
