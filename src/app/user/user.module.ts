import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserRoutingModule} from './user-routing.module';

import {LoginComponent} from '@userComponents/login/login.component';
import {SignupComponent} from '@userComponents/signup/signup.component';

import {UserService} from '@userServices/user/user.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule {
}
