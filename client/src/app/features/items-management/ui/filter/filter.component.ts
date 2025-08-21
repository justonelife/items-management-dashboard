import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppTypedForm } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import {
  DynamicField,
  DynamicType,
  HysDynamicFilterComponent,
} from '@libs/hys-controller';
import { Option } from '@libs/select';
import { Filter } from '../../data-access';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    HysDynamicFilterComponent,
    HysButtonComponent,
  ],
  selector: 'app-items-management-filter-view',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  form = input.required<AppTypedForm<Filter>>();
  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

  emitFilter = output<Filter>();
  emitReset = output<void>();

  fields = signal<DynamicField>({});

  constructor() {
    effect(() => {
      const typeOptions = this.typeOptions();
      const categoryOptions = this.categoryOptions();

      this.fields.set({
        name: {
          type: DynamicType.INPUT,
          withWrapper: true,
          icon: 'search',
          iconSet: 'filled',
          inputs: { placeholder: 'Search Items...' },
          order: 0,
        },
        type: {
          type: DynamicType.SELECT,
          withWrapper: true,
          icon: 'filter_alt',
          iconSet: 'outlined',
          inputs: { options: typeOptions, placeholder: 'All Types' },
          order: 1,
        },
        category: {
          type: DynamicType.SELECT,
          withWrapper: true,
          icon: 'filter_alt',
          iconSet: 'outlined',
          inputs: { options: categoryOptions, placeholder: 'All Categories' },
          order: 2,
        },
      });
    });
  }

  reset() {
    this.emitReset.emit();
  }

  filter() {
    this.emitFilter.emit(this.form().getRawValue());
  }
}
