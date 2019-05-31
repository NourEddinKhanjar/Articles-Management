import { Injectable } from '@angular/core';
import {Route, Router} from '@angular/router';

import {SignedUserService} from '@services/signed-user/signed-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router: Router, private signedUserService: SignedUserService) {
  }

  canLoad(route: Route): boolean {
    const unAuthenticatedUser: boolean =  this.signedUserService.getSignedUser() == null;
    if (!unAuthenticatedUser) {
      this.router.navigate(['/articles']);
    }
    return unAuthenticatedUser;
  }
}
