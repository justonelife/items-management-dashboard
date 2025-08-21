import { Item } from './item';

export type EditItem = {
  [K in keyof Omit<Item, 'id'>]-?: Item[K] | null;
};
