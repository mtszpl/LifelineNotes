import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../UAuth/authRequest';
import { User } from '../UAuth/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<User> = new Observable()
  isLogged: Boolean = false

  authEndpoint: string = "localhost:8080/authenticate/auth"
  authToken: string = ""

  constructor(
    private http: HttpClient
  ) { }

  login(request: AuthRequest){
    this.http.post<String>(this.authEndpoint, request)
    .subscribe(token => console.log('token', token))
  }
}
