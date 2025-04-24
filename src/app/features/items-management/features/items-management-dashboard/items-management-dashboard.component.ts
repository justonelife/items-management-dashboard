import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { ItemsManagementFilterComponent } from '@features/items-management/ui/filter/filter.component';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';
import { AppTypedForm } from '@libs/core';
import { Option } from "@libs/select";
import { ToggleButtonComponent } from '@libs/toggle-button';
import { BehaviorSubject, catchError, combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { CommonService, Filter, ItemsManagementService, VIEW_OPTIONS, ViewType } from '../../data-access';

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
  readonly commonService = inject(CommonService);

  readonly VIEW_OPTIONS = VIEW_OPTIONS;
  viewType = new FormControl<ViewType>('active');

  filter$ = new BehaviorSubject<Filter>({ name: null, type: null, category: null });
  filterForm: AppTypedForm<Filter> = new FormGroup({
    name: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
  });

  pageChange$ = new BehaviorSubject<null>(null);
  page = 1;
  pageSize = 20;

  vm$ = combineLatest({
    filter: this.filter$.pipe(
      tap(_ => this.page = 1),
      takeUntilDestroyed()
    ),
    isDeleted: this.viewType.valueChanges.pipe(
      startWith(this.viewType.getRawValue()),
      map(value => {
        return value === 'deleted';
      }),
      tap(_ => {
        this.page = 1;
      }),
      takeUntilDestroyed()
    ),
    pageChagne: this.pageChange$.pipe(
      takeUntilDestroyed()
    )
  }).pipe(
    switchMap(({ filter, isDeleted }) => {
      return this.api.getAll(filter, isDeleted, this.page, this.pageSize);
    }),
    takeUntilDestroyed()
  );

  categoryOptions$ = this.commonService.getCategoryOptions();
  typeOptions$ = this.commonService.getTypeOptions();

  filter(value: Filter) {
    this.filter$.next(value);
  }

  resetFilter() {
    this.filterForm.reset();
    this.filter$.next(this.filterForm.getRawValue());
  }

  pageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange$.next(null);
  }
}
