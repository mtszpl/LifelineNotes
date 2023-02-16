import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials-module/materials.module';
import { AuthenticationModule } from './UAuth/authentication.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './scenes/login/login.component';

const Routes = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MaterialModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
