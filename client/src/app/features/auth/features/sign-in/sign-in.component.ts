import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInForm } from '@features/auth/data-access';
import { AppAuthFormComponent } from '@features/auth/ui/auth-form/auth-form.component';
import { HysButtonComponent } from '@libs/hys-button';
import {
  DynamicField,
  DynamicType,
  HysDynamicFormComponent,
} from '@libs/hys-controller';
import { AppTypedForm } from '@libs/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    HysButtonComponent,
    AppAuthFormComponent,
    HysDynamicFormComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class AppSignInContainerComponent {
  form: AppTypedForm<SignInForm> = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  readonly FORM_FIELDS: DynamicField = {
    email: {
      label: 'Email Address',
      withWrapper: true,
      icon: 'mail',
      iconSet: 'outlined',
      type: DynamicType.INPUT,
      inputs: {
        placeholder: 'Enter your email',
      },
      order: 0,
      styleClass: 'col-span-12',
    },
    password: {
      label: 'Password',
      withWrapper: true,
      icon: 'lock',
      iconSet: 'outlined',
      type: DynamicType.INPUT,
      inputs: {
        placeholder: 'Enter your password',
      },
      order: 1,
      styleClass: 'col-span-12',
    },
  };
}
