import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppLogoComponent } from '@shared/ui';

@Component({
  imports: [
    AppLogoComponent,
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthComponent {

}
