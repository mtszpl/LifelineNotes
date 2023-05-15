import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/materials.module';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizerInterceptor } from './UAuth/authorizer.interceptor';
import { NoteViewComponent } from './scenes/note-view/note-view.component';
import { HomeComponent } from './scenes/home/home.component';
import { LoginGuard } from './UAuth/login.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { NoteInterfaceComponent } from './scenes/note-interface/note-interface.component';
import { RegisterUserComponent } from './scenes/register-user/register-user.component';

const Routes = [
  { path: "", component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'view/:username', canActivate: [LoginGuard], component: NoteViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NoteViewComponent,
    HomeComponent,
    NoteInterfaceComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AuthenticationModule,
    ComponentsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
