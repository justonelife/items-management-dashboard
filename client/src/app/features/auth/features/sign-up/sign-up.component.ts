import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppAuthFormComponent } from '@features/auth/ui/auth-form/auth-form.component';
import { HysButtonComponent } from '@libs/hys-button';

@Component({
  imports: [
    HysButtonComponent,
    AppAuthFormComponent,
  ],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'w-full'
  }
})
export class AppSignUpContainerComponent {

}
