import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {SignedUserService} from '@services/signed-user/signed-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private signedUserService: SignedUserService, private router: Router) { }

  ngOnInit() {
  }

  get userFullName(): string{
    const user = this.signedUserService.getSignedUser();
    return `${user.firstName} ${user.lastName}`;
  }

  logout(){
    this.signedUserService.logout();
    this.router.navigate(["/user"]);
  }

}
