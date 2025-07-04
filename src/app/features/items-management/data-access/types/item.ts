import { ItemStatus } from "./item-status";

export interface Item {
  id?: string;
  name?: string;
  type?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  status?: ItemStatus;
  tags?: string[];
}
