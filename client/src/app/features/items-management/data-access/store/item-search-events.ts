import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Filter, ItemStatus } from '../types';
import { Sort } from '@angular/material/sort';

export const itemSearchEvents = eventGroup({
  source: 'Item Search Page',
  events: {
    opened: type<void>(),
    filterChanged: type<Filter>(),
    pageChanged: type<number>(),
    sortChanged: type<Sort>(),
    statusChanged: type<ItemStatus>(),
  },
});
