import { Option } from "@libs/toggle-button";
import { ViewType } from "../types";

export const VIEW_OPTIONS: Option<ViewType>[] = [
  {
    value: 'active',
    label: 'Active Items'
  },
  {
    value: 'deleted',
    label: 'Deleted Items'
  }
];
