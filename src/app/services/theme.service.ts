import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: string = ""

  themeUpdate: Subject<string> = new Subject<string>()

  constructor() {
  }

  public get _themeUpdate() {
    return this.themeUpdate
  }

  isDarkMode(): boolean {
    return this.theme === "dark-theme"
  }

  initTheme(): void {
    this.getColorTheme()
  }

  update(theme: "dark-theme" | "light-theme"): void {
    this.setColorTheme(theme)
    this._themeUpdate.next(theme)
  }

  setColorTheme(theme: string): void {
    this.theme = theme
    localStorage.setItem('user-theme', theme)
  }

  getColorTheme(): void {
    if(localStorage.getItem('user-theme'))
      this.theme = localStorage.getItem('user-theme')!
    else
      this.theme = "dark-theme"
  }
}
