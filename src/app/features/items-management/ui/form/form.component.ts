import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditItem } from '@features/items-management/data-access';
import { AppTypedForm } from '@libs/core';
import { InputDirective } from '@libs/input';
import { Option, SelectComponent } from '@libs/select';

@Component({
  standalone: true,
  imports: [
    InputDirective,
    SelectComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-items-management-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementForm {

  itemForm = input.required<AppTypedForm<EditItem>>();
  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

}
