import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types';
import { AppPageOfData } from '@libs/core';

@Injectable()
export class ItemsManagementService {
  readonly httpClient = inject(HttpClient);
  readonly URI = 'http://localhost:3000';

  getAll(page: number = 1, size: number = 10): Observable<AppPageOfData<Item>> {
    const queryParams = `?_page=${page}&_per_page=${size}`;
    return this.httpClient.get<AppPageOfData<Item>>(this.URI + '/items' + queryParams);
  }
}
