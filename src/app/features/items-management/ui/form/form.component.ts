import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputDirective } from '@libs/input';
import { Option, SelectComponent } from '@libs/select';

@Component({
  standalone: true,
  imports: [
    InputDirective,
    SelectComponent,
  ],
  selector: 'app-items-management-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementForm {

  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

}
