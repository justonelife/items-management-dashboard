import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { APP_MENU, AppStore } from '@shared/data-access';
import { IsLightThemePipe } from '@shared/pipes';

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
  templateUrl: './layout.component.html',
})
export class AppLayoutComponent {
  readonly MENU = inject(APP_MENU, { skipSelf: true });
  readonly appStore = inject(AppStore);
  theme = this.appStore.theme;

  toggleTheme(): void {
    this.appStore.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

}
