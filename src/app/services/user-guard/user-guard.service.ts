import { Injectable } from '@angular/core';
import {Route, Router} from '@angular/router';

import {StorageService} from '@services/storage/storage.service';
import {StorageKeyType} from '@models/storage/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router: Router, private storageService: StorageService) {
  }

  canLoad(route: Route): boolean {
    const unAuthenticatedUser: boolean = this.storageService.get(StorageKeyType.User) == null;
    if (!unAuthenticatedUser) {
      this.router.navigate(['/articles']);
    }
    return unAuthenticatedUser;
  }
}
