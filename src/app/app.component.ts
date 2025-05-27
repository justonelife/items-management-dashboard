import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@libs/card';
import { HysSidenavLayoutComponent } from '@libs/hys-layouts';
import { MENU } from './app.const';

@Component({
  selector: 'app-root',
  imports: [
    HysSidenavLayoutComponent,
    RouterOutlet,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly MENU = MENU;
}
