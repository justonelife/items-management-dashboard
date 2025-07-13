import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { HysBaseController } from '../../directives/base-controller.directive';
import { provideControlValueAccessor } from '../../utils';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [
    FormsModule,
    MatInput,
    MatFormFieldModule,
  ],
  selector: 'hys-text-input',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(HysTextInputComponent)],
  styles: [`
    :host ::ng-deep {
      .mat-mdc-form-field-subscript-wrapper { display: none; }
    }
  `],//TODO: check what is subscript wrapper
})
export class HysTextInputComponent extends HysBaseController<string> {

  override placeholder = input<string>('');
  override label = input<string>('');

  type = input<'input' | 'textarea'>('input');
}
