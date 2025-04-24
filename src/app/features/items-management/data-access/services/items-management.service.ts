import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppAny, AppPageOfData } from '@libs/core';
import { catchError, Observable, of } from 'rxjs';
import { URI } from '../constants/dashboard.const';
import { Filter, Item } from '../types';

@Injectable()
export class ItemsManagementService {
  readonly httpClient = inject(HttpClient);

  getAll(
    filter: Filter,
    sortBy: string | null = null,
    isDeleted: boolean = false,
    page: number = 1,
    size: number = 10
  ): Observable<AppPageOfData<Item>> {
    const params = {
      ...filter,
      isDeleted,
      _page: page,
      _per_page: size,
      _sort: sortBy,
    }

    const queryParams = this.generateQueryParams(params);

    return this.httpClient.get<AppPageOfData<Item>>(URI + '/items' + queryParams).pipe(
      catchError(err => {
        // TODO:  alert
        console.log(err);
        return of({
          data: [],
        } as AppPageOfData<Item>);
      })
    );
  }

  getSingleItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(URI + '/items/' + id);
  }

  private generateQueryParams(params: Record<string, AppAny>): string {
    let result = '';
    for (const [key, param] of Object.entries(params)) {
      if (Array.isArray(param)) {
        result = result + param.filter(item => item !== null)
          .reduce((acc, curr) => acc + `&${key}=${curr}`, '');
      } else if (param !== null) {
        result = result + `&${key}=${param}`;
      }
    }
    return result.length ? '?' + result : result;
  }
}
