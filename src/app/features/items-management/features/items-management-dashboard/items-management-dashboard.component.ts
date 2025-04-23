import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ItemsManagementFilterComponent } from '@features/items-management/ui/filter/filter.component';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    ItemsManagementFilterComponent,
    ItemsManagementTableComponent,
  ],
  selector: 'app-items-management-dashboard',
  templateUrl: './items-management-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col gap-4',
  }
})
export class ItemsManagementDashboard {

}
