import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../scenes/login/login.component';
import { MaterialModule } from '../materials-module/materials.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
