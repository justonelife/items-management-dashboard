import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { urlCreateItem } from '@features/items-management/data-access';
import { HysButtonComponent } from '@libs/hys-button';

@Component({
  imports: [RouterLink, HysButtonComponent],
  template: `
    <a
      hys-button
      [routerLink]="URL_CREATE_ITEM"
      class="w-full lg:w-auto"
      icon="add"
      >Add Item</a
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementActionsComponent {
  readonly URL_CREATE_ITEM = urlCreateItem();
}
