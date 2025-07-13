import { TemplateRef, Type } from "@angular/core";
import { AppAny, IconCombinePosition } from "@libs/core";

export enum DynamicType {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  MULTIPLE = 'MULTIPLE',
  CHIPS_INPUT = 'CHIPS_INPUT',
  NUMBER_INPUT = 'NUMBER_INPUT',
  CUSTOM = 'CUSTOM',
}
export type BranchTrueFalseOnKey<
  K extends string,
  T,
  F = {}
> =
  ({ [P in K]: true } & T)
  | ({ [P in K]: false } & F);

type FieldKey = string;
export type FieldData = {
  label?: string;
  styleClass?: string;
  order?: number;
}
  & BranchTrueFalseOnKey<'withWrapper', { icon: string; iconSet?: string; iconPosition?: IconCombinePosition }>
  & (
    { type: DynamicType.CUSTOM; templateRef?: TemplateRef<unknown> } |
    ({ type: Exclude<DynamicType, DynamicType.CUSTOM> } & {
      inputs?: Record<string, AppAny>;
      componentData?: {
        component?: Promise<Type<unknown>>;
        inputs: Record<string, AppAny>;
      }
    })
  );

//TODO: change more suitable name ex: RecordDynamicField
export type DynamicField = Record<FieldKey, FieldData>;
