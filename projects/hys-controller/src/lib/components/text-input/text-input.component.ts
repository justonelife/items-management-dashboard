import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HysBaseController } from '../../directives/base-controller.directive';
import { provideControlValueAccessor } from '../../utils';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    MatIconModule,
    FormsModule,
  ],
  selector: 'hys-text-input',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(HysTextInputComponent)],
  host: {
    'class': `inline-flex
    w-full
    h-[41px]
    px-4
    placeholder:text-[#4c4546]
    bg-transparent
    border
    border-gray-300
    rounded-md
    focus:outline-none
    focus:border-transparent
    focus:ring-1
    focus:ring-black-500
    `
  }
})
export class HysTextInputComponent extends HysBaseController {

  override placeholder = input<string>('');
  override label = input<string>('');
}
