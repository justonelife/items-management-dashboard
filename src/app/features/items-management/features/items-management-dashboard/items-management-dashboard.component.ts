import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ItemsManagementService } from '@features/items-management/data-access';
import { ItemsManagementFilterComponent } from '@features/items-management/ui/filter/filter.component';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    ItemsManagementFilterComponent,
    ItemsManagementTableComponent,
    AsyncPipe,
  ],
  selector: 'app-items-management-dashboard',
  templateUrl: './items-management-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col gap-4',
  }
})
export class ItemsManagementDashboard {
  readonly api = inject(ItemsManagementService);

  vm$ = this.api.getAll();
}
