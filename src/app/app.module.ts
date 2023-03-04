import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials-module/materials.module';
import { AuthenticationModule } from './UAuth/authentication.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './scenes/login/login.component';
import { ThemeService } from './services/theme.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';

const Routes = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AuthenticationModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ThemeService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
