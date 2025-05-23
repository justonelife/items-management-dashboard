import { ChangeDetectorRef, Directive, inject, Signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AppAny, OnChangeType, OnTouchedType } from '@libs/core';
import { DYNAMIC_CONTROL } from '../pipes/dynamic-control.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Directive({
  host: {
    'class': 'hys-controller'
  }
})
export abstract class HysBaseController implements ControlValueAccessor {
  dynamicControl = inject(DYNAMIC_CONTROL, { optional: true });

  cdr = inject(ChangeDetectorRef);
  onChange: OnChangeType = (v) => {
    this.dynamicControl?.setValue(v);
  };
  onTouched: OnTouchedType = () => { };
  disabled = false;
  state: AppAny;

  abstract placeholder: string | Signal<string>;
  abstract label: string | Signal<string>;

  constructor() {
    this.dynamicControl?.valueChanges.pipe(
      tap(value => this.writeValue(value)),
      takeUntilDestroyed()
    ).subscribe();
  }

  writeValue(obj: AppAny): void {
    this.state = obj;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: AppAny): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

}
