export class User implements IUser{
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  static create(){
    return new User();
  }
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

