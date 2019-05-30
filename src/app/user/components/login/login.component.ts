import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from '@userModels/user/user.model';
import {UserService} from '@userServices/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = User.create();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    if(!this.userService.validLoginUser(this.user)){
      alert("Invalid email or password");
      return;
    }

    this.userService.login(this.user);
    this.router.navigate(["/articles"])
  }
}
