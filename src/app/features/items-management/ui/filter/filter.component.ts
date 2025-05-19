import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppTypedForm } from '@libs/core';
import { InputDirective } from "@libs/input";
import { Option, SelectComponent } from '@libs/select';
import { Filter } from '../../data-access';

@Component({
  standalone: true,
  imports: [
    InputDirective,
    SelectComponent,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-items-management-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementFilterComponent {
  form = input.required<AppTypedForm<Filter>>()
  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

  emitFilter = output<Filter>();
  emitReset = output<void>();

  reset() {
    this.emitReset.emit();
  }

  filter() {
    this.emitFilter.emit(this.form().getRawValue());
  }
}
