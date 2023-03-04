import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isDark: boolean = false
  theme: string | null = ""
  title = 'notes';
  showFiller = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private loginService: LoginService
  ){}

  ngOnInit(){
    this.theme = localStorage.getItem('user-theme')
    this.themeService.initTheme()
    if(this.theme != null)
      this.theme === 'dark-theme' ? this.isDark = true : this.isDark = false
  }

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'dark-theme' : "light-theme"
  }

  toggleMode() {
    this.isDark = !this.isDark
    localStorage.setItem('user-theme', this.isDark ? 'dark-theme' : 'light-theme')
    this.themeService.update(this.isDark ? 'dark-theme' : 'light-theme')
  }

  loginClick(){
    console.log("login")
    if(!this.loginService.isLogged)
      this.router.navigate(["/login"])
  }
}
