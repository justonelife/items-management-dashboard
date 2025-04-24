import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { URI } from '../constants/dashboard.const';
import { Category, ItemType } from '../types';
import { Option } from '@libs/select';

@Injectable()
export class CommonService {
  readonly httpClient = inject(HttpClient);
  private categories$?: Observable<Category[]>;
  private types$?: Observable<ItemType[]>;

  getAllCategories(forceRefresh = false): Observable<Category[]> {
    if (!this.categories$ || forceRefresh) {
      this.categories$ = this.httpClient.get<Category[]>(URI + '/categories').pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
        catchError(err => {
          this.categories$ = undefined;
          return throwError(() => err);
        })
      );
    }
    return this.categories$;
  }

  getCategoryOptions(forceRefresh = false): Observable<Option[]> {
    return this.getAllCategories(forceRefresh).pipe(
      map(categories => {
        return categories?.length ? categories.map(category => ({
          value: category.name,
          label: category.name
        }) as Option<string>) : [];
      }),
    );
  }


  getAllTypes(forceRefresh = false): Observable<ItemType[]> {
    if (!this.types$ || forceRefresh) {
      this.types$ = this.httpClient.get<ItemType[]>(URI + '/types').pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
        catchError(err => {
          this.types$ = undefined;
          return throwError(() => err);
        })
      );
    }
    return this.types$;
  }

  getTypeOptions(forceRefresh = false): Observable<Option[]> {
    return this.getAllTypes(forceRefresh).pipe(
      map(types => {
        return types?.length ? types.map(itemType => ({
          value: itemType.name,
          label: itemType.name
        }) as Option<string>) : [];
      }),
    );
  }
}
