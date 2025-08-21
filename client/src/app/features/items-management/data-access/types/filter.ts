import { Item } from './item';

export type Filter = {
  [K in keyof Pick<Item, 'name' | 'type' | 'category'>]-?: Item[K] | null;
};
