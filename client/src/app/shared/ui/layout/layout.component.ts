import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HysButtonComponent } from '@libs/hys-button';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { APP_MENU, AppStore } from '@shared/data-access';
import { IsLightThemePipe } from '@shared/data-access/pipes';
import { AppLogoComponent } from '../logo/logo.component';
import { UserProfileBadgeComponent } from '../user-profile-badge/user-profile-badge.component';

@Component({
  selector: 'app-root',
  imports: [
    HysSidenavLayoutComponent,
    RouterOutlet,
    HysButtonComponent,
    IsLightThemePipe,
    AppLogoComponent,
    RouterLink,
    UserProfileBadgeComponent,
  ],
  templateUrl: './layout.component.html',
})
export class AppLayoutComponent {
  readonly MENU = inject(APP_MENU, { skipSelf: true });
  readonly appStore = inject(AppStore);
  theme = this.appStore.theme;
  isSidebarCollapsed = this.appStore.isSidebarCollapsed;

  toggleTheme(): void {
    this.appStore.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

}
