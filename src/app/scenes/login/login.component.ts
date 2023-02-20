import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  theme: string = ""
  subscription: Subscription | undefined

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.themeService.themeUpdate.subscribe(theme => this.theme = theme)
  }

  ngOnDestroy(): void {
    this.subscription !== undefined &&
      this.subscription.unsubscribe()
  }

}
