import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_MENU, MENU } from '@shared/data-access';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    {
      provide: APP_MENU,
      useValue: MENU,
    }
  ]
})
export class AppComponent {
}
