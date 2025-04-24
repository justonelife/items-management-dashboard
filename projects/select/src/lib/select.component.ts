import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Option } from './types';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppAny, OnChangeType, OnTouchedType } from '@libs/core';

@Component({
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  selector: 'lib-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-flex flex-col'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectComponent<TOption extends Option = Option> implements ControlValueAccessor {
  readonly cdr = inject(ChangeDetectorRef);

  label = input<string>();
  placeholder = input<string>('');
  options = input.required<TOption[]>();

  state: AppAny;
  onChange: OnChangeType = () => { };
  onTouched: OnTouchedType = () => { };
  disabled = false;

  writeValue(value: AppAny): void {
    this.state = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  selectChange() {
    this.onChange(this.state);
  }
}
