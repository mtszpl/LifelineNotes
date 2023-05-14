import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthRequest } from 'src/app/UAuth/authRequest';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup = this.builder.group({
    username: "",
    password: ""
  })

  error: boolean = false
  errorText: string = "Debug"

  theme: string = ""
  subscriptions: Subscription[] = []



  constructor(
    private themeService: ThemeService,
    private loginService: LoginService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.themeService.themeUpdate.subscribe(theme => this.theme = theme))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe)
    this.subscriptions.splice(0)
  }

  login(){
    let authRequest: AuthRequest = new AuthRequest(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value)
    this.loginService.login(authRequest)
    .catch(error => {
      console.log('error', error)
      this.error = true
      this.errorText = "sth fooked up"
    })
  }

  onSubmit(){
    console.log('submit')
    this.login()
  }

  foo(){
    console.log("foo")
  }

}
