import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Item } from '@features/items-management/data-access';
import { ChipComponent } from '@libs/chip';
import { Column, TableModule } from '@libs/table';

@Component({
  standalone: true,
  imports: [
    TableModule,
    JsonPipe,
    ChipComponent,
    CurrencyPipe,
  ],
  selector: 'app-items-management-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementTableComponent {
  items = input.required<Item[]>();

  readonly COLUMNS: Column[] = [
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'imageUrl', header: 'Attachments' },
    { key: 'description', header: 'Description' },
  ]
}
