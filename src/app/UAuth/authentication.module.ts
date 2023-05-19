import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../scenes/login/login.component';
import { MaterialModule } from '../materias-module/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const Routes = [
  { path: 'view', component: LoginComponent }
]


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes)
  ]
})
export class AuthenticationModule { }
