import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@libs/card';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { MENU } from './app.const';
import { HysButtonComponent } from '@libs/hys-button';
import { DOCUMENT } from '@angular/common';
import { AppTheme } from '@shared/data-access';
import { IsLightThemePipe } from '@shared/pipes';

@Component({
  selector: 'app-root',
  imports: [
    HysSidenavLayoutComponent,
    RouterOutlet,
    CardComponent,
    HysButtonComponent,
    IsLightThemePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  document = inject(DOCUMENT);
  readonly MENU = MENU;
  theme = signal<AppTheme>('light');

  toggleTheme(): void {
    if (this.isLightTheme(this.theme())) {
      this.theme.set('dark');
      this.document.getElementsByTagName('body')[0].classList.add('dark');
    } else {
      this.theme.set('light');
      this.document.getElementsByTagName('body')[0].classList.remove('dark');
    }
  }

  isLightTheme(theme: AppTheme): boolean {
    return theme === 'light';
  }
}
