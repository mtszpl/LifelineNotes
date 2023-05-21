import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthorizerInterceptor implements HttpInterceptor {

  authUrl: string = "http://localhost:8080/auth/authenticate"


  constructor(
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url == this.authUrl)
      return next.handle(request)
      
    let authService = this.injector.get(LoginService)
    let tokenizedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
