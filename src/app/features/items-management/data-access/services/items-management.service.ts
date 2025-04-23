import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models';

@Injectable()
export class ItemsManagementService {
  readonly httpClient = inject(HttpClient);
  readonly URI = 'http://localhost:3000';

  getAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URI + '/items');
  }
}
