import { Injectable } from '@angular/core';

import {IUser} from '@models/user/user.model';
import {StorageKeyType} from '@models/storage/storage-keys';
import {StorageService} from '@services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignedUserService {

  constructor(private storageService: StorageService) { }

  public getSignedUser(): IUser{
    return this.storageService.get<IUser>(StorageKeyType.User);
  }

  public logout(){
    this.setSignedUser(null);
  }

  public setSignedUser(user: IUser): void{
    this.storageService.set<IUser>(StorageKeyType.User, user);
  }
}
