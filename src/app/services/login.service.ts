import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../UAuth/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<User> = new Observable()

  constructor(
  ) { }
}
