import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Filter,
  ItemsManagementCommonService,
} from '@features/items-management/data-access';
import { ItemSearchStore } from '@features/items-management/data-access/store';
import { itemSearchEvents } from '@features/items-management/data-access/store/item-search-events';
import { FilterComponent } from '@features/items-management/ui/filter/filter.component';
import { AppTypedForm } from '@libs/core';
import { Dispatcher } from '@ngrx/signals/events';

@Component({
  selector: 'app-items-management-filter-container',
  imports: [FilterComponent, AsyncPipe],
  template: `
    <app-items-management-filter-view
      [form]="form"
      (emitFilter)="filter($event)"
      (emitReset)="reset()"
      [categoryOptions]="(categoryOptions$ | async) || []"
      [typeOptions]="(typeOptions$ | async) || []"
    >
    </app-items-management-filter-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent {
  dispatcher = inject(Dispatcher);
  store = inject(ItemSearchStore);
  commonService = inject(ItemsManagementCommonService);

  form: AppTypedForm<Filter> = new FormGroup({
    name: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
  });

  categoryOptions$ = this.commonService.getCategoryOptions();
  typeOptions$ = this.commonService.getTypeOptions();

  filter(value: Filter) {
    this.dispatcher.dispatch(itemSearchEvents.filterChanged(value));
  }

  reset() {
    this.form.reset();
    this.dispatcher.dispatch(
      itemSearchEvents.filterChanged(this.form.getRawValue()),
    );
    // this.store.updateFilter(this.form.getRawValue());
  }
}
