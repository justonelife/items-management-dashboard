import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import {
  Item,
  ItemStatus,
  urlEditItem,
  VIEW_OPTIONS,
} from '@features/items-management/data-access';
import { itemSearchEvents } from '@features/items-management/data-access/store/item-search-events';
import { ChipComponent } from '@libs/chip';
import { AppPageOfData, SeverityDirective } from '@libs/core';
import { ReadMoreComponent } from '@libs/read-more';
import { Column, TableModule } from '@libs/table';
import { ToggleButtonComponent } from '@libs/toggle-button';
import { Dispatcher } from '@ngrx/signals/events';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    TableModule,
    ChipComponent,
    CurrencyPipe,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SeverityDirective,
    RouterLink,
    ReadMoreComponent,
    ToggleButtonComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-items-management-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementTableComponent {
  dispatcher = inject(Dispatcher);
  data = input.required<AppPageOfData<Item>>();
  page = input.required<number>();
  pageSize = input.required<number>();

  emitPageChange = output<PageEvent>();
  emitSortChange = output<Sort>();
  emitSoftDelete = output<string>();
  emitRestore = output<string>();

  readonly VIEW_OPTIONS = VIEW_OPTIONS;

  readonly COLUMNS: Column[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'price', header: 'Price', sortable: true },
    // { key: 'imageUrl', header: 'Attachments' },
    { key: 'description', header: 'Description' },
    { key: 'action', header: 'Actions' },
  ];

  statusForm = new FormControl<ItemStatus>('active');

  constructor() {
    this.statusForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((value) => {
          this.dispatcher.dispatch(
            itemSearchEvents.statusChanged(value as ItemStatus),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  pageChange(event: PageEvent) {
    this.emitPageChange.emit(event);
  }

  sortChange(event: Sort) {
    this.emitSortChange.emit(event);
  }

  readonly urlEditItem = urlEditItem;

  softDelete(id: string) {
    this.emitSoftDelete.emit(id);
  }

  restore(id: string) {
    this.emitRestore.emit(id);
  }
}
