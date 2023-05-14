import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../UAuth/authRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _loggedInEvent: EventEmitter<void> = new EventEmitter<void>()
  public get loggedInEvent() {
    return this._loggedInEvent
  }

  isLogged: Boolean = false

  authEndpoint: string = "http://localhost:8080/auth/authenticate"
  authToken: string = ""

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(request: AuthRequest) {
    localStorage.setItem('username', request.username)
    localStorage.setItem('password', request.password)
    return this.http.post<{ token: string }>(this.authEndpoint, request)
      .forEach(token => {
        console.log(token)
        this.authToken = token.token
        localStorage.setItem('token', this.authToken)
        this._loggedInEvent.emit()
        this.isLogged = true;
        this.router.navigate([`/view/${request.username}`])
        return token
      })
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
