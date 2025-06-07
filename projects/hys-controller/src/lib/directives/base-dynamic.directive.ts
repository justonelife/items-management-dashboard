import { computed, contentChildren, Directive, effect, inject, Signal, TemplateRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { HysComponentControlResolveService } from '../services/component-control-resolve.service';
import { DynamicField, DynamicType } from '../types';
import { HysDynamicControllerTemplate } from './dynamic-controller-template.directive';

@Directive({
  standalone: true,
})
export abstract class HysBaseDynamic<T extends DynamicField = DynamicField> {
  abstract service: HysComponentControlResolveService;
  abstract fields: Signal<T[]>;

  formGroup = inject(FormGroupDirective);
  form: FormGroup | undefined;

  items = computed<T[]>(() => {

    return this.fields().map(f => {
      if (this.isCustomField(f)) {
        const extras = (() => {
          const templateRef = this.templatesMapper[f.key];
          if (!templateRef) console.error(`Missing template for "${f.key}"`);
          return { templateRef };
        })();
        return { ...f, ...extras };
      } else {
        const resolve = this.service.resolve(f.type);
        return {
          ...f, component: {
            component: resolve?.component,
            inputs: { ...resolve?.inputs, label: f.label }
          }
        }
      }
    })
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

  private isCustomField(f: T): f is T & { type: DynamicType.CUSTOM } {
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
