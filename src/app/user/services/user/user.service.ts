import {Injectable} from '@angular/core';
import {StorageService} from '@services/storage/storage.service';
import {IUser} from '@userModels/user/user.model';
import {StorageKeyType} from '@models/storage/storage-keys';

@Injectable()
export class UserService {

  private users: Map<string, IUser>;

  constructor(private storageService: StorageService) {
    this.users = new Map();
    this.initUsers();
  }

  public isExistedUser(email: string): boolean {
    return this.users.has(email);
  }

  public addUser(user: IUser): void {
    this.users.set(user.email, user);
    this.setUsersToStorage();
    this.setSignedUser(user);
  }

  public login(user: IUser): void{
    this.setSignedUser(user);
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

  private setSignedUser(user: IUser): void {
    this.storageService.set<IUser>(StorageKeyType.User, user);
  }

  private userNameMatchesPassword(user: IUser): boolean{
    const storedUser: IUser = this.users.get(user.email);
    return storedUser.password === user.password;
  }
}
