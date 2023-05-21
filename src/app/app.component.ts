import { Component, HostBinding, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ThemeService } from './services/theme.service';
import { AuthRequest } from './UAuth/authRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDark: boolean = false
  theme: string | null = ""
  title = 'notes';
  showFiller = false;

  _isLoggedIn: boolean = false
  public get isLoggedIn(): boolean{
    return this._isLoggedIn
  }

  public set isLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn = isLoggedIn
  }

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.theme = localStorage.getItem('user-theme')
    this.themeService.initTheme()

    this.onInitLogin()
    this.loginService.loggedInEvent.subscribe(() => this.loginService.isLogged = this.isLoggedIn)

    if (this.theme != null)
      this.theme === 'dark-theme' ? this.isDark = true : this.isDark = false
  }

  onInitLogin() {
    let token = localStorage.getItem('token')
    token !== null ? this.isLoggedIn = true : this.isLoggedIn == false
  }

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'dark-theme' : "light-theme"
  }

  toggleMode(event: MatSlideToggleChange){
    this.isDark = event.checked
    localStorage.setItem('user-theme', this.isDark ? 'dark-theme' : 'light-theme')
    this.themeService.update(this.isDark ? 'dark-theme' : 'light-theme')
  }

  loginClick() {
    if (!this.loginService.isLogged)
      this.router.navigate(["/login"])
    else {
      let nameFromStorage = localStorage.getItem('username')
      this.router.navigate([`/view/${nameFromStorage}`])
    }
  }

  logoutClick(): void {
    this.loginService.logOut()
    this.isLoggedIn = false
  }
}
