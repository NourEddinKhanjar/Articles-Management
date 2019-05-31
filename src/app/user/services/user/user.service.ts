import {Injectable} from '@angular/core';
import {StorageService} from '@services/storage/storage.service';
import {StorageKeyType} from '@models/storage/storage-keys';
import {IUser} from '@models/user/user.model';
import {SignedUserService} from '@services/signed-user/signed-user.service';

@Injectable()
export class UserService {

  private readonly users: Map<string, IUser>;

  constructor(private storageService: StorageService, private signedUserService: SignedUserService) {
    this.users = new Map();
    this.initUsers();
  }

  public isExistedUser(email: string): boolean {
    return this.users.has(email);
  }

  public addUser(user: IUser): void {
    this.users.set(user.email, user);
    this.setUsersToStorage();
    this.signedUserService.setSignedUser(user);
  }

  public login(user: IUser): void{
    let fullUser: IUser = this.users.get(user.email);
    this.signedUserService.setSignedUser(fullUser);
  }

  public validLoginUser(user: IUser): boolean{
    return this.isExistedUser(user.email) && this.userNameMatchesPassword(user);
  }

  private initUsers(): void {
    const storedUsers: IUser[] = this.getUsersFromStorage();
    storedUsers.forEach((user: IUser) => {
      this.users.set(user.email, user);
    });
  }

  private getUsersFromStorage(): IUser[] {
    return this.storageService.get<IUser[]>(StorageKeyType.Users) || [];
  }

  private setUsersToStorage(): void {
    this.storageService.set<IUser[]>(StorageKeyType.Users, Array.from(this.users.values()));
  }

  private userNameMatchesPassword(user: IUser): boolean{
    const storedUser: IUser = this.users.get(user.email);
    return storedUser.password === user.password;
  }
}
