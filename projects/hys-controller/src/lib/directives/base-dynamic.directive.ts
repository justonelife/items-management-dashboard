import { computed, contentChildren, Directive, effect, inject, Signal, TemplateRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { HysComponentControlResolveService } from '../services/component-control-resolve.service';
import { DynamicField, DynamicType, FieldData } from '../types';
import { HysDynamicControllerTemplate } from './dynamic-controller-template.directive';

@Directive({
  standalone: true,
})
export abstract class HysBaseDynamic<T extends DynamicField = DynamicField> {
  abstract service: HysComponentControlResolveService;
  abstract fields: Signal<T>;

  formGroup = inject(FormGroupDirective);
  form: FormGroup | undefined;

  items = computed<(FieldData & { key: string })[]>(() => {

    return Object.entries(this.fields()).map(([key, f]) => {
      if (this.isCustomField(f)) {
        const extras = (() => {
          const templateRef = this.templatesMapper[key];
          if (!templateRef) console.error(`Missing template for "${key}"`);
          return { templateRef };
        })();
        return { ...f, ...extras, key };
      } else {
        const resolve = this.service.resolve(f.type);
        return {
          ...f, componentData: {
            component: resolve?.component,
            inputs: { ...resolve?.inputs, label: f.label }
          },
          key
        }
      }
    }).sort((a, b) => {
      if (a.order === undefined || a.order === null) return 1;
      if (b.order === undefined || b.order === null) return -1;
      return a.order - b.order;
    });
  });

  templates = contentChildren(HysDynamicControllerTemplate);
  templatesMapper: Record<string, TemplateRef<unknown>> = {};

  constructor() {
    effect(() => {
      this.computeTemplatesMapper();
    });
  }

  ngOnInit() {
    this.form = this.formGroup.form;
  }

  private isCustomField(f: FieldData): f is FieldData & { type: DynamicType.CUSTOM } {
    return f.type === DynamicType.CUSTOM;
  }

  private computeTemplatesMapper(): void {
    let updateTemplatesMapper: Record<string, TemplateRef<unknown>> = {};
    this.templates()?.forEach(template => {
      updateTemplatesMapper[template.key()] = template.templateRef;
    });
    this.templatesMapper = { ...updateTemplatesMapper };
  }
}
