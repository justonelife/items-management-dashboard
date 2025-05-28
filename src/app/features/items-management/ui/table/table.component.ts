import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '@features/items-management/data-access';
import { ChipComponent } from '@libs/chip';
import { AppPageOfData, SeverityDirective } from '@libs/core';
import { Column, TableModule } from '@libs/table';
import { NgOptimizedImage } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { urlEditItem } from '@features/items-management/data-access';
import { RouterLink } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { ReadMoreComponent } from '@libs/read-more';

@Component({
  standalone: true,
  imports: [
    TableModule,
    ChipComponent,
    CurrencyPipe,
    NgOptimizedImage,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SeverityDirective,
    RouterLink,
    ReadMoreComponent,
  ],
  selector: 'app-items-management-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementTableComponent {
  data = input.required<AppPageOfData<Item>>();
  page = input.required<number>();
  pageSize = input.required<number>();

  emitPageChange = output<PageEvent>()
  emitSortChange = output<Sort>()
  emitSoftDelete = output<string>()
  emitRestore = output<string>()

  readonly COLUMNS: Column[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'price', header: 'Price', sortable: true },
    // { key: 'imageUrl', header: 'Attachments' },
    { key: 'description', header: 'Description' },
    { key: 'action', header: 'Actions' },
  ];

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
