import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Sort } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { ItemsManagementFilterComponent } from '@features/items-management/ui/filter/filter.component';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';
import { AppTypedForm } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { ToggleButtonComponent } from '@libs/toggle-button';
import { BehaviorSubject, combineLatest, finalize, map, startWith, switchMap, tap } from 'rxjs';
import { CommonService, Filter, ItemsManagementService, ItemStatus, urlCreateItem, VIEW_OPTIONS } from '../../data-access';

@Component({
  standalone: true,
  imports: [
    HysButtonComponent,
    ItemsManagementFilterComponent,
    ItemsManagementTableComponent,
    AsyncPipe,
    ToggleButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
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

  readonly URL_CREATE_ITEM = urlCreateItem();
  readonly VIEW_OPTIONS = VIEW_OPTIONS;
  status = new FormControl<ItemStatus>('active');

  forceReload$ = new BehaviorSubject<null>(null);
  loading = signal(true);

  filter$ = new BehaviorSubject<Filter>({ name: null, type: null, category: null });
  filterForm: AppTypedForm<Filter> = new FormGroup({
    name: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
  });

  pageChange$ = new BehaviorSubject<null>(null);
  page = 1;
  pageSize = 20;

  sortChange$ = new BehaviorSubject<Sort | null>(null);

  vm$ = combineLatest({
    forceReload: this.forceReload$.pipe(
      tap(_ => this.page = 1),
      takeUntilDestroyed()
    ),
    filter: this.filter$.pipe(
      tap(_ => this.page = 1),
      takeUntilDestroyed()
    ),
    status: this.status.valueChanges.pipe(
      startWith(this.status.getRawValue()),
      map(value => value ? value : 'active'),
      tap(_ => {
        this.page = 1;
      }),
      takeUntilDestroyed()
    ),
    pageChagne: this.pageChange$.pipe(
      takeUntilDestroyed()
    ),
    sortBy: this.sortChange$.pipe(
      map(value => {
        if (value == null || value.direction === '') return null;
        return value.direction === 'desc' ? '-' + value.active : value.active;
      }),
      takeUntilDestroyed()
    )
  }).pipe(
    switchMap(({ filter, status, sortBy }) => {
      this.loading.update(() => true);
      return this.api.getAll(filter, sortBy, status, this.page, this.pageSize).pipe(
        finalize(() => {
          this.loading.update(() => false);
        }),
      );
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

  sortChange(event: Sort) {
    this.sortChange$.next(event);
  }

  softDelete(id: string) {
    this.api.softDelete(id)
      .pipe(
        finalize(() => {
          this.forceReload$.next(null);
        })
      )
      .subscribe({
        next: _ => {
          // TODO:
        },
        error: err => {

        }
      });
  }

  restore(id: string) {
    this.api.restore(id)
      .pipe(
        finalize(() => {
          this.forceReload$.next(null);
        })
      )
      .subscribe({
        next: _ => {
          // TODO:
        },
        error: err => {

        }
      });
  }
}
