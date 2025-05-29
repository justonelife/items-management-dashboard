import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppTypedForm } from '@libs/core';
import { DynamicField, DynamicType, HysDynamicFilterComponent } from '@libs/hys-controller';
import { Option } from '@libs/select';
import { Filter } from '../../data-access';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    HysDynamicFilterComponent,
  ],
  selector: 'app-items-management-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementFilterComponent {
  cdr = inject(ChangeDetectorRef);
  form = input.required<AppTypedForm<Filter>>()
  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

  emitFilter = output<Filter>();
  emitReset = output<void>();

  fields: DynamicField[] = [];

  constructor() {
    effect(() => {
      const typeOptions = this.typeOptions();
      const categoryOptions = this.categoryOptions();

      this.fields = [
        {
          key: 'name',
          type: DynamicType.INPUT,
          withWrapper: true,
          icon: 'search',
          inputs: { placeholder: 'Search Items...' },
          styleClass: 'col-span-12 lg:col-span-2',
        },
        {
          key: 'type',
          type: DynamicType.SELECT,
          withWrapper: true,
          icon: 'filter_alt',
          iconSet: 'outlined',
          inputs: { options: typeOptions, placeholder: 'All Types' },
          styleClass: 'col-span-6 lg:col-span-2',
        },
        {
          key: 'category',
          type: DynamicType.SELECT,
          withWrapper: true,
          icon: 'filter_alt',
          iconSet: 'outlined',
          inputs: { options: categoryOptions, placeholder: 'All Categories' },
          styleClass: 'col-span-6 lg:col-span-2',
        },
      ];
      this.cdr.markForCheck();
    })
  }

  reset() {
    this.emitReset.emit();
  }

  filter() {
    this.emitFilter.emit(this.form().getRawValue());
  }
}
