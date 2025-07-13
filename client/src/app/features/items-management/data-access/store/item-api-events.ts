import { type } from "@ngrx/signals";
import { eventGroup } from "@ngrx/signals/events";
import { AppPageOfData } from "@libs/core"
import { Item } from "../types";

export const itemApiEvents = eventGroup({
  source: 'Items API',
  events: {
    loadedSuccess: type<AppPageOfData<Item>>(),
    loadedFailure: type<string>(),
  }
});
