import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@libs/card';
import { InputDirective } from "@libs/input";
import { SelectComponent } from '@libs/select';

@Component({
  standalone: true,
  imports: [
    CardComponent,
    InputDirective,
    SelectComponent,
  ],
  selector: 'app-items-management-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementFilterComponent {

}
