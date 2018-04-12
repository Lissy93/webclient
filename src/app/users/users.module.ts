import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UsersSignInComponent } from './users-sign-in/users-sign-in.component';
import { UsersSignUpComponent } from './users-sign-up/users-sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UsersRoutingModule
  ],
  declarations: [UsersSignInComponent, UsersSignUpComponent]
})
export class UsersModule { }
