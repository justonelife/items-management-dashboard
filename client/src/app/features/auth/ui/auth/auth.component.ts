import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppSignInContainerComponent } from '@features/auth/features/sign-in/sign-in.component';
import { AppSignUpContainerComponent } from '@features/auth/features/sign-up/sign-up.component';
import { CardComponent } from '@libs/card';
import { Option, ToggleButtonComponent } from '@libs/toggle-button';
import { AppLogoComponent } from '@shared/ui';

type ViewType = 'signin' | 'signup';

@Component({
  imports: [
    AppLogoComponent,
    CardComponent,
    ToggleButtonComponent,
    AppSignInContainerComponent,
    AppSignUpContainerComponent,
    FormsModule,
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthComponent {

  readonly VIEW_OPTIONS: Option<ViewType>[] = [
    { value: 'signin', label: 'Sign In' },
    { value: 'signup', label: 'Sign Up' }
  ];

  viewType: ViewType = 'signin';

}
