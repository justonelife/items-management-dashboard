import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EditItem, ItemsManagementCommonService, ItemsManagementService, urlDashboardItems } from '@features/items-management/data-access';
import { ItemsManagementForm } from '@features/items-management/ui/form/form.component';
import { CardComponent } from '@libs/card';
import { AppTypedForm } from '@libs/core';


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
export class ItemsManagementEditComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly api = inject(ItemsManagementService);
  readonly commonService = inject(ItemsManagementCommonService);

  id: string = this.activatedRoute.snapshot.params['id'];

  readonly URL_DASHBOARD_ITEMS = urlDashboardItems();

  categoryOptions$ = this.commonService.getCategoryOptions();
  typeOptions$ = this.commonService.getTypeOptions();

  form: AppTypedForm<EditItem> = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    type: new FormControl<string>('', { validators: [Validators.required] }),
    category: new FormControl<string>('', { validators: [Validators.required] }),
    price: new FormControl<number>(0, { validators: [Validators.required] }),
    imageUrl: new FormControl<string>(''),
    description: new FormControl<string>(''),
    status: new FormControl<'active' | 'delete' | null>(null),
  });

  ngOnInit() {
    this.api.getSingleItem(this.id).subscribe({
      next: res => {
        this.form.patchValue(res);
      },
      error: err => {
        // TODO: alert
        console.log(err);
      }
    });
  }

  submit() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    this.api.updateItem(this.id, this.form.getRawValue()).subscribe({
      next: _ => {
        // alert success
        this.router.navigate([this.URL_DASHBOARD_ITEMS]);

      },
      error: err => {
        // TODO: alert
        console.log(err);
      }
    });

  }
}
