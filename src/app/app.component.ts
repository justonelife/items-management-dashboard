import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';

@Component({
  selector: 'app-root',
  imports: [HysSidenavLayoutComponent, RouterOutlet],
  template: `
<hys-sidenav-layout #SidenavLayout mode='push'>
<header>
  <button (click)="SidenavLayout.open()">open nav</button>
  <button>2</button>
</header>
  <router-outlet />
</hys-sidenav-layout>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
