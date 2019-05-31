import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';

import {SignedUserService} from '@services/signed-user/signed-user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesGuardService implements CanLoad {

  constructor(private router: Router, private signedUserService: SignedUserService) {
  }

  canLoad(route: Route): boolean {
    const authenticatedUser: boolean = this.signedUserService.getSignedUser() != null;
    if (!authenticatedUser) {
      this.router.navigate(['/user']);
    }
    return authenticatedUser;
  }
}
