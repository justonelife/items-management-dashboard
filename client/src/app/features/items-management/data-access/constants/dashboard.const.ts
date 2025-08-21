import { Option } from '@libs/toggle-button';
import { ItemStatus } from '../types';

export const URI = 'http://localhost:3000';

export const VIEW_OPTIONS: Option<ItemStatus>[] = [
  {
    value: 'active',
    label: 'Active Items',
  },
  {
    value: 'delete',
    label: 'Deleted Items',
  },
];
