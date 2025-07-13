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
  selector: 'hys-number-input',
  templateUrl: './number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(HysNumberInputComponent)],
  styles: [`
    :host ::ng-deep {
      .mat-mdc-form-field-subscript-wrapper { display: none; }
    }
  `],//TODO: check what is subscript wrapper
})
export class HysNumberInputComponent extends HysBaseController<number> {

  override placeholder = input<string>('');
  override label = input<string>('');

  min = input<number | null>(null);
  max = input<number | null>(null);
}
