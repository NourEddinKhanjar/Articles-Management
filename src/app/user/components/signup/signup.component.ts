import { Component, OnInit } from '@angular/core';

import {User} from '@userModels/user/user.model';

import {UserService} from '@userServices/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = User.create();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signup(): void{
    if(this.userService.isExistedUser(this.user.email)){
      alert("The user with the provided email is already existed");
      return;
    }

    this.userService.addUser(this.user);
    this.router.navigate(["/articles"]);
  }

}
