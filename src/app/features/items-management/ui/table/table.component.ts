import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '@features/items-management/data-access';
import { ChipComponent } from '@libs/chip';
import { AppPageOfData } from '@libs/core';
import { Column, TableModule } from '@libs/table';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    TableModule,
    ChipComponent,
    CurrencyPipe,
    NgOptimizedImage,
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

  readonly COLUMNS: Column[] = [
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'imageUrl', header: 'Attachments' },
    { key: 'description', header: 'Description' },
    { key: 'aciton', header: 'Actions' },
  ];

  pageChange(event: PageEvent) {
    this.emitPageChange.emit(event);
  }
}
