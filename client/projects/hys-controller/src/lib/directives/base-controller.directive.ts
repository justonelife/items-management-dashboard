import { ChangeDetectorRef, Directive, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { OnChangeType, OnTouchedType } from '@libs/core';
import { startWith, tap } from 'rxjs';
import { DYNAMIC_CONTROL } from '../pipes/dynamic-control.pipe';

@Directive({
  host: {
    'class': 'hys-controller'
  }
})
export abstract class HysBaseController<T> implements ControlValueAccessor {
  dynamicControl = inject(DYNAMIC_CONTROL, { optional: true });

  cdr = inject(ChangeDetectorRef);
  onChange: OnChangeType = (v: T) => {
    this.dynamicControl?.setValue(v);
  };
  onTouched: OnTouchedType = () => { };
  disabled = signal(false);
  state: T | undefined;

  abstract placeholder: string | Signal<string>;
  abstract label: string | Signal<string>;

  constructor() {
    this.dynamicControl?.valueChanges.pipe(
      startWith(this.dynamicControl.value),
      tap(value => this.writeValue(value)),
      takeUntilDestroyed()
    ).subscribe();
  }

  writeValue(value: T): void {
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
    this.disabled.set(isDisabled);
  }

}
