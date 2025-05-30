import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ItemSearchStore } from '@features/items-management/data-access/store';
import { itemSearchEvents } from '@features/items-management/data-access/store/item-search-events';
import { ItemsManagementTableComponent } from '@features/items-management/ui/table/table.component';
import { Dispatcher } from '@ngrx/signals/events';
import { finalize } from 'rxjs';
import { ItemsManagementService } from '../../data-access';

@Component({
  imports: [
    ItemsManagementTableComponent,
    AsyncPipe,
    ReactiveFormsModule,
    JsonPipe,
  ],
  selector: 'app-items-management-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col gap-4',
  },
})
export class DashboardContainerComponent {
  readonly dispatcher = inject(Dispatcher);
  readonly store = inject(ItemSearchStore);
  readonly api = inject(ItemsManagementService);

  constructor() {
    this.dispatcher.dispatch(itemSearchEvents.opened());
  }

  pageChange(event: PageEvent) {
    this.dispatcher.dispatch(itemSearchEvents.pageChanged(event.pageIndex));
  }

  sortChange(event: Sort) {
    this.dispatcher.dispatch(itemSearchEvents.sortChanged(event));
  }

  softDelete(id: string) {
    this.api.softDelete(id)
      .pipe(
        finalize(() => {
          // this.forceReload$.next(null);
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
          // this.forceReload$.next(null);
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
