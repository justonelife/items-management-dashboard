import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ItemsManagementFilterComponent } from '@features/items-management/ui/filter/filter.component';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';
import { AppTypedForm } from '@libs/core';
import { BehaviorSubject, combineLatest, map, startWith, switchMap } from 'rxjs';
import { Filter, ItemsManagementService, VIEW_OPTIONS, ViewType } from '../../data-access';
import { ToggleButtonComponent } from '@libs/toggle-button';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    ItemsManagementFilterComponent,
    ItemsManagementTableComponent,
    AsyncPipe,
    ToggleButtonComponent,
    ReactiveFormsModule,
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

  readonly VIEW_OPTIONS = VIEW_OPTIONS;
  viewType = new FormControl<ViewType>('active');

  filter$ = new BehaviorSubject<Filter>({ name: null, type: null, category: null });
  filterForm: AppTypedForm<Filter> = new FormGroup({
    name: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
  });

  vm$ = combineLatest({
    filter: this.filter$.pipe(
      takeUntilDestroyed()
    ),
    isDeleted: this.viewType.valueChanges.pipe(
      startWith(this.viewType.getRawValue()),
      map(value => {
        return value === 'deleted';
      }),
      takeUntilDestroyed()
    )
  }).pipe(
    switchMap(({ filter, isDeleted }) => {
      return this.api.getAll(filter, isDeleted, 1, 25);
    }),
    takeUntilDestroyed()
  );

  filter(value: Filter) {
    this.filter$.next(value);
  }

  resetFilter() {
    this.filterForm.reset();
    this.filter$.next(this.filterForm.getRawValue());
  }
}
