import { TemplateRef, Type } from "@angular/core";
import { AppAny, IconCombinePosition } from "@libs/core";

export enum DynamicType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  CUSTOM = 'CUSTOM',
}
export type BranchTrueFalseOnKey<
  K extends string,
  T,
  F = {}
> =
  ({ [P in K]: true } & T)
  | ({ [P in K]: false } & F);

export type DynamicField = {
  key: string;
  label?: string;
  styleClass?: string;
}
  & BranchTrueFalseOnKey<'withWrapper', { icon: string; iconSet?: string; iconPosition?: IconCombinePosition }>
  & (
    { type: DynamicType.CUSTOM; templateRef?: TemplateRef<unknown> } |
    ({ type: Exclude<DynamicType, DynamicType.CUSTOM> } & {
      inputs?: Record<string, AppAny>;
      component?: Promise<Type<unknown>>;
    })
  )
