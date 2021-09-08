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

  email: String;
  password: String;
  loggedIn: boolean;
  user: User;
  orders: Order[];

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
    this.usersService.createUser(Object.assign(new User(), {
      email: this.email,
      password: this.password
    }))
      .subscribe(created => {
      if (created) {
        console.log("User created successfully!")
      }
    })
  }

  login() {
    this.usersService.getAuthentication(Object.assign(new User(), {
      email: this.email,
      password: this.password
    }))
      .subscribe( logged => {
        if (logged) {
          this.usersService.getUser().subscribe(user => {
            this.user = user;
            if (this.user.roles.find(role => role.toLowerCase() == 'admin') != null) {
              this.router.navigate(['/admin-panel']).then(r => console.log(r));
            }
            else {
              window.location.reload()
            }
          });
        }
      });

  }
}
