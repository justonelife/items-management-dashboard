import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Filter } from '../../data-access';
import { CardComponent } from '@libs/card';
import { AppTypedForm } from '@libs/core';
import { InputDirective } from "@libs/input";
import { SelectComponent } from '@libs/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CardComponent,
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

  emitFilter = output<Filter>();
  emitReset = output<void>();

  reset() {
    this.emitReset.emit();
  }

  filter() {
    this.emitFilter.emit(this.form().getRawValue());
  }
}
