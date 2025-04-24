import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, Item } from '../types';
import { AppAny, AppPageOfData } from '@libs/core';

@Injectable()
export class ItemsManagementService {
  readonly httpClient = inject(HttpClient);
  readonly URI = 'http://localhost:3000';

  getAll(filter: Filter, page: number = 1, size: number = 10): Observable<AppPageOfData<Item>> {
    const params = {
      ...filter,
      _page: page,
      _per_page: size,
    }

    const queryParams = this.generateQueryParams(params);

    return this.httpClient.get<AppPageOfData<Item>>(this.URI + '/items' + queryParams);
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
