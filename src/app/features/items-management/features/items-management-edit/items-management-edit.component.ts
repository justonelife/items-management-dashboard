import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService, ItemsManagementService, urlDashboardItems } from '@features/items-management/data-access';
import { ItemsManagementForm } from '@features/items-management/ui/form/form.component';
import { CardComponent } from '@libs/card';

@Component({
  standalone: true,
  imports: [
    ItemsManagementForm,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CardComponent,
    AsyncPipe,
  ],
  selector: 'app-items-management-edit',
  templateUrl: './items-management-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col gap-4',
  }
})
export class ItemsManagementEditComponent {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly api = inject(ItemsManagementService);
  readonly commonService = inject(CommonService);

  id: string = this.activatedRoute.snapshot.params['id'];

  readonly urlDashboardItems = urlDashboardItems;

  categoryOptions$ = this.commonService.getCategoryOptions();
  typeOptions$ = this.commonService.getTypeOptions();

  ngOnInit() {
    this.api.getSingleItem(this.id).subscribe(console.log);
  }
}
