import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HysBaseController } from '../../directives/base-controller.directive';
import { provideControlValueAccessor } from '../../utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AppAny } from '@libs/core';

export interface Option<T = AppAny> {
  label: string;
  value: T;
}

@Component({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  selector: 'hys-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(HysSelectComponent)]
})
export class HysSelectComponent extends HysBaseController {
  override placeholder = input<string>('');
  override label = input<string>('');

  options = input.required<Option[]>();
  multiple = input<boolean>(false);
}
