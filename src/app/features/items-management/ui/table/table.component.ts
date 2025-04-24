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
    { key: 'action', header: 'Actions' },
  ];

  pageChange(event: PageEvent) {
    this.emitPageChange.emit(event);
  }

  readonly urlEditItem = urlEditItem;
}
