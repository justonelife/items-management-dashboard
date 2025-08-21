import { computed, inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { AppPageOfData } from '@libs/core';
import { mapResponse, tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { ItemsManagementService } from '../services/items-management.service';
import { Filter, Item, ItemStatus } from '../types';
import { itemApiEvents } from './item-api-events';
import { itemSearchEvents } from './item-search-events';

interface ItemSearchState {
  data: AppPageOfData<Item>;
  filter: Filter;
  sort: Sort | null;
  page: number;
  isLoading: boolean;
  status: ItemStatus;
}

const initialState: ItemSearchState = {
  data: {
    data: [],
  },
  filter: {
    name: null,
    type: null,
    category: null,
  },
  sort: null,
  page: 1,
  isLoading: false,
  status: 'active',
};

export const ItemSearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ sort }) => ({
    sortBy: computed(() => {
      const _sort = sort();
      if (_sort == null || _sort.direction === '') return null;
      return _sort.direction === 'desc' ? '-' + _sort.active : _sort.active;
    }),
  })),
  withReducer(
    on(itemSearchEvents.opened, () => ({ isLoading: true })),
    on(itemSearchEvents.filterChanged, ({ payload: filter }) => ({
      filter: {
        ...filter,
      },
      isLoading: true,
      page: 1,
    })),
    on(itemSearchEvents.sortChanged, ({ payload: sort }) => ({
      sort,
      isLoading: true,
    })),
    on(itemSearchEvents.statusChanged, ({ payload: status }) => ({
      status,
      isLoading: true,
      page: 1,
    })),
    on(itemSearchEvents.pageChanged, ({ payload: page }) => ({
      page,
      isLoading: true,
    })),
    on(itemApiEvents.loadedSuccess, ({ payload: data }) => ({
      data,
      isLoading: false,
    })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      itemsService = inject(ItemsManagementService),
    ) => ({
      loadData$: events
        .on(
          itemSearchEvents.opened,
          itemSearchEvents.filterChanged,
          itemSearchEvents.sortChanged,
          itemSearchEvents.pageChanged,
          itemSearchEvents.statusChanged,
        )
        .pipe(
          switchMap(() =>
            itemsService
              .getAll(
                store.filter(),
                store.sortBy(),
                store.status(),
                store.page(),
              )
              .pipe(
                mapResponse({
                  next: (data) => itemApiEvents.loadedSuccess(data),
                  error: (error: { message: string }) =>
                    itemApiEvents.loadedFailure(error.message),
                }),
              ),
          ),
        ),
    }),
  ),
  withMethods((store, itemsService = inject(ItemsManagementService)) => ({
    updateFilter(filter: Filter): void {
      patchState(store, { filter: { ...filter } });
    },

    _loadData: rxMethod<Filter>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((filter) => {
          return itemsService.getAll(filter).pipe(
            tapResponse({
              next: (data) => patchState(store, { data, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({}),
);
