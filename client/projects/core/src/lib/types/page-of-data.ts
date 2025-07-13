import { AppAny } from "./any";

export interface AppPageOfData<T extends Record<string, AppAny> = Record<string, AppAny>> {
  first?: number;
  prev?: number | null;
  next?: number | null;
  last?: number;
  pages?: number;
  items?: number;
  data: T[];
}
