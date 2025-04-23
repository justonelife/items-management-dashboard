import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { CardComponent } from '@libs/card';

@Component({
  standalone: true,
  imports: [
    CardComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-items-management-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementFilterComponent {

}
