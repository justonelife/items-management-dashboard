import { AppAny } from "@libs/core";

export interface Option<T = AppAny> {
  label: string;
  value: T;
}
