import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HysButtonComponent } from '@libs/hys-button';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { MENU } from './app.const';
import { CardComponent } from '@libs/card';

@Component({
  selector: 'app-root',
  imports: [
    HysSidenavLayoutComponent,
    RouterOutlet,
    HysButtonComponent,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly MENU = MENU;
}
