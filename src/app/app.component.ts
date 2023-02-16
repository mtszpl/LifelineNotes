import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark: boolean = false
  title = 'notes';
  showFiller = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : "theme-light"
  }

  log() {
    console.log("beniz")
  }
}
