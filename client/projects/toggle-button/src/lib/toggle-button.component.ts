import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppAny, OnChangeType, OnTouchedType, provideControlValueAccessor } from '@libs/core';
import { Option } from "./types/";

@Component({
  standalone: true,
  imports: [
    MatButtonToggleModule,
    FormsModule,
  ],
  selector: 'lib-toggle-button',
  templateUrl: './toggle-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'h-[40px] p-1 w-fit rounded-md bg-secondary'
  },
  styleUrl: './toggle-button.component.scss',
  providers: [provideControlValueAccessor(ToggleButtonComponent)]
})
export class ToggleButtonComponent<TOption extends Option = Option> implements ControlValueAccessor {
  readonly cdr = inject(ChangeDetectorRef);

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
