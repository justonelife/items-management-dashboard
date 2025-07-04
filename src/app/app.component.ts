import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { AppTheme } from '@shared/data-access';
import { IsLightThemePipe } from '@shared/pipes';
import { MENU } from './app.const';

@Component({
  selector: 'app-root',
  imports: [
    HysSidenavLayoutComponent,
    RouterOutlet,
    HysButtonComponent,
    IsLightThemePipe,
    RouterLink,
    HysIconPositionDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  document = inject(DOCUMENT);
  readonly MENU = MENU;
  readonly KEY = 'cmspro:theme';
  theme = signal<AppTheme>((localStorage.getItem(this.KEY)?.toString() || 'light') as AppTheme);

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (this.isLightTheme(theme)) {
        this.document.getElementsByTagName('body')[0].classList.remove('dark');
        localStorage.setItem(this.KEY, 'light');
      } else {
        this.document.getElementsByTagName('body')[0].classList.add('dark');
        localStorage.setItem(this.KEY, 'dark');
      }
    });
  }

  toggleTheme(): void {
    if (this.isLightTheme(this.theme())) {
      this.theme.set('dark');
    } else {
      this.theme.set('light');
    }
  }

  isLightTheme(theme: AppTheme): boolean {
    return theme === 'light';
  }
}
