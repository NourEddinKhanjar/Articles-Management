import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';

import {StorageService} from '@services/storage/storage.service';
import {StorageKeyType} from '@models/storage/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class ArticlesGuardService implements CanLoad {

  constructor(private router: Router, private storageService: StorageService) {
  }

  canLoad(route: Route): boolean {
    const authenticatedUser: boolean = this.storageService.get(StorageKeyType.User) != null;
    if (!authenticatedUser) {
      this.router.navigate(['/user']);
    }
    return authenticatedUser;
  }
}
